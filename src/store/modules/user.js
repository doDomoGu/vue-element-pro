import { getInfo } from '@/api/user'

const state = {
  id: -1,
  name: null,
  roles: [],
}

const actions = {
  GetInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then((res) => {
          if ( res.data ){
            const _data = res.data
            if ( _data.code === 0) {
              commit('setInfo',_data.data)
            } else {
              commit('removeInfo')
            }
            resolve()
          }else{
            reject()
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}

const getters = {
  id: state => state.id,
  name: state => state.name,
  roles: state => state.roles,
}

const mutations = {
  setInfo: (state, data) => {
    state.id = data.id
    state.name = data.name
    state.roles = data.roles
  },
  removeInfo: (state) => {
    state.id = -1
    state.name = null
    state.roles = []
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
