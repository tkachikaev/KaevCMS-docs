<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { page } = useData()

// Both locales use the same relative page paths. Preserve the current article,
// rather than sending readers to the homepage when changing languages.
const relativePath = computed(() => page.value.relativePath || 'index.md')
const isEnglish = computed(() => relativePath.value.startsWith('en/'))
const article = computed(() =>
  relativePath.value.replace(/^en\//, '').replace(/index\.md$/, '').replace(/\.md$/, '.html')
)
const ruHref = computed(() => withBase('/' + article.value))
const enHref = computed(() => withBase('/en/' + article.value))
</script>

<template>
  <nav class="kaev-language-switch" aria-label="Выбор языка / Language">
    <a
      :href="ruHref"
      lang="ru"
      hreflang="ru"
      :aria-current="!isEnglish ? 'page' : undefined"
      :aria-label="'Русский'"
    >RU</a>
    <a
      :href="enHref"
      lang="en"
      hreflang="en"
      :aria-current="isEnglish ? 'page' : undefined"
      :aria-label="'English'"
    >EN</a>
  </nav>
</template>

<style scoped>
.kaev-language-switch {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  align-self: center;
  padding: 3px;
  margin: 0 4px;
  height: 38px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 11px;
  background: var(--vp-c-bg-soft);
  white-space: nowrap;
}
.kaev-language-switch a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 30px;
  padding: 0 5px;
  border-radius: 7px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  transition: background-color .15s ease, color .15s ease;
}
.kaev-language-switch a:hover { color: var(--vp-c-brand-1); }
.kaev-language-switch a[aria-current="page"] {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  box-shadow: 0 1px 4px rgba(0,0,0,.10);
}
.kaev-language-switch a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
@media (max-width: 767px) {
  .kaev-language-switch { height: 35px; margin: 0 2px; }
  .kaev-language-switch a { min-width: 30px; height: 27px; }
}
</style>
