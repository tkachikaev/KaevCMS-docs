---
title: "Mail — delivery modes"
description: "Compare synchronous, background and database-queued mail delivery, including speed, reliability, server load and setup."
---

# Three mail delivery modes

All three modes use the **same SMTP connection** configured on the [Mail page](/en/guide/mail). They differ in how automatic account messages, such as verification or password reset, are processed.

## Compare the modes

| Capability | Synchronous | Asynchronous (background) | Asynchronous with database |
| --- | --- | --- | --- |
| When the player receives a response | After the SMTP attempt | Before the mail is sent | After the database job is queued |
| Page response speed | Slower; depends on SMTP | Usually fast | Usually fast |
| When mail processing starts | During the request | Just after the response, if the process starts | As the queue is processed |
| Web request load | Higher; waits for SMTP | Less waiting, but uses a server background process | Small DB write; another process handles SMTP |
| Pending job survives restart | No | No | Yes, when persisted to DB |
| Automatic retry on SMTP failure | No | No | Yes, within limits |
| Risk of losing unsent mail | Attempt fails immediately | Higher if child process fails | Lower with a working DB/processor; not zero |
| Permanent worker required | No | No | Optional if Scheduler runs |
| Cron / Scheduler required for mail | No | No | Yes if there is no permanent worker |
| Bulk signups | Poor: requests wait | Faster responses, less reliable | Better with a functioning queue |
| Requirements | SMTP | SMTP and successful capability check | SMTP, Scheduler or worker, successful capability check |

::: info Performance
This is a **qualitative comparison**, not a guaranteed messages-per-second benchmark. Real throughput depends on SMTP, network, hosting and queue workload. No mode guarantees inbox placement.
:::

## Mode 1. Synchronous

**How it works:** the player requests verification or password reset; KaevCMS contacts SMTP within that request, and the player waits for the attempt to finish.

**Requirements:** configure SMTP and send a test message. No extra mail background services are needed.

**Strength:** simplest setup, failures can be reported right away. **Limitations:** a slow SMTP server delays the web request; there is no persistent queue or automatic retry.

**Best for:** small sites with few emails or constrained hosting.

## Mode 2. Asynchronous (background)

**How it works:** KaevCMS returns the web response and runs the email job in a separate PHP process using Laravel Background Queue.

**Requirements:** working SMTP and hosting that allows background child processes. Select this mode on **Mail → Delivery**. KaevCMS runs a **capability check** on first use and enables the mode only after it passes.

**Strengths:** fast page response, no permanent worker or mail cron job required. **Limitations:** the job is not stored in a durable database queue. If the background process cannot run or the server restarts, **mail can be lost**, and it is not retried automatically. It still consumes server resources after the response.

**Best for:** responsive sites when a DB queue cannot be operated; a trade-off for critical emails.

## Mode 3. Asynchronous with database queue

**How it works:** a job is saved in the queue table and processed separately through SMTP. Jobs that have not completed can survive a web-server restart.

**Requirements:** SMTP, queue tables and **at least one working processor**:

- **Shared hosting:** set up a cron job to run `php artisan schedule:run` **every minute**. Laravel Scheduler then runs `kaevcms:queue-drain` for pending jobs. By default, a drain has budgets of up to **100 jobs and 50 seconds**; this is a processing limit, not a guarantee of 100 delivered messages.
- **VPS:** use the same cron approach or run a permanent **queue worker** for faster processing. See [Scheduler](/en/guide/vds#13-configure-the-scheduler) and [worker setup](/en/guide/vds#14-queue-worker-for-asynchronous-mail). The worker should process `mail-probe,mail,default`.

Once processing is configured, select database mode under **Mail → Delivery**. KaevCMS must see its test job processed successfully **before activating** the mode.

**Strengths:** requests do not wait for SMTP, and temporary delivery errors trigger retries. **Limitations:** the processor must keep running. If cron or the worker stops, queued mail **waits** rather than being delivered.

**Best for:** busy sites, player signups and password recovery, provided queue processing is monitored.

## When SMTP fails

For **database-queued** mail KaevCMS implements:

- Up to **5 actual delivery exceptions** within an approximately **30-minute retry window**.
- Retry backoffs of **1, 3, 5 and 10 minutes**.
- A **10-second SMTP timeout**.
- A shared **60-second mail queue pause** after a mail transport failure, without consuming every waiting message's attempt count.

Jobs that exhaust retry limits appear under **Administration → System → Queues**, where they can be retried after fixing the problem. An old password reset token may have expired; requesting a fresh link is safer.

::: warning
**Database queues reduce risk, but do not eliminate it.** A working database, processor and SMTP connection are still essential. Acceptance by SMTP also does not guarantee inbox delivery.
:::

## Checks and troubleshooting

1. Send an SMTP test email using the **Connection** tab.
2. On **Delivery**, use **Check mode**. This check **does not send email**; it verifies the selected job-processing mechanism.
3. For database mode, check **System → Queues** for pending/failed jobs and retry controls. A permanent worker may need restarting after SMTP configuration changes.
4. Ensure `APP_URL` matches your public URL to keep links in emails correct.

::: tip Which messages use the selected mode?
**SMTP tests, template tests and manually composed admin emails** are sent directly. The selected delivery mode applies to automatic account notifications, not every mail action in administration.
:::

[Back to Mail setup](/en/guide/mail) · [VPS setup guide](/en/guide/vds)
