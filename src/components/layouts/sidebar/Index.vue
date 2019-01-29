<template>
  <v-menu :routes="routes" :collapse="collapse" />
</template>

<script>
import routerMap from "@/router/routerMap"   //路由配置
import vMenu from "./menu/Index"             //菜单组件
import { filterRouterMap } from "@/utils/router"              //路由工具函数

export default {
  name : "sidebar",
  components: { vMenu },
  computed: {
    routes() {
      /* const s = filterRouterMap(routerMap, this.$store.getters['user/roles'])
      console.log(s)
      return s */
      return filterRouterMap(routerMap, this.$store.getters['user/roles'])
    },
    collapse() {
      return this.$store.getters['common/collapse']
    }
  }
}
</script>