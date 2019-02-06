import { getList } from '@/api/address'

const state = {
  list:[]
}

const actions = {
  GetList ({ commit }) {
    return new Promise((resolve, reject) => {
      getList().then((res) => {
          if ( res.data ){
            const _data = res.data
            if ( _data.code === 0) {
              commit('setList',_data.data)
            } else {
              commit('removeList')
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
  list: state => state.list
}

const mutations = {
  setList: (state, data) => {
    state.list = data
  },
  removeInfo: (state) => {
    state.list = []
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
