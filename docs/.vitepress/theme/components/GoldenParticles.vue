<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useData } from 'vitepress'

// Adapted from the Golden Particles effect supplied in code.html.
const canvas = ref(null)
const { isDark } = useData()
let dispose = () => {}

onMounted(() => {
  const surface = canvas.value
  const ctx = surface.getContext('2d')
  if (!ctx) return

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let width = 0, height = 0, particles = [], frame = 0, previous = 0
  let visible = false

  function particle(initial = false) {
    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 12,
      size: Math.random() * 2 + .6,
      speed: Math.random() * .65 + .25,
      drift: (Math.random() - .5) * .35,
      phase: Math.random() * Math.PI * 2,
      opacity: Math.random() * .45 + .3,
      colorIndex: Math.floor(Math.random() * 3)
    }
  }

  function resize() {
    const bounds = surface.getBoundingClientRect()
    width = bounds.width
    height = bounds.height
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    surface.width = Math.round(width * ratio)
    surface.height = Math.round(height * ratio)
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    particles = Array.from({ length: width < 640 ? 36 : 75 }, () => particle(true))
    draw(0)
  }

  function draw(delta) {
    ctx.clearRect(0, 0, width, height)
    const colors = isDark.value ? ['#b48cf0', '#d3b8ff', '#eef0ff'] : ['#d4a34f', '#f5b041', '#fff1ca']
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i]
      p.phase += .02 * delta
      p.y -= p.speed * delta
      p.x += (p.drift + Math.sin(p.phase) * .35) * delta
      if (p.y < -15 || p.x < -15 || p.x > width + 15) p = particles[i] = particle()
      const edge = Math.min(1, (height - p.y) / 65, p.y / 65)
      ctx.globalAlpha = Math.max(0, (p.opacity + Math.sin(p.phase * 2) * .18) * edge)
      ctx.fillStyle = colors[p.colorIndex]
      ctx.shadowColor = isDark.value ? '#b791f5' : '#e9ba65'
      ctx.shadowBlur = p.size * 4
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      if (p.size > 1.8) {
        ctx.fillStyle = isDark.value ? '#faf5ff' : '#fff9e9'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * .4, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  function animate(time) {
    draw(previous ? Math.min((time - previous) / 16.667, 2) : 1)
    previous = time
    frame = requestAnimationFrame(animate)
  }

  function sync() {
    cancelAnimationFrame(frame)
    previous = 0
    if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(animate)
    else if (motion.matches) draw(0)
  }

  const sizeObserver = new ResizeObserver(resize)
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    sync()
  })
  sizeObserver.observe(surface)
  visibilityObserver.observe(surface)
  document.addEventListener('visibilitychange', sync)
  motion.addEventListener('change', sync)
  const stopThemeWatch = watch(isDark, () => draw(0))
  dispose = () => {
    stopThemeWatch()
    cancelAnimationFrame(frame)
    sizeObserver.disconnect()
    visibilityObserver.disconnect()
    document.removeEventListener('visibilitychange', sync)
    motion.removeEventListener('change', sync)
  }
})

onBeforeUnmount(() => dispose())
</script>

<template>
  <canvas ref="canvas" class="kaev-home__particles" aria-hidden="true" />
</template>
