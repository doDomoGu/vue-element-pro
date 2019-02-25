import axios from '@/utils/axios'

export function login(account, password) {
  const data = {
    account,
    password,
  }
  return axios.post(
    '/auth/login',
    data
  )
}

export function checkToken(key) {
  const data = {
    key
  }
  return axios.post(
    '/auth/token-verification',
    data
  )
}

export function getUserInfo() {
  return axios.get(
    '/auth/info'
  )
}

export function logout() {
  return axios.delete(
    '/auth/logout'
  )
}

