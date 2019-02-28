import axios from '@/utils/axios'

export function get(params) {
  return axios.get(
    '/treenode',
    {
      params:params
    }
  )
}