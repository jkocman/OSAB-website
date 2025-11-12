import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/styles/reset.scss'
import './assets/styles/variables.scss'
import './assets/styles/base.scss'

const app = createApp(App)

import Header from './components/sections/Header.vue'
app.component('Header', Header)
import Footer from './components/sections/Footer.vue'
app.component('Footer', Footer)
import Button from './components/ui/Button.vue'
app.component('Button', Button)
import Input from './components/ui/Input.vue'
app.component('Input', Input)
import ImageButton from './components/ui/ImageButton.vue'
app.component('ImageButton', ImageButton)
import Article from './components/ui/Article.vue'
app.component('Article', Article)
import BeatmapPreview from './components/ui/BeatmapPreview.vue'
app.component('BeatmapPreview', BeatmapPreview)

app.use(createPinia())
app.use(router)

app.mount('#app')
