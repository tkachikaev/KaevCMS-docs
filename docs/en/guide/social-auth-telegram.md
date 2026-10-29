---
title: "Connect Telegram — KaevCMS"
description: "Simple setup guide for Telegram player sign-in."
---

# Connect Telegram

<SocialProviderIcon name="telegram" :size="48" />

The website administrator performs these steps once.

## Setup steps

1. Create a bot with [@BotFather](https://t.me/BotFather) and open its **Login Widget** settings.
2. Under **Allowed URLs**, register your website origin, e.g. `https://your-domain`, and the **full KaevCMS callback URL**. Choose **RS256** signing.
3. Enter the **Client ID** and **Client Secret** provided by BotFather in KaevCMS and save.

::: tip Where is the Callback URL?
Under **Administration → Settings → Registration → Social sign-in → Telegram**, click **Copy** beside the displayed callback URL. Register it unchanged. Production needs HTTPS. **Save credentials and enable sign-in separately.**
:::

## Player experience

Once enabled, Telegram appears among the available sign-in methods. Existing CMS users should sign in normally first, then open **Account → Security** to link the provider. **Matching emails never link accounts automatically.**

::: warning
**Current `Social-Auth` branch limitation:** Telegram cannot be enabled until an approved JWT/JWKS verification library is installed. Credentials alone are insufficient. Telegram OIDC does not return an email, so players must provide and verify one in KaevCMS. This is OIDC, not the legacy iframe login widget.
:::

If sign-in fails, check Client ID, the secret where required, the exact callback URL and app permissions. Make sure mail delivery and new account registration are configured as needed.

[Telegram developer dashboard](https://t.me/BotFather) · [All social sign-in providers](/en/guide/social-auth).
