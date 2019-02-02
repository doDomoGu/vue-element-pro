import url from 'url'
import qs from 'qs'

import { AUTH_TOKEN_KEY } from '@/config/constantVariables'


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