import '@/assets/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Vue3Mq } from 'vue3-mq'

import { breakpoints } from './breakpoints.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Mq, {
  breakpoints
})

app.mount('#app')
