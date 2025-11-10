<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink to="/" @click="page = 1">
            <img src="../../assets/img/logo-without-text.png" alt="logo" />
          </RouterLink>
        </li>
        <li class="item" ref="home">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="item" ref="about">
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li class="item" ref="beatmaps">
          <RouterLink to="/beatmaps">Beatmaps</RouterLink>
        </li>
        <li>
          <Input inputType="text" inputPlaceholder="Search beatmaps..." />
        </li>
      </ul>
      <div v-if="page !== 0" class="nav-indicator" :style="indicatorStyle"></div>
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
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const page = ref(1)

const home = ref<HTMLLIElement | null>(null)
const about = ref<HTMLLIElement | null>(null)
const beatmaps = ref<HTMLLIElement | null>(null)
const indicatorLeft = ref(0)
const indicatorWidth = ref(0)

const buttonType = computed(() => {
  return route.path === '/download' ? 'reverse' : 'primary'
})

const getCurrentRef = () => {
  switch (page.value) {
    case 1:
      return home.value
    case 2:
      return about.value
    case 3:
      return beatmaps.value
    default:
      return null
  }
}

const updateIndicator = () => {
  const el = getCurrentRef()
  if (!el) return

  const rect = el.getBoundingClientRect()
  const navRect = el.parentElement?.getBoundingClientRect()

  const rootStyles = getComputedStyle(document.documentElement)
  const paddingSize = rootStyles.getPropertyValue('--global-padding').split('p')
  const paddingSizeNum = Number(paddingSize[0])

  if (navRect) {
    indicatorLeft.value = rect.left - navRect.left + paddingSizeNum
    indicatorWidth.value = rect.width
  }
}

const indicatorStyle = computed(() => ({
  left: indicatorLeft.value + 'px',
  width: indicatorWidth.value + 'px',
  transition: 'left 0.3s ease, width 0.3s ease',
}))

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
  }

  nextTick(updateIndicator)
}

watch(
  () => route.path,
  () => updatePageFromRoute(),
  { immediate: true },
)

onMounted(() => {
  nextTick(updateIndicator)
  window.addEventListener('resize', updateIndicator)
})
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
          transition: ease 0.3s;

          &:hover {
            color: var(--primary-foreground-color);
          }
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
