# Shared hosting

KaevCMS supports a **split package** for hosting platforms that cannot point Document Root at the application's public directory.

## Expected layout

~~~text
site-root/
├── kaevcms-core/  ← private application code
└── public_html/    ← web-accessible directory
    ├── index.php
    ├── install/
    └── uploads/
~~~

The name public_html varies by provider. Never extract all CMS source files into the public folder.

## Create a production package

If your release already contains a shared-hosting ZIP, use it. To build from source on Windows:

~~~powershell
.\deployment\windows\build-shared-hosting-package.ps1
~~~

For a custom public directory name:

~~~powershell
.\deployment\windows\build-shared-hosting-package.ps1 `
  -PublicDirectoryName example.hosting.test
~~~

## Install

1. Create a dedicated empty MySQL/MariaDB database and user.
2. Extract the split package into the **parent site directory**, keeping the private core and public directory as siblings.
3. Check that index.php sits directly under the domain Document Root.
4. Configure HTTPS and open /install/.
5. Complete installation and verify that /install/ was removed.

## Upgrades

Shared-hosting deployments use the cumulative Web Updater for supported version ranges. Confirm compatibility in the **specific package manifest** first.

[Full shared-hosting guide](https://github.com/tkachikaev/KaevCMS/blob/main/docs/en/SHARED_HOSTING.md) · [Update guide](/en/guide/updates)

