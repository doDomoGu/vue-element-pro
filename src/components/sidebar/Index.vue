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
import { ADMIN_ROLE } from '@/config/constantVariables'


function hasPermission(routerRoles, userRoles) {
  if (userRoles.indexOf(ADMIN_ROLE) > -1) return true // 管理员角色 拥有所有权限
  // if (router.meta === undefined || router.meta.roles === undefined) return true  //无限制
  if (routerRoles === undefined) return true  //无限制
  return userRoles.some(role => routerRoles.indexOf(role) > -1)  //userRoles 和 routerRoles 逐一匹配，有一个符合即可
}

function filterRouterMap(routerMap, roles){
  let routes = []
  routerMap.forEach(r=>{
    console.log(' ')
    console.log(r.path)
    if(!r.hidden && hasPermission(r, roles)){
      if(r.children){
        if(r.meta===undefined){
          //if( filterRouterMap(r.children, roles) . length == 1){
            let tempMap = filterRouterMap(r.children, roles)
            for(let i in tempMap){
              routes.push(tempMap[i])
            }
          //}
        }else{
          r.children = filterRouterMap(r.children, roles)
          routes.push(r)
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