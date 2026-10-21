---
title: "Delivering items to the game — reward queue"
description: "Install kaev_reward_queue in the GameServer database, configure an item delivery consumer, and test Web Inventory transfers."
---

# Delivering items to the game

KaevCMS modules such as Donations and Promo Codes can grant items to a player's **Web Inventory**. The player then selects an in-game character and requests a transfer.

Transfers use the **`kaev_reward_queue`** table. The administrator must install it **in each GameServer database that will receive items** and configure a compatible consumer.

::: warning Installing the table alone does not deliver items
KaevCMS writes delivery requests to the queue; **it does not insert items into the in-game inventory itself**. An additional GameServer-side consumer (plugin, script or service) must perform delivery. **No universal, ready-to-run consumer for all GameServer distributions is bundled with KaevCMS.**
:::

## How a transfer works

1. A module grants an item to **Web Inventory** for a particular GameServer.
2. The player opens **Account → Web Inventory**, selects rewards (up to 50 per transfer) and a character belonging to their game account.
3. KaevCMS verifies ownership, reserves the rewards, creates an operation UUID and inserts **one row per item** into `kaev_reward_queue`.
4. Once every row has been written, the CMS reports **Transferred (`queued`)**. This confirms *queue insertion*, **not delivery to the character**.
5. The GameServer consumer takes `pending` rows, safely grants the items, and marks them `delivered` only after successful delivery. A confirmed failure is marked `failed`.

Flow: **Module → Web Inventory → kaev_reward_queue → GameServer consumer → in-game inventory**.

## Step 1. Install the table in the GameServer database

The official SQL is in the KaevCMS source tree: [`integrations/reward-queue/install.sql`](https://github.com/tkachikaev/KaevCMS/blob/main/integrations/reward-queue/install.sql).

::: danger Select the correct database
Run the SQL against the **GameServer database containing character data**, **not the KaevCMS database or LoginServer database**. If multiple GameServers use separate databases, install the table in each one.
:::

**Option A — phpMyAdmin:**

1. Back up the GameServer database.
2. Select the **correct GameServer database** in the phpMyAdmin left-hand tree.
3. Open **Import**, choose `install.sql` from the folder above (or download it from GitHub), and import it. Alternatively, paste the SQL shown below into the **SQL** tab.
4. Confirm that `kaev_reward_queue` now exists in that database.

**Option B — SSH (MySQL/MariaDB):**

```bash
# Run from the KaevCMS project root, using your GameServer DB credentials.
mysql -h GAME_DB_HOST -u GAME_DB_USER -p GAME_DB_NAME < integrations/reward-queue/install.sql
```

**Full table creation SQL** (identical to the official `install.sql`):

```sql
CREATE TABLE IF NOT EXISTS `kaev_reward_queue` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `request_uuid` CHAR(36) NOT NULL,
    `line_number` SMALLINT UNSIGNED NOT NULL,
    `game_server_id` BIGINT UNSIGNED NOT NULL,
    `source` VARCHAR(64) NOT NULL DEFAULT 'web_inventory',
    `cms_user_id` BIGINT UNSIGNED NOT NULL,
    `account_name` VARCHAR(45) NOT NULL,
    `character_id` BIGINT UNSIGNED NOT NULL,
    `character_name` VARCHAR(190) NOT NULL,
    `item_id` BIGINT UNSIGNED NOT NULL,
    `amount` BIGINT UNSIGNED NOT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'pending',
    `attempts` INT UNSIGNED NOT NULL DEFAULT 0,
    `error_message` VARCHAR(500) NULL,
    `created_at` DATETIME NOT NULL,
    `processing_started_at` DATETIME NULL,
    `processed_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `kaev_reward_queue_request_line_unique` (`request_uuid`, `line_number`),
    KEY `kaev_reward_queue_status_created_index` (`status`, `created_at`),
    KEY `kaev_reward_queue_character_status_index` (`character_id`, `status`),
    KEY `kaev_reward_queue_account_status_index` (`account_name`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

`CREATE TABLE IF NOT EXISTS` will **not update an existing table's schema**. If your table already exists but KaevCMS reports a schema mismatch, preserve the data before comparing the columns with the current SQL definition.

## Step 2. Verify CMS queue access

1. Make sure the GameServer is configured in [Game Servers](/en/guide/game-servers) and its database connection works.
2. The GameServer database account used **by KaevCMS** must be able to read and insert rows into `kaev_reward_queue` (`SELECT` and `INSERT`), as well as inspect its schema. Avoid granting broad access to game tables without need.
3. Open **Administration → Reward queue** and choose the relevant GameServer.
4. Check for the message confirming that the selected GameServer queue is available and has the expected structure.

If the table is missing or its schema is invalid, verify the database selected for the SQL import. If the queue is unavailable, inspect connectivity and database privileges.

## Step 3. Configure the delivery consumer

The repository includes a [queue contract and SQL examples](https://github.com/tkachikaev/KaevCMS/tree/main/integrations/reward-queue):

- `consumer-template.sql` — an **incomplete template**, not an installable consumer.
- `pending.sql` — read pending requests.
- `mark-processing.example.sql` — safely claim a pending row.
- `mark-delivered.example.sql` / `mark-failed.example.sql` — finalize a row after real processing.
- `problematic.sql` — review errors and stale processing tasks.

A consumer needs to be implemented or integrated **for your specific GameServer distribution**. It must verify the character and item, allocate game `object_id` values correctly, respect the server's inventory rules, and prevent duplicate delivery after crashes. Use a supported GameServer extension or a separate service. Do not blindly insert rows into a game's `items` table using generic SQL: table structures and item-granting rules differ.

::: warning Idempotency
Each transfer has a `request_uuid` and every item has a `line_number`. Together they form a unique key. The consumer must claim work atomically and prevent a retry from **granting the same item twice**. Mark a row `delivered` **only when actual delivery is confirmed**.
:::

## Step 4. Test a transfer

1. On a test server, grant an item through a supported KaevCMS module so that the reward appears in a test player's **Web Inventory**.
2. Sign in as the player, select the item and a character, then choose **Transfer selected rewards**.
3. In **Administration → Reward queue**, find the operation UUID. CMS status `queued` means the request reached the GameServer database.
4. Inspect the GameServer table with this **read-only query**:

```sql
SELECT id, request_uuid, line_number, character_name, item_id, amount,
       status, attempts, error_message, created_at
FROM kaev_reward_queue
ORDER BY id DESC
LIMIT 20;
```

5. Verify that the consumer changes `pending` rows to `delivered` **and the character actually receives the items**. Without a consumer, rows remain `pending`.

## Statuses and troubleshooting

| Location | Status | Meaning |
| --- | --- | --- |
| CMS | `queued` (Transferred) | Complete payload reached the GameServer queue; delivery is **not confirmed** |
| CMS | `review` | Uncertain write result or payload conflict; do not force a duplicate grant |
| CMS | `failed` | Queue write failed and reserved items were restored to Web Inventory |
| GameServer | `pending` | Waiting for a consumer |
| GameServer | `processing` | Claimed by the consumer |
| GameServer | `delivered` | Consumer confirmed successful delivery |
| GameServer | `failed` | Consumer recorded an error |

For rows stuck in `pending`, check **your consumer's** service and logs. For stale `processing` or `failed` rows, use [`problematic.sql`](https://github.com/tkachikaev/KaevCMS/blob/main/integrations/reward-queue/problematic.sql) and the consumer log before taking action.

::: danger Avoid duplicate item delivery
KaevCMS **does not monitor the consumer's final statuses**. **Check again** in the CMS reward journal verifies that queue rows exist and their payload matches — **it does not check whether a character received an item**. Do not delete and recreate queue operations merely because the GameServer reports `pending` or `failed`; investigate first.
:::

Read the [complete reward queue contract and SQL examples](https://github.com/tkachikaev/KaevCMS/blob/main/integrations/reward-queue/README.md).
