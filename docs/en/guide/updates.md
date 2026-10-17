# Updating KaevCMS

Update workflows depend on your deployment type and the package format. **Do not use an update ZIP as a fresh-install package.**

## Before upgrading

1. Record the installed KaevCMS version.
2. Read [release notes](https://github.com/tkachikaev/KaevCMS/releases).
3. Confirm the supported source-version range in the **package manifest**.
4. Back up application files, CMS database, .env, public/uploads and user data.
5. Test the upgrade in staging if possible.
6. Validate SHA-256 against the published checksum.

## VPS deployments

KaevCMS provides CLI update workflows and a local VDS Update Agent. Follow the instructions for your installed version, file owner and package. Do not grant the web-server account source-code write access to make updates easier.

[Upstream update documentation](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/UPDATES.md)

## Shared hosting

Supported installations use a cumulative Web Updater from the admin panel. The allowed upgrade range is determined by the **individual package manifest**, not the filename alone.

## After upgrading

Check the running version, pending migrations, runtime diagnostics, public site, player sign-in and game database connectivity. Retain backups until validation is complete.

::: danger
Never post .env, passwords, APP_KEY or database backups in public issues.
:::

