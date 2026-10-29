---
title: "Connect Google — KaevCMS"
description: "Simple setup guide for Google player sign-in."
---

# Connect Google

<SocialProviderIcon name="google" :size="48" />

The website administrator performs these steps once.

## Setup steps

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and set up the OAuth consent screen.
2. Create an OAuth client of type **Web application**. Paste the exact KaevCMS callback into **Authorized redirect URIs**.
3. Enter the **Client ID** and **Client Secret** in KaevCMS, save and enable sign-in separately.

::: tip Where is the Callback URL?
Under **Administration → Settings → Registration → Social sign-in → Google**, click **Copy** beside the displayed callback URL. Register it unchanged. Production needs HTTPS. **Save credentials and enable sign-in separately.**
:::

## Player experience

Once enabled, Google appears among the available sign-in methods. Existing CMS users should sign in normally first, then open **Account → Security** to link the provider. **Matching emails never link accounts automatically.**

::: warning
Only `openid`, `email` and `profile` are requested. Non-Gmail/non-eligible Workspace emails require an extra KaevCMS confirmation email. If the Google app is in testing mode, add test users.
:::

If sign-in fails, check Client ID, the secret where required, the exact callback URL and app permissions. Make sure mail delivery and new account registration are configured as needed.

[Google developer dashboard](https://console.cloud.google.com/apis/credentials) · [All social sign-in providers](/en/guide/social-auth).
