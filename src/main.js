import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Panel from 'primevue/panel'
import Button from 'primevue/button'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.component('Panel', Panel)
app.component('Button', Button)

app.mount('#app')
