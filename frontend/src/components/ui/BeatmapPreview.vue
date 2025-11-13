<template>
  <main @click="handleClick()">
    <section class="img-section">
      <img :src="img" alt="" />
    </section>
    <section class="main-content">
      <section class="name-section">
        <h3>{{ title }}</h3>
        <p>{{ artist }}</p>
      </section>
      <p class="creator">Created by: {{ creator }}</p>
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

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
main {
  background-color: var(--primary-background-color);
  display: flex;
  height: 175px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  .img-section {
    img {
      object-fit: cover;
      height: 175px;
      width: 250px;
    }
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    margin: 10px 0;

    .name-section {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 5px;
      h3 {
        font-weight: 600;
        color: white;
        font-size: var(--medium-text-size);
      }
      p {
        color: var(--terciary-foreground-color);
        font-size: var(--small-text-size);
      }
    }
    p {
      color: white;
      font-size: var(--small-text-size);
    }
  }
}
</style>
