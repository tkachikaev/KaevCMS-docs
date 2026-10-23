---
title: "Donations → Providers → YooMoney"
description: "Set up YooMoney in KaevCMS and verify HTTP notifications using the Test button."
---

# Connect YooMoney

YooMoney lets players purchase wallet coins in KaevCMS. **KaevCMS generates the notification URL** — copy it into your YooMoney wallet settings.

## Connect and test

1. In KaevCMS administration, open **Donations → Settings** and set an active **RUB coin price**.
2. Go to **Donations → Payment systems → YooMoney**.
3. In [YooMoney HTTP notification settings](https://yoomoney.ru/document/http-uvedomleniya), enable notifications and paste the **YooMoney notification URL** displayed in KaevCMS.
4. In YooMoney, choose **Show secret**. Enter your **wallet number** and the **notification secret** in KaevCMS. If a secret is already saved, you can leave its field blank.
5. To make payments available to players immediately, select **Accept payments through YooMoney**.
6. Click **Test** next to the notification URL in KaevCMS. A waiting dialog opens.
7. **While the dialog is open**, return to YooMoney and click **Test** (Russian UI: **«Протестировать»**) in its HTTP notification settings.

When KaevCMS shows **Notification received**, the URL is reachable and the signature is correct. **KaevCMS saves the settings automatically** — you do not need to click Save separately after a successful test.

::: tip What does Test check?
It verifies the incoming test notification **and its signature secret**. No money is transferred and no wallet coins are credited. The dialog waits for **up to five minutes**. Real payments continue to be processed normally.
:::

## If the test fails

- **Secret mismatch** — verify that YooMoney and KaevCMS use the same notification secret.
- **Notification not received** — check the URL, enabled HTTP notifications, and public website access, then choose **Retry**.
- **Could not start test** — enter a notification secret in KaevCMS or save it in the settings first.

If real payments cannot be enabled, KaevCMS shows what needs attention, such as an active RUB rate, HTTPS, credentials, or production mode.

## Verify a real payment

After the notification test passes, you can make a **small real payment** from a player account and confirm that wallet coins are credited.

::: warning Real payments need public HTTPS
Your site must be reachable via **public HTTPS**. YooMoney cannot send notifications to `localhost` or `127.0.0.1`. Returning from the payment page **does not confirm payment**; wallet coins are credited only after verification. Keep the notification secret private.
:::

[YooMoney HTTP notification documentation](https://yoomoney.ru/document/http-uvedomleniya) · [Back to Donations](/en/guide/donations)
