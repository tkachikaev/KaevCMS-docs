<script setup>
import { nextTick, provide } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const { isDark } = useData()
let switching = false

provide('toggle-appearance', async (event) => {
  if (switching) return
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reducedMotion) {
    isDark.value = !isDark.value
    return
  }

  switching = true
  const button = event?.currentTarget?.getBoundingClientRect()
  const x = event?.clientX || (button ? button.left + button.width / 2 : innerWidth / 2)
  const y = event?.clientY || (button ? button.top + button.height / 2 : 32)
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  document.documentElement.classList.add('theme-reveal')
  try {
    const transition = document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    })
    await transition.ready
    const reveal = document.documentElement.animate({
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
      filter: ['brightness(1.22) saturate(1.15)', 'brightness(1) saturate(1)']
    }, {
      duration: 950,
      easing: 'cubic-bezier(.22,.68,.16,1)',
      pseudoElement: '::view-transition-new(root)'
    })
    await reveal.finished
    await transition.finished
  } catch {
    // A cancelled snapshot or animation still leaves the selected theme applied.
  } finally {
    document.documentElement.classList.remove('theme-reveal')
    switching = false
  }
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <LanguageSwitcher />
    </template>
  </DefaultTheme.Layout>
</template>
