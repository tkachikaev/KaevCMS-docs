import { onBeforeUnmount, onMounted } from 'vue'

/**
 * Animate the native VitePress sidebar groups without replacing its routing,
 * keyboard controls or collapsed state. VitePress 1.6.4 uses display:none;
 * our CSS keeps only enhanced groups renderable so Web Animations can tween
 * their actual content heights.
 */
export function useSidebarMotion() {
  let observer
  const entries = new Map()

  onMounted(() => {
    const layout = document.querySelector('.Layout')
    if (!layout || !Element.prototype.animate) return

    function discoverGroups() {
      layout.querySelectorAll('.VPSidebar .VPSidebarItem').forEach(section => {
        if (entries.has(section)) return

        const panel = section.querySelector(':scope > .items')
        if (!panel) return

        const collapsed = section.classList.contains('collapsed')
        entries.set(section, { panel, collapsed, animation: null })
        panel.inert = collapsed
        section.classList.add('kaev-sidebar-motion')
      })
    }

    function animateGroup(section, state, collapsed) {
      const { panel } = state
      const prior = state.animation
      const startHeight = prior
        ? panel.getBoundingClientRect().height
        : (state.collapsed ? 0 : panel.scrollHeight)
      const startOpacity = prior
        ? Number(getComputedStyle(panel).opacity)
        : (state.collapsed ? 0 : 1)

      prior?.cancel()
      state.animation = null
      state.collapsed = collapsed
      panel.inert = collapsed

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const endHeight = collapsed ? 0 : panel.scrollHeight
      const endOpacity = collapsed ? 0 : 1
      if (Math.abs(endHeight - startHeight) < 1 && Math.abs(endOpacity - startOpacity) < .01) return

      const animation = panel.animate(
        [
          { height: `${startHeight}px`, opacity: startOpacity },
          { height: `${endHeight}px`, opacity: endOpacity }
        ],
        { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      )
      state.animation = animation
      animation.addEventListener('finish', () => {
        if (state.animation === animation) state.animation = null
      }, { once: true })
    }

    discoverGroups()
    observer = new MutationObserver(mutations => {
      if (mutations.some(m => m.type === 'childList')) discoverGroups()

      for (const mutation of mutations) {
        if (mutation.type !== 'attributes') continue
        const section = mutation.target
        const state = entries.get(section)
        if (!state) continue

        const collapsed = section.classList.contains('collapsed')
        if (collapsed !== state.collapsed) animateGroup(section, state, collapsed)
      }

      // VitePress can replace the sidebar while switching locales/routes.
      for (const [section, state] of entries) {
        if (section.isConnected) continue
        state.animation?.cancel()
        entries.delete(section)
      }
    })
    observer.observe(layout, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class']
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    for (const [section, state] of entries) {
      state.animation?.cancel()
      state.panel.inert = false
      section.classList.remove('kaev-sidebar-motion')
    }
    entries.clear()
  })
}
