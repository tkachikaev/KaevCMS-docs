# Quick start

## Prerequisites

Documented releases require:

- **PHP 8.3 or newer**;
- MySQL or MariaDB with a separate empty database;
- PHP extensions: PDO, pdo_mysql, mbstring, fileinfo, DOM, OpenSSL, tokenizer, ctype, JSON and session;
- HTTPS for a production deployment;
- writable storage, bootstrap/cache and public/uploads directories.

Composer installs dependencies where applicable. Prepared split packages are an option for shared hosting.

## Download the correct package

Go to [official releases](https://github.com/tkachikaev/KaevCMS/releases). A fresh installation needs the **full release package** for its target environment, not a cumulative update. Verify SHA-256 checksums when provided.

## Choose deployment method

- [Ubuntu / VPS](/en/guide/vds) — SSH access, nginx and configurable Document Root.
- [Shared hosting](/en/guide/shared-hosting) — fixed public directory such as public_html.

## Run the installer

Open:

~~~text
https://example.com/install/
~~~

The installer checks the environment, the database connection and creates the CMS owner. Confirm that the public install directory is removed after a successful installation.

## Production checklist

1. Sign in as the site owner.
2. Configure [LoginServer and GameServer](/en/guide/game-servers).
3. Configure SMTP and send a test message.
4. Verify scheduler, queue and runtime diagnostics.
5. Confirm HTTPS is enabled and APP_DEBUG is false.

::: warning
Only the public directory may be served by the web server. Never expose .env, vendor, source files, logs or backups.
:::

[Full upstream installation guide](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/INSTALLATION.md)

