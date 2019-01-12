<template>
  <el-container>
    <el-aside :width="'200px'">
      <sidebar/>  
    </el-aside>
    <el-container>
      <el-header>
        This is Header
      </el-header>
      <router-view/>
      <el-footer>
        This is Footer
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
// import { mapGetters } from 'vuex'
import Sidebar from './sidebar/Index'

export default {
  components: { Sidebar },
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