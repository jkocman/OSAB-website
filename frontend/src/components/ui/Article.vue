<template>
  <article :style="articleStyle">
    <slot></slot>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  width: { Number, default: 1000 },
})

const articleStyle = computed(() => ({
  width: props.width + 'px',
}))
</script>

<style lang="scss" scoped>
article {
  background-color: var(--secondary-background-color);
  padding: 20px 40px;
  border-radius: 20px;
  border:
    2px,
    solid var(--highlight-color);
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
