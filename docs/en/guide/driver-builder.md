---
title: Driver Builder (Beta)
description: Create JSON drivers for Lineage II Java server builds without programming.
---

# Driver Builder (Beta)

**KaevCMS lets administrators configure a driver for their own Lineage II Java server build.** The visual builder maps game database tables and columns for accounts, characters and other features. No PHP code or custom SQL is needed.

A configured driver can be saved, edited, duplicated, **exported as JSON** or imported into another KaevCMS installation.

::: warning Beta
The builder was introduced in the KaevCMS **0.54.x** codebase and compatibility testing is ongoing. It targets Java builds using **MySQL/MariaDB**, but not every unusual database layout or feature is supported. **MS SQL / PTS are not supported yet.** Make sure your CMS version includes the builder.
:::

## What can it configure?

| Driver | Capabilities |
| --- | --- |
| **LoginServer** | Game account tables, login/password columns, password hash format, account creation and password changes. |
| **GameServer** | Characters, levels, online status, PvP/PK, rankings, heroes, castles, table relations and filters. |
| **JSON profile** | Saved mappings, copies, exports and imports across sites. |

Built-in profiles for **L2J Mobius** and **RUSaCis** can be used as starting points and adapted to your game database.

## Create a driver

1. In administration, open **Servers → Drivers**.
2. Select **LoginServer** or **GameServer** and click **Create driver**.
3. Start with a blank profile or use **Create from existing**.
4. Enter the driver name, supported features and database encoding.
5. Map CMS fields to the tables and columns in your game database. For LoginServer, select the game password format. For GameServer, configure statistics and table relations as needed.
6. Click **Save driver**.

The new profile appears in the catalog and can be selected when configuring LoginServer or GameServer under **Servers**. **Saving a profile does not modify the game database or switch existing server connections.**

## Supported game password formats

The LoginServer builder supports **six formats**:

| Format | Profile identifier |
| --- | --- |
| SHA-1 encoded as Base64 | sha1_base64 |
| BCrypt with the $2a$ prefix | bcrypt_2a |
| SHA-1 in hexadecimal | sha1_hex |
| MD5 in hexadecimal | md5_hex |
| SHA-256 in hexadecimal | sha256_hex |
| Whirlpool in hexadecimal | whirlpool_hex |

Choose **the format your Java LoginServer actually uses**. You do not need to change the game's password algorithm for the CMS. Arbitrary algorithms or executable code in JSON are not supported.

## Import and export

Profiles can be shared as JSON files. The export includes mapping rules, **not database hosts or connection credentials**.

**[How to import and export drivers →](/en/guide/driver-json)**

## Current beta limitations

- **MySQL/MariaDB** only; MS SQL / PTS are not available.
- Some unusual schemas, rankings and game-specific actions are not covered by the existing mapping options.
- The builder does not replace the separate [in-game item delivery mechanism](/en/guide/reward-delivery).

**In short:** owners of different Java builds can configure compatibility through JSON profiles themselves. Available features depend on each build's database structure.

[Connecting game servers](/en/guide/game-servers) · [Import and export JSON](/en/guide/driver-json) · [Technical reference](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/UNIVERSAL_DRIVERS.md)
