import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

/* element-ui */
import Element from 'element-ui'
import '@/config/element-variables.scss'
Vue.use(Element)

/* LocalStorage */
import Storage from 'vue-ls';
import { STORAGE_OPTIONS } from '@/config/constantVariables'
Vue.use(Storage, STORAGE_OPTIONS);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
