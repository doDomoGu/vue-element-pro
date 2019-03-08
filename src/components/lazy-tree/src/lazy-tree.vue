<template>
  <div>
    <el-tree
      ref='tree'
      :props="props"
      @node-expand="onNodeExpand"
      @node-click="onNodeClick"
      @node-collapse="onNodeCollapse"
      @check-change="onCheckChange" 
      :show-checkbox="isShowCheckbox"
      :empty-text='emptyText'
      :current-node-key="currentNodeKey"
      :node-key="nodeKey"
      :render-content="renderContent"
      :expand-on-click-node="isExpandOnClickNode"
      :data="treeData"
      >
    </el-tree>
  </div>
</template>

<script>
import * as TreenodeApi from '@/api/treenode'
export default {
  name: 'LazyTree',
  data() {
    return {
      isShowCheckbox: false,
      emptyText: '没有资源',
      currentNodeKey: 100,
      nodeKey: 'id',
      isExpandOnClickNode: false,
      props: {
        children: 'children',
        label: 'label',
        disabled: 'disabled',
        isLeaf: 'isLeaf'
      },
      treeData:[],
      pagination: {},
    };
  },
  computed:{
  },
  mounted(){
    this.addChildren()
  },
  methods: {
    addChildren(node){
      console.log('  ')
      console.log('addChildren 开始')
      const start = (new Date()).getTime()

      const page_size = 10
      let params = {}
      if(node && node.data){
        params.p_type = node.data.type
        params.p_id = node.data.id
      }
      params.page_size = page_size
      params.data_type = 'big'

      TreenodeApi.get(params).then((res) => {
        if ( res.data ){
          if ( res.data.code === 0) {
            const _data = res.data.data
            console.log(_data)
            console.log('tree 结束  耗时: ' + ( (new Date()).getTime() - start ) + '毫秒')
            
            if(!node){
              const tree = this.$refs.tree
              const rootData = {
                id: 'root',
                label: '广告资源',
                page_total: _data.page_total,
                childrenCount: _data.total,
                page_size: _data.page_size,
              }
              tree.append(rootData)
              // const RootNode = tree.getNode('root')
              // console.log(RootNode)
              this.$refs.tree.updateKeyChildren('root', _data.list)
            }else{
              console.log(86)
              this.$refs.tree.updateKeyChildren(node.id,_data.list)
            }

           /*  for(let i=0; i<_data.list.length;i++){
              _data.list[i].
            } */
            // console.log(113)
            // console.log(this.$refs)
          }
        }
      })
    },
    onNodeClick(data, node, store){
      console.log('')
      console.log('onNodeClick')
      console.log(data)
      console.log(data[this.nodeKey])
      console.log(node)
      console.log(store)
      //updateKeyChildren
      
    },
    onNodeExpand(data, node, store){
      console.log('')
      console.log('onNodeExpand')
      console.log(data)
      console.log(data[this.nodeKey])
      console.log(node)
      console.log(store)
    },
    onNodeCollapse(data, node, store){
      console.log('')
      console.log('onNodeCollapse')
      console.log(data)
      console.log(data[this.nodeKey])
      console.log(node)
      console.log(store)
    },
    onCheckChange(){
      console.log('onCheckChange')
    },
    renderContent(h, { node, data}){
/*       console.log(' ')
      console.log('renderContent 开始')
      console.log(h)
      console.log(node)
      console.log(JSON.stringify(data)) */
      /* 图标 */
      const iconList = {
        'C':'campaign',
        'O':'order',
        'S':'solution',
        'B':'banner'
      }
      let icon
      if(data && iconList[data.type]){
        const iconSrc = require('@/assets/icon/' + iconList[data.type] +'-icon.png')
        icon = iconSrc ? <img class="el-tree-node__label-img" src={iconSrc} /> : ''
      }

      /* 分页 */
      let pagination 
      let childrenCount
      if(data && data.childrenCount!=undefined){
        childrenCount = ' ('+data.childrenCount+')'
        if(data.page_total>1 && node.expanded){
          pagination = <el-pagination 
            small
            ref={'page_'+node.id}
            layout="prev, pager, next"
            page-size={data.page_size}
            total={data.childrenCount}
            on-current-change={this.s}
            pager-count={5}>
          </el-pagination>
        }
      }
      // console.log('renderContent 结束')

      return <span class="el-tree-node__label">
      <span>{ icon }{ node.label } {childrenCount} </span> 
      {pagination}
      </span>
    },
    s(page,a,b){
      console.log(page)
      console.log(a)
      console.log(b)
    },
    checkNodes(){

      this.node_checked = this.$refs.tree.getCheckedKeys();
    },
    
    loadNode2(node, resolve) {
      console.log('  ')
      console.log('loadNode')
      console.log('tree 开始' )

      
      console.log(node) 
      console.log('node_data: ' + JSON.stringify(node.data))
      console.log('node_id: ' + node.id) 
      console.log('node_level: ' + node.level) 
      //console.log(this.$refs.tree)
      
      const start = (new Date()).getTime()

      if (node.level === 0) {
        return resolve([
          {
            id: 0,
            label : '广告资源',
            disabled: true
          }
        ]);
      }

      let params = {}
      if(node.data){
        params.type = node.data.type
        params.p_id = node.data.id
      }
      

      params.data_type = 'middle'

      this.$store.dispatch('treenode/Get',params).then(()=>{
        

        console.log('tree 结束  耗时: ' + ( (new Date()).getTime() - start ) + '毫秒')

      
        return resolve(this.$store.getters['treenode/data'])
        //this.$refs.tree.updateKeyChildren(0,this.$store.getters['treenode/data'])
        
      })
    }
  }
}
</script>

<style scoped>
.el-tree >>> .el-tree-node__label-img {
  vertical-align:middle;
}

.el-tree >>> .el-tree-node__content {
  cursor: default;
}

.el-tree >>> .el-tree-node__label {
  color: #333;
}

.el-tree >>> .el-pagination {
  display: inline-block;
}
</style>
