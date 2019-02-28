import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'

import auth from './modules/auth'
import user from './modules/user'

import treenode from './modules/treenode'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    auth,
    user,
    treenode
  },
  state: {
    
  },
  mutations: {

  },
  actions: {

  }
})
