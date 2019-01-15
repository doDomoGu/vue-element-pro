<template>
  <el-menu :unique-opened=true
           :router=true
           :collapse="isCollapse"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b">
    <menu-item v-for="route in routes" :item="route" :key="route.path" :base-path="route.path" />
  </el-menu>
</template>

<script>
import MenuItem from './MenuItem'
import routerMap from "@/router/routerMap"

export default {
  name : "sidebar",
  components: { MenuItem },
  computed: {
    routes() {
      let routes = []
      routerMap.forEach(r=>{
        if(!r.hidden){
          routes.push(r)
        }
      })
      return routes
    },

    isCollapse() {
      return false //!this.sidebar.opened
    }
  },
  methods: {
  }
};
</script>

<style scoped>
.el-menu {
  height: 100%;
}
</style>