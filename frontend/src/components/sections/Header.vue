<template>
  <header>
    <section class="header">
      <nav>
        <ul>
          <li>
            <RouterLink to="/" @click="page = 1">
              <img src="../../assets/img/logo-without-text.png" alt="Logo" />
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
      <section>
        <i class="fa-solid fa-user" @click="router.push('/login')"></i>
        <Button
          title="Download"
          :fontSize="18"
          :paddingHorizontal="25"
          :paddingVertical="10"
          :buttonType="buttonType"
          @click="router.push('/download')"
        ></Button>
      </section>
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
        <img src="../../assets/img/logo-without-text.png" alt="Logo" />
      </RouterLink>

      <button class="burger" @click.stop="toggleMenu()">
        <div class="line" :class="{ open: isOpen }"></div>
        <div class="line" :class="{ open: isOpen }"></div>
        <div class="line" :class="{ open: isOpen }"></div>
      </button>
    </section>

    <section class="burger-menu" v-if="isOpen" ref="burgerMenu">
      <ul>
        <li class="item">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="item">
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li class="item">
          <RouterLink to="/beatmaps">Beatmaps</RouterLink>
        </li>
        <li>
          <i class="fa fa-search" @click="openSearch = true"></i>
        </li>
        <li>
          <i class="fa-solid fa-user" @click="router.push('/login')"></i>
        </li>
        <li>
          <Button
            title="Download"
            :fontSize="18"
            :paddingHorizontal="25"
            :paddingVertical="10"
            :buttonType="buttonType"
            @click="router.push('/download')"
          ></Button>
        </li>
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
const burgerMenu = ref<HTMLElement | null>(null);
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

  const screenWidth = window.innerWidth

  let extraPadding = 0
  if (screenWidth > 2000) {
    extraPadding = (screenWidth - 2000) / 2
  }

  const rootStyles = getComputedStyle(document.documentElement)
  const paddingSize = parseInt(rootStyles.getPropertyValue('--global-padding'))

  const finalPadding = paddingSize + extraPadding

  if (navRect) {
    indicatorLeft.value = rect.left - navRect.left + finalPadding
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
    default:
      page.value = 0
      break
  }

  nextTick(updateIndicator)
}

const toggleMenu = (state?: boolean) => {
  isOpen.value = state !== undefined ? state : !isOpen.value

}

const handleClickOutside = (event: MouseEvent) => {
  if (isOpen.value){
    const target = event.target as Node
    if (
      burgerMenu.value &&
      !burgerMenu.value.contains(target)
    ) {
      isOpen.value = false
    }
  }
}

watch(
  () => route.path,
  () => updatePageFromRoute(),
  { immediate: true },
)

onMounted(() => {
  window.addEventListener('load', updateIndicator)
  window.addEventListener('resize', updateIndicator)
  document.addEventListener('click', handleClickOutside);
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
    @media (min-width: 2000px) {
      width: 1600px;
      margin: 0 auto;
    }
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
            @media (max-width: 540px){
              width: 30px;
            }
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
    section {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }

  .fa-user {
    color: var(--terciary-foreground-color);
    font-size: 24px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      color: var(--primary-foreground-color);
    }
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    @media (max-width: 415px) {
      flex-direction: column;
      gap: 10px;
      align-items: stretch;
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

  .burger-header {
    display: none;
    align-items: center;
    justify-content: space-between;
    img {
      width: 70px;
    }
    .burger {
      background-color: transparent;
      border: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      .line {
        background-color: var(--terciary-foreground-color);
        width: 40px;
        height: 3px;
        border-radius: 10px;
        transition: all 0.3s ease-in-out;
        transform-origin: center;
      }
      .line.open {
        &:nth-child(1) {
          transform: translateY(13px) rotate(45deg); 
        }

        &:nth-child(2) {
          opacity: 0;
          transform: translateX(-20px);
        }

        &:nth-child(3) {
          transform: translateY(-13px) rotate(-45deg);
        }
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
