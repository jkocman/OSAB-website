<template>
  <section class="textarea-wrapper" @click="focusTextarea">
    <textarea ref="textareaRef" :placeholder="inputPlaceholder" :rows="rows"></textarea>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  inputPlaceholder: { type: String, default: '' },
  rows: { type: Number, default: 4 },
})

const textareaRef = ref<HTMLTextAreaElement | null>(null)

function focusTextarea() {
  textareaRef.value?.focus()
}
</script>

<style lang="scss" scoped>
.textarea-wrapper {
  display: flex;
  width: 100%;

  color: var(--terciary-foreground-color);
  border: 1px solid var(--terciary-foreground-color);
  padding: 12px 16px;
  border-radius: 12px;

  background-color: transparent;
  cursor: text;
  transition: 0.3s ease;

  &:hover {
    border-color: var(--primary-foreground-color);
    box-shadow: 0 0 4px var(--primary-foreground-color);
    color: var(--primary-foreground-color);
  }

  textarea {
    flex: 1;
    resize: none;
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--terciary-foreground-color);
    font-size: 1rem;
    font-family: inherit;
  }
}
</style>
