<template>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="account"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色">
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  computed:{
    tableData(){
      return this.$store.getters['user/list']
    }
  },
  created(){
    this.$store.dispatch('user/GetList')
  },
  methods:{
  }
}
</script>

<style>

</style>
