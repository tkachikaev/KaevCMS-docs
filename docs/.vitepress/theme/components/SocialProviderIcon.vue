<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 32 }
})
const providers = ['google', 'yandex', 'vk', 'telegram', 'discord', 'facebook']
const src = computed(() => providers.includes(props.name) ? withBase('/images/social/' + props.name + '.svg') : '')
</script>

<template>
  <img v-if="src" :src="src" :alt="name" :width="size" :height="size"
    loading="lazy" class="kaev-social-icon" />
</template>

<style scoped>
.kaev-social-icon {
  display: inline-block;
  vertical-align: middle;
  object-fit: contain;
  flex-shrink: 0;
}
</style>
