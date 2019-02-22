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

export function checkToken(token) {
  const data = {
    token
  }
  return axios.post(
    '/auth/check-token',
    data
  )
}

export function getUserInfo() {
  return axios.get(
    '/auth/user-info'
  )
}

export function logout() {
  return axios.delete(
    '/auth/logout'
  )
}

