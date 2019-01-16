<template>
  <el-container>
    <el-aside :style="{width:aSideWidth}">
      <sidebar/>  
    </el-aside>
    <el-container>
      <el-header>
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <el-button @click="logout">退出</el-button>
      </el-header>
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
import Sidebar from '@/components/sidebar/Index'
export default {
  name: 'BasicLayout',
  components: { Sidebar },
  data(){
    return {
      aSideWidth : '300px'
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('auth/Logout').then(()=>{
        if(!this.$store.getters['auth/loginState']){
          this.$router.push({name:'login'})
        }
      })
    },
    // 侧边栏折叠
    collapseChage(){
        this.$store.commit('common/SetCollapse', !this.$store.getters['common/collapse'])
        if(this.$store.getters['common/collapse']){
          this.aSideWidth = '64px';
        }else{
          this.aSideWidth = '300px';
        }
    },
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
.el-header {
  text-align: center;
  line-height: 60px;
  background: #b3c0d1;
  .collapse-btn {
    float: left;
    cursor: pointer;
    line-height: 60px;
  }
}

.el-footer {
  text-align: center;
  line-height: 60px;
  background: #b3c0d1;
}
</style>