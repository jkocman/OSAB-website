<template>
  <main>
    <h1>Beatmap details</h1>
    <Article :width="true">
      <section v-if="beatmap" class="beatmap-info">
        <img :src="beatmap.img" />
        <section class="heading-section">
          <h2>{{ beatmap.name }}</h2>
          <p class="artist">{{ beatmap.musicAuthor || 'Unknown' }}</p>
        </section>
        <section class="info-container">
          <section class="description-container">
            <h3>Description</h3>
            <section v-if="beatmap.description !== ''">
              <p>{{ beatmap.description }}</p>
            </section>
            <section v-else>
              <p>No description provided</p>
            </section>
          </section>
          <Button
            title="Download Beatmap"
            :fontSize="buttonStyle().fontSize"
            :paddingHorizontal="buttonStyle().paddingHorizontal"
            :paddingVertical="buttonStyle().paddingVertical"
            buttonType="primary"
            @click="handleDownload(beatmap.id, beatmap.name)"
          ></Button>
          <section class="beatmap-info-container">
            <h3>Beatmap info</h3>
            <p>Creator: {{ beatmap.creatorName || 'No creator provided' }}</p>
            <p>Difficulty: {{ beatmap.diff || 'No difficulty provided' }}</p>
            <p>Downloaded: {{ beatmap.downloads || '0' }}x</p>
            <p>Uploaded: {{ formatedDate }}</p>
          </section>
        </section>
      </section>

      <section v-else>
        <h2>Beatmap not found</h2>
      </section>
    </Article>
  </main>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { loadBeatmaps } from '@/composables/beatmapArray'
import { downloadBeatmap, updateDownloads } from '@/composables/api'

const route = useRoute()

const windowWidth = ref(window.innerWidth)

const beatmapId = computed(() => Number(route.params.id))

const beatmaps = ref<any[]>([])
const isLoading = ref(true)

const beatmap = computed(() => beatmaps.value.find((b) => b.id === beatmapId.value))

const handleDownload = async (id: number, name: string) => {
  await updateDownloads(id)
  await downloadBeatmap(id, name)
}

const formatedDate = computed(() => {
  if (!beatmap.value?.dateUploaded) return 'Unknown'

  return new Date(beatmap.value.dateUploaded).toLocaleDateString('cs-CZ')
})

const buttonStyle = () => {
  if (windowWidth.value > 1757) {
    return {
      fontSize: 26,
      paddingHorizontal: 35,
      paddingVertical: 40,
    }
  } else if (windowWidth.value > 1470) {
    return {
      fontSize: 22,
      paddingHorizontal: 30,
      paddingVertical: 30,
    }
  } else {
    return {
      fontSize: 18,
      paddingHorizontal: 25,
      paddingVertical: 25,
    }
  }
}

onMounted(async () => {
  beatmaps.value = await loadBeatmaps()
  isLoading.value = false

  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})
</script>

<style lang="scss" scoped>
main {
  padding-top: 150px;
  margin: 0 var(--global-padding);
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  h1,
  h2 {
    color: white;
    font-weight: 600;
    font-size: var(--large-text-size);
    text-align: center;
  }
  Article {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    overflow: hidden;
    max-width: 1600px;
    .download-container {
      display: grid;
      grid-template-columns: 4fr 1fr;
      gap: 50px;
      margin-top: 20px;
    }
    .beatmap-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30px;
      width: 100%;
      img {
        width: 100%;
        aspect-ratio: 16 / 4;
        object-fit: cover;
      }
      .artist {
        font-size: var(--medium-text-size);
        color: var(--terciary-foreground-color);
      }
      .info-container {
        display: grid;
        grid-template-columns: 3fr 1fr;
        gap: 40px;
        justify-content: center;
        align-items: stretch;
        width: 100%;
        padding: 0 50px;

        @media (max-width: 1183px) {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        Button {
          grid-row: span 2;
          align-self: center;
          justify-self: center;
          @media (max-width: 1183px) {
            align-self: stretch;
            order: 999;
          }
        }

        .description-container,
        .beatmap-info-container {
          background-color: var(--primary-background-color);
          width: 100%;
          padding: 20px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          h3 {
            font-weight: 600;
            font-size: var(--larger-text-size);
          }
          &:nth-child(1) h3 {
            color: var(--primary-foreground-color);
          }
          &:nth-child(3) h3 {
            color: var(--secondary-foreground-color);
          }
          p {
            color: var(--terciary-foreground-color);
            font-size: var(--small-text-size);
          }
        }
      }
    }
  }
}
</style>
