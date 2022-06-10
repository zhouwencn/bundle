import { createApp } from 'vue'
import App from './App'
const app = createApp(App)
import router from './routers'

app.use(router)

app.mount('#app')
