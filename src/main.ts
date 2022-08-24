import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/common/css/common.scss'
import 'view-ui-plus/dist/styles/viewuiplus.css'

router.beforeEach((to, from, next) => {
  const userInfo = store.getters.userInfo
  if (!userInfo || !Object.keys(userInfo).length) {
    store.dispatch('getUserInfo')
  }
  next()
})

const app = createApp(App)

app.config.globalProperties.$message = ViewUIPlus.Message

app.use(store).use(router).use(ViewUIPlus).mount('#app')
