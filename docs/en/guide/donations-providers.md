---
title: "Donations → Payment providers"
description: "Connect YooMoney, FreeKassa and PayPal to KaevCMS."
---

# Donations → Providers

A **provider** processes a player's purchase of KaevCMS wallet coins. Coins are credited after the payment is verified.

## Connect a provider

1. Enable **Donations** and set coin prices under **Currencies and prices**.
2. Open **Donations → Payment systems**, select a provider and click **Configure**.
3. Copy the **Notification address** (the **Copy** button) into the provider's account, then enter the credentials.
4. Use **Test** to check the connection, then switch on **Accept payments** for that provider and save.

Switching a provider on is the only switch you need: KaevCMS opens payments to players when the site is ready, otherwise it says what is missing. Each provider is switched on and off independently, so you can run one or several at once. To close everything at once, disable the **Donations** module.

## The Test window

**Test** opens a window with a live result: a spinner while KaevCMS waits for the provider, then a green tick or a red cross. The result is stored on the server and stays until the next test, even if you close the window or the provider sends you back to the site. If no currency is selected, the window asks you to select one. FreeKassa test mode and PayPal Sandbox never credit coins and are never shown to players.

## Choose a guide

- **[YooMoney](/en/guide/donations-yoomoney)** — wallet number, notification secret and callback test.
- **[FreeKassa](/en/guide/donations-freekassa)** — shop ID, two secrets, test checkout and Live activation.
- **[PayPal](/en/guide/donations-paypal)** — PayPal Business, Client ID, webhooks and Sandbox checkout.

::: warning
FreeKassa and PayPal are currently marked **Alpha** in the source. They may not exist in an older published CMS release. Verify both integration settings and a controlled live transaction before accepting real payments.
:::

[Back to Donations](/en/guide/donations).
