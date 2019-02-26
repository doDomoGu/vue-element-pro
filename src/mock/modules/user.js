import { return_format, getToken } from '../utils'
import users from '../models/user'

export default {
  list: config => {
    const token = getToken(config.url)

    let flag = false
    let code = 0
    let data = null
    let msg = null

    if(token){
      for(let i in users){
        if(users[i].token == token){
          flag = true
        }
      }
    }
    
    if(!flag) {
      code = 1001
      msg = 'Token 错误'
    }else{
      data = {
        list: users,
        total: users.length
      }
    }
    return return_format(code, data, msg)
  },
  
}
