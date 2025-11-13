<template>
  <main class="main-container">
    <h1>List of beatmaps</h1>
    <Article width="true">
      <section class="filter-section">
        <Input inputPlaceholder="Search Beatmaps"></Input>
        <section class="icons">
          <i class="fa-solid fa-filter"></i>
          <i class="fa-solid fa-sort"></i>
          <i class="fa-solid fa-plus"></i>
        </section>
      </section>
      <section class="beatmap-section">
        <BeatmapPreview
          v-for="beatmap in BeatmapArray"
          :key="beatmap"
          :img="beatmap.img"
          :title="beatmap.title"
          :artist="beatmap.artist"
          :creator="beatmap.creator"
          @click="router.push({ name: 'beatmap-detail', params: { id: beatmap.id } })"
        ></BeatmapPreview>
      </section>
    </Article>
  </main>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import osab from '../assets/img/osab.jpeg'

const router = useRouter()

const BeatmapArray = [
  {
    id: 1,
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
  {
    id: 2,
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
  {
    id: 3,
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
  {
    id: 4,
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
  {
    id: 5,
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
  {
    id: 6,
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
]
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
    }
    .beatmap-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      width: 100%;

      @media (max-width: 800px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
