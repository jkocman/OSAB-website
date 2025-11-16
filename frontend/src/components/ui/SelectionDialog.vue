<template>
  <Dialog>
    <section class="dialog-content">
      <h3>{{ title }}</h3>
      <ul>
        <li
          v-for="(item, index) in listItems"
          :key="index"
          @click="selected(item)"
          :class="{ selected: isSelected(item) }"
        >
          {{ item }}
        </li>
      </ul>
    </section>
  </Dialog>
</template>

<script lang="ts" setup>
import { useSelectionStore } from '@/stores/selection'

const selectionStore = useSelectionStore()

const props = defineProps({
  listItems: Array,
  title: String,
  multiple: Boolean,
})

const selected = (item: any) => {
  if (props.multiple) {
    if (!selectionStore.filterSelected.includes(item)) {
      selectionStore.filterSelected.push(item)
    } else {
      selectionStore.filterSelected = selectionStore.filterSelected.filter((i) => i !== item)
    }
  } else {
    selectionStore.sortSelected = item
  }
}

const isSelected = (item: any) => {
  if (props.multiple) {
    return selectionStore.filterSelected.includes(item)
  } else {
    return selectionStore.sortSelected === item
  }
}
</script>

<style lang="scss" scoped>
.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: var(--medium-text-size);
    font-weight: 600;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    li {
      font-size: var(--small-text-size);
      color: var(--terciary-foreground-color);
      cursor: pointer;
      padding: 5px 0;
      border-radius: 12px;

      &:hover {
        outline: 1px solid var(--primary-foreground-color);
        color: white;
      }
    }
    .selected {
      background-color: var(--primary-foreground-color);
      color: white;
    }
  }
}
</style>
