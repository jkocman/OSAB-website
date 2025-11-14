import AboutPage from '@/views/AboutPage.vue'
import BeatmapsPage from '@/views/BeatmapsPage.vue'
import DownloadPage from '@/views/DownloadPage.vue'
import HomePage from '@/views/HomePage.vue'
import BeatmapDetailPage from '@/views/BeatmapDetailPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/beatmaps',
      name: 'beatmaps',
      component: BeatmapsPage,
    },
    {
      path: '/beatmaps/:id',
      name: 'beatmap-detail',
      component: BeatmapDetailPage,
      props: true,
    },
    {
      path: '/download',
      name: 'download',
      component: DownloadPage,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
