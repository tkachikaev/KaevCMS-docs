# Updating KaevCMS

Update workflows depend on your deployment type and the package format. **Do not use an update ZIP as a fresh-install package.**

## Before upgrading

1. Record the installed KaevCMS version.
2. Read [release notes](https://github.com/tkachikaev/KaevCMS/releases).
3. Confirm the supported source-version range in the **package manifest**.
4. Back up application files, CMS database, .env, public/uploads and user data.
5. Test the upgrade in staging if possible.
6. Validate SHA-256 against the published checksum.

## Installing and verifying the VDS Update Agent

This step is required only for starting updates from the administration panel. The agent is not installed automatically and is not required for manual SSH updates.

Run one command:

```bash
cd /var/www/kaevcms
bash deployment/vds/install-update-agent.sh
```

No deployment choice is required. The script automatically:

- requests `sudo` when the current account needs elevated rights;
- detects the project owner;
- detects the PHP-FPM user and group;
- configures the systemd service as the project owner;
- repairs safe application and runtime permissions;
- verifies that PHP-FPM can read the application and write update packages.

When the project is owned by `root`, the agent runs as `root` and prints a warning that the applied package receives full access. When the project is owned by a regular account, the service runs as that account. A separate agent account is not required.

Only non-standard installations need explicit overrides:

```bash
bash deployment/vds/install-update-agent.sh \
    --project-user kaevcms \
    --web-user www-data \
    --web-group www-data
```

`KAEVCMS_DEPLOY_USER`, `KAEVCMS_WEB_USER`, `KAEVCMS_WEB_GROUP`, and `KAEVCMS_PHP_BINARY` remain supported.

The script records numeric UID/GID values, keeps application source read-only for PHP-FPM, creates group-writable runtime paths, and keeps database backups owner-only. The agent opens no network port.

Verify the registration:

```bash
cd /var/www/kaevcms
php artisan kaevcms:update-agent:status
```

Expected output includes `State: ready` and `Ready: yes`. Running the same command again safely refreshes units, registration, and permissions. Agent contract version 3 is expected after this release.

To remove the agent:

```bash
cd /var/www/kaevcms
sudo bash deployment/vds/remove-update-agent.sh
```

Removal is blocked while a queued update request remains in the agent directory.

## Updating KaevCMS on Ubuntu / VPS

### Updating from the administration panel

For the first upgrade from a release older than `0.47.0`, use the manual CLI Updater because older releases do not contain the agent. After installing `0.47.0`, install the agent once and future compatible updates can be started from the panel.

This method requires the agent from the “Installing and verifying the VDS Update Agent” section above. When the agent is absent, KaevCMS displays **“VDS update agent is not installed”** with the exact installation command. A ZIP may still be uploaded and verified, but installation remains unavailable until the agent is ready.

1. Open **Settings → System → System updates**.
2. Upload the current cumulative Update ZIP.
3. Review the target version, manifest, SHA256, and preflight checks.
4. Confirm that you trust the archive source. The site owner is responsible for the selected package because an update can replace KaevCMS program files.
5. Enter the current owner password and select **Send to VDS agent**.

The website writes a local request to protected runtime storage. `systemd.path` starts a one-shot agent as the project file owner. The agent verifies the archive and permissions again, backs up application files and the database, enables maintenance mode, applies files and migrations, clears caches, and restarts the queue. Existing automatic rollback is used when installation fails.

The update page refreshes automatically while the request is waiting for the agent. After the agent starts, maintenance mode and the update log record preparation, file replacement, migrations, completion, or failure. Do not remove the ZIP or start another update until the current request finishes.

Agent diagnostics:

```bash
cd /var/www/kaevcms
php artisan kaevcms:update-agent:status --json
sudo journalctl -u 'kaevcms-update-agent-*.service' -n 100 --no-pager
```

If registration is invalid or the units were removed, reinstall them:

```bash
cd /var/www/kaevcms
bash deployment/vds/install-update-agent.sh
```

> Re-run `bash deployment/vds/install-update-agent.sh` after changing the project owner or PHP-FPM group. The installer repairs both the protected Web Update runtime paths and group-readable application files without granting PHP-FPM write access to source code.

### Fallback update through SSH

The manual CLI Updater remains available without the agent. Run it as the SSH/deployment user that owns `/var/www/kaevcms`, never as `www-data`:

```bash
sudo systemctl stop kaevcms-queue
cd /var/www/kaevcms
php artisan kaevcms:update /tmp/KaevCMS-update.zip
sudo systemctl start kaevcms-queue
rm -f /tmp/KaevCMS-update.zip
```

The command displays the manifest, source and target versions, preflight checks, and asks for confirmation. Add `--yes` only for automation after independently verifying the package:

```bash
php artisan kaevcms:update /tmp/KaevCMS-update.zip --yes
```

Intermediate releases do not need to be installed one by one when the package supports the installed-version range.

When a release changes Composer dependencies, deploy the full release and run `composer install` with the supplied `composer.lock`. Never run `composer update` on production.

### If an update gets stuck: `kaevcms:update-recover`

A server reboot, terminated process or VDS Update Agent failure can leave an update unfinished: the website remains in maintenance mode and subsequent updates are blocked. Connect to the server over SSH:

```bash
cd /var/www/kaevcms
owner="$(stat -c '%U' artisan)"
sudo -u "$owner" php artisan kaevcms:update-recover
```

Replace `/var/www/kaevcms` with the actual project directory. The `owner` variable identifies the owner of `artisan`. **Run recovery as the project file owner**, not `www-data`. A root-owned project must be recovered as `root`. Running under a different account is refused.

The command detects the issue and **requests confirmation**:

- **Update interrupted while applying** — restores database and files from a verified update backup, records the previous version, and lifts maintenance mode.
- **Update Agent never started a pending request** — cancels the request and returns its package to the staged state, so it can be restarted or discarded from the admin panel.
- **Nothing is stuck but maintenance mode is still active** — offers to bring the site back online.

If several updates are stuck, it lists their UUIDs without selecting one. Provide the relevant identifier:

```bash
sudo -u "$owner" php artisan kaevcms:update-recover UUID
```

The `--yes` option skips interactive confirmation; use it only for reviewed automation. **Without `--yes`, a non-interactive invocation refuses to act.** If there is no verified backup or rollback fails, the site remains in maintenance mode. Inspect the update logs in `storage/logs` rather than manually bringing the site online after a failed rollback.

::: warning Command availability
This command was introduced in the KaevCMS source code by [commit `c443b62`](https://github.com/tkachikaev/KaevCMS/commit/c443b62) and **is not available in older installed releases**. Check using `php artisan list | grep kaevcms:update-recover`. This procedure is intended for a VDS with SSH access, not shared hosting without a terminal.
:::

[Upstream KaevCMS update documentation](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/UPDATES.md).

### After upgrading: queue worker

Restart the worker after an update:

```bash
sudo -u www-data /usr/bin/php8.3 /var/www/kaevcms/artisan queue:restart
sudo systemctl restart kaevcms-queue
```

## Shared hosting

Supported installations use a cumulative Web Updater from the admin panel. The allowed upgrade range is determined by the **individual package manifest**, not the filename alone.

## After upgrading

Check the running version, pending migrations, runtime diagnostics, public site, player sign-in and game database connectivity. Retain backups until validation is complete.

::: danger
Never post .env, passwords, APP_KEY or database backups in public issues.
:::

