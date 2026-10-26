---
title: Driver Builder (Beta)
description: Create a JSON driver for a Lineage II Java server build without writing PHP.
---

# Driver Builder (Beta)

**You no longer have to ask the KaevCMS developer to write a dedicated driver for each Java server build.** Administrators can describe their game database in a visual builder, without programming.

A driver tells the CMS where the game build stores **accounts, characters, statistics and other data**. You can save the mapping to JSON and share it with owners of the same build.

::: warning Beta
The builder was introduced in KaevCMS **0.54.x** and is still being validated against real game builds. It does **not** guarantee compatibility with every Java server: currently it supports **MySQL/MariaDB** and only operations implemented by the engine. **MS SQL / PTS are not supported yet.** Start with a test database.
:::

## What can be configured?

| Driver | Features |
| --- | --- |
| **LoginServer** | Account tables, login and password columns, account creation, password changes and additional account fields. |
| **GameServer** | Characters, classes and levels, online status, PvP/PK, rankings, heroes, castles, table relations and filters. |
| **JSON profile** | Save, duplicate, export and import compatible mappings. |

You can start from a built-in **L2J Mobius** or **RUSaCis** profile and adapt it to your database.

## Create your own driver

1. Open **Administration → Servers → Drivers**.
2. Select **LoginServer** or **GameServer**, then click **Create driver**.
3. If your database resembles a known build, use **Create from existing**; otherwise create a blank profile.
4. Enter a name, select capabilities and choose the database encoding.
5. Map the CMS fields to the **actual tables and columns** of your game database, such as the character-name column.
6. For LoginServer, choose a **supported password format**. For GameServer, configure rankings, filters, heroes and castles as needed.
7. Click **Save driver**.

Saving a profile **does not modify the game database** or activate the driver on an existing connection.

## Apply it to a server

1. Open the target **LoginServer** or **GameServer** under **Servers**.
2. Select your new driver and save the connection settings.
3. From the server list, click **Apply JSON and verify**.
4. KaevCMS checks the connection and required tables, columns and relations. Fix any reported errors and retry.
5. After a successful check, test registration, actual game login, character listing and enabled features using a test account.

::: info
**A schema check is not a complete game test.** A password format might pass structural checks but still be rejected by your Java LoginServer. Verify real game-client login. Reapply and verify after changing the profile or connection settings.
:::

## Share a driver

Export a working profile to JSON and share it. Another administrator can import it into their CMS. **Database hosts, usernames and connection passwords are excluded** from the export.

**[How to import and export JSON drivers →](/en/guide/driver-json)**

## Current beta limitations

- **MySQL/MariaDB only**; no MS SQL / PTS yet.
- Password algorithms come from a predefined list (such as SHA-1/Base64, BCrypt `$2a$`, supported hex hashes); **no executable custom code**.
- Some unusual schemas and game-specific operations may require changes to the generic engine.
- The builder does not replace the [reward delivery queue](/en/guide/reward-delivery) for actual in-game item delivery.

**In short:** owners of many Java builds can now adapt KaevCMS independently, but actual compatibility still needs testing per database and feature.

[Connect game servers](/en/guide/game-servers) · [Import and export JSON](/en/guide/driver-json) · [Technical guide](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/UNIVERSAL_DRIVERS.md)
