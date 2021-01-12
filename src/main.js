import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.directive('autofocus', {
  mounted(el) {
    el.focus()
  }
})

app.use(router).mount('#app')
