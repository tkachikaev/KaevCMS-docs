# Connecting game servers

KaevCMS stores website data in its own database and uses **separate external connections** for LoginServer and GameServer.

## Integration model

- **LoginServer**: game account operations.
- **GameServer**: characters, statistics and selected game functions.
- **Drivers**: schema-specific compatibility.
- **Diagnostics**: connection and database schema checks without exposing credentials.

Built-in drivers support **L2J Mobius** and **RUSaCis**. The **[JSON Driver Builder (Beta)](/en/guide/driver-builder)** lets administrators map database tables and columns for other Java builds **without writing a PHP driver**. The builder currently targets **MySQL/MariaDB**, and each game build still needs compatibility tests.

## Driver Builder (Beta)

If your build is not in the built-in list, open **Servers → Drivers** to create a custom LoginServer or GameServer JSON profile.

**[Create and activate a driver](/en/guide/driver-builder)** · **[Import and export JSON](/en/guide/driver-json)**

Profiles can be shared with other administrators without database passwords or hosts.

## Setup sequence

1. Open game-server management in the administrator panel.
2. Create a LoginServer connection and choose the relevant driver.
3. Enter credentials for a dedicated database account with appropriate restricted rights.
4. Test connectivity and inspect schema support. With JSON drivers, also select **Apply JSON and verify**.
5. Add the related GameServer and repeat diagnostics.
6. Enable public statistics and optional functions after verification.

::: warning
Do not expose MySQL to the entire internet. Prefer a private network, firewall restrictions and dedicated database credentials.
:::

## Delivering items to the game

To deliver Web Inventory rewards, **install `kaev_reward_queue` into the GameServer database and configure a GameServer-side consumer**. See **[Delivering items to the game](/en/guide/reward-delivery)** for step-by-step instructions.

## Feature availability

Item names and icons, rankings, web inventory, rewards and character rescue depend on tables, drivers and sometimes external game-side handlers. A reward marked queued does **not** prove an item has been delivered in-game.

[Upstream integration details](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/GAME_INTEGRATION.md) · [Reward queue contract](https://github.com/tkachikaev/KaevCMS/tree/main/integrations/reward-queue)

