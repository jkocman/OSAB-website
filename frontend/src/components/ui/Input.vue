<template>
  <section class="input-wrapper" @click="focusInput">
    <i class="fa fa-search"></i>
    <input ref="inputRef" :type="inputType" :placeholder="inputPlaceholder" />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  inputType: { type: String, default: 'text' },
  inputPlaceholder: { type: String, default: '' },
  width: { type: Number, default: 400 },
})

const inputRef = ref<HTMLInputElement | null>(null)

function focusInput() {
  inputRef.value?.focus()
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;

  color: var(--terciary-foreground-color);
  border: 1px solid var(--terciary-foreground-color);
  padding: 12px 16px;
  border-radius: 12px;
  width: 100%;

  background-color: transparent;
  cursor: text;
  transition: 0.3s ease;

  &:hover {
    border-color: var(--primary-foreground-color);
    box-shadow: 0 0 4px var(--primary-foreground-color);
    color: var(--primary-foreground-color);
  }

  i {
    font-size: 1.1rem;
    pointer-events: none;
  }

  input {
    flex: 1;
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--terciary-foreground-color);
    font-size: 1rem;
  }
}
</style>
