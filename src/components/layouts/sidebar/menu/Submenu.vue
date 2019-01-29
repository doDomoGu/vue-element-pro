<template>
  <!-- 子菜单 -->
  <el-submenu :index="basePath">
    <!-- 当前节点 slot=title 插槽-->
    <template slot="title">
      <v-icon :item="item" />
      <span>{{item.meta && item.meta.title ?  item.meta.title : '[请填写title]'}}</span>
    </template>
    <!-- 当前节点 结束 -->
    <!-- 递归子节点 开始-->
    <template v-for="subitem in item.children" >
      <v-submenu v-if="subitem.children" :item="subitem" :key="subitem.path" :base-path="resolvePath(basePath, subitem.path)" />
      <v-item v-else :item="subitem" :key="subitem.path" :base-path="basePath" />
    </template>
    <!-- 递归子节点 结束-->
  </el-submenu>
</template>

<script>
import { resolvePath } from './path'
import vItem from './Item.vue'            //菜单项组件
import vIcon from './Icon'                //图标组件

export default {
  name: 'menu-submenu',
  components: { vIcon, vItem },
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
    resolvePath
  }
};
</script>
