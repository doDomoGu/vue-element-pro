import Vue from 'vue'
import { AUTH_TOKEN_KEY } from '@/config/constantVariables'

export function getToken() {
  return Vue.ls.get(AUTH_TOKEN_KEY)
}

export function setToken(token) {
  return Vue.ls.set(AUTH_TOKEN_KEY, token)
}

export function removeToken() {
  return Vue.ls.remove(AUTH_TOKEN_KEY)
}