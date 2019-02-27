import qs from 'qs'
import { return_format, getToken, checkToken } from '../utils'

import users from '../models/user'

export default {
  login: config => {
    const { account, password } = qs.parse(config.body)
    let user = null
    for(let i in users){
      if(users[i].account == account){
        user = users[i]
      }
    }

    let code = 0
    let data = null
    let msg = null
    if(user){
      if(user.password == password){
        data = {
          "api_key" : user.token
        }
      }else{
        code = 1001
        msg = '密码错误'
      }
    }else{
      code = 1002
      msg = '用户不存在'
    }
    return return_format(code, data, msg)
  },
  tokenVerification: config => {
    const { key } = qs.parse(config.body)
    let flag = false
    for(let i in users){
      if(users[i].token == key){
        flag = true
      }
    }
    let code = 0
    let data = null
    let msg = null
    if(!flag) {
      code = 1001
      msg = 'Token 错误'
    }
    return return_format(code, data, msg)
  },
  logout: config => {
    let code = 0
    let data = null
    let msg = null

    if(!checkToken(config.url)){
      code = 1001
      msg = 'Token 错误'
    }
    return return_format(code, data, msg)
  },
  info: config => {
    let code = 0
    let data = null
    let msg = null

    if(checkToken(config.url)){
      const token = getToken(config.url)
      for(let i in users){
        if(users[i].token == token){
          data = users[i]
        }
      }
    }else{
      code = 1001
      msg = 'Token 错误'
    }
    
    return return_format(code, data, msg)
  },
}
