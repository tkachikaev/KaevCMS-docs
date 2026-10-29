---
title: "Connect VK ID — KaevCMS"
description: "Simple setup guide for VK ID player sign-in."
---

# Connect VK ID

<SocialProviderIcon name="vk" :size="48" />

The website administrator performs these steps once.

## Setup steps

1. Create a web application using the [new VK ID platform](https://id.vk.ru/), not legacy VK OAuth.
2. Add the exact KaevCMS **Redirect URI** and grant the **`email`** permission.
3. Enter the **Application ID** in KaevCMS. **No Client Secret is required.** Save and enable sign-in.

::: tip Where is the Callback URL?
Under **Administration → Settings → Registration → Social sign-in → VK ID**, click **Copy** beside the displayed callback URL. Register it unchanged. Production needs HTTPS. **Save credentials and enable sign-in separately.**
:::

## Player experience

Once enabled, VK ID appears among the available sign-in methods. Existing CMS users should sign in normally first, then open **Account → Security** to link the provider. **Matching emails never link accounts automatically.**

::: warning
KaevCMS always sends an email confirmation for new VK ID sign-ups. The standard PKCE flow does not support VK ID apps that require a `service_token`.
:::

If sign-in fails, check Client ID, the secret where required, the exact callback URL and app permissions. Make sure mail delivery and new account registration are configured as needed.

[VK ID developer dashboard](https://id.vk.ru/) · [All social sign-in providers](/en/guide/social-auth).
