---
title: "KaevCMS mail"
description: "Connect SMTP, test email delivery and choose a delivery mode."
---

# Mail in KaevCMS

KaevCMS sends messages for **email verification**, **password resets** and other account notifications. You need your own or a third-party **SMTP service**.

## Configure SMTP

1. In administration, open **Settings → Mail → Connection**.
2. Enter the **SMTP host** and **port**. Common combinations are `587` with **STARTTLS/TLS** or `465` with **SSL/SMTPS**. Use the details supplied by your mail provider.
3. Enter the **username**, **password** (or app password), **sender email** and **sender name**.
4. Click **Save mail settings**.
5. Enter your email address in the test section, click **Send test email**, and make sure the message reaches you.

The SMTP password is **encrypted at rest**. Leave the password field empty to keep an existing valid password. Run the test again whenever SMTP settings change.

::: tip Deliverability
Set up **SPF, DKIM and DMARC** for your sending domain through your email provider. Also verify `APP_URL`: verification and password-reset links use it.
:::

## Three delivery modes

Open **Mail → Delivery**:

- **Synchronous** — the SMTP attempt happens during the player's web request. Simple, but slow mail servers delay the response.
- **Asynchronous** — email is sent in a separate PHP process after the response. Fast for the player, but no durable job is stored.
- **Asynchronous with database queue** — mail jobs are saved in the CMS database and picked up by Scheduler or a worker. Temporary SMTP failures can be retried.

**[Compare delivery modes: speed, server load and failure risks →](/en/guide/mail-modes)**

::: info Mode checks
Before first activation of an asynchronous mode, KaevCMS checks whether the server can run it. **A failed check leaves the previous mode active** (synchronous on a fresh installation). This check does not send an email.
:::

## If messages are not arriving

- **SMTP test fails** — verify your host, login, password, encryption and port.
- **SMTP accepted the message but it is missing** — check spam filters, provider logs and SPF/DKIM/DMARC.
- **Queue is not progressing** — verify Scheduler or the worker and check **System → Queues**.
- **Job failed** — fix the underlying issue and retry the failed job from the queue administration page. An expired password reset link may require a fresh request.

::: warning What “Sent” means
A **Sent** state means the SMTP server accepted the message, not that it reached the recipient's inbox. Delivery modes primarily govern **automatic account emails**; tests and manually sent admin mail can follow separate paths.
:::

[Delivery modes](/en/guide/mail-modes) · [VPS installation](/en/guide/vds) · [Shared hosting](/en/guide/shared-hosting)
