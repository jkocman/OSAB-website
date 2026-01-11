import AboutPage from '@/views/AboutPage.vue'
import BeatmapsPage from '@/views/BeatmapsPage.vue'
import DownloadPage from '@/views/DownloadPage.vue'
import HomePage from '@/views/HomePage.vue'
import BeatmapDetailPage from '@/views/BeatmapDetailPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import BeatmapDashboard from '@/views/BeatmapDashboard.vue'

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
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { layout: 'auth' },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { layout: 'auth' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: BeatmapDashboard,
      meta: {
        requiresAuth: true
      }
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuth()) {
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.layout == 'auth' && isAuth()) {
    next("/dashboard");
  } else {
    next();
  }
});

const isAuth = () => {
  if(localStorage.getItem("token")){
    return true;
  }
  else {
    return false;
  }
}

export default router
