<template>
  <div>
    <el-form label-width="200px">
      <el-form-item label="数据量(测试用)">
        <el-select v-model="dataType"  @change="reloadTree">
          <el-option v-for="dt in dataTypeOptions" :key="dt.value" :label="dt.label" :value="dt.value" >
          </el-option>
        </el-select>
        <span class='hint'>
          * 只影响接口数据查询，非前端数据过滤
        </span>
      </el-form-item>
      <el-form-item label="(子节点下的分页)每页显示数">
        <el-select v-model="pageSize"  @change="reloadTree">
          <el-option v-for="ps in pageSizeOptions" :key="ps.value" :label="ps.label" :value="ps.value" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="在Tree内显示搜索">
        <el-switch
          v-model="showSearchText"
          >
        </el-switch>
      </el-form-item>
      <el-form-item label="搜索词" >
        <el-input :disabled="showSearchText" v-model="searchText"  @input="reloadTree" style="width:100px"/>
        <span class='hint'>
          * 只影响接口数据查询，非前端数据过滤
        </span>
      </el-form-item>
      <el-form-item label="搜索词2" >
        <el-input v-model="filterText" style="width:100px"/>
        <span class='hint'>
          
        </span>
      </el-form-item>
      <el-form-item label="叶子节点资源类型">
        <el-select v-model="leafType"  @change="reloadTree">
          <el-option v-for="lt in leafTypeOptions" :key="lt.value" :label="lt.label" :value="lt.value" >
          </el-option>
        </el-select>
        <span class='hint'>
          * 只影响接口数据查询，非前端数据过滤
        </span>
      </el-form-item>
    </el-form>
    <section>
      当前点击的节点： {{this.nodeClicked}}
    </section>
    <br/>
    <br/>
    <section>
      <lazy-tree 
        ref='lazy-tree' 
        :node-data="nodeData"
        :node-icon-src="nodeIconSrc"
        :page-size="pageSize"
        :default-expanded-keys="defaultExpandedKeys"
        :node-click="nodeClick"
        :show-search-text="showSearchText"
        :search-text="searchText"
        @search-text-change="searchTextChange"
        :filter-node-method="filterNode"
        :filter-text="filterText"
      />
    </section>
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
      leafTypeOptions: [
        { value: 'C', label: '活动' },
        { value: 'O', label: '订单' },
        { value: 'S', label: '投放' },
        { value: 'B', label: '创意' }
      ],
      leafType: 'B',
      searchText: '',
      showSearchText: true,
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
      nodeClicked: {},
      filterText: ''
    
    };
  },
  mounted(){
    this.$on('search-text-change', val=> {
      console.log(val)
    })
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
        params.search_text  = this.searchText
        params.leaf_type  = this.leafType
        params.page_size    = this.pageSize
        params.data_type    = this.dataType 
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
    },
    searchTextChange(val){
      this.searchText = val
      this.reloadTree()
    },
    filterNode(value, data, node) {
      console.log(typeof value)
      if(typeof JSON.parse(value) == 'object'){
        console.log(JSON.parse(value))
        console.log(parseInt(data.id))
        console.log(JSON.parse(value).indexOf(parseInt(data.id)))
        return JSON.parse(value).indexOf(parseInt(data.id)) == -1
      }else{
        return true
      }
    }
  }
}
</script>
<style scoped>
.hint {
  color:#999;
  margin-left: 20px;
  display: inline-block;
}
</style>