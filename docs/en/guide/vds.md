# Ubuntu / VPS installation

This is a condensed guide for **Ubuntu 24.04 LTS**, nginx and PHP 8.3. Use the [full VPS installation guide](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/VDS_UBUNTU.md) for complete nginx rules, permissions, background services and update-agent setup. On other OS versions, verify the release requirements first.

::: danger
Keep SSH access working when configuring the firewall. Do not blindly apply permissions or nginx changes to an existing multi-site host.
:::

## 1. Install dependencies

~~~bash
sudo apt update
sudo apt install -y nginx mysql-server unzip composer \
  php8.3-cli php8.3-fpm php8.3-mysql php8.3-mbstring \
  php8.3-xml php8.3-curl php8.3-zip php8.3-intl php8.3-gd
php -v
composer --version
~~~

## 2. Create the CMS database

Run sudo mysql, then execute the statements below. Replace the placeholder with a strong unique password.

~~~sql
CREATE DATABASE kaevcms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'kaevcms_user'@'localhost' IDENTIFIED BY 'REPLACE_WITH_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON kaevcms_db.* TO 'kaevcms_user'@'localhost';
FLUSH PRIVILEGES;
~~~

Do not expose port 3306 to the internet for a local CMS database.

## 3. Deploy the full release

Place the full release outside the public web root. The directory layout should resemble:

~~~text
/var/www/kaevcms/
├── app/
├── bootstrap/
├── public/      ← Document Root
├── storage/
└── artisan
~~~

With the appropriate project owner and directory permissions, install production dependencies:

~~~bash
cd /var/www/kaevcms
composer install --no-dev --optimize-autoloader --no-interaction
composer check-platform-reqs --no-dev
~~~

The PHP-FPM user must not have write access to the entire source tree. For safe permissions (including root-owned deployments), follow the [full guide](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/VDS_UBUNTU.md).

## 4. Configure nginx

The Document Root must point to the public folder:

~~~nginx
root /var/www/kaevcms/public;
index index.php;
~~~

You must also correctly configure **index.php** and **install/index.php** with PHP-FPM, deny other PHP execution and protect uploads and private files. **This is not a complete nginx config.** Copy the safe example from the [upstream guide](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/VDS_UBUNTU.md).

~~~bash
sudo nginx -t
sudo systemctl reload nginx
~~~

## 5. HTTPS and installer

Set up DNS and TLS (for example with Certbot) and visit:

~~~text
https://example.com/install/
~~~

Complete the installer and confirm the public installer directory is removed.

## 6. Operations

Use regular backups, scheduler monitoring and an appropriate worker for queued email.

[Mail and queues](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/MAIL_AND_QUEUES.md) · [Security](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/SECURITY.md)

