import { login, logout, checkToken, getUserInfo } from '@/api/auth'
import { /* getToken, */ setToken, removeToken } from '@/utils/authToken'

const state = {
  loginState: false,
  loginErrorMsg: null,
  userInfo:{}
}

const actions = {
  Login ({ commit }, [account, password]) {
    return new Promise((resolve, reject) => {
      login(account, password).then((res) => {
          if ( res.data ){
            const data = res.data
            if ( data.code === 0) {
              const _data = data.data
              setToken(_data.api_key)
              commit('setLoginState')
              commit('removeLoginErrorMsg')
            } else {
              removeToken()
              commit('removeLoginState')
              commit('setLoginErrorMsg', data.msg)
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
  CheckToken ({ commit }, token) {
    return new Promise((resolve, reject) => {
      checkToken(token)
        .then((res) => {
          if ( res.data ){
            const data = res.data
            if ( data.code === 0) {
              setToken(token)
              commit('setLoginState')
            } else {
            // 提交的token 错误
              removeToken()
              commit('removeLoginState')
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
  GetInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then((res) => {
          if ( res.data ){
            const _data = res.data
            if ( _data.code === 0) {
              commit('setUserInfo',_data.data)
            } else {
              commit('removeUserInfo')
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
  Logout ({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then((res) => {
            if (res.data && res.data.code === 0) {
              removeToken()
              commit('removeLoginState')
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
  }
}

const getters = {
  loginState: state => state.loginState,
  loginErrorMsg: state => state.loginErrorMsg,
  userInfo: state => state.userInfo
}

const mutations = {
  setLoginState: (state) => {
    state.loginState = true
  },
  removeLoginState: (state) => {
    state.loginState = false
  },
  setLoginErrorMsg: (state, msg) => {
    state.loginErrorMsg = msg
  },
  removeLoginErrorMsg: (state) => {
    state.loginErrorMsg = null
  },
  setUserInfo: (state, data) => {
    state.userInfo = data
  },
  removeUserInfo: (state) => {
    state.userInfo = {}
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
