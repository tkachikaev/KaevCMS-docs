---
title: "Donations → Providers → PayPal"
description: "Connect PayPal Business, set up a webhook, and test purchases in Sandbox."
---

# Connect PayPal

PayPal lets players purchase KaevCMS wallet coins through **your own PayPal Business account**. Payments go to your PayPal account; coins go into the player's CMS wallet.

::: warning Integration status
PayPal is marked **Alpha** in newer KaevCMS builds: full production acceptance is not complete. If your CMS version does not list PayPal, check for a compatible update. Do not open Live checkout to players before verifying Sandbox and a small real payment.
:::

## 1. Get PayPal credentials

1. Open the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/) using an account linked to **PayPal Business**.
2. Under your applications, choose **Live** and create or open a REST app. Copy its **Client ID** and **Client Secret**.
3. Find your Business account's **Merchant ID (PayPal account ID)**. This is **not** the app's Client ID.
4. In KaevCMS, open **Donations → Payment systems → PayPal** and enter your **Live** credentials.
5. Select currencies with configured prices under **Donations → Currencies and prices**, then save.

Secrets are stored encrypted. Leave an already saved secret field blank to keep the existing value.

## 2. Configure the webhook

1. Copy the **PayPal notification URL** displayed in KaevCMS.
2. Open your app in [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/) and add it as a **Webhook URL**. Select the events shown in the expandable **Connection guide** on the KaevCMS PayPal settings page.
3. Copy the **Webhook ID** assigned by PayPal into the matching field in KaevCMS, then save.

**Do not confuse them:** the **Webhook URL** points to your site; the **Webhook ID** is issued by PayPal. Sandbox and Live need their own webhook settings even if they use the same KaevCMS URL.

[PayPal's official webhook setup guide](https://developer.paypal.com/api/rest/webhooks/rest/).

## 3. Test with the Test button

1. Prepare a **Sandbox app** and Sandbox **Business** (seller) and **Personal** (buyer) test accounts in PayPal. [Sandbox guide](https://developer.paypal.com/sandbox-testing/overview/).
2. Click **Test** next to the notification URL in KaevCMS. In the dialog, expand **Sandbox credentials**, enter Sandbox Client ID, Client Secret and Webhook ID, then save.
3. Select **Sandbox** and click **Check credentials**. This confirms PayPal API access, **not** a completed payment.
4. Select a currency and amount in the same dialog, click **Open PayPal Sandbox**, and approve the purchase using the **buyer** test account.
5. After returning, if the status is **APPROVED**, click **Confirm Sandbox Capture**. Check the result in your test history.

**Sandbox uses no real money and never credits wallet coins.** Returning from the approval page alone is not evidence of completed Capture.

## 4. Enable Live

Check your **Live** credentials and webhook separately. After a small real control payment, enable **PayPal payments**, save, and make sure Donations allows players to pay.

If a transaction's outcome is uncertain, use **Check with PayPal API** on its administration page. This does not initiate another charge. Refunds and disputes generate administrator notices, but do not automatically debit wallet coins.

::: tip
PayPal Business availability, supported currencies and permission to accept payments for virtual game coins depend on your country and PayPal policies. Check your merchant account's eligibility before launching.
:::

**Links:** [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/) · [Sandbox](https://developer.paypal.com/sandbox-testing/overview/) · [Webhooks](https://developer.paypal.com/api/rest/webhooks/rest/) · [All providers](/en/guide/donations-providers).
