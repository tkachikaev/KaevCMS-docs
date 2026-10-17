# Administration and modules

## First configuration

Review site identity, enabled languages, public and account themes, APP_URL, SMTP and game-server settings. Production instances should use HTTPS with APP_DEBUG=false.

KaevCMS contains functionality for:

- multilingual news and pages;
- navigation and theme management;
- player accounts and characters;
- administrator roles and auditing;
- optional modules and their migration lifecycle;
- notifications, system information and safe diagnostics.

Available sections depend on the installed release and current admin permissions.

## Modules

The published repository contains **Daily Rewards**, an optional monthly rewards calendar. It is disabled after a clean installation and can be enabled by the owner. Calendars are scoped to servers and months and track per-game-account claims.

Install extension packages only from trusted sources and keep backups before module updates or migrations.

## Diagnostics

The administrator panel provides runtime and external database checks, queue and scheduler status and a downloadable diagnostic package. Check any report for confidential data before sharing it.

[Administration](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/ADMINISTRATION.md) · [Modules](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/MODULES.md) · [Daily Rewards](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/DAILY_REWARDS.md)

