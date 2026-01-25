<template>
  <div class="app-container">
    <Header v-if="route.meta.layout !== 'auth'"></Header>
    <main>
      <RouterView />
    </main>
    <Footer v-if="route.meta.layout !== 'auth'"></Footer>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
