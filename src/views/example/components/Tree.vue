<template>
  <div>
    <el-form inline>
      <el-form-item label="数据量">
        <el-select v-model="dataType"  @change="reloadTree">
          <el-option v-for="dt in dataTypeOptions" :key="dt.value" :label="dt.label" :value="dt.value" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="(子节点下的分页)每页显示数">
        <el-select v-model="pageSize"  @change="reloadTree">
            <el-option v-for="ps in pageSizeOptions" :key="ps.value" :label="ps.label" :value="ps.value" >
            </el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <section>
      当前点击的节点： {{this.nodeClicked}}
    </section>
    <br/>
    <br/>
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

      pageSizeOptions: [
        {
          value: 10,
          label: '10'
        }, 
        {
          value: 20,
          label: '20'
        }, 
        {
          value: 30,
          label: '30'
        }, 
        {
          value: 100,
          label: '100'
        }
      ],
      dataType: 'middle', //测试数据量类型
      dataTypeOptions: [
        {
          value: 'small',
          label: '小型'
        }, 
        {
          value: 'middle',
          label: '中型'
        }, 
        {
          value: 'big',
          label: '大型'
        }
      ],
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
        params.data_type = this.dataType 
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

      this.nodeClicked = {
        id: data.id,
        label: data.label,
        type: data.type
      }
    },
    reloadTree(){
      const tree = this.$refs['lazy-tree'].$refs['tree']
      this.nodeData(tree.root).then(res=>{
        tree.root.setData(res)
      })
      
      /* const rootNode = tree.getNode('root')
      this.nodeData(rootNode).then(res=>{
        tree.updateKeyChildren('root',res)
        
      }) */
    }
  }
}
</script>