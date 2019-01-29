<template>
  <i :class="iconClass"></i>
</template>
<script>
export default {
  name: 'menu-icon',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      defaultIcon : 'menu'
    }
  },
  computed: {
    iconClass(){
      if(this.item.menu && this.item.menu.icon){
        if(this.item.menu.icon.indexOf('fa-') == 0){
          //font-awesome 图标
          return ['fa', this.item.menu.icon]
        }else{
          //element-ui 图标
          return ['el-icon-'+this.item.menu.icon]
        }
      }else{
        //没有配置项 返回默认配置
        return ['el-icon-'+this.defaultIcon]
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