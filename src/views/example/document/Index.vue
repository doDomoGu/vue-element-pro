<template>
  <el-tabs tab-position="left" v-model="tabSelected">
    <el-tab-pane label="侧边栏菜单" name="menu">
      <markdown>
        <md-menu />
      </markdown>
    </el-tab-pane>
    <el-tab-pane label="Mockjs" name="mock">
      <markdown>
        <md-mock />
      </markdown>
    </el-tab-pane>
    <el-tab-pane label="自定义主题" name="theme">
      <markdown>
        <md-theme />
      </markdown>
    </el-tab-pane>
    <el-tab-pane label="动态皮肤" name="theme-2">
      <markdown>
        <md-theme2 />
      </markdown>
    </el-tab-pane>
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