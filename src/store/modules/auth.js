import { login, logout, checkToken } from '@/api/auth'
import { /* getToken, */ setToken, removeToken } from '@/utils/authToken'

const state = {
  loginState: false,
  loginErrorMsg: null,
  /* user_id: -1,
  user_info: {}, */
}

const actions = {
  Login ({ commit }, [username, password]) {
    return new Promise((resolve, reject) => {
      login(username, password).then((res) => {
          if ( res.data ){
            const data = res.data
            if ( data.code === 0) {
              const _data = data.data
              setToken(_data.token)
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
  // user_id: state => state.user_id,
  // user_info: state => state.user_info,
  loginState: state => state.loginState,
  loginErrorMsg: state => state.loginErrorMsg
}

const mutations = {
  // setToken: (state, data) => {
  //   state.token = data.token
  //   if (data.forceUpdate) {
  //     window.localStorage.setItem('__CHUDIAN_AUTH_TOKEN__',data.token);
  //     window.localStorage.setItem('__CHUDIAN_AUTH_TOKEN_EXPIRED__', new Date(data.expired).getTime());
  //   }
  // },
  
  // setUserId: (state, id) => {
  //   state.user_id = id
  // },
  // setUserInfo: (state, info) => {
  //   state.user_info = info
  // },
  setLoginState: (state) => {
    state.loginState = true
  },
  removeLoginState: (state) => {
    state.loginState = false
    // state.user_id = -1
    // state.user_info = {}
    // window.localStorage.removeItem('__CHUDIAN_AUTH_TOKEN__')
    // window.localStorage.removeItem('__CHUDIAN_AUTH_TOKEN_EXPIRED__')
  },
  setLoginErrorMsg: (state, msg) => {
    state.loginErrorMsg = msg
  },
  removeLoginErrorMsg: (state) => {
    state.loginErrorMsg = null
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
