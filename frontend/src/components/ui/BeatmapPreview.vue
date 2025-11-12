<template>
  <main>
    <section class="img-section">
      <img :src="img" alt="" />
    </section>
    <section class="main-content">
      <section class="name-section">
        <h3>{{ title }}</h3>
        <p>{{ artist }}</p>
      </section>
      <p class="creator">{{ creator }}</p>
    </section>
  </main>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  img: String,
  artist: String,
  creator: String,
})
</script>

<style lang="scss" scoped>
main {
  background-color: var(--primary-background-color);
  display: flex;
  justify-content: space-between;

  .img-section {
    img {
      object-fit: cover;
      height: 150px;
      width: 150px;
    }
  }
}
</style>
