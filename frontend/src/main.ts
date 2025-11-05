import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/styles/reset.scss'
import './assets/styles/variables.scss'
import './assets/styles/base.scss'

const app = createApp(App)

import Header from './components/nav/Header.vue'
app.component('Header', Header)
import Button from './components/ui/Button.vue'
app.component('Button', Button)
import Input from './components/ui/Input.vue'
app.component('Input', Input)

app.use(createPinia())
app.use(router)

app.mount('#app')
