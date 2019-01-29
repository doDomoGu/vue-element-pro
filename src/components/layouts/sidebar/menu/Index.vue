<template>
  <el-menu :unique-opened=true
           :router=true
           :collapse="collapse"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           :default-active="$route.path"
           :collapse-transition=false>
    <template v-for="route in routes" >
      <v-submenu v-if="route.children" :item="route" :key="route.path" :base-path="route.path" />
      <v-item v-else :item="route" :key="route.path" />
    </template>
  </el-menu>
</template>

<script>
import vItem from './Item'                //菜单项组件
import vSubmenu from './Submenu'              //子菜单组件

export default {
  name : "sidebar-menu",
  components: { vItem, vSubmenu },
  props: {
    routes: {
      type: Array,
      required: []
    },
    collapse: {
      type: Boolean,
      default: false
    }
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