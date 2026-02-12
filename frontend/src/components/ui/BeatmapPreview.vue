<template>
  <main
    @click="handleClick()"
    :style="{ alignItems: dashboard ? 'top' : 'center', cursor: dashboard ? 'pointer' : 'default' }"
    :class="dashboard ? 'hover' : ''"
  >
    <section class="img-section">
      <img :src="img" alt="Beatmap image" />
    </section>
    <section class="main-content">
      <section class="name-section">
        <h3>{{ title }}</h3>
        <p>{{ artist }}</p>
      </section>
      <p v-if="dashboard" class="creator">Created by: {{ creator }}</p>
    </section>
    <section v-if="!dashboard" class="trash-can" @click.stop="emitDelete">
      <i class="fa-solid fa-trash-can"></i>
    </section>
  </main>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: { type: Number, required: true },
  title: String,
  img: String,
  artist: String,
  creator: String,
  dashboard: { type: Boolean, default: true },
})

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'delete', id: number): void
}>()

const handleClick = () => {
  emit('click')
}

const emitDelete = () => {
  emit('delete', props.id)
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
  @media (max-width: 506px) {
    flex-direction: column;
    height: auto;
  }

  .hover:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  .img-section {
    height: 175px;
    width: 250px;
    @media (max-width: 1268px) {
      width: 200px;
    }
    @media (max-width: 1000px) {
      width: 125px;
    }
    @media (max-width: 800px) {
      width: 200px;
    }
    @media (max-width: 570px) {
      width: 150px;
    }
    @media (max-width: 506px) {
      width: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
  .trash-can {
    color: darkred;
    font-size: 30px;
    margin-left: 20px;
    cursor: pointer;
    @media (max-width: 506px) {
      margin-bottom: 10px;
      margin-left: 0;
    }
  }
}
</style>
