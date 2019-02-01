import axios from 'axios'
import qs from 'qs'
import { getToken } from '@/utils/authToken'
import { AUTH_TOKEN_KEY } from '@/config/constantVariables'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
if(process.env.VUE_APP_MOCK_ENABLE != 'TRUE'){
  axios.defaults.baseURL = process.env.VUE_APP_API_PREFIX
}
axios.interceptors.request.use(
  config => {
    console.log(config) 
    // qs.
    //鉴权 Token传参
    const token = getToken()
    if (token != null) {

      config.headers[AUTH_TOKEN_KEY] = token

      /* if(process.env.VUE_APP_MOCK_ENABLE != 'TRUE'){
        config.headers[AUTH_TOKEN_KEY] = token
      }else{
        if(config.data == undefined){
          config.data = {}
        }
        config.data[AUTH_TOKEN_KEY] = token
      } */
    }

    // POST传参序列化
    if (config.method === 'post' && config.headers['Content-Type'] !== 'multipart/form-data') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    // console.log('错误的传参')
    return Promise.reject(error)
  },
)

//Mock 拦截请求打印response
if(process.env.VUE_APP_MOCK_ENABLE == 'TRUE'){
  axios.interceptors.response.use((res) => {
    console.log(res.data)
    return res
  }, (error) => {
    // console.log('网络异常')
    return Promise.reject(error)
  })
}

export default axios
