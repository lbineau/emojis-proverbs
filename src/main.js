import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Panel from 'primevue/panel'
import Button from 'primevue/button'

import Random from './views/Random.vue'
import List from './views/List.vue'

const app = createApp(App)

const head = createHead()
app.use(head)

const routes = [
  { path: '/', component: Random },
  { path: '/list', component: List }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.mode-dark'
    }
  }
})

app.component('Panel', Panel)
app.component('Button', Button)

app.mount('#app')
