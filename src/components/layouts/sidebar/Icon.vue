<template slot="title">

  <i v-if="is_fa_icon" :class="['fa', icon]"></i>
  <i v-else :class="['el-icon-' + icon ]"></i>

  <!-- <i v-if="item.menu && item.menu.icon_fa" :class="['fa','fa-' + item.menu.icon_fa]"></i>
  <i v-else :class="['el-icon-' + ( item.menu && item.menu.icon ? item.menu.icon : 'menu' )]"></i> -->
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
  computed: {
    icon(){
      if(this.item.menu && this.item.menu.icon){
        return this.item.menu.icon
      }else{
        return 'menu'
      }
    },
    /* 判断是否为font-awesome图标 */
    is_fa_icon(){
      if(this.item.menu && this.item.menu.icon){
        return this.item.menu.icon.indexOf('fa-') == 0
      }else{
        return false
      }
    }
  }
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