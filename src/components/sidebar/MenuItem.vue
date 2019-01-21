<template>
  <el-submenu v-if="item.children" :index="resolvePath(item.path)">
    <template slot="title">
      <i :class="'el-icon-' + ( item.menu && item.menu.icon ? item.menu.icon : 'menu' )"></i>
      <span slot="title">{{item.meta && item.meta.title ?  item.meta.title : '[请填写title]'}}</span>
    </template>
    <menu-item v-for="child in item.children" :base-path="resolvePath(item.path)" :item="child" :key="child.path" />
  </el-submenu> 
  <el-menu-item v-else :route="item" :index="resolvePath(item.path)">
    <i :class="'el-icon-' + ( item.menu && item.menu.icon ? item.menu.icon : 'menu' )"></i>
    <span slot="title">{{item.meta && item.meta.title ?  item.meta.title : '[请填写title]'}}</span>
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
      return path.resolve(this.basePath, routePath)
    },
  }
};
</script>
