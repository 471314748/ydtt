import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload, Toast, AddressList, Area, Cell, CellGroup, Popup, Field, Picker, Dialog } from 'vant'

import 'vant/lib/index.css'
import './style/icon.css'

// 导入过滤器
import './utils/myfilter'


Vue.config.productionTip = false

Vue.use(Vant)

Vue.use(Lazyload, Toast, AddressList, Area, Cell, CellGroup, Popup, Field, Picker, Dialog)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
