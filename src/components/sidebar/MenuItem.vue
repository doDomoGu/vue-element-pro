<template>
  <el-submenu v-if="item.children" :index="resolvePath(item.path)">
    <template slot="title">
      <i :class="'el-icon-' + ( item.meta && item.meta.icon ? item.meta.icon : 'menu' )"></i>
      <span slot="title">{{item.meta.title}}</span>
    </template>
    <menu-item v-for="child in item.children" :base-path="resolvePath(item.path)" :item="child" :key="child.path" />
  </el-submenu> 
  <el-menu-item v-else :route="item" :index="resolvePath(item.path)">
    <i :class="'el-icon-' + ( item.meta && item.meta.icon ? item.meta.icon : 'menu' )"></i>
    <span slot="title">{{item.meta.title}}</span>
    
    </el-menu-item>
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
  methods: {
    resolvePath(routePath) {
      /* console.log('')
      console.log('===')
      console.log(this.basePath,routePath)
      console.log(path.resolve(this.basePath, routePath)) */
      return path.resolve(this.basePath, routePath)
    },
  }
};
</script>
