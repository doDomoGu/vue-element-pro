import { return_format, checkToken } from '../utils'
import users from '../models/user'

export default {
  list: config => {
    let code = 0
    let data = null
    let msg = null

    if(checkToken(config.url)){
      data = {
        list: users,
        total: users.length
      }
    }else{
      code = 1001
      msg = 'Token 错误'
    }
      
    return return_format(code, data, msg)
  },
  
}
