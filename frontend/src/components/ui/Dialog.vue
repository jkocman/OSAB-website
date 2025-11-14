<template>
  <section class="dialog-overlay" @click.self="close">
    <section class="dialog">
      <slot></slot>
    </section>
  </section>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])

const close = () => emit('close')
</script>

<style lang="scss" scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  .dialog {
    background-color: var(--secondary-background-color);
    color: white;
    padding: 20px;
    border-radius: 12px;
    min-width: 800px;
  }
}
</style>
