<template>
  <el-container>
    <el-aside :style="{width:aSideWidth}">
      <v-sidebar/>  
    </el-aside>
    <el-container direction="vertical">
      <v-header/>
      <el-main>
        <router-view/>
      </el-main>
      <!-- <el-footer>
          This is Footer
      </el-footer> -->
    </el-container>
  </el-container>
</template>
<script>
import vSidebar from '@/components/sidebar/Index'
import vHeader from '@/components/Header'
export default {
  name: 'BasicLayout',
  components: { vSidebar, vHeader },
  data(){
    return {
    }
  },
  computed: {
    aSideWidth() {
      return this.$store.getters['common/aSideWidth']
    }
  },
  methods:{
  }
}
</script>
<style lang='scss' scoped>
.el-container {
  height: 100%;
}
.el-aside {
  -webkit-transition: width .3s;
  transition: width .3s;
}
.el-footer {
  text-align: center;
  line-height: 60px;
  background: #b3c0d1;
}
</style>