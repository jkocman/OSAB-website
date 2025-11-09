<template>
  <div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
div {
  width: 1000px;
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
