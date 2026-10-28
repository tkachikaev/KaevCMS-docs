---
title: "Donations → Providers → FreeKassa"
description: "An easy guide to configuring FreeKassa, testing checkout, and enabling payments in KaevCMS."
---

# Connect FreeKassa

FreeKassa lets players top up their KaevCMS wallet through the provider's payment page.

::: warning Integration status
FreeKassa is marked **Alpha** in newer KaevCMS builds: full live-payment acceptance testing is not yet complete. If FreeKassa is missing from your administration panel, check your CMS version. Run a small controlled live payment before opening checkout to players.
:::

## 1. Set up your FreeKassa shop

1. Create a shop at the [FreeKassa website](https://freekassa.net/) and open its [merchant settings](https://merchant.freekassa.net/settings). Your shop may require approval.
2. In KaevCMS administration, open **Donations → Payment systems → FreeKassa**.
3. Copy the **FreeKassa notification URL** from KaevCMS into your merchant's **Notification URL** (Russian: **URL оповещения**) field. Set the notification method to **POST**.
4. Enter your **Shop ID**, **Secret word 1**, and **Secret word 2** in KaevCMS. Live payments also require the **FreeKassa API key** from your merchant settings.
5. Choose the currencies with configured coin prices under **Donations → Currencies and prices**, then save.

::: tip
The **FreeKassa notification security** section starts with a trusted IP list. Compare it with the [official FreeKassa documentation](https://docs.freekassa.net/). If your site uses Cloudflare or another reverse proxy, review the additional proxy settings. Notifications will fail if the trusted sender configuration is incorrect.
:::

## 2. Use the Test button

1. **First enable test mode in your FreeKassa merchant dashboard.** KaevCMS cannot switch the external merchant mode for you. A checkout may charge real money if the merchant is still in live mode.
2. Set FreeKassa to **Test** in KaevCMS and save.
3. Click **Test** beside the notification URL. In the dialog, select a currency and amount, then choose **Open test payment**.
4. Complete the flow on the FreeKassa page and check the result in the KaevCMS dialog.

**Test payment verified** means KaevCMS received and checked the signed notification. The test expires after **30 minutes**. **Test purchases never credit wallet coins.**

## 3. Enable live payments

After testing, disable test mode **in FreeKassa**, enter your API key, select **Live** in KaevCMS, enable the provider and save. Make sure Donations allows player payments and the selected currency has an active coin price.

Perform a **small real control payment** before opening checkout to everyone. Coins are credited only after KaevCMS verifies the payment notification and FreeKassa API result — not simply when the player returns to your site.

## Troubleshooting

- **Test not verified:** check public HTTPS, notification URL, POST method, secret word 2 and trusted sender IPs.
- **Players cannot pay:** check Live mode, API key, overall payment activation and currency prices.
- **Paid order but no coins:** find the order in administration and use FreeKassa API verification when available. Do not credit payments based on screenshots alone.

**Links:** [FreeKassa merchant settings](https://merchant.freekassa.net/settings) · [Official FreeKassa documentation](https://docs.freekassa.net/) · [All providers](/en/guide/donations-providers).
