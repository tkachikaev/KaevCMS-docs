---
title: "Donations — wallet top-ups"
description: "KaevCMS wallet coins, payment providers and exchanging coins for game items."
---

# Donations

The **Donations** module lets players top up their KaevCMS wallet through configured payment providers. Coins are credited **only after payment verification**.

Coins can also be exchanged for game items through **Web Inventory**.

## Getting started

1. Enable **Donations** in the administration panel.
2. Set the coin price under **Currencies and prices**.
3. Open **Payment systems**, configure your provider and click **Test**.
4. Verify the full flow with a controlled payment before opening checkout to players.

## [Payment providers](/en/guide/donations-providers)

- **[YooMoney](/en/guide/donations-yoomoney)** — wallet credentials and notification setup.
- **[FreeKassa](/en/guide/donations-freekassa)** — shop setup, Test and Live modes.
- **[PayPal](/en/guide/donations-paypal)** — PayPal Business and Sandbox testing.

::: info
FreeKassa and PayPal availability depends on your installed KaevCMS version. Both are marked **Alpha** in the current source and require a controlled payment before production use.
:::

## [Exchange coins for game items](/en/guide/donations-exchange)

Under **Transfer coins to game**, configure the in-game item and amount awarded for one CMS coin on each GameServer.

Exchanged items arrive in **Web Inventory** first. Players can then deliver them to a character through the [reward queue](/en/guide/reward-delivery).

[Coin exchange setup](/en/guide/donations-exchange) · [Technical Donations documentation](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/DONATIONS.md).
