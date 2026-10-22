<script setup>
defineProps({
  locale: { type: String, required: true }
})
</script>

<template>
  <svg
    class="kaev-language-flag"
    viewBox="0 0 28 18"
    width="28"
    height="18"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="locale === 'ru'">
      <path fill="#fff" d="M0 0h28v6H0z" />
      <path fill="#1859b7" d="M0 6h28v6H0z" />
      <path fill="#e5393f" d="M0 12h28v6H0z" />
    </template>
    <template v-else>
      <path fill="#012169" d="M0 0h28v18H0z" />
      <path d="M0 0 28 18M28 0 0 18" stroke="#fff" stroke-width="5.4" />
      <path d="M0 0 28 18M28 0 0 18" stroke="#c8102e" stroke-width="2" />
      <path d="M14 0v18M0 9h28" stroke="#fff" stroke-width="7.2" />
      <path d="M14 0v18M0 9h28" stroke="#c8102e" stroke-width="3.7" />
    </template>
  </svg>
</template>

<style scoped>
.kaev-language-flag {
  display: block;
  flex: 0 0 28px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .13);
}
</style>
