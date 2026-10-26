---
title: "Mail in KaevCMS"
description: "Configure SMTP, send a test message, and choose between the three mail delivery modes."
---

# Mail

KaevCMS sends automatic **email verification** and **password reset** messages. You can configure the mail server in the admin panel regardless of which delivery mode you select.

## 1. Configure SMTP

Open **Administration → Settings → Mail → Connection** and enter:

| Field | What to enter |
| --- | --- |
| SMTP host | Your mail server, such as `smtp.example.com`. |
| Port | Commonly `587` with STARTTLS or `465` with SSL; confirm with your provider. |
| Security | STARTTLS/TLS, SSL/SMTPS, or no enforced encryption. A secure connection is recommended. |
| Username and password | Mail account credentials; some providers require an app password. |
| From address and name | The sender displayed to players. |
| System notification email | Optional separate field; not the SMTP login. |

Click **Save mail settings**, then **Send test email** to an address you control. If it arrives, the SMTP connection is working.

::: tip
The SMTP password is stored encrypted. Leave the field blank to keep the existing password. A change of the application's encryption key may require you to re-enter it.
:::

## 2. Choose a delivery mode

On the **Delivery** tab, choose between:

1. **Synchronous** — send during the player's request; simplest setup.
2. **Asynchronous (background)** — respond first, then send in a separate process; no permanent queue worker needed.
3. **Asynchronous with database queue** — persist the queued job and process it with Scheduler or a worker, with automatic retry handling.

**[Delivery mode comparison, requirements and setup →](/en/guide/mail-modes)**

For a small site, **Synchronous** is the easiest starting point. For high signup volume and better preservation of pending work, use the **database queue**, provided that queue processing actually runs.

## Setting up Cron in Plesk

**Asynchronous mail with a database queue** needs a working scheduler unless a separate queue worker is already configured.

1. Open **Plesk → Websites & Domains → Scheduled Tasks**.
2. Create a task of type **Run a PHP script**.
3. Enter the following settings:

| Setting | Value |
| --- | --- |
| Script path | `httpdocs/kaevcms-core/artisan` |
| Arguments | `schedule:run` |
| PHP version | The same version used by your website |
| Schedule | Every minute (`* * * * *`) |

4. Enable the task and save it.
5. Click **Run Now** to test it.
6. In KaevCMS administration, open **Mail → Delivery** and click **Check cron** to confirm the scheduler runs automatically.

::: tip
The path to `artisan` depends on where KaevCMS is installed. Replace the example path if needed. Once cron is running, queued database emails are processed automatically as long as SMTP and the queue are working.
:::

## 3. Verify delivery

Request a confirmation email for a test player account. If nothing arrives:

- Use the **Connection** tab to verify SMTP; a successful mode capability check does not test the mail server.
- Ensure the site's **`APP_URL`** is correct for verification and password reset links.
- For database mode, open **Administration → System → Queues** to check pending and failed jobs.

::: warning
A “Sent” status means SMTP accepted the message for onward delivery. It **does not guarantee delivery to the inbox**: the message can still be filtered as spam or rejected downstream. SPF, DKIM and DMARC are recommended for your sender domain.
:::

**[Compare delivery modes →](/en/guide/mail-modes)** · [Mail and queues technical documentation](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/MAIL_AND_QUEUES.md)
