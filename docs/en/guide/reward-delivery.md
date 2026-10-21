---
title: "Delivering items to the game"
description: "Install the kaev_reward_queue table so KaevCMS can transfer items to the GameServer database."
---

# Delivering items to the game

KaevCMS lets players send rewards from their **Web Inventory** to in-game characters. The CMS writes transfer requests to a dedicated table named **`kaev_reward_queue`** in the game database.

To enable this feature, the administrator must **install the table once in the GameServer database**.

## Install the reward queue

1. **Download** [`install.sql`](https://github.com/tkachikaev/KaevCMS/blob/main/integrations/reward-queue/install.sql) from the `integrations/reward-queue` folder in the KaevCMS repository.
2. **Open phpMyAdmin**, select your **GameServer database**, then use **Import** to import the SQL file. The `kaev_reward_queue` table will be created.
3. **Verify the connection:** in KaevCMS administration, open **Reward queue**, select the GameServer, and check that the queue is available and has the expected structure.
4. **Done!** Players can now open **Account → Web Inventory**, select items and a character, and submit a transfer. KaevCMS will write the request into the game database table.

::: tip Multiple game servers
If your GameServers use **separate databases**, install the table in every GameServer database that should accept item transfers.
:::

::: warning Who actually gives the items to the character?
**KaevCMS only writes transfer requests to the game database queue.** The GameServer administrator is responsible for delivering items to characters, using a plugin or a custom consumer.

The CMS **Transferred** status means the queue entry was written; **it does not mean the item has appeared in-game**.
:::

## If the queue does not work

- **Table missing** — verify that you imported `install.sql` into the selected **GameServer** database, not the CMS or LoginServer database.
- **Invalid schema** — compare the existing table with the current `install.sql`; back up any existing data before making changes.
- **Unavailable** — verify the GameServer database connection and account permissions. The CMS needs read and write access to the queue.
- **Item not received in-game** — inspect the GameServer consumer. Installing the table does not deliver items by itself.

## `kaev_reward_queue` table fields

| Field | Purpose |
| --- | --- |
| `id` | Unique queue row ID. |
| `request_uuid` | Shared UUID of a single transfer operation. |
| `line_number` | Item's position within the transfer operation. |
| `game_server_id` | GameServer ID in KaevCMS. |
| `source` | Transfer source (usually `web_inventory`). |
| `cms_user_id` | User ID in KaevCMS. |
| `account_name` | Game account login. |
| `character_id` | ID of the target in-game character. |
| `character_name` | Target character name. |
| `item_id` | Game item ID. |
| `amount` | Quantity of the item. |
| `status` | Row status: `pending`, `processing`, `delivered`, or `failed`. |
| `attempts` | Number of delivery attempts by the consumer. |
| `error_message` | Consumer error message, if any. |
| `created_at` | Date and time the row was created. |
| `processing_started_at` | When the consumer started processing. |
| `processed_at` | When processing finished or failed. |

**Important:** KaevCMS creates each row with the `pending` status. The **GameServer consumer**, not the CMS, is responsible for subsequent statuses and processing fields.

[For developers: queue contract, statuses and SQL examples](https://github.com/tkachikaev/KaevCMS/tree/main/integrations/reward-queue).
