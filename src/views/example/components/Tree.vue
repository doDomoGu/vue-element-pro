<template>
  <div>
    <section>
      资源类型 
      <el-select v-model="value" placeholder="请选择" @change="getData">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
    </section>
    <section>
      选择的节点：{{node_checked}}
    </section>
    <el-tree
      ref='tree'
      :props="props"
      :load="loadNode"
      :lazy=true
      show-checkbox
      empty-text='没有资源'
      :data22="treeData"
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
  name: 'com_tree',
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
      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
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
    renderContent(h, { node, data, store }){
      // console.log(95)
      // console.log(h)
      // console.log(node)
      // console.log(node.label)
      // console.log(data)
      // console.log(store)

    /*   return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>); */

      let icon = ''
      switch(node.data.type){
        case 'C':
          icon = 'campaign'
          break
        case 'O':
          icon = 'order'
          break
        case 'S':
          icon = 'solution'
          break
        case 'B':
          icon = 'banner'
          break
      }
      if(icon){

        const iconSrc = require('@/assets/icon/' + icon +'-icon.png')
        
        // const iconSrc = '~@/icon/' + icon +'-icon.png'
        //const iconSrc = '~@/assets/icon/' + icon +'-icon.png'

        return <span class="el-tree-node__label"><img src={iconSrc} />{ node.label }</span>
      }else{
        return <span class="el-tree-node__label">{ node.label }</span>
      }
      
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

<style>

</style>
