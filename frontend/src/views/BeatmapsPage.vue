<template>
  <main class="main-container">
    <h1>List of beatmaps</h1>
    <Article :width="true">
      <section class="filter-section">
        <Input inputPlaceholder="Search Beatmaps" v-model="searchText"></Input>
        <section class="icons">
          <i class="fa-solid fa-filter" @click="openFilter = true"></i>
          <i class="fa-solid fa-sort" @click="openSort = true"></i>
        </section>
        <SelectionDialog
          v-if="openFilter"
          @close="openFilter = false"
          title="Choose filters"
          :listItems="selectionStore.filterItems"
          :multiple="true"
          v-model:selected="selectionStore.filterSelected"
        />

        <SelectionDialog
          v-if="openSort"
          @close="openSort = false"
          title="Sort by"
          :listItems="selectionStore.sortItems"
          :multiple="false"
        />
      </section>
      <section class="beatmap-section">
        <BeatmapPreview
          v-for="beatmap in visibleBeatmaps"
          :key="beatmap"
          :img="beatmap.img"
          :title="beatmap.name"
          :artist="beatmap.musicAuthor || 'Unknown'"
          :creator="beatmap.creatorName || 'Unknown'"
          :id="beatmap.id"
          @click="router.push({ name: 'beatmap-detail', params: { id: beatmap.id } })"
        ></BeatmapPreview>
      </section>
      <Button
        title="Load More"
        :fontSize="22"
        :paddingHorizontal="35"
        :paddingVertical="10"
        buttonType="primary"
        @click="visibleCount += 6"
      ></Button>
    </Article>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loadBeatmaps } from '@/composables/beatmapArray'
import { useSelectionStore } from '@/stores/selection'
import { postFile } from '@/composables/api'

const router = useRouter()
const selectionStore = useSelectionStore()

const visibleCount = ref(12)
const openSort = ref(false)
const openFilter = ref(false)

const searchText = ref('')

const beatmaps = ref<any[]>([])
const isLoading = ref(true)

const visibleBeatmaps = computed(() => {
  let filtered = [...beatmaps.value]
  const searched = searchText.value.toLowerCase().trim()

  if (selectionStore.filterSelected.length > 0) {
    filtered = filtered.filter((beatmap) =>
      beatmap.tags?.some((tag: string) => selectionStore.filterSelected.includes(tag)),
    )
  }

  switch (selectionStore.sortSelected) {
    case 'Name A-Z':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'Name Z-A':
      filtered.sort((a, b) => b.name.localeCompare(a.name))
      break
    case 'Newest':
      filtered.sort(
        (a, b) => new Date(b.dateUploaded).getTime() - new Date(a.dateUploaded).getTime(),
      )
      break
    case 'Most Downloaded':
      filtered.sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
      break
  }

  filtered = filtered.filter(
    (beatmap) =>
      beatmap.name?.toLowerCase().includes(searched) ||
      beatmap.creatorName?.toLowerCase().includes(searched) ||
      beatmap.musicAuthor?.toLowerCase().includes(searched),
  )

  return filtered.slice(0, visibleCount.value)
})

onMounted(async () => {
  beatmaps.value = await loadBeatmaps()
  isLoading.value = false
})
</script>

<style lang="scss" scoped>
.main-container {
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin: 0 var(--global-padding);
  margin-bottom: 100px;
  @media (min-width: 2000px) {
    width: 1600px;
    margin: 0 auto;
    margin-bottom: 100px;
  }

  h1 {
    color: white;
    font-weight: 600;
    font-size: var(--large-text-size);
    text-align: center;
  }

  Article {
    .filter-section {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;
      gap: 30px;

      @media (max-width: 650px) {
        flex-direction: column;
      }
      .icons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        color: var(--terciary-foreground-color);
        font-size: 30px;
        cursor: pointer;
        i {
          transition: 0.3s ease;
          &:hover {
            color: var(--primary-foreground-color);
          }
        }
      }

      .add-beatmap {
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;

          h3 {
            color: white;
            font-size: var(--medium-text-size);
            font-weight: 600;
            margin-bottom: 10px;
          }

          label {
            color: var(--terciary-foreground-color);
            font-size: 16px;
            margin-top: 5px;
            text-align: left;
          }

          .button-section {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
          }
        }
      }
    }
    .beatmap-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      width: 100%;
      margin-bottom: 30px;

      @media (max-width: 800px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
