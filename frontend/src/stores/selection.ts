import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSelectionStore = defineStore('selection', () => {
  const filterItems = ref(['Short', 'Normal', 'Long', 'Marathon', 'Popular Only'])
  const sortItems = ref(['Name A-Z', 'Name Z-A', 'Newest', 'Most Downloaded'])

  const filterSelected = ref<string[]>([])
  const sortSelected = ref('Name A-Z')

  return {
    filterItems,
    sortItems,
    filterSelected,
    sortSelected,
  }
})
