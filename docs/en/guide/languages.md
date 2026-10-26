---
title: Languages in KaevCMS
description: Configure interface languages for the website, player area and administration.
---

# Languages in KaevCMS

KaevCMS includes **Russian and English** by default. Administrators can enable installed languages, choose the site's default language and install their own translations.

Players and administrators can switch the interface language. The selector displays only languages that are **enabled**.

## Configure languages

Open **Administration → Settings → Languages**.

| Setting | Purpose |
| --- | --- |
| **Installed languages** | Language packs found on the server. Enable those visitors may use. |
| **Default site language** | Used for new visitors who have not selected a language. |
| **Fallback language** | Used when translations for the selected language are unavailable. |

Click **Save language settings**. Default and fallback languages must both be **enabled**, and at least one language must remain active.

Language preferences are remembered for visitors; an administrator's interface language selection is separate from the public visitor's selection.

## Add another language

Additional packs **do not require CMS source-code changes or database migrations**. Begin by adding a language description file and a JSON translation file under `lang`. The pack then appears in administration, where you can enable it.

**[Step-by-step: create a custom language pack →](/en/guide/language-pack)**

::: info
The admin panel currently **discovers and enables installed packs**, but it does not upload language files. Use the hosting file manager, SFTP or another normal file deployment method to place the pack on the server.
:::

## What is translated?

| Area | How localization works |
| --- | --- |
| **CMS interface** | Buttons, menus and labels come from language files. |
| **Player area and administration** | Use the selected language; missing text may fall back to another enabled language. |
| **News and pages** | Each content translation is entered separately in the CMS editor. |
| **Site name and other localized settings** | Can have values configured per language. |
| **Email templates** | Can be edited for an additional language under Mail settings. |
| **Modules** | Some module strings live in separate module-specific translation files. |

The **translation coverage percentage** in admin compares the main JSON keys with English. It does not measure content, module translations, mail templates or all additional PHP translation files.

[Create a language pack](/en/guide/language-pack) · [Administration](/en/guide/administration)
