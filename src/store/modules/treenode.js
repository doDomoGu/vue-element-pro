import { get } from '@/api/treenode'

const state = {
  data: []
}

const actions = {
  Get ({ commit }, params) {
    return new Promise((resolve, reject) => {
      get(params).then((res) => {
          if ( res.data ){
            const _data = res.data
            if ( _data.code === 0) {
              commit('setData',_data.data)
            } else {
              commit('removeData')
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
  data: state => state.data
}

const mutations = {
  setData: (state, data) => {
    
    /* data.forEach(d=>{

    }) */



    state.data = data
  },
  removeData: (state) => {
    state.data = []
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
