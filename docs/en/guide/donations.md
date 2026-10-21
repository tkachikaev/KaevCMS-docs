---
title: "Donations — payments module"
description: "Learn about KaevCMS Donations: player wallet, payment providers and coin exchange for game items."
---

# Donations

**Donations** lets players top up their KaevCMS wallet. Players pay through a configured provider, and KaevCMS credits coins **after the payment is verified**.

The module can also exchange CMS coins for in-game items through **Web Inventory**.

## Getting started

1. Enable **Donations** in the KaevCMS administration panel.
2. Open **Settings** in the module and configure a coin price under **Currencies and prices**.
3. Connect a payment service under **Payment systems**.
4. Test the payment flow with a small real payment.

## [Providers](/en/guide/donations-providers)

A provider processes a player's payment and sends a payment notification to KaevCMS.

### YooMoney

**YooMoney** is supported for accepting payments. Enter the wallet details, copy the callback address from KaevCMS into YooMoney settings, and enable payments.

**[Connect YooMoney — quick setup guide →](/en/guide/donations-yoomoney)**

## [Exchanging coins for game items](/en/guide/donations-exchange)

Under **Transfer coins to game**, configure the in-game item and how many items one CMS coin buys for each GameServer.

Exchange results go into **Web Inventory** first. Players can then send items to a character through the [reward queue](/en/guide/reward-delivery).

[Coin exchange setup](/en/guide/donations-exchange) · [Technical Donations documentation on GitHub](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/DONATIONS.md).
