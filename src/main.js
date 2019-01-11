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
Vue.use(Storage, {
    namespace: 'vuejs__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
