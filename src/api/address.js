import axios from '@/utils/axios'

export function getList() {
  return axios.get(
    '/address/list'
  )
}

/* export function logout() {
  return axios.delete(
    '/auth/logout'
  )
} */

// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token },
//   })
// }