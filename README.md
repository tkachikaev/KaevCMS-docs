# KaevCMS — official website and docs

The bilingual documentation website for [KaevCMS](https://github.com/tkachikaev/KaevCMS), an MIT-licensed Laravel CMS for Lineage II game server websites.

**Site:** https://tkachikaev.github.io/KaevCMS-docs/ (after GitHub Pages activation).

## Stack

VitePress 1.6.4 · Vue 3 · Markdown · GitHub Actions · GitHub Pages.

## Run locally

Requires Node.js 20+.

~~~bash
npm install
npm run docs:dev
npm run docs:build
npm run docs:preview
~~~

## Deploy

1. Open repository **Settings → Pages**.
2. Set **Build and deployment → Source → GitHub Actions**.
3. Push to the `main` branch or run the workflow manually.
4. Inspect the **Actions** tab for build/deployment status.

The VitePress base path is configured for /KaevCMS-docs/. If the repository name or public domain changes, update `base` and the favicon URL in `docs/.vitepress/config.mjs`.

## Structure

~~~text
docs/
├── index.md                   # Russian homepage
├── guide/                     # Russian articles
├── en/index.md                # English homepage
├── en/guide/                  # English articles
├── .vitepress/config.mjs      # navigation, languages, links, search
├── .vitepress/theme/          # design
└── public/brand/              # SVG mark
~~~

For a new article, add both RU and EN copies and update their corresponding sidebar entries in config.mjs. Check that all claims correspond to **released** KaevCMS behavior. Source code currently used as the initial documentation baseline: 0.47.38. Later functionality must be reviewed against its own release.

## Reference material

- [Upstream Russian docs](https://github.com/tkachikaev/KaevCMS/tree/main/docs/ru)
- [Upstream English docs](https://github.com/tkachikaev/KaevCMS/tree/main/docs/en)
- [Releases](https://github.com/tkachikaev/KaevCMS/releases)
- [Issues](https://github.com/tkachikaev/KaevCMS/issues)

Avoid publishing .env, APP_KEY, actual credentials, private paths, or unredacted logs.

