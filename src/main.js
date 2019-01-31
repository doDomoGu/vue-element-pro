import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import '@/assets/index.css'

import '@/assets/custom-theme/purple/styles/index.css' 
import '@/assets/custom-theme/teal/styles/index.css' 

/* element-ui */
import '@/config/element-variables.scss'
import Element from 'element-ui'
Vue.use(Element)

/* LocalStorage 本地储存 */
import Storage from 'vue-ls';
import { STORAGE_OPTIONS } from '@/config/constantVariables'
Vue.use(Storage, STORAGE_OPTIONS);

/* Font Awesome 图标 */
import 'font-awesome/css/font-awesome.min.css'

/* mockjs 开发模拟后端接口 */
if(process.env.VUE_APP_MOCK_ENABLE === 'TRUE'){
  const axios = require('@/utils/axios')
  require('@/mock/index')
  Vue.prototype.$http = axios
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
