---
title: "Connect Yandex ID — KaevCMS"
description: "Simple setup guide for Yandex ID player sign-in."
---

# Connect Yandex ID

<SocialProviderIcon name="yandex" :size="48" />

The website administrator performs these steps once.

## Setup steps

1. Register a user login app at [Yandex OAuth](https://oauth.yandex.ru/).
2. Add the exact **Redirect URI** shown in KaevCMS and select **`login:email`** and **`login:info`** permissions.
3. Enter **Client ID** and **Client Secret** in KaevCMS, save, and enable sign-in.

::: tip Where is the Callback URL?
Under **Administration → Settings → Registration → Social sign-in → Yandex ID**, click **Copy** beside the displayed callback URL. Register it unchanged. Production needs HTTPS. **Save credentials and enable sign-in separately.**
:::

## Player experience

Once enabled, Yandex ID appears among the available sign-in methods. Existing CMS users should sign in normally first, then open **Account → Security** to link the provider. **Matching emails never link accounts automatically.**

::: warning
Newly registering players must verify their email through KaevCMS, even when using a Yandex email address.
:::

If sign-in fails, check Client ID, the secret where required, the exact callback URL and app permissions. Make sure mail delivery and new account registration are configured as needed.

[Yandex ID developer dashboard](https://oauth.yandex.ru/) · [All social sign-in providers](/en/guide/social-auth).
