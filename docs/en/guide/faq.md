# Frequently asked questions

## Is KaevCMS free?

Yes. Its source code is available under the MIT license. [Read the license](https://github.com/tkachikaev/KaevCMS/blob/main/LICENSE).

## Where can I download it?

Use [official GitHub releases](https://github.com/tkachikaev/KaevCMS/releases). Choose a **full** package for your environment.

## Does it work on shared hosting?

Yes, where the hosting platform meets the PHP/MySQL and directory-layout requirements. A split package is available for providers with fixed Document Root paths. [Read the guide](/en/guide/shared-hosting).

## Which Lineage II chronicles are supported?

Driver compatibility depends on the actual LoginServer/GameServer schema. See [Game server integration](/en/guide/game-servers).

## Do I need Java or the game server on the website host?

No. The CMS connects to game databases over separate connections. Game-side components, where required, are operated separately by the server owner.

## Can I upgrade without reinstalling?

Yes, using an update package whose manifest explicitly supports your installed version. [Update procedure](/en/guide/updates).

## Does KaevCMS support payments?

Payment providers may be under development. **Do not assume a provider is production-ready** until its full safe payment workflow is verified and included in an official release.

## Where can I report an issue?

Use [GitHub Issues](https://github.com/tkachikaev/KaevCMS/issues). Never share secrets or unredacted database dumps.

