<template>
  <el-menu :unique-opened=true
           :router=true
           :collapse="collapse"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           :default-active="$route.path"
           :collapse-transition=false>
    <menu-item v-for="route in routes" :item="route" :key="route.path" :base-path="route.path" />
  </el-menu>
</template>

<script>
import MenuItem from './MenuItem'
import routerMap from "@/router/routerMap"
// import { ADMIN_ROLE } from '@/config/constantVariables'


function hasPermission(router, userRoles) {
  // if (userRoles.indexOf(ADMIN_ROLE) > -1) return true // 管理员角色 拥有所有权限
  // 判断当前路由是否有角色限制选项
  if(router!==undefined && router.meta!==undefined && router.meta.roles!==undefined){
    //userRoles(当前用户角色) 和 routerRoles(当前路由对应的角色) 逐一匹配，有一个符合即可
    return userRoles.some(role => router.meta.roles.indexOf(role) > -1)  
  }else{
    //没roles信息， 无限制
    return true  
  }
}

function isHidden(router){
  if(router!==undefined && router.menu!==undefined && router.menu.hidden!==undefined){
    return router.menu.hidden
  }else{
    return false
  }
}

function isIgnore(router){
  if(router!==undefined && router.menu!==undefined && router.menu.ignore!==undefined){
    return router.menu.ignore
  }else{
    return false
  }
}

function filterRouterMap(routerMap, roles){
  let routes = []
  routerMap.forEach(r=>{
    if(!isHidden(r) && hasPermission(r, roles)){
      if(r.children){
        if(!isIgnore(r)){
          r.children = filterRouterMap(r.children, roles)
          routes.push(r)
        }else{
          let tempMap = filterRouterMap(r.children, roles)
          for(let i in tempMap){
            routes.push(tempMap[i])
          }
        }
      } else{
        routes.push(r)
      }
    }
  })
  return routes
}

export default {
  name : "sidebar",
  components: { MenuItem },
  computed: {
    routes() {
      return filterRouterMap(routerMap, this.$store.getters['user/roles'])
    },
    collapse() {
      return this.$store.getters['common/collapse']
    }
  },
  methods: {
  }
};
</script>
<style scoped>
.el-menu {
  height: 100%;
  width: 100%;
  border: none;
}
</style>