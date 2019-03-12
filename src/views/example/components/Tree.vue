<template>
  <div>
    <section>
      每页显示数
      <el-select v-model="pageSize"  @change="reloadTree">
        <el-option v-for="p in pageSizeOptions" :key="p.value" :label="p.label" :value="p.value" >
        </el-option>
      </el-select>

      当前点击的节点： {{this.nodeClicked}}
    </section>
    <br/>
    <br/>
    <!-- <section>
      资源类型 
      <el-select v-model="resourceTypeValue" placeholder="请选择" >
        <el-option v-for="item in resourceTypeOptions" :key="item.value" :label="item.label" :value="item.value" >
        </el-option>
      </el-select>
    </section> -->
    <!-- <section>
      选择的节点：{{node_checked}}
    </section> -->
    <lazy-tree 
      ref='lazy-tree' 
      :node-data="nodeData"
      :node-icon-src="nodeIconSrc"
      :page-size="pageSize"
      :default-expanded-keys="defaultExpandedKeys"
      :node-click="nodeClick"
    />
  </div>
</template>

<script>
import LazyTree from '@/components/lazy-tree/index.js';
import * as TreenodeApi from '@/api/treenode'

export default {
  name: 'com_tree',
  components: {
      LazyTree
  },
  data() {
    return {
      // resourceTypeOptions: [
      //   { value: 'C', label: '活动' },
      //   { value: 'O', label: '订单' },
      //   { value: 'S', label: '投放' },
      //   { value: 'B', label: '创意' }
      // ],
      // resourceTypeValue: 'C',
      
      pageSize: 10, //每页显示数
      defaultExpandedKeys: ['root'],

      pageSizeOptions: [{
        value: 10,
        label: '10'
      }, {
        value: 20,
        label: '20'
      }, {
        value: 30,
        label: '30'
      }],
      nodeClicked: {}
    
    };
  },
  mounted(){
  },
  methods: {
    nodeData(node){
      return new Promise( resolve => {
        let params = {}
        if(node.data){
          if(node.data.type){
            params.p_type = node.data.type
            params.p_id = node.data.id
          }
          params.page = node.data.currentPage
        }
        params.page_size = this.pageSize
        params.data_type = 'small'
        TreenodeApi.get(params).then( res => {
          if ( res.data && res.data.code === 0){
            resolve(res.data.data)
          }
        })
      })
    },
    nodeIconSrc(data){
      let iconSrc
      if(data.type){
        const iconMap = { 'C':'campaign', 'O':'order', 'S':'solution', 'B':'banner'}
        if(iconMap[data.type]){
          iconSrc = require('@/assets/icon/' + iconMap[data.type] +'-icon.png')
        }
      }
      return iconSrc
    },
    nodeClick(data, node, t){
      this.nodeClicked = data
    },
    reloadTree(){
      const tree = this.$refs['lazy-tree'].$refs['tree']
      const rootNode = tree.getNode('root')
      this.nodeData(rootNode).then(res=>{
        tree.updateKeyChildren('root',res)
      })
    }
  }
}
</script>