import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

router.beforeEach((to, from, next) => {
    document.title = to.meta.title == undefined ? '': "Page | " + to.meta.title  || 'Title';
    next();
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
