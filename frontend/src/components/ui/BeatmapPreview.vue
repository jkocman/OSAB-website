<template>
  <section>
    <section>
      <img :src="img" alt="" />
    </section>
    <section>
      <section class="name-section">
        <h3>{{ title }}</h3>
        <p>{{ artist }}</p>
      </section>
      <p class="creator">{{ creator }}</p>
    </section>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  img: String,
  artist: String,
  creator: String,
})
</script>

<style lang="scss" scoped></style>
