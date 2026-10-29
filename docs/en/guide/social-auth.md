---
title: "Social sign-in — KaevCMS"
description: "Set up Google, Yandex ID, VK ID, Telegram, Discord and Facebook login for KaevCMS."
---

# Social sign-in

Administrators decide which external services players can use to sign in to their KaevCMS website accounts. Regular username/password login remains available.

::: info CMS version
This feature is implemented in the application's [Social-Auth branch](https://github.com/tkachikaev/KaevCMS/tree/Social-Auth). If your installed build has no Social sign-in section, the feature is not yet available in that version.
:::

## Before configuring

1. Check that production uses the correct **HTTPS `APP_URL`**.
2. [Set up outgoing email](/en/guide/mail) and send a test message; email verification is needed for many social sign-ups.
3. Open **Administration → Settings → Registration → Social sign-in**.

## Enable a provider

1. Click **Configure** beside the provider, then open **Open provider console**.
2. Create an app at the provider and register the exact **Redirect / Callback URL** shown in KaevCMS. Use **Copy**; do not invent a URL.
3. Enter **Client ID / App ID** and **Client Secret** when required. Click **Save provider settings**.
4. Separately turn on **Enable sign-in** and try signing in with a test account.

::: tip
**Saving credentials does not enable sign-in.** Changing Client ID disables the provider until you enable it again. Secrets are encrypted; an empty secret field keeps the saved value.
:::

## Provider guides

| Provider | Required credentials | Instructions |
| --- | --- | --- |
| <SocialProviderIcon name="google" :size="26" /> **Google** | Client ID and Client Secret | [Setup guide](/en/guide/social-auth-google) |
| <SocialProviderIcon name="yandex" :size="26" /> **Yandex ID** | Client ID and Client Secret | [Setup guide](/en/guide/social-auth-yandex) |
| <SocialProviderIcon name="vk" :size="26" /> **VK ID** | Application ID; no Client Secret | [Setup guide](/en/guide/social-auth-vk) |
| <SocialProviderIcon name="telegram" :size="26" /> **Telegram** | Client ID and Client Secret from BotFather | [Setup guide](/en/guide/social-auth-telegram) |
| <SocialProviderIcon name="discord" :size="26" /> **Discord** | Client ID and Client Secret | [Setup guide](/en/guide/social-auth-discord) |
| <SocialProviderIcon name="facebook" :size="26" /> **Facebook** | App ID and App Secret | [Setup guide](/en/guide/social-auth-facebook) |

::: warning Telegram
In the current branch, Telegram cannot be enabled until a verified JWT/JWKS library is approved and installed. KaevCMS displays this limitation in the administration panel.
:::

## Signing in and linking accounts

- **New player:** chooses an enabled provider at login, confirms an email if prompted, and selects a website username.
- **Existing player:** signs in normally, then opens **Account → Security** and uses **Link** after confirming their identity.
- **Matching email addresses never merge existing accounts automatically.** One external identity cannot be linked to two CMS users.
- Disabling a provider hides its sign-in option but **keeps the link**. **Resetting a CMS password by email revokes previous sessions and removes all social links**; providers can be linked again afterward.
- Social sign-in applies to **website user accounts**, not administrator login or Lineage II game accounts.

## Troubleshooting

Verify that the provider callback URL matches the one displayed in KaevCMS exactly, that HTTPS is active, and that the provider is enabled. Creating new accounts also requires website registration and working mail delivery. If an email already belongs to a CMS account, sign in normally or reset its password, then link the provider in Security.

[Administration](/en/guide/administration) · [Mail setup](/en/guide/mail).
