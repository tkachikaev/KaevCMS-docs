---
title: "Donations → Payment providers"
description: "Connect YooMoney, FreeKassa and PayPal to KaevCMS."
---

# Donations → Providers

A **provider** processes a player's purchase of KaevCMS wallet coins. Coins are credited after the payment is verified.

## Connect a provider

1. Enable **Donations** and set coin prices under **Currencies and prices**.
2. Open **Donations → Payment systems**, select a provider and click **Configure**.
3. Enter account credentials and notification settings, then use **Test** to check the connection.
4. Enable player payments after the tests pass.

## Choose a guide

- **[YooMoney](/en/guide/donations-yoomoney)** — wallet number, notification secret and callback test.
- **[FreeKassa](/en/guide/donations-freekassa)** — shop ID, two secrets, test checkout and Live activation.
- **[PayPal](/en/guide/donations-paypal)** — PayPal Business, Client ID, webhooks and Sandbox checkout.

::: warning
FreeKassa and PayPal are currently marked **Alpha** in the source. They may not exist in an older published CMS release. Verify both integration settings and a controlled live transaction before accepting real payments.
:::

[Back to Donations](/en/guide/donations).
