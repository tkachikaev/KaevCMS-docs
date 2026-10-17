# Connecting game servers

KaevCMS stores website data in its own database and uses **separate external connections** for LoginServer and GameServer.

## Integration model

- **LoginServer**: game account operations.
- **GameServer**: characters, statistics and selected game functions.
- **Drivers**: schema-specific compatibility.
- **Diagnostics**: connection and database schema checks without exposing credentials.

The published code includes the **L2J Mobius** family and a legacy LoginServer variant. Compatibility with other builds depends on release and database structure, not just a chronicle label. Review the [release notes](https://github.com/tkachikaev/KaevCMS/releases).

## Setup sequence

1. Open game-server management in the administrator panel.
2. Create a LoginServer connection and choose the relevant driver.
3. Enter credentials for a dedicated database account with appropriate restricted rights.
4. Test connectivity and inspect schema support.
5. Add the related GameServer and repeat diagnostics.
6. Enable public statistics and optional functions after verification.

::: warning
Do not expose MySQL to the entire internet. Prefer a private network, firewall restrictions and dedicated database credentials.
:::

## Feature availability

Item names and icons, rankings, web inventory, rewards and character rescue depend on tables, drivers and sometimes external game-side handlers. A reward marked queued does **not** prove an item has been delivered in-game.

[Upstream integration details](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/GAME_INTEGRATION.md) · [Reward queue contract](https://github.com/tkachikaev/KaevCMS/tree/main/integrations/reward-queue)

