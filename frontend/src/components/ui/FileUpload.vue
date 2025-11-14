<template>
  <input type="file" />
</template>

<style lang="scss" scoped>
input {
  border: 1px solid var(--terciary-foreground-color);
  padding: 12px;
  border-radius: 10px;
  color: var(--terciary-foreground-color);
  cursor: pointer;
  transition: 0.3s ease;
  font-size: 15px;
  width: 100%;

  &:hover {
    color: var(--primary-foreground-color);
  }

  &::file-selector-button {
    background-color: var(--terciary-foreground-color);
    color: black;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;
    margin-right: 15px;
    font-weight: 600;
  }

  &:hover::file-selector-button {
    background-color: var(--primary-foreground-color);
  }

  &:hover {
    border-color: var(--primary-foreground-color);
  }
}
</style>
