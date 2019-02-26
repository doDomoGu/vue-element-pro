<template>
  <el-header>
    <div class="header-left">
        <!-- <i :class="['collapse-btn','el-icon-caret-' + (collapse?'right':'left')]" @click="collapseChage" ></i> -->
        <i :class="['collapse-btn', 'fa', 'fa-navicon', 'fa-lg', (collapse ? 'fa-rotate-90' : '')]" @click="collapseChage" ></i>
    </div>
    <div class="header-right">
      
      <div class="user-action" >
        <!-- 用户头像 -->
        <img class="user-avatar" src="@/assets/user_avatar.png">
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
import { getSidebarCollapse, setSidebarCollapse } from "@/utils/common"           //通用工具函数
export default {
  name : "my-header",
  computed: {
    // 是否折叠
    collapse() {
      return this.$store.getters['common/collapse']
    },
    username() {
      return this.$store.getters['auth/userInfo']['name']
    }
  },
  mounted(){
    if(getSidebarCollapse()){
      this.$store.commit('common/SetCollapsed')
    }
  },
  methods: {
    // 侧边栏折叠
    collapseChage(){
      if(this.collapse){
        this.$store.commit('common/SetOpened')
      }else{
        this.$store.commit('common/SetCollapsed')
      }
      setSidebarCollapse(this.collapse)
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
      // line-height: 30px;
      // height:30px;
      // margin: 15px 0;
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
        // margin: 10px 0;
        // height: 40px;
        // line-height: 40px;
        .el-dropdown-link {
          cursor: pointer;
        }
      }
    }
    
  }
}

</style>