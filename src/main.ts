import { createApp } from 'vue'
import { createPinia } from 'pinia'
// General Font
import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
