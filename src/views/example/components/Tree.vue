<template>
  <div>
    <section>
      资源类型 
      <el-select v-model="resourceTypeValue" placeholder="请选择" ><!-- @change="getData"> -->
        <el-option v-for="item in resourceTypeOptions" :key="item.value" :label="item.label" :value="item.value" >
        </el-option>
      </el-select>
    </section>
    <!-- <section>
      选择的节点：{{node_checked}}
    </section> -->
    <lazy-tree 
      :render-content="renderContent" 
      :props="props"
    />
  </div>
</template>

<script>
import LazyTree from '@/components/lazy-tree/index.js';

export default {
  name: 'com_tree',
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
      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
    };
  },
  computed:{
  },
  mounted(){
  },
  methods: {
    //label 增加图标字样
    renderContent(h, { node }){
      const iconList = {
        'C':'campaign',
        'O':'order',
        'S':'solution',
        'B':'banner'
      }
      if(iconList[node.data.type]){
        const iconSrc = require('@/assets/icon/' + iconList[node.data.type] +'-icon.png')
        return <span class="el-tree-node__label"><img class="el-tree-node__label-img" src={iconSrc} />{ node.label }</span>
      }else{
        return <span class="el-tree-node__label">{ node.label }</span>
      }
    },
  }
}
</script>

<style scoped>

</style>
