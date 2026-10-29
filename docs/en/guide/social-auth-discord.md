---
title: "Connect Discord — KaevCMS"
description: "Simple setup guide for Discord player sign-in."
---

# Connect Discord

<SocialProviderIcon name="discord" :size="48" />

The website administrator performs these steps once.

## Setup steps

1. Create a **New Application** in the [Discord Developer Portal](https://discord.com/developers/applications).
2. Under **OAuth2 → Redirects**, add the exact callback URL copied from KaevCMS.
3. Enter **Client ID** and **Client Secret** in KaevCMS, save and enable sign-in. **A Discord bot is not required.**

::: tip Where is the Callback URL?
Under **Administration → Settings → Registration → Social sign-in → Discord**, click **Copy** beside the displayed callback URL. Register it unchanged. Production needs HTTPS. **Save credentials and enable sign-in separately.**
:::

## Player experience

Once enabled, Discord appears among the available sign-in methods. Existing CMS users should sign in normally first, then open **Account → Security** to link the provider. **Matching emails never link accounts automatically.**

::: warning
KaevCMS only requests `identify` and `email`, not guild or bot access. For new accounts, even an email verified by Discord must be confirmed via KaevCMS email.
:::

If sign-in fails, check Client ID, the secret where required, the exact callback URL and app permissions. Make sure mail delivery and new account registration are configured as needed.

[Discord developer dashboard](https://discord.com/developers/applications) · [All social sign-in providers](/en/guide/social-auth).
