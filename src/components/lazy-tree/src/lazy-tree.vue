<template>
  <div>
    <el-tree
      ref='tree'
      :props="props"
      :load="loadNode"
      :lazy=true
      :show-checkbox="showCheckbox"
      empty-text='没有资源'
      :curren22t-node-key="100001"
      :node-key="nodeKey"
      :render-content="renderContent"
      :default-expanded-keys="['root']"
      :def2222ault-expand-all="true"
      :expand-on-click-node="false"
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
    showCheckbox: Boolean,
    props: {
      default() {
        return {
          children: 'children', //子节点
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
      // pages:{}, //储存分页信息
      // pagesOld:{}, //储存分页信息
      checkedNodes: []
    }
  },
  computed:{
  },
  watch: {
    /* pages:{
      handler(val) {
        let nodeId = null
        for(let i in val){
          if(nodeId != null){
            continue
          }
          if(val[i] && this.pagesOld[i] && val[i] !== this.pagesOld[i]){
            nodeId = i
          }
        }
        if(nodeId != null){
          const node = this.$refs.tree.getNode(nodeId)
          this.nodeData(node).then(res=>{
            console.log(res)
            this.$refs.tree.updateKeyChildren(nodeId,res[this.props.children])
            this.$set(this.pagesOld,nodeId,this.pages[nodeId])
          })
          
        }
      },
      deep: true
    }, */
  },
  mounted(){
  },
  methods: {
    //重写 标签项显示内容
    renderContent(h, {node, data}){
      // console.log(this.nodeKey)
      let iconContent
      let total
      let pagination
      // console.log(data)
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
          pagination = <el-pagination
            small
            layout="prev, pager, next"
            page-size={this.pageSize}
            total={data[this.props.total]}
            current-page={data[this.props.currentPage]}
            {...{on:{'update:currentPage': val =>  { 
              data[this.props.currentPage] = val
              this.nodeData(node).then(res=>{
                this.$refs.tree.updateKeyChildren(data.id,res[this.props.children])
              })
            }}}}
            pager-count={5}>
          </el-pagination>
          /* 分页的currentPage改变，同步到pages，用于重新获取子节点数据 */
          // this.$set(this.pages,data.id,data[this.props.currentPage])
          // if(!this.pagesOld.hasOwnProperty(data.id)){
          //   this.$set(this.pagesOld,data.id,data[this.props.currentPage])
          // }
        }
      }

      return <span class="el-tree-node__label">
        <span>{ iconContent }{ node.label } { total } </span> 
        { pagination }
      </span>
    },
    loadNode(node, resolve) {
      this.nodeData(node).then(res=> {
        // console.log(res)
        if (node.level === 0) {
          return resolve([
            {
              [this.nodeKey]: 'root',
              [this.props.label] : '广告资源',
              [this.props.disabled]: true,
              // [this.props.pageTotal]: res[this.props.pageTotal],
              //[this.props.currentPage]: res[this.props.currentPage],
              [this.props.total]: res[this.props.total],
              // page_size: _data.page_size,
            }
          ]);
        }
        
        if (node.level > 1) {
          // node.data[this.props.pageTotal] = res[this.props.pageTotal]
          /* if(!node.data){
            node.data[this.props.currentPage] = res[this.props.currentPage]
            node.data[this.props.total] = res[this.props.total]
          } */
          
            
          // node.data.total_page = res.total_page
          // node.data.childrenCount = res.total
          // // node.data.page_size= res.page_size
          // node.data.current_page= res.current_page
        }
        // console.log(res[this.props.children])
        resolve(res[this.props.children])
      })
    }
  }
}
</script>
<style scoped>
/* 图标上下对齐 */
.el-tree >>> .el-tree-node__label-img {
  vertical-align:middle;  
}
/* 鼠标手势 */
.el-tree >>> .el-tree-node__content {
  cursor: default;
}
/* 文字颜色和对齐 */
.el-tree >>> .el-tree-node__label {
  color: #333;
  line-height:22px;
}
/* 分页行内显示 */
.el-tree >>> .el-pagination {
  display: inline-block;
}
</style>