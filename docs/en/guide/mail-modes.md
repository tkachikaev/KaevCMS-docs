---
title: "Mail delivery modes"
description: "Compare synchronous, background, and database-queue email delivery in KaevCMS."
---

# Mail delivery modes

Go to **Administration → Settings → Mail → Delivery**. All three modes use the same configured **SMTP server**. The difference is **when and where the CMS processes outgoing mail**.

## Compare the three modes

| Feature | Synchronous | Asynchronous | Asynchronous with database queue |
| --- | --- | --- | --- |
| **When mail is processed** | During the player's request | In a separate process after the response | When Scheduler or a worker picks up the job |
| **Website response time** | Slower: waits for SMTP | Fast | Fast |
| **Time until sending starts** | Immediately, but blocks the request | Usually right after the response | Worker: usually quickly; cron: on the next run, possibly minutes later |
| **Server load** | SMTP occupies a web PHP process | Extra short-lived PHP process | Minimal web-request work; extra queue and database activity |
| **SMTP temporarily unavailable** | Fails without automatic retry | May fail in the child process without automatic retry | Retries, then records a **failed job** if it cannot send |
| **Restart or crash** | In-progress send can be interrupted | In-progress job can be lost | Pending jobs survive in the database while the database remains intact |
| **Requirements** | Working SMTP | SMTP plus support for child processes | SMTP, CMS queue tables and **Scheduler cron or a persistent worker** |
| **Typical use** | Small, simple sites | Small workloads where background processes are allowed | Production and sign-up bursts |

**No mode guarantees arrival in the recipient's inbox.** These differences concern the CMS sending jobs; the mail provider may later reject or filter a message.

## Enable a delivery mode

### 1. Synchronous

1. Configure SMTP and [send a test email](/en/guide/mail).
2. Under **Delivery**, select **Synchronous**.
3. Save. **No mail worker or cron is needed.**

This is the default and simplest option. Slow SMTP servers can delay player requests.

### 2. Asynchronous

1. Configure SMTP.
2. Select **Asynchronous** under **Delivery** and save.
3. Wait for the CMS capability check. If it succeeds, the mode becomes active; otherwise, the previous mode remains.
4. Verify an actual user email.

**No permanent worker is needed**, but hosting must allow PHP to spawn a child process. Some shared hosts block this. No durable database job is kept, so a terminated process cannot be automatically retried.

### 3. Asynchronous with database queue

1. Configure SMTP.
2. Ensure **Laravel Scheduler runs every minute** or a **persistent queue worker** is running.
3. Select **Asynchronous with database queue** under **Delivery**.
4. Wait for a successful capability check, then test the actual email flow.

**VPS:** configure the worker using the [Ubuntu instructions](/en/guide/vds). It handles jobs without waiting for a minute-based cron tick. The site also uses Scheduler for other recurring tasks.

**Shared hosting:** if a permanent worker is unavailable, use a **once-per-minute Laravel Scheduler cron**, if supported by your hosting plan. Scheduler invokes `kaevcms:queue-drain`. If you have neither cron nor a worker, **do not enable database queues**: mail will remain pending.

::: info Queue throughput
The default `kaevcms:queue-drain` processes **up to 100 jobs per run across all queues**. The actual number of emails sent depends on SMTP speed and competing jobs. A permanent worker can be faster.
:::

## Retries, failures and monitoring

When SMTP temporarily fails, **database-queued jobs** are retried with delays. Jobs that exhaust their attempts remain under **System → Queues → Failed jobs**, where an administrator can retry them after fixing the cause. Service-data cleanup may eventually remove old failed jobs, so review failures rather than leaving them indefinitely.

When Scheduler stops, jobs remain pending in the database but **will not send until processing resumes**. If SMTP accepted a message but the recipient never received it, investigate the email provider and spam filters.

**Recommendation:** use the **database queue** for regular account sign-ups when a reliable Scheduler or worker is available. Otherwise, prefer **synchronous** delivery. Background mode improves responsiveness but not durability.

[Configure SMTP](/en/guide/mail) · [Ubuntu queue setup](/en/guide/vds)
