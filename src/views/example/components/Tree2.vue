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
      :render-content="renderContent" 
      :load-node="loadNode"
      :get-data="getData"
      :pages="pages"
      :show-checkbox="showCheckbox"
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
      resourceTypeValue: 'C',
      page_size: 10, //每页显示数
      pages:{}, //储存分页信息
      showCheckbox: true,
    };
  },
  mounted(){
  },
  methods: {
    //重写 标签项显示内容
    renderContent(h, { node, data}){
      let icon
      let childrenCount
      let pagination 

      if(data){
        if(data.type){
          /* 增加icon显示 */
          const iconMap = {
            'C':'campaign',
            'O':'order',
            'S':'solution',
            'B':'banner'
          }
          if(iconMap[data.type]){
            const iconSrc = require('@/assets/icon/' + iconMap[data.type] +'-icon.png')
            if(iconSrc){
              icon =  <img class="el-tree-node__label-img" src={iconSrc} />
            }
          }
        }
        /* 增加子节点总数显示 */
        if(data.childrenCount){
          childrenCount = '('+parseInt(data.childrenCount)+')'
        }

        /* 分页组件，大于一页且节点被展开时显示 */
        if(data.total_page > 1 && node.expanded){
          pagination = <el-pagination
            small
            layout="prev, pager, next"
            page-size={data.page_size}
            total={data.childrenCount}
            current-page={data.current_page}
            {...{on:{'update:currentPage': val =>  data.current_page = val}}}
            pager-count={5}>
          </el-pagination>
          /* 分页的current_page改变重新获取子节点数据 */
          this.$set(this.pages,data.id,data.current_page)
        }
      }

      return <span class="el-tree-node__label">
        <span>{ icon }{ node.label } { childrenCount } </span> 
        { pagination }
      </span>
    },
    getData(node){
      let params = {}
      if(node.data){
        if(node.data.type){
          params.p_type = node.data.type
          params.p_id = node.data.id
        }
        params.page = node.data.current_page
      }
      
      params.page_size = this.page_size
      
      params.data_type = 'big'

      let data = []
      return new Promise( resolve => {
        TreenodeApi.get(params).then( res => {
          if ( res.data ){
            if (res.data.code === 0) {
              
            const _data = res.data.data  

              if (node.level === 0) {
                return resolve([
                  {
                    id: 'root',
                    label : '广告资源',
                    disabled: true,
                    total_page: _data.total_page,
                    current_page: _data.current_page,
                    page_size: _data.page_size,
                    childrenCount: _data.total
                  }
                ]);
              }else if (node.level > 1) {
                node.data.total_page = _data.total_page
                node.data.childrenCount = _data.total
                node.data.page_size= _data.page_size
                node.data.current_page= _data.current_page
              }

              data = _data.list
            } 
          }
          return resolve(data)
        })
      })
    },
    loadNode(node, resolve) {
      /* console.log('  ')
      console.log('loadNode 开始')
      console.log('nodeid: ' + node.id + '|' + 'node_level: ' + node.level)  */

      /* console.log('  ')
      console.log('loadNode 开始')
      console.log(node) 
      console.log('node_data: ' + JSON.stringify(node.data))
      console.log('nodeid: ' + node.id + '|' + 'node_level: ' + node.level)  
      
      const start = (new Date()).getTime() */

      this.getData(node).then(r=>{

        // console.log('tree 结束  耗时: ' + ( (new Date()).getTime() - start ) + '毫秒')
        resolve(r)
      })


    }
  }
}
</script>

<style scoped>

</style>
