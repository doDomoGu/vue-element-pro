import axios from '@/utils/axios'

export function getList() {
  return axios.get(
    '/user/list'
  )
}