import url from 'url'
import qs from 'qs'

import { AUTH_TOKEN_KEY } from '@/config/constantVariables'
import users from './models/user'

export function return_format(code, data, msg){
  return {
    "code" : code,
    "data" : data,
    "msg"  : msg
  }
}

export function getToken(_url) {
  const urlObj = url.parse(_url)
  const urlQuery = qs.parse(urlObj.query)
  return urlQuery[AUTH_TOKEN_KEY]
}

export function checkToken(_url) {
  const urlObj = url.parse(_url)
  const urlQuery = qs.parse(urlObj.query)
  const token = urlQuery[AUTH_TOKEN_KEY]

  let flag = false
  if(token){
    for(let i in users){
      if(users[i].token == token){
        flag = true
      }
    }
  }
  
  return flag
}

export function getParams(_url){
  const urlObj = url.parse(_url)
  return qs.parse(urlObj.query)
}