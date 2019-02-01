import qs from 'qs'
import { return_format } from '../utils'

import users from '../models/user'

export default {
  info: config => {
    console.log(config)
    console.log(qs.parse(config.body))

    // const { {'X-Token'} } = qs.parse(config.body)

    let flag = false
    /* for(let i in users){
      if(users[i].token == token){
        flag = true
      }
    } */
    let code = 0
    let data = null
    let msg = null
    if(!flag) {
      code = 1001
      msg = 'Token 错误'
    }
    return return_format(code, data, msg)
  },
  
}
