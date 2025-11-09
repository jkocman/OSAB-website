<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink to="/" @click="page = 1">
            <img src="../../assets/img/logo-without-text.png" alt="logo" />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li>
          <RouterLink to="/beatmaps">Beatmaps</RouterLink>
        </li>
        <li>
          <Input inputType="text" inputPlaceholder="Search beatmaps..." />
        </li>
      </ul>
      <div class="nav-indicator" :style="indicatorStyle"></div>
    </nav>
    <Button
      title="Download"
      :fontSize="18"
      :paddingHorizontal="25"
      :paddingVertical="10"
      :buttonType="buttonType"
      @click="router.push('/download')"
    ></Button>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const page = ref(1)

const positions: Record<number, string> = {
  1: '230px',
  2: '316px',
  3: '405px',
}

const width: Record<number, string> = {
  1: '50px',
  2: '50px',
  3: '80px',
}

const indicatorStyle = computed(() => ({
  left: positions[page.value] ?? '200px',
  width: width[page.value],
  transition: 'left 0.3s ease',
}))

const buttonType = computed(() => {
  return route.path === '/download' ? 'reverse' : 'primary'
})

const updatePageFromRoute = () => {
  switch (route.path) {
    case '/':
      page.value = 1
      break
    case '/about':
      page.value = 2
      break
    case '/beatmaps':
      page.value = 3
      break
    case '/download':
      page.value = 0
      break
    default:
      page.value = 1
  }
}

watch(
  () => route.path,
  () => updatePageFromRoute(),
  { immediate: true },
)
</script>

<style scoped lang="scss">
header {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 100;

  background-color: var(--primary-background-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em var(--global-padding);
  border-bottom: solid var(--highlight-color) 2px;
  nav {
    ul {
      display: flex;
      align-items: center;
      gap: 30px;
      li {
        a {
          text-decoration: none;
          color: var(--terciary-foreground-color);
          font-size: var(--nav-text-size);
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
        }
        img {
          width: 70px;
        }
      }
    }
    div {
      position: absolute;
      top: 58px;
      height: 2px;
      background-color: var(--primary-foreground-color);
      border-radius: 2px;
    }
  }
}
</style>
