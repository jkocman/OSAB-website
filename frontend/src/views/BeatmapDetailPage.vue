<template>
  <main>
    <h1>Beatmap details</h1>
    <Article>
      <section v-if="beatmap" class="beatmap-info">
        <img :src="beatmap.img" />
        <section class="heading-section">
          <h2>{{ beatmap.title }}</h2>
          <p class="artist">{{ beatmap.artist }}</p>
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
          <section class="beatmap-info-container">
            <h3>Beatmap info</h3>
            <p>Creator: {{ beatmap.creator || 'No creator provided' }}</p>
            <p>Difficulty: {{ beatmap.difficulty || 'No difficulty provided' }}</p>
            <p>Downloaded: {{ beatmap.downloads }}x</p>
            <p>Uploaded: {{ formatedDate }}</p>
          </section>
        </section>
        <Button
          title="Download Beatmap"
          :fontSize="22"
          :paddingHorizontal="35"
          :paddingVertical="10"
          buttonType="primary"
        ></Button>
      </section>

      <section v-else>
        <h2>Beatmap not found</h2>
      </section>
    </Article>
  </main>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { beatmapArray } from '@/composables/beatmapArray'

const route = useRoute()

const beatmapId = computed(() => Number(route.params.id))

const beatmap = computed(() => beatmapArray.find((b) => b.id === beatmapId.value))

const formatedDate = computed(() => {
  if (beatmap.value) {
    return beatmap.value.dateOfUpload.toLocaleDateString('cs-CZ')
  }
  return undefined
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
    .beatmap-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30px;
      img {
        width: 100%;
        aspect-ratio: 16 / 5;
        object-fit: cover;
      }
      .artist {
        font-size: var(--medium-text-size);
        color: var(--terciary-foreground-color);
      }
      .info-container {
        display: flex;
        align-items: stretch;
        justify-content: center;
        width: 100%;

        .description-container,
        .beatmap-info-container {
          background-color: var(--primary-background-color);
          width: 100%;
          margin: 0 50px;
          padding: 20px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          h3 {
            font-weight: 600;
            font-size: var(--larger-text-size);
          }
          &:first-child h3 {
            color: var(--primary-foreground-color);
          }
          &:nth-child(2) h3 {
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
