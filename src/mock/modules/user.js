import { return_format, getToken } from '../utils'
import users from '../models/user'

export default {
  info: config => {
    const token = getToken(config.url)

    let flag = false
    let code = 0
    let data = null
    let msg = null

    if(token){
      for(let i in users){
        if(users[i].token == token){
          flag = true
          data = users[i]
        }
      }
    }
    
    if(!flag) {
      code = 1001
      msg = 'Token 错误'
    }
    return return_format(code, data, msg)
  },
  
}
