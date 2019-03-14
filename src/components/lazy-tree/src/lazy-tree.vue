<template>
  <div>
    <el-tree
      ref='tree'
      :props="props"
      :load="loadNode"
      :lazy=true
      :show-checkbox="showCheckbox"
      :empty-text='emptyText'
      :node-key="nodeKey"
      :render-content="renderContent"
      :default-expanded-keys="defaultExpandedKeys"
      @node-click="nodeClick"
      >
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'LazyTree',
  props: {
    nodeKey: {
      type: String,
      default: 'id'
    },
    nodeData: Function,
    nodeIconSrc: Function,
    nodeClick: Function,
    showCheckbox: {
      type: Boolean,
      default: false
    },
    defaultExpandedKeys: Array,
    emptyText: {
      type: String,
      default: '没有资源'
    },
    props: {
      type: Object,
      default() {
        return {
          children: 'children', 
          label: 'label', 
          disabled: 'disabled',
          isLeaf: 'isLeaf',
          total: 'total',
          currentPage:'currentPage'
        };
      }
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      checkedNodes: []
    }
  },
  methods: {
    //重写 标签项显示内容
    renderContent(h, {node, data}){
      let iconContent
      let total
      let pagination
      if(data){
        /* 渲染节点Icon */
        if(this.nodeIconSrc){
          const nodeIconSrc = this.nodeIconSrc(data)
          if(nodeIconSrc){
            iconContent =  <img class="el-tree-node__label-img" src={nodeIconSrc} />
          }
        }
        /* 增加子节点总数显示 */
        if(data.hasOwnProperty([this.props.total])){
          total = '('+parseInt(data[this.props.total])+')'
        }
        /* 分页组件，大于一页且节点被展开时显示 */
        if(data[this.props.total] > this.pageSize && node.expanded){
          pagination = <div class={['el-pagination-wrapper']}
          {...{on:{'click': e =>  {e.stopPropagation()}}}}
          >
          <el-pagination
            small
            layout="prev, pager, next"
            page-size={this.pageSize}
            total={data[this.props.total]}
            current-page={data[this.props.currentPage]}
            {...{on:{'current-change': val =>  {
              if (!e) var e = window.event;
              if (e.stopPropagation) e.stopPropagation()
              // currentPage改变，获取子节点数据更新到当前节点
              data[this.props.currentPage] = val
              this.nodeData(node).then(res=>{
                this.$refs.tree.updateKeyChildren(data.id,res)
              })
            }}}}
            pager-count={5}>
          </el-pagination>
          </div>
        }
      }

      return <span><span class="el-tree-node__label">
        <span>{ iconContent }{ node.label } { total } </span> 
        
      </span>{ pagination }</span>
    },
    loadNode(node, resolve) {
      if(!this.nodeData) throw new Error('[LazyTree] Function nodeData is not definded')
      this.nodeData(node).then(res=> {
        resolve(res)
      })
    }
  }
}
</script>
<style scoped lang="scss">
.el-tree {
  /deep/ { //深度选择器
    /* 图标上下对齐 */
    .el-tree-node__label-img {
      vertical-align:middle;  
    }

    /* 鼠标手势 */
    .el-tree-node__content {
      /* cursor: default; */
    }

    /* 文字颜色和对齐 */
    .el-tree-node__label {
      color: #333;
      line-height:22px;
    }

    /* 分页行内显示 */
    .el-pagination-wrapper {
      /* position: absolute; */
      display: inline-block;
    }

    /* 分页背景色 */
    .el-pager li {
      background-color:unset;
    }
    
    /* 分页按钮背景色 */
    .el-pagination button {
      background-color:unset;
    }
  }
} 

</style>