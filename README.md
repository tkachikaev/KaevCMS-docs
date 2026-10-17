# KaevCMS Documentation

Official bilingual (Russian / English) website and documentation for [KaevCMS](https://github.com/tkachikaev/KaevCMS), the open-source CMS for Lineage II servers.

**Site:** https://tkachikaev.github.io/KaevCMS-docs/ (after enabling GitHub Pages)

This repository contains the documentation website only, not the CMS source code. Content is based on the published KaevCMS repository; always check the release notes for version-specific behavior.

## Tech stack

- VitePress 1.6.4
- GitHub Pages
- GitHub Actions
- Markdown content, RU/EN

## Local development

Requires Node.js 20 or later.

~~~bash
npm install
npm run docs:dev
npm run docs:build
~~~

## Publishing

Set **Settings → Pages → Build and deployment → Source → GitHub Actions**. Pushes to `main` run the deployment workflow.

## Content organization

- `docs/index.md`: Russian homepage
- `docs/en/index.md`: English homepage
- `docs/guide/`: Russian articles
- `docs/en/guide/`: English articles
- `docs/.vitepress/`: site configuration and design

When adding a feature article, update both language versions and their sidebar entries. Verify that steps match a **published** KaevCMS release. Do not publish credentials, application keys, real database details, or private diagnostic archives.

## Sources

- [KaevCMS repository](https://github.com/tkachikaev/KaevCMS)
- [KaevCMS Russian technical documentation](https://github.com/tkachikaev/KaevCMS/tree/main/docs/ru)
- [KaevCMS English technical documentation](https://github.com/tkachikaev/KaevCMS/tree/main/docs/en)
- [Releases](https://github.com/tkachikaev/KaevCMS/releases)
- [Issues](https://github.com/tkachikaev/KaevCMS/issues)
