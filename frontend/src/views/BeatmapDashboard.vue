<template>
  <main>
    <h1>Your uploaded beatmaps</h1>
    <Article>
      <section>
        <h2>Add New Beatmap</h2>
        <i class="fa-solid fa-plus" @click="openAddBeatmap = true"></i>
      </section>
      <Dialog v-if="openAddBeatmap" @close="openAddBeatmap = false" class="add-beatmap">
        <form @submit.prevent="submit">
          <h3>Upload your own Beatmap</h3>
          <label for="title">Upload the file</label>
          <FileUpload @fileSelected="onFileSelected"></FileUpload>
          <section class="button-section">
            <Button
              title="Submit"
              :fontSize="18"
              :paddingHorizontal="25"
              :paddingVertical="10"
              buttonType="primary"
              type="submit"
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
      <section>
        <h2>Manage your beatmaps</h2>
        <BeatmapPreview
          v-for="beatmap in beatmaps"
          :key="beatmap"
          :img="beatmap.img"
          :title="beatmap.name"
          :artist="beatmap.musicAuthor || 'Unknown'"
          :creator="beatmap.creator"
          @click="router.push({ name: 'beatmap-detail', params: { id: beatmap.id } })"
        ></BeatmapPreview>
      </section>
    </Article>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { postFile } from '@/composables/api'
import { loadBeatmaps } from '@/composables/beatmapArray'
import router from '@/router'

const openAddBeatmap = ref(false)
const beatmaps = ref<any[]>([])
let selectedFile: File | null = null


const onFileSelected = (file: File) => {
  selectedFile = file
}

const submit = async () => {
  if (!selectedFile) return
  postFile(selectedFile)
  openAddBeatmap.value = false
}

onMounted(async () => {
  beatmaps.value = await loadBeatmaps()
})
</script>

<style lang="scss" scoped>
main {
  padding-top: 150px;
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
</style>
