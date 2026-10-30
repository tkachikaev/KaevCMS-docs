---
title: "Connect Telegram — KaevCMS"
description: "Step-by-step Telegram OIDC sign-in setup with BotFather."
---

# Connect Telegram

<SocialProviderIcon name="telegram" :size="48" />

Players can sign in to your website with Telegram. You need a bot and the **Client ID / Client Secret** issued by BotFather.

## 1. Create a bot

1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send **`/newbot`**, choose a display name and a unique username ending in `bot`. If you already have a bot, use **`/mybots`**.
3. Open the **BotFather mini app** using **Open App**, then select your bot.
4. Find **Login Widget / Web Login**. These are the new Telegram OIDC settings, **not** the **Domain** button in the regular Bot Settings chat menu.

::: tip
The **HTTP API Token** you receive when creating the bot is **not the Client Secret** used for website sign-in. Do not enter the bot API token into KaevCMS social sign-in settings or share it publicly.
:::

## 2. Register your website URLs

1. In KaevCMS administration, open **Settings → Registration → Social sign-in → Telegram → Configure**.
2. Use **Copy** next to **Redirect / Callback URL**.
3. In the BotFather mini app, under **Login Widget / Web Login**, add these **Allowed URLs**:
   - **Website origin:** `https://example.com`
   - **Callback URL:** `https://example.com/auth/social/telegram/callback`
4. Replace the examples with **your domain and the exact callback URL copied from KaevCMS**. Choose **RS256** signing (normally the default).

::: warning
Both URLs must be registered with Telegram. Production needs a correct HTTPS **`APP_URL`**. Even a small mismatch in the callback URL can prevent sign-in.
:::

## 3. Enable Telegram in KaevCMS

1. Copy the **Client ID** and **Client Secret** shown under **Login Widget / Web Login**.
2. Enter them into the matching Telegram fields in KaevCMS.
3. Click **Save provider settings**.
4. Separately turn on **Enable sign-in** for Telegram.
5. Sign out and test **Sign in with Telegram** from the login page.

**Done:** after a successful Telegram authorization, the player returns to your KaevCMS website.

## First-time registration and account linking

Telegram does not provide an email address in the KaevCMS OIDC flow. New players therefore **enter an email, confirm it through a KaevCMS message and choose a website username**. Make sure [mail delivery](/en/guide/mail) works.

Existing players should **sign in normally first**, then open **Account → Security** to link Telegram. **Accounts are never merged automatically by email.**

## Troubleshooting

- Check **Allowed URLs**, the exact callback URL, HTTPS and `APP_URL`.
- Use the **Client Secret from Login Widget**, not the bot API token.
- Make sure Telegram is enabled in KaevCMS and **RS256** is selected.
- If KaevCMS reports that **JWT/JWKS** support is missing, update to a CMS build that includes Telegram OIDC support. The current **`Social-Auth`** branch includes **`firebase/php-jwt ^7.2`**. Never bypass token verification.
- New registrations require enabled website registration and working email delivery.

**Links:** [@BotFather](https://t.me/BotFather) · [Official Telegram Login guide](https://core.telegram.org/bots/telegram-login) · [All providers](/en/guide/social-auth).
