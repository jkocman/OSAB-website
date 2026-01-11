<template>
    <main>
        <h1>Your uploaded beatmaps</h1>
        <Article>
            <BeatmapPreview v-for="(beamap, i) in beatmaps" :key="i" >

            </BeatmapPreview>
        </Article>
    </main>
</template>

<script lang="ts" setup>
import { getData } from '@/composables/api';

let beatmaps = getData();
</script>

<style lang="scss" scoped>
    main{
        padding-top: 150px;
    }
</style>