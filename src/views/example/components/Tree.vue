<template>
  <div>
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
      :node-data="nodeData"
      :show-checkbox="showCheckbox"
      :node-icon-src="nodeIconSrc"
      :page-size="pageSize"
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
      showCheckbox: true,
    };
  },
  mounted(){
  },
  methods: {
    nodeData(node){
      let params = {}
      if(node.data){
        if(node.data.type){
          params.p_type = node.data.type
          params.p_id = node.data.id
        }
        params.page = node.data.currentPage
      }
      
      params.page_size = this.pageSize
      
      params.data_type = 'big'

      return new Promise( resolve => {
        TreenodeApi.get(params).then( res => {
          if ( res.data ){
            if (res.data.code === 0) {
            const _data = res.data.data  
              return resolve(_data)
            } 
          }
          // return resolve(data)
        })
      })
    },
    nodeIconSrc(data){
      let iconSrc
      if(data.type){
        /* 增加icon显示 */
        const iconMap = {
          'C':'campaign',
          'O':'order',
          'S':'solution',
          'B':'banner'
        }
        if(iconMap[data.type]){
          iconSrc = require('@/assets/icon/' + iconMap[data.type] +'-icon.png')
        }
      }
      return iconSrc
    }
  }
}
</script>

<style scoped>

</style>
