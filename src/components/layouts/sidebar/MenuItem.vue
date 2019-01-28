<template>
  <div v-if="item.menu && item.menu.ignore" >
    <menu-item v-for="child in item.children" :base-path="resolvePath(item.path)" :item="child" :key="child.path" />
  </div>
  <div v-else >
    <!-- 子菜单 -->
    <el-submenu v-if="item.children" :index="resolvePath(item.path)">
      <!-- 当前节点 slot=title 插槽-->
      <template slot="title">
        <v-icon :item="item" />
        <span>{{item.meta && item.meta.title ?  item.meta.title : '[请填写title]'}}</span>
      </template>
      <!-- 当前节点 结束 -->
      <!-- 递归子节点 开始-->
      <menu-item v-for="child in item.children" :base-path="resolvePath(item.path)" :item="child" :key="child.path" />
      <!-- 递归子节点 结束-->
    </el-submenu>
    <!-- 叶节点 开始 -->
    <el-menu-item v-else :route="item" :index="resolvePath(item.path)">
      <v-icon :item="item" />
      <span >{{item.meta && item.meta.title ?  item.meta.title : '[请填写title]'}}</span>
    </el-menu-item>
    <!-- 叶节点 结束 -->
  </div>
</template>
<script>
import path from 'path'
import vIcon from './Icon'

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
  },
  components: { vIcon }
};
</script>
