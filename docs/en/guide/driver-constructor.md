---
title: "Driver Constructor — Beta"
description: "Create JSON compatibility profiles for Java Lineage II builds without PHP coding."
---

# Driver Constructor (Beta)

**You no longer need to request a hand-written driver for each Java server build.** Administrators can configure KaevCMS compatibility with their own game database **from the admin panel, without writing PHP**.

The constructor maps KaevCMS data to **LoginServer** and **GameServer** tables and columns. For example, “account login → `accounts` table → `login` column”. You can **export the profile as JSON and share it** with another administrator.

::: warning Beta
This feature is **in beta**. It can adapt many **Java builds using MySQL/MariaDB**, even without a prebuilt driver, but **does not guarantee compatibility with every build**. The database schema, password format, and required capabilities must be supported. **MS SQL/PTS is not supported yet.**

The feature exists in current 0.54.x branch source code; verify it is included in your installed CMS build. A source change does not mean an official downloadable release already includes it.
:::

## What it supports

| Profile | Function |
| --- | --- |
| **LoginServer** | Game account lookup, registration, password changes, status, depending on the database. |
| **GameServer** | Characters, levels, PvP/PK, playtime, heroes, castles, rankings and filters as the schema allows. |

Unneeded capabilities can be disabled. Existing **L2J Mobius** and **RUSaCis** drivers remain available as starter templates.

## Create a driver

1. Open **Admin → Servers → Drivers**.
2. Choose **LoginServer** or **GameServer**, then click **Create driver**.
3. If your build resembles Mobius or RUSaCis, **start from a bundled profile**.
4. Set a name, database encoding and the capabilities you need.
5. Map CMS fields to **the actual tables and columns** in your game database. For LoginServer, select a supported game password scheme if account writes are enabled.
6. For GameServer, configure character fields, relations, rankings and filters.
7. Click **Save driver**.

Find table and column names in **phpMyAdmin** or another MySQL administration tool. Enter schema identifiers, not individual player data.

## Activate the driver

**Saving a profile does not replace an active server driver.**

1. Under **Servers**, edit the relevant **LoginServer** or **GameServer**.
2. Select the new driver and save the database connection settings.
3. Click **Test connection**.
4. On the server card click **Apply JSON and verify**. KaevCMS checks required tables and columns and only applies the profile after a successful check.
5. Verify account operations, characters and statistics using a test game account.

The schema check **does not change game data**, but cannot prove that the game client accepts a generated password or that every feature works end to end. Reapply after profile or connection changes.

## Import and export JSON

**Export:** go to **Servers → Drivers**, click **⋯ → Export** beside the profile, and share the downloaded `.json` file.

**Import:** click **Import**, select a `.json` file (**up to 256 KB**) and confirm. KaevCMS validates and saves it; duplicate IDs receive an available suffix. **Review and apply the new profile to a server separately.**

**LoginServer and GameServer use separate files**, so export both when both are customized.

::: tip JSON safety
Profiles include **table names, columns and capabilities**, not **database server addresses, connection usernames or passwords**. Executable SQL/PHP cannot be embedded. Still review any imported profile before using it.
:::

## Current limitations

- **MySQL/MariaDB only**, not MS SQL/PTS.
- Supported password schemes: **SHA-1/Base64, BCrypt `$2a$`, SHA-1/MD5/SHA-256/Whirlpool (hex)**; custom code is not supported.
- Creating game accounts requires suitable columns and a **unique login index**.
- Some nonstandard rankings and game operations are outside the JSON profile format.
- [Delivering items to a character](/en/guide/reward-delivery) still requires the reward queue and a GameServer-side consumer.

**The key benefit:** administrators can now **create, test and share compatibility profiles** for their own Java builds, rather than wait for a newly coded PHP driver.

[Connecting game servers](/en/guide/game-servers) · [Technical documentation](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/UNIVERSAL_DRIVERS.md)
