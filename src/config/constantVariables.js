/* 用户角色 路由权限控制 */  
export const ADMIN_ROLE = 'admin'
export const USER_ROLE = 'user'

export const ADMIN_ROLE_ID = 1
export const USER_ROLE_ID = 2

export const ROLE_LIST = {
  [ADMIN_ROLE_ID] : ADMIN_ROLE,
  [USER_ROLE_ID] : USER_ROLE,
}

/* localstorage 所使用的参数 */
export const STORAGE_OPTIONS = {
  namespace: 'vuejs__', // 前缀
  name: 'ls', // 属性调用别名 Vue.[ls] or this.[$ls],
  storage: 'local' // 存储模式 (session, local, memory)
}
export const AUTH_TOKEN_KEY = "X-TOKEN"  //token-Key 用于api调用 鉴权