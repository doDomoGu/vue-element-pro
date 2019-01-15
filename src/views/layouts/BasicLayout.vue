<template>
  <el-container>
    <el-aside :width="'200px'">
      <sidebar/>  
    </el-aside>
    <el-container>
      <el-header>
        This is Header
        <el-button @click="logout">退出</el-button>
      </el-header>
      <router-view/>
      <el-footer>
        This is Footer
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import Sidebar from '@/components/sidebar/Index'
export default {
  name: 'BasicLayout',
  components: { Sidebar },
  methods:{
    logout(){
      this.$store.dispatch('auth/Logout').then(()=>{
        if(!this.$store.getters['auth/loginState']){
          this.$router.push({name:'login'})
        }
      })
    }
  }
}
</script>
<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  text-align: center;
  line-height: 60px;
}
.el-footer {
  text-align: center;
  line-height: 60px;
}
</style>