<template>
  <el-tabs tab-position="left" v-model="tabSelected">
    <template v-for="item in menuList">
      <el-tab-pane :label="item.label" :name="item.name">
        <markdown>
          <component v-bind:is="'md-' + item.name"></component>
        </markdown>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>
<script>
import markdown from '@/components/markdown'
import mdMenu from './Menu.md'
import mdMock from './Mock.md'
import mdTheme from './Theme.md'
import mdTheme2 from './Theme-2.md'

export default {
  components: { 
    markdown,
    mdMenu,
    mdMock,
    mdTheme,
    mdTheme2
  },
  name: 'document',
  data(){
    return {
      menuList : [
        { name: 'menu' , label:'侧边栏菜单' },
        { name: 'mock' , label:'Mock(模拟数据)' },
        { name: 'theme' , label:'自定义主题' },
        { name: 'theme-2' , label:'动态皮肤' },
      ],
      s : mdMock,
      tabSelected: 'menu'
    }
  },
  created(){
    if(this.$route.params && this.$route.params.tabSelected){
      this.tabSelected = this.$route.params.tabSelected
    }
  }
}
</script>