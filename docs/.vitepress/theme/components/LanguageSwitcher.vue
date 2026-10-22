<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import LanguageFlag from './LanguageFlag.vue'

const { page } = useData()
const relativePath = computed(() => page.value.relativePath || 'index.md')
const isEnglish = computed(() => relativePath.value.startsWith('en/'))

// Preserve the current article while switching between the matching RU / EN pages.
const article = computed(() =>
  relativePath.value.replace(/^en\//, '').replace(/index\.md$/, '').replace(/\.md$/, '.html')
)
const ruHref = computed(() => withBase('/' + article.value))
const enHref = computed(() => withBase('/en/' + article.value))

const open = ref(false)
const root = ref(null)
const trigger = ref(null)
const ruLink = ref(null)
const enLink = ref(null)

function toggle() {
  open.value = !open.value
}

async function focusOption(locale) {
  open.value = true
  await nextTick()
  ;(locale === 'ru' ? ruLink : enLink).value?.focus()
}

function onOutsidePointer(event) {
  if (!root.value?.contains(event.target)) open.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape' && open.value) {
    open.value = false
    trigger.value?.focus()
  }
}

function onFocusOut(event) {
  if (!root.value?.contains(event.relatedTarget)) open.value = false
}

watch(relativePath, () => { open.value = false })

onMounted(() => {
  document.addEventListener('pointerdown', onOutsidePointer)
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.removeEventListener('pointerdown', onOutsidePointer)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <nav ref="root" class="kaev-language-switch" aria-label="Выбор языка / Language" @focusout="onFocusOut">
    <button
      ref="trigger"
      type="button"
      class="kaev-language-switch__trigger"
      :aria-label="isEnglish ? 'Change language' : 'Выбрать язык'"
      :title="isEnglish ? 'Language' : 'Язык'"
      aria-haspopup="true"
      aria-controls="kaev-language-options"
      :aria-expanded="open"
      @click="toggle"
      @keydown.down.prevent="focusOption(isEnglish ? 'en' : 'ru')"
    >
      <LanguageFlag :locale="isEnglish ? 'en' : 'ru'" />
      <svg class="kaev-language-switch__arrow" :class="{ 'is-open': open }" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
        <path d="m3.5 6 4.5 4 4.5-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <div v-if="open" id="kaev-language-options" class="kaev-language-switch__menu">
      <a
        ref="ruLink"
        :href="ruHref"
        lang="ru"
        hreflang="ru"
        class="kaev-language-switch__option"
        :aria-current="!isEnglish ? 'page' : undefined"
        @click="open = false"
        @keydown.down.prevent="focusOption('en')"
        @keydown.up.prevent="focusOption('en')"
      >
        <LanguageFlag locale="ru" />
        <span>Русский</span>
        <span v-if="!isEnglish" class="kaev-language-switch__selected" aria-hidden="true">✓</span>
      </a>
      <a
        ref="enLink"
        :href="enHref"
        lang="en"
        hreflang="en"
        class="kaev-language-switch__option"
        :aria-current="isEnglish ? 'page' : undefined"
        @click="open = false"
        @keydown.down.prevent="focusOption('ru')"
        @keydown.up.prevent="focusOption('ru')"
      >
        <LanguageFlag locale="en" />
        <span>English</span>
        <span v-if="isEnglish" class="kaev-language-switch__selected" aria-hidden="true">✓</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.kaev-language-switch {
  position: relative;
  z-index: 25;
  display: inline-flex;
  flex-shrink: 0;
  align-self: center;
  margin: 0 4px;
}
.kaev-language-switch__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 53px;
  height: 38px;
  padding: 0 9px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 11px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: border-color .15s ease, background-color .15s ease;
}
.kaev-language-switch__trigger:hover,
.kaev-language-switch__trigger[aria-expanded="true"] {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-brand-1);
}
.kaev-language-switch__arrow { transition: transform .16s ease; }
.kaev-language-switch__arrow.is-open { transform: rotate(180deg); }
.kaev-language-switch__menu {
  position: absolute;
  top: calc(100% + 9px);
  right: 0;
  min-width: 180px;
  padding: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 13px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  white-space: nowrap;
}
.kaev-language-switch__option {
  display: flex;
  align-items: center;
  gap: 11px;
  min-height: 43px;
  padding: 7px 10px;
  border-radius: 8px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
}
.kaev-language-switch__option:hover,
.kaev-language-switch__option:focus-visible { background: var(--vp-c-bg-soft); }
.kaev-language-switch__option[aria-current="page"] { color: var(--vp-c-brand-1); font-weight: 650; }
.kaev-language-switch__selected { margin-left: auto; font-size: 15px; }
.kaev-language-switch__trigger:focus-visible,
.kaev-language-switch__option:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
@media (max-width: 767px) {
  .kaev-language-switch { margin: 0 2px; }
  .kaev-language-switch__trigger { height: 35px; min-width: 49px; padding: 0 7px; gap: 5px; }
}
@media (prefers-reduced-motion: reduce) {
  .kaev-language-switch__trigger, .kaev-language-switch__arrow { transition: none; }
}
</style>
