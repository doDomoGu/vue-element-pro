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

function hasPermission(router, roles) {
  if (roles.indexOf(ADMIN_ROLE) > -1) return true // 管理员角色 拥有所有权限
  if (router.meta === undefined || router.meta.roles === undefined) return true  //无限制
  return roles.some(role => router.meta.roles.indexOf(role) > -1)  //roles 和 router.meta.roles 逐一匹配，有一个符合即可
}

function filterRouterMap(routerMap, roles){
  let routes = []
  routerMap.forEach(r=>{
    if(!r.hidden && hasPermission(r, roles)){
      if(r.children && r.children.length > 0) {
        r.children = filterRouterMap(r.children, roles)
      }
      routes.push(r)
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