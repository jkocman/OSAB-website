<template>
  <header>
    <section class="header">
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
          <li><i class="fa fa-search" @click="openSearch = true"></i></li>
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
    </section>

    <Dialog v-if="openSearch" @close="openSearch = false">
      <section class="search">
        <Input inputPlaceholder="Search"></Input>
        <Button
          title="Exit"
          :fontSize="18"
          :paddingHorizontal="25"
          :paddingVertical="10"
          :buttonType="buttonType"
          @click="openSearch = false"
        ></Button>
      </section>
    </Dialog>

    <section class="burger-header">
      <RouterLink to="/" @click="page = 1">
        <img src="../../assets/img/logo-without-text.png" alt="logo" />
      </RouterLink>

      <button class="burger" @click="toggleMenu()">
        <div :class="{ open: isOpen }"></div>
        <div :class="{ open: isOpen }"></div>
        <div :class="{ open: isOpen }"></div>
      </button>
    </section>

    <section class="burger-menu" v-if="isOpen">
      <ul>
        <li>
          <Input inputType="text" inputPlaceholder="Search beatmaps..." />
        </li>
        <li class="item">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="item">
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li class="item">
          <RouterLink to="/beatmaps">Beatmaps</RouterLink>
        </li>
        <Button
          title="Download"
          :fontSize="18"
          :paddingHorizontal="25"
          :paddingVertical="10"
          :buttonType="buttonType"
          @click="router.push('/download')"
        ></Button>
      </ul>
    </section>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const page = ref(1)

const openSearch = ref(false)

const home = ref<HTMLLIElement | null>(null)
const about = ref<HTMLLIElement | null>(null)
const beatmaps = ref<HTMLLIElement | null>(null)
const indicatorLeft = ref(0)
const indicatorWidth = ref(0)

const isOpen = ref(false)

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
    console.log(indicatorLeft.value)
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

const toggleMenu = (state?: boolean) => {
  isOpen.value = state !== undefined ? state : !isOpen.value
}

watch(
  () => route.path,
  () => updatePageFromRoute(),
  { immediate: true },
)

onMounted(() => {
  window.addEventListener('load', updateIndicator)
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
  padding: 0.5em var(--global-padding);
  border-bottom: solid var(--highlight-color) 2px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
          .fa-search {
            color: var(--terciary-foreground-color);
            font-size: 18px;
            cursor: pointer;
            transition: 0.3s ease;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;

            &:hover {
              background-color: var(--primary-foreground-color);
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

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }

  .burger-header {
    display: none;
    align-items: center;
    justify-content: space-between;
    img {
      width: 70px;
    }
    button {
      background-color: transparent;
      border: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      div {
        background-color: white;
        width: 40px;
        height: 3px;
        border-radius: 10px;
      }
    }
  }

  .burger-menu {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-top: 20px;
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
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
  }

  @media (max-width: 870px) {
    .header {
      display: none;
    }

    .burger-header {
      display: flex;
    }
  }
}
</style>
