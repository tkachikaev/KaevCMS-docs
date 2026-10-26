---
title: How to add a custom language pack
description: Install your own KaevCMS interface translations step by step.
---

# How to add a custom language pack

You can add **German, French, Spanish** or another language to KaevCMS. A basic language pack requires no CMS core edits or database migrations.

This example adds **German (`de`)**. Replace `de` with your locale code for a different language.

## 1. Prepare the files

Open the `lang` folder in your KaevCMS installation. It sits **next to `app`, `config` and `public`**, not inside `public`.

Create:

```text
KaevCMS/
└── lang/
    ├── en.json
    ├── ru.json
    ├── de.json             ← interface translations
    └── de/
        └── language.php    ← language description
```

Keep all existing files intact.

## 2. Create the language description

Create **`lang/de/language.php`**:

```php
<?php

return [
    'code' => 'de',
    'name' => 'German',
    'native_name' => 'Deutsch',
    'direction' => 'ltr',
    'fallback' => 'en',
    'author' => 'Your name',
];
```

- `code` must match the directory name (`de`).
- `name` identifies the language in English; `native_name` is its name in that language.
- `direction` is `ltr` (left-to-right) or `rtl` (right-to-left).
- `author` identifies the translator.
- `fallback` is pack metadata. The **actual site fallback language is selected in administration**.

Language codes may have two or three letters, or a region suffix such as `pt-BR`. The directory, JSON filename and metadata code must match.

## 3. Translate the interface

Create **`lang/de.json`**. A minimal example:

```json
{
  "Home": "Startseite",
  "News": "Neuigkeiten",
  "Sign in": "Anmelden",
  "Save changes": "Änderungen speichern"
}
```

The left-hand text is the **translation key**. **Keep keys unchanged** and translate the values on the right.

For a complete interface translation, copy **`lang/en.json`** to **`lang/de.json`** and translate its values.

Save as valid **UTF-8 JSON**. Preserve placeholders such as `:name`, `:count`, and pluralization separators like `|`: they are used when messages are rendered.

::: tip
You can start with only a few translated entries. Missing entries use the configured fallback language, so you can enable the pack before finishing everything.
:::

## 4. Upload the pack to the server

Place the `lang/de/` directory and `lang/de.json` file **under your application's `lang` directory** using a hosting file manager, SFTP or normal file deployment.

::: warning Security
`language.php` is an **executable PHP file**. Only install trusted, reviewed language packs. Never expose the language pack directory through the public document root.
:::

## 5. Enable the language

1. Open **Administration → Settings → Languages**.
2. You should see **Deutsch (de)** labeled as a language pack.
3. **Enable** the new language.
4. Optionally choose it as the **default site language**. Keep English or Russian enabled as the **fallback language** while translations are incomplete.
5. Click **Save language settings**.

German will then appear in the site's language selector. If it does not appear, verify file paths, matching locale codes and valid `language.php` metadata.

## 6. Translate remaining areas

The initial two files handle **general interface strings**. Some additional areas use separate resources:

| Area | Where translations live |
| --- | --- |
| Additional CMS labels | For example, `lang/en/drivers.php`, `lang/en/audit.php`, `lang/en/rewards.php`. You can add corresponding files under `lang/de/`. |
| Modules | Their own language directories, e.g. `modules/donations/lang/en/messages.php`; for German use `modules/donations/lang/de/messages.php`. Module names/descriptions can also reside in `module.json`. |
| News, pages and site settings | Add or edit localized content **through administration**. |
| Mail templates | Edit templates for the selected language under **Mail settings**. |

For PHP dictionaries, **retain the translation-key structure** and change only the values. Only use trusted PHP translation files. Keep backups of your custom files when upgrading KaevCMS.

::: info Translation coverage
The percentage shown on the Languages settings page compares **keys in `de.json` with `en.json` only**. Even 100% does not guarantee complete translations of modules, mail templates or content.
:::

[Language settings](/en/guide/languages) · [Documentation overview](/en/guide/)
