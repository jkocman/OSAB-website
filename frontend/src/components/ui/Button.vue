<template>
  <button :class="buttonType" :style="buttonStyles" @click="emit('click')">
    {{ title }}
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  fontSize: Number,
  paddingHorizontal: Number,
  paddingVertical: Number,
  buttonType: String,
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const buttonStyles = computed(() => ({
  fontSize: props.fontSize + 'px',
  padding: props.paddingVertical + 'px' + ' ' + props.paddingHorizontal + 'px',
}))
</script>

<style lang="scss" scoped>
button {
  border-radius: 12px;
  cursor: pointer;
  transition: ease 0.3s;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
  &.primary {
    color: white;
    background-color: var(--primary-foreground-color);
    border: solid 1px var(--primary-foreground-color);
    &:hover {
      background-color: transparent;
      color: var(--primary-foreground-color);
    }
  }
  &.secondary {
    color: black;
    background-color: var(--secondary-foreground-color);
    border: solid 1px var(--secondary-foreground-color);
    &:hover {
      background-color: transparent;
      color: var(--secondary-foreground-color);
    }
  }
  &.reverse {
    border: solid 1px var(--primary-foreground-color);
    background-color: transparent;
    color: var(--primary-foreground-color);
  }
}
</style>
