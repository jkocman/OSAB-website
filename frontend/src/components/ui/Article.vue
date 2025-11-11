<template>
  <article :style="articleStyle">
    <slot></slot>
  </article>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  width: { type: Number, default: 1000 },
})

const windowWidth = ref(window.innerWidth)

function handleResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const articleStyle = computed(() => {
  if (windowWidth.value <= 1300) {
    return { width: '100%' }
  }
  return { width: props.width + 'px', maxWidth: '100%' }
})
</script>

<style lang="scss" scoped>
article {
  background-color: var(--secondary-background-color);
  padding: 20px 40px;
  border-radius: 20px;
  border: 2px solid var(--highlight-color);
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
