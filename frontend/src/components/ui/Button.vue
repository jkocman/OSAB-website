<template>
  <button
    :class="[buttonType, { disabled: disabled }]"
    :style="buttonStyles"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ title }}
    <slot></slot>
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
  disabled: Boolean,
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}

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
  border: none;
  &:disabled,
  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(0.5);
    pointer-events: none;
  }

  &.primary {
    color: white;
    background-color: var(--primary-foreground-color);
    border: solid 1px var(--primary-foreground-color);
    &:hover:not(:disabled) {
      background-color: transparent;
      color: var(--primary-foreground-color);
    }
  }

  &.secondary {
    color: black;
    background-color: var(--secondary-foreground-color);
    border: solid 1px var(--secondary-foreground-color);
    &:hover:not(:disabled) {
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
