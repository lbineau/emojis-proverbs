import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Panel from 'primevue/panel'
import Button from 'primevue/button'

const app = createApp(App)

const head = createHead()
app.use(head)

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
