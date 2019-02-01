import qs from 'qs'
import { return_format } from '../utils'

import users from '../models/user'

export default {
  login: config => {
    const { username, password } = qs.parse(config.body)
    let user = null
    for(let i in users){
      if(users[i].username == username){
        user = users[i]
      }
    }

    let code = 0
    let data = null
    let msg = null
    if(user){
      if(user.password == password){
        data = {
          "userId": user.id,
          "token" : user.token
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
  checkToken: config => {
    const { token } = qs.parse(config.body)
    let flag = false
    for(let i in users){
      if(users[i].token == token){
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
  /* getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  }, */
  logout: () => 'success'
}
