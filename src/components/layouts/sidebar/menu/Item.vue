<template>
  <el-menu-item :route="item" :index="resolvePath(basePath, item.path)">
    <v-icon :item="item" />
    <span >{{item.meta && item.meta.title ?  item.meta.title : '[请填写title]'}}</span>
  </el-menu-item>
</template>
<script>
import { resolvePath } from './path'
import vIcon from './Icon'

export default {
  name: 'menu-item',
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
  },
  components: { vIcon }
};
</script>
