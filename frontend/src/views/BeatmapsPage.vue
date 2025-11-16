<template>
  <main class="main-container">
    <h1>List of beatmaps</h1>
    <Article :width="true">
      <section class="filter-section">
        <Input inputPlaceholder="Search Beatmaps" v-model="searchText"></Input>
        <section class="icons">
          <i class="fa-solid fa-filter" @click="openFilter = true"></i>
          <i class="fa-solid fa-sort" @click="openSort = true"></i>
          <i class="fa-solid fa-plus" @click="openAddBeatmap = true"></i>
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
        <Dialog v-if="openAddBeatmap" @close="openAddBeatmap = false" class="add-beatmap">
          <form>
            <h3>Upload your own Beatmap</h3>
            <label for="title">Upload the file</label>
            <FileUpload></FileUpload>
            <label for="title">Username</label>
            <Input inputPlaceholder="Add your username" search="false" class="title"></Input>
            <label for="description">Description</label>
            <TextArea inputPlaceholder="Add your description" class="description"></TextArea>
            <section class="button-section">
              <Button
                title="Submit"
                :fontSize="18"
                :paddingHorizontal="25"
                :paddingVertical="10"
                buttonType="primary"
                @click="openAddBeatmap = false"
              ></Button>
              <Button
                title="Exit"
                :fontSize="18"
                :paddingHorizontal="25"
                :paddingVertical="10"
                buttonType="secondary"
                @click="openAddBeatmap = false"
              ></Button>
            </section>
          </form>
        </Dialog>
      </section>
      <section class="beatmap-section">
        <BeatmapPreview
          v-for="beatmap in visibleBeatmaps"
          :key="beatmap"
          :img="beatmap.img"
          :title="beatmap.title"
          :artist="beatmap.artist"
          :creator="beatmap.creator"
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { beatmapArray } from '@/composables/beatmapArray'
import { useSelectionStore } from '@/stores/selection'

const router = useRouter()
const selectionStore = useSelectionStore()

const visibleCount = ref(12)
const openAddBeatmap = ref(false)
const openSort = ref(false)
const openFilter = ref(false)

const searchText = ref('')

const visibleBeatmaps = computed(() => {
  let filtered = [...beatmapArray]
  const searched = searchText.value.toLowerCase().trim()

  if (selectionStore.filterSelected.length > 0) {
    filtered = filtered.filter((beatmap) =>
      beatmap.tags?.some((tag) => selectionStore.filterSelected.includes(tag)),
    )
  }
  switch (selectionStore.sortSelected) {
    case 'Name A-Z':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'Name Z-A':
      filtered.sort((a, b) => b.title.localeCompare(a.title))
      break
    case 'Newest':
      filtered.sort((a, b) => b.dateOfUpload.getTime() - a.dateOfUpload.getTime())
      break
    case 'Most Downloaded':
      filtered.sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
      break
  }

  filtered = filtered.filter(
    (beatmap) =>
      beatmap.title.toLowerCase().includes(searched) ||
      beatmap.creator.toLowerCase().includes(searched) ||
      beatmap.artist.toLowerCase().includes(searched),
  )

  return filtered.slice(0, visibleCount.value)
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
