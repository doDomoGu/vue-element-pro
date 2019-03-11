<template>
  <div>
    <lazy-tree 
      :render-content="renderContent" 
      :load-node="loadNode"
    />
  </div>
  
</template>

<script>
import LazyTree from '@/components/lazy-tree/index2.js';
import * as TreenodeApi from '@/api/treenode'

export default {
  name: 'com_tree2',
  components: {
      LazyTree
  },
  data() {
    return {
      resourceTypeOptions: [
        { value: 'C', label: '活动' },
        { value: 'O', label: '订单' },
        { value: 'S', label: '投放' },
        { value: 'B', label: '创意' }
      ],
      resourceTypeValue: 'C'
    };
  },
  computed:{
  },
  mounted(){
  },
  methods: {
    //label 增加图标字样
    renderContent(h, { node, data}){
      console.log(' ')
      console.log('renderContent 开始')
      console.log(h)
      console.log(node)
      console.log(JSON.stringify(data))
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
      let pagination 
      let childrenCount
      if(data && data.childrenCount!=undefined){
        childrenCount = ' ('+data.childrenCount+')'
        if(data.page_total>1){
          pagination = <el-pagination
            small
            layout="prev, pager, next"
            page-size={data.page_size}
            total={data.childrenCount}
            on-current-change = {this.s}
            pager-count={5}>
          </el-pagination>
        }
      }
      console.log('renderContent 结束')
      return <span class="el-tree-node__label">
      <span>{ icon }{ node.label } {childrenCount} </span> 
      {pagination}
      </span>
    },
    s(a,b,c){
      console.log(this)
      console.log(a)
      console.log(b)
      console.log(c)
    },
    loadNode(node, resolve) {
      console.log('  ')
      console.log('loadNode 开始')
      console.log(node) 
      console.log('node_data: ' + JSON.stringify(node.data))
      console.log('nodeid: ' + node.id + '|' + 'node_level: ' + node.level) 
      //console.log(this.$refs.tree)
      
      const start = (new Date()).getTime()

      if (node.level === 0) {
        return resolve([
          {
            id: 0,
            label : '广告资源',
            disabled: true,
          }
        ]);
      }
      const page_size = 10


      let params = {}
      if(node.data){
        params.p_type = node.data.type
        params.p_id = node.data.id
      }
      
      params.page_size = page_size
      params.data_type = 'big'

      let data = []

      TreenodeApi.get(params).then((res) => {
        if ( res.data ){
          const _data = res.data
          if ( _data.code === 0) {
            console.log('tree 结束  耗时: ' + ( (new Date()).getTime() - start ) + '毫秒')
            
            data = _data.data.list

            node.data.page_total = _data.data.page_total

            node.data.childrenCount = _data.data.total
            node.data.page_size= _data.data.page_size

            node.data.label += ' '
            node.data.label = node.data.label.substr(0,node.data.label.length-1)
            /* console.log(_data.data.page_total)

            node.data.page_total = _data.data.page_total
            node.data.label += ' '
            console.log(node.data)
            node.setData(node.data) */
            // node.data.page_total = _data.data.page_total
            // console.log(node.render)
            
          } 
        }
        resolve(data)
      })

    }
  }
}
</script>

<style scoped>

</style>
