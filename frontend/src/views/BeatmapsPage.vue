<template>
  <main class="beatmap-section">
    <h1>List of beatmaps</h1>
    <Article :width="1400">
      <BeatmapPreview
        v-for="beatmap in BeatmapArray"
        :key="beatmap"
        :img="beatmap.img"
        :title="beatmap.title"
        :artist="beatmap.artist"
        :creator="beatmap.creator"
      ></BeatmapPreview>
    </Article>
  </main>
</template>

<script lang="ts" setup>
import osab from '../assets/img/osab.jpeg'

const BeatmapArray = [
  {
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
  {
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
  {
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
  {
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
  {
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
  {
    img: osab,
    title: 'aghoj',
    artist: 'nekdo',
    creator: 'Krooby',
  },
]
</script>

<style lang="scss" scoped>
.beatmap-section {
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  Article {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
