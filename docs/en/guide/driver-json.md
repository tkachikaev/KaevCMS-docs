---
title: Import and export JSON drivers
description: Share Lineage II Java server driver profiles.
---

# Import and export JSON drivers

**Driver Builder is in Beta.** Once you configure a profile for your game build, you can export and share it with another administrator. They will not need to map the same fields from scratch.

## Export

1. Open **Administration → Servers → Drivers**.
2. Choose **LoginServer** or **GameServer** and find your profile.
3. Click **⋯ → Export**.
4. Save the downloaded `kaevcms-login-name.json` or `kaevcms-game-name.json` file.

The file describes **tables, columns and capabilities**, but excludes **the database address, username and password**. Review its contents before sharing.

## Import

1. Open **Servers → Drivers → Import**.
2. Select a **`.json` file no larger than 256 KB** and confirm.
3. The profile appears under its driver type. Adjust its table/column mappings if needed.
4. When configuring your **LoginServer** or **GameServer**, select the imported driver from the list.

If an ID already exists, the CMS creates **a separate profile with a new ID**, leaving the original unchanged.

::: warning
Import **does not switch an existing server connection**. Available features depend on your game database structure. **LoginServer and GameServer use separate profiles.**
:::

[Driver Builder (Beta)](/en/guide/driver-builder) · [Connect servers](/en/guide/game-servers)
