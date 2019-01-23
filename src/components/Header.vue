<template>
  <el-header>
    <div class="header-left">
      
        <!-- <i :class="['collapse-btn','el-icon-caret-' + (collapse?'right':'left')]" @click="collapseChage" ></i> -->
        <!-- <i :class="['collapse-btn','el-icon-caret-right',(collapse ? 'collapsed' : 'no-collapse')]" @click="collapseChage" ></i> -->
        <i :class="['collapse-btn','fa','fa-bars',(collapse ? 'collapsed' : 'no-collapse')]" @click="collapseChage" ></i>
    </div>
    <div class="header-right">
      
      <div class="user-action" >
        <!-- 用户头像 -->
        <img class="user-avatar" src="/user_avatar.png">
        <!-- 下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                {{username}} <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出账号</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
      
    </div>
  </el-header>
</template>
<script>
export default {
  name : "my-header",
  computed: {
    // 是否折叠
    collapse() {
      return this.$store.getters['common/collapse']
    },
    username() {
      return this.$store.getters['user/name']
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
    handleCommand(command) {
      // 登出操作
      if(command === 'logout'){
        this.$store.dispatch('auth/Logout').then( () => {
          if(!this.$store.getters['auth/loginState']){
            this.$router.push({name:'login'})
          }
        })
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.el-header {
  text-align: center;
  line-height: 60px;
  background: #b3c0d1;
  
  .header-left {
    float: left;
    .collapse-btn {
      cursor: pointer;
      line-height: 60px;
      &.collapsed {
        transform: rotate(90deg);
        transition: .38s;
        // transform-origin: 50% 50%;
      }
    }
  }
  .header-right {
    float: right;
    .user-action {
      float: right;
      .user-avatar {
        margin: 10px;
        width: 40px;
        height: 40px;
        background: #eee;
        border-radius: 4px;
      }
      .user-name { 
        float: right;
        margin: 10px 0;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
      }
    }
    
  }
}

</style>