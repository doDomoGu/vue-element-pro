<template>
  <el-submenu v-if="item.children" :index="item.path">
    <template slot="title">
      <i :class="'el-icon-' + ( item.meta && item.meta.icon ? item.meta.icon : 'menu' )"></i>
      <span slot="title">{{item.meta.title}}</span>
    </template>
    <menu-item v-for="child in item.children" :base-path="basePath" :item="child" :key="child.path" />
  </el-submenu> 
  <el-menu-item v-else :index="resolvePath(item.path)">{{item.meta.title}}</el-menu-item>

  <!-- <el-menu-item  :index="route.path">
        <i :class="'el-icon-' + ( route.meta && route.meta.icon ? route.meta.icon : 'menu' )"></i>
        <span slot="title"></span>
  </el-menu-item> -->
</template>


<script>
import path from 'path'
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  created(){
    
  },
  computed: {
    
  },
  methods: {
    resolvePath(routePath) {
      console.log(this.basePath,routePath)
      return path.resolve(this.basePath, routePath)
    },
  }
};
</script>
