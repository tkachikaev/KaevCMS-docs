# Troubleshooting

Common checks for published KaevCMS releases. Confirm that the advice applies to your exact CMS version.

## HTTP 500 after deployment

Verify PHP (at least 8.3 for the documented releases), vendor dependencies, .env, directory permissions and Document Root.

~~~bash
php -v
cd /var/www/kaevcms
composer check-platform-reqs --no-dev
php artisan optimize:clear
~~~

Keep the application logs private; do not paste complete Laravel traces publicly.

## 419 Page Expired when signing in

A site URL, scheme or session-cookie mismatch can cause this after moving domains.

For HTTPS production:

~~~dotenv
APP_URL=https://example.com
APP_FORCE_HTTPS=true
SESSION_SECURE_COOKIE=true
~~~

For an isolated HTTP test deployment, the last two values may be false. Then clear the cache and old browser cookies:

~~~bash
php artisan optimize:clear
~~~

## Installer returns 404

Make sure a **full release** is deployed with the correct public directory. The installer exists before installation and is removed after successful setup. It should not be restored on an installed site.

## 403 errors or image uploads fail

Verify storage, bootstrap/cache and public/uploads permissions and PHP-FPM user rights. Never use chmod -R 777 as a workaround.

## Game database connection fails

Check database host, port, name, user, firewall rules and network connectivity from the **CMS server**. Run the external database diagnostics and verify the selected driver and required tables. An open game-server port does not prove that MySQL is accessible.

## Email is not delivered

Check SMTP host, port, encryption and sender address. Send a test message. For queued mail, also check the worker and scheduler.

## Update package is rejected

Check the installed version, target deployment type, manifest compatibility, checksum and available storage. Do not disable update validation.

## Update stuck or website left in maintenance mode

On a VDS, if an update is interrupted or the Update Agent request gets stuck, use **[the `kaevcms:update-recover` command](/en/guide/updates#if-an-update-gets-stuck-kaevcms-update-recover)**. It detects the situation and offers verified-backup recovery, cancellation of a request that never started, or lifting leftover maintenance mode. Run it **over SSH as the project owner**, only when the installed version includes [change `c443b62`](https://github.com/tkachikaev/KaevCMS/commit/c443b62).

## Need more help?

Open a [GitHub Issue](https://github.com/tkachikaev/KaevCMS/issues) with the CMS version, environment, reproduction steps, expected result and **redacted** error details.

[Upstream operations manual](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/OPERATIONS.md) · [Security](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/SECURITY.md)

