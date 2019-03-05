<template>
  <div>
    <el-tree
      ref='tree'
      :props="props"
      :load="loadNode"
      :lazy=true
      show-checkbox
      empty-text='没有资源'
      :dat2a2222="treeData"
      @check-change="checkNodes" 
      :current-node-key="100001"
      node-key="id"
      :render-content="renderContent"
      :expand-on-click-node="false"
      >
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'LazyTree',
  props: {
    renderContent: Function,
    props: {},
  },
  data() {
    return {
      options: [{
          value: 'C',
          label: '活动'
        }, {
          value: 'O',
          label: '订单'
        }, {
          value: 'S',
          label: '投放'
        }, {
          value: 'B',
          label: '创意'
        }],
      value: 'C',
      
      node_checked: [100001],
      treeData: []
      // treeData : [
      //   {
      //     id2: 0,
      //     name : '广告资源',
      //     disabled: true,
      //     isLeaf : false
      //   }
      // ]
    };
  },
  computed:{
  },
  mounted(){

    // this.getData()
    this.checkNodes()
    // setTimeout(()=>{
    //   const n = this.$refs.tree.getNode(0)
    //   // n.expanded = true
    // console.log(n)
    // },1000)
    

  },
  methods: {
    getData(){
      console.log('tree 开始' )

      console.log(this.$refs.tree)
      
      const start = (new Date()).getTime()

      this.$store.dispatch('treenode/Get',{type:this.value,data_type:'small'}).then(()=>{
        
        this.$refs.tree.updateKeyChildren(0,this.$store.getters['treenode/data'])
        
        console.log('tree 结束  耗时: ' + ( (new Date()).getTime() - start ) + '毫秒')
      })
    },
    checkNodes(){

      this.node_checked = this.$refs.tree.getCheckedKeys();
    },
    
    loadNode(node, resolve) {
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
            name : '广告资源',
            disabled: true
          }
        ]);
      }

      let params = {}
      if(node.data){
        params.type = node.data.type
        params.p_id = node.data.id
      }
      

      params.data_type = 'small'

      this.$store.dispatch('treenode/Get',params).then(()=>{
        

        console.log('tree 结束  耗时: ' + ( (new Date()).getTime() - start ) + '毫秒')

      
        return resolve(this.$store.getters['treenode/data'])
        //this.$refs.tree.updateKeyChildren(0,this.$store.getters['treenode/data'])
        
      })



    },

    loadNode2(node, resolve) {

      
      if (node.level === 0) {
        return resolve([{ name: 'region' },{name: 'region-2'}]);
      }
      if (node.level == 2 ) return resolve([{name: 'zone2-1'},{name: 'zone2-2'}]);
      if (node.level == 3 ) return resolve([{name: 'zone3',leaf: true}]);

      if (node.level == 1 ){
        setTimeout(() => {
          const data = [{
            name: 'leaf',
            leaf: true
          }, {
            name: 'zone',
          }];

          resolve(data);
        }, 500);
      }

      if( node.level > 3) {
        return resolve([])
      }
    }
  }
}
</script>

<style scoped>
.el-tree >>> .el-tree-node__label-img {
  vertical-align:middle;

}

</style>
