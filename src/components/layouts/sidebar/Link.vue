<template slot="title">
  <i v-if="item.menu && item.menu.icon_fa" :class="['fa','fa-' + item.menu.icon_fa]"></i>
  <i v-else :class="['el-icon-' + ( item.menu && item.menu.icon ? item.menu.icon : 'menu' )]"></i>
</template>
<script>
export default {
  name: 'ItemIcon',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
}
</script>
<style lang='scss' scoped>
.fa {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
</style>