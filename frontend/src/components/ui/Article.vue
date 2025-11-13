<template>
  <article :style="articleStyle">
    <slot></slot>
  </article>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  margin: { type: Number, default: 0 },
  width: { type: Boolean, default: false },
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
  const style: Record<string, string> = {}

  if (props.width || windowWidth.value <= 1300) {
    style.width = '100%'
  } else {
    style.marginLeft = `${props.margin}px`
    style.marginRight = `${props.margin}px`
  }

  return style
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
