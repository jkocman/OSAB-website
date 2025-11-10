<template>
  <div
    class="button"
    :style="{
      background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    @click="emit('click')"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  url: String,
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang="scss" scoped>
div {
  height: 375px;
  border: 2px solid var(--highlight-color);
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 15px;
  padding: 20px;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
  }
}
</style>
