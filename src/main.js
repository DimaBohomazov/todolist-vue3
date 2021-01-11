import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'

const app = createApp(App)

app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.use(router).mount('#app')
