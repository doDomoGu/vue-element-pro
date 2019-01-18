<template>
  <el-header>
    <div class="collapse-btn" @click="collapseChage">
        <i class="el-icon-caret-right" v-if="collapse"></i>
        <i class="el-icon-caret-left" v-if="!collapse"></i>
    </div>
    <el-button @click="logout">退出</el-button>
  </el-header>
</template>
<script>
export default {
  name : "my-header",
  computed: {
    // 是否折叠
    collapse() {
      return this.$store.getters['common/collapse']
    }
  },
  methods: {
    // 侧边栏折叠
    collapseChage(){
      this.$store.commit('common/SetCollapse', !this.collapse)
      if(this.collapse){
        this.$store.commit('common/SetASideWidth','64px');
      }else{
        this.$store.commit('common/SetASideWidth','300px');
      }
    },
    // 登出操作
    logout(){
      this.$store.dispatch('auth/Logout').then(()=>{
        if(!this.$store.getters['auth/loginState']){
          this.$router.push({name:'login'})
        }
      })
    }
  }
};
</script>
<style lang='scss' scoped>
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

</style>