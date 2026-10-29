---
title: "Connect Facebook — KaevCMS"
description: "Simple setup guide for Facebook player sign-in."
---

# Connect Facebook

<SocialProviderIcon name="facebook" :size="48" />

The website administrator performs these steps once.

## Setup steps

1. Create an app at [Meta for Developers](https://developers.facebook.com/apps/) and configure **Facebook Login** for your website.
2. Register the exact KaevCMS callback under **Valid OAuth Redirect URIs**.
3. Use **App ID** as the Client ID and **App Secret** as the Client Secret in KaevCMS. For public use, the Meta app must be **Live** with the necessary `email` permission; then enable sign-in in KaevCMS.

::: tip Where is the Callback URL?
Under **Administration → Settings → Registration → Social sign-in → Facebook**, click **Copy** beside the displayed callback URL. Register it unchanged. Production needs HTTPS. **Save credentials and enable sign-in separately.**
:::

## Player experience

Once enabled, Facebook appears among the available sign-in methods. Existing CMS users should sign in normally first, then open **Account → Security** to link the provider. **Matching emails never link accounts automatically.**

::: warning
In Development mode, Facebook sign-in is generally restricted to users assigned app roles. Facebook might omit an email address, so new players must provide and verify one using KaevCMS.
:::

If sign-in fails, check Client ID, the secret where required, the exact callback URL and app permissions. Make sure mail delivery and new account registration are configured as needed.

[Facebook developer dashboard](https://developers.facebook.com/apps/) · [All social sign-in providers](/en/guide/social-auth).
