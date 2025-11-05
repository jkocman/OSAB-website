<template>
  <section class="input-wrapper">
    <i class="fa fa-search"></i>
    <input :type="inputType" :placeholder="inputPlaceholder" />
  </section>
</template>

<script lang="ts" setup>
const props = defineProps({
  inputType: String,
  inputPlaceholder: String,
})
</script>

<style lang="scss" scoped>
section {
  color: var(--terciary-foreground-color);
  border: 1px solid;
  padding: 5px;
  border-radius: 12px;

  input {
    background-color: transparent;
    border: none;
    margin-left: 10px;
    color: var(--terciary-foreground-color);
  }
}
</style>
