import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import en from 'element-plus/es/locale/lang/en'

const app = createApp(App)
app.use(ElementPlus, {
    locale: en
})
app.use(createPinia())
app.use(router)
app.mount('#app')