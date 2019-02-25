import { getList } from '@/api/user'
import { ROLE_LIST } from '@/config/constantVariables'

const state = {
  list: [],
  total: 0
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
  list: state => {
    state.list.map( ( item )=> {
      item.role_name = ROLE_LIST[item.role_id] ? ROLE_LIST[item.role_id] : 'N/A'
      return item
    })
    return state.list
  },
}

const mutations = {
  setList: (state, data) => {
    state.list = data.list
    state.total = data.total
  },
  removeList: (state) => {
    state.list = []
    state.total = 0
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
