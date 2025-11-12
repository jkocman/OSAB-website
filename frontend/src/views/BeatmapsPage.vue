<template>
  <main>
    <h1>List of beatmaps</h1>
    <Article>
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
import osab from '../assets/img/osab.jpeg';

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
  }
]
</script>

<style lang="scss" scoped>
main {
  padding-top: 150px;
}
</style>
