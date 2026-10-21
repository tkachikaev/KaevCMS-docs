---
title: "Donations → Providers → YooMoney"
description: "Quick guide to configuring YooMoney payment notifications in KaevCMS."
---

# Connect YooMoney

YooMoney lets players purchase wallet coins in KaevCMS. **KaevCMS generates the notification URL for you** — just copy it to the YooMoney wallet settings.

## Setup

1. In KaevCMS administration, open **Donations → Settings** and configure an active **RUB coin price**.
2. Open **Payment systems** and choose **Configure** for **YooMoney**.
3. In [YooMoney HTTP notification settings](https://yoomoney.ru/document/http-uvedomleniya), **enable HTTP notifications** and paste the **YooMoney notification URL** displayed in KaevCMS.
4. In YooMoney, choose **Show secret** and copy the notification secret. Back in KaevCMS, enter the **YooMoney wallet number** and **this secret**.
5. Select **Accept payments through YooMoney** and **Save settings**.

**Done!** Players can pay through YooMoney. The provider sends a notification to the configured URL; KaevCMS validates the payment and credits wallet coins.

::: tip No manual code changes
You do not need to create a callback endpoint, edit CMS files or run commands. After saving, the secret is hidden; leave the field blank to keep the saved value.
:::

## Test the setup

Make a **small real payment** from a player account and check that the coins arrive after verification.

If payments cannot be enabled, KaevCMS lists the **readiness checks** that need attention, such as a RUB price, wallet credentials, HTTPS or production mode.

::: warning Real payments require a public site
Your site must be reachable over **public HTTPS**. YooMoney cannot deliver notifications to `localhost` or `127.0.0.1`. **Returning from a checkout page is not payment confirmation**; crediting requires a verified notification. Keep the notification secret private.
:::

[Official YooMoney HTTP notification help](https://yoomoney.ru/document/http-uvedomleniya) · [Back to Donations](/en/guide/donations)
