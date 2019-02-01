import { resolvePath } from '@/utils/path'

export function hasPermission(router, userRoles) {
  // 判断当前路由是否有角色限制选项
  if(router!==undefined && router.meta!==undefined && router.meta.roles!==undefined){
    //userRoles(当前用户角色) 和 routerRoles(当前路由对应的角色) 逐一匹配，有一个符合即可
    return userRoles.some(role => router.meta.roles.indexOf(role) > -1)  
  }else{
    //没roles信息， 无限制
    return true  
  }
}

export function isHidden(router){
  if(router!==undefined && router.menu!==undefined && router.menu.hidden!==undefined){
    return !!router.menu.hidden
  }else{
    return false
  }
}

export function isIgnore(router){
  if(router!==undefined && router.menu!==undefined && router.menu.ignore!==undefined){
    return !!router.menu.ignore
  }else{
    return false
  }
}

export function filterRouterMap(routerMap, roles){
  let routes = []
  routerMap.forEach(r=>{
    if(!isHidden(r) && hasPermission(r, roles)){
      if(r.children){
        //r.children = filterRouterMap(r.children, roles)
        if(!isIgnore(r)){
          r.children = filterRouterMap(r.children, roles)
          routes.push(r)
        }else{
          const tempMap = filterRouterMap(r.children, roles)
          for(let i in tempMap){
            tempMap[i].path = resolvePath(r.path, tempMap[i].path)
            routes.push(tempMap[i])
          }
        }
      } else{
        routes.push(r)
      }
      // routes.push(r)
    }
  })
  return routes
}
