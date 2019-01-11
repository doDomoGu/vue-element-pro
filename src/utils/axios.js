import axios from 'axios'
import qs from 'qs'
import { getToken } from '@/utils/authToken'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = process.env.VUE_APP_API_PREFIX

axios.interceptors.request.use(
  config => {
    //鉴权 Token传参
    const token = getToken()
    if (token != null) {
      config.headers['X-Token'] = token
    }

    // POST传参序列化
    if (config.method === 'post' && config.headers['Content-Type'] !== 'multipart/form-data') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    console.log('错误的传参')
    return Promise.reject(error)
  },
)
// code状态码200判断
/*axios.interceptors.response.use((res) => {
  if (res.status !== 200) {
    console.log(res.data.msg)
    return Promise.reject(res)
  }
  return res
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error)
})*/

export default axios
