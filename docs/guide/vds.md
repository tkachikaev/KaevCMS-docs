# Установка на Ubuntu / VDS

Это сокращённая практическая схема для сервера с **Ubuntu 24.04 LTS**, nginx и PHP 8.3. Подробные настройки прав, фоновых служб и update-agent читайте в [основном руководстве VDS](https://github.com/tkachikaev/KaevCMS/blob/main/docs/ru/VDS_UBUNTU.md). Для других версий Ubuntu проверьте доступность PHP и совместимость релиза.

::: danger Перед началом
Сохраните рабочий SSH-доступ, прежде чем включать firewall. Не запускайте команды без понимания путей и последствий для существующих сайтов.
:::

## 1. Установите зависимости

~~~bash
sudo apt update
sudo apt install -y nginx mysql-server unzip composer \
  php8.3-cli php8.3-fpm php8.3-mysql php8.3-mbstring \
  php8.3-xml php8.3-curl php8.3-zip php8.3-intl php8.3-gd
php -v
composer --version
~~~

## 2. Создайте отдельную базу

Выполните sudo mysql и создайте базу с **отдельным** пользователем. Замените пример пароля на собственный случайный пароль.

~~~sql
CREATE DATABASE kaevcms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'kaevcms_user'@'localhost' IDENTIFIED BY 'REPLACE_WITH_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON kaevcms_db.* TO 'kaevcms_user'@'localhost';
FLUSH PRIVILEGES;
~~~

В мастере установки используйте базу kaevcms_db и пользователя kaevcms_user. Порт MySQL не требуется открывать в интернет.

## 3. Разместите полный релиз

Передайте на VDS **полный ZIP-релиз**, распакуйте его в закрытый каталог, например:

~~~text
/var/www/kaevcms/
├── app/
├── bootstrap/
├── public/       ← Document Root
├── storage/
├── artisan
└── .env          ← создаётся установщиком
~~~

Проверьте, что файл artisan лежит непосредственно в корне. Затем установите production-зависимости:

~~~bash
cd /var/www/kaevcms
composer install --no-dev --optimize-autoloader --no-interaction
composer check-platform-reqs --no-dev
~~~

Владелец исходников и пользователь PHP-FPM не должны иметь одинаковые права на весь проект. Права записи нужны только runtime-каталогам; конкретные команды и root-owned вариант см. в [расширенном руководстве](https://github.com/tkachikaev/KaevCMS/blob/main/docs/ru/VDS_UBUNTU.md).

## 4. Настройте nginx

В конфигурации сайта укажите:

~~~nginx
root /var/www/kaevcms/public;
index index.php;
~~~

Также нужно настроить передачу запросов к **index.php** и **install/index.php** в PHP-FPM, блокировать прочие PHP-файлы в uploads и скрытые файлы. **Это не полная конфигурация nginx** — безопасный готовый пример смотрите в [VDS-инструкции](https://github.com/tkachikaev/KaevCMS/blob/main/docs/ru/VDS_UBUNTU.md).

После правок:

~~~bash
sudo nginx -t
sudo systemctl reload nginx
~~~

## 5. Настройте HTTPS и Web Installer

После настройки DNS получите TLS-сертификат (например, через Certbot). Перейдите в браузере:

~~~text
https://example.com/install/
~~~

Заполните параметры CMS и базы. После установки убедитесь, что публичный каталог install удалён, и проверьте запись runtime-каталогов.

## 6. Эксплуатация

Для production необходимы резервные копии, запуск планировщика, при использовании асинхронной почты — worker, а также проверка обновлений и журналов.

[Планировщик и очереди](https://github.com/tkachikaev/KaevCMS/blob/main/docs/ru/MAIL_AND_QUEUES.md) · [Безопасность](https://github.com/tkachikaev/KaevCMS/blob/main/docs/ru/SECURITY.md)

