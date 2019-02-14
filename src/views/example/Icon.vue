<template>
  <el-tabs tab-position="top" >
    <el-tab-pane label="Element-ui 图标库" >
      <a href='http://element-cn.eleme.io/#/zh-CN/component/icon' target="_blank">文档>></a>
      <br/>
      <br/>
      <p>
        使用i标签,class以"el-icon-"开头后跟着图标别名
      </p>
      <br/>
      <br/>
      <div class='icon-list'>
        <i class="el-icon-edit"></i>
        <i class="el-icon-share"></i>
        <i class="el-icon-delete"></i>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <pre>
  &lt;i class="el-icon-edit">&lt;/i>
  &lt;i class="el-icon-share">&lt;/i>
  &lt;i class="el-icon-delete">&lt;/i>
  &lt;el-button type="primary" icon="el-icon-search">搜索&lt;/el-button>
</pre>
    </el-tab-pane>
    <el-tab-pane label="Font Awesome 图标库" >
      <a href='http://fontawesome.dashgame.com/' target="_blank">文档说明</a>
      <br/>
      <br/>
      <p>
        使用i标签,class以"fa" 加上 "fa-"开头后跟着图标别名
      </p>
      <br/>
      <br/>
      <div class='icon-list'>
        <i class="fa fa-star"></i>
        <i class="fa fa-calculator"></i>
        <i class="fa fa-battery-full"></i>
        <el-button type="primary" icon="fa fa-check"> OK</el-button>
      </div>
      <pre>
  &lt;i class="fa fa-star">&lt;/i>
  &lt;i class="fa fa-calculator">&lt;/i>
  &lt;i class="fa fa-battery-full">&lt;/i>
  &lt;el-button type="primary" icon="fa fa-check"> OK&lt;/el-button>
</pre>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'icon'
}
</script>

<style lang='scss' scoped>
.icon-list {
  background:#fff;
  padding:20px;
  & > i {
    color: #606266;
    margin: 0 20px;
    font-size: 1.5em;
    vertical-align: middle;
  }
  & > button {
    margin: 0 20px;
  }
}

pre {
  color:#fff;
  background:#606266;
  padding:10px;
  font-size:14px;
  line-height:24px;
}

</style>

    