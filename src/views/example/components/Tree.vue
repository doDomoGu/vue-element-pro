<template>
  <div>
    <el-select v-model="value" placeholder="请选择" @change="getData">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
    <el-tree
      :props="props"
      :load="loadNode"
      :lazy=false
      show-checkbox
      empty-text='22'
      :indent=40
      :data="treeData"
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
      treeData : [{
            name: 'leaf',
            leaf: true
          }, {
            name: 'zone',
          }]
    };
  },
  created(){
    this.getData()
    
  },
  methods: {
    getData(){
      console.log('tree 开始' )
      const start = (new Date()).getTime()

      this.$store.dispatch('treenode/Get',{type:this.value}).then(()=>{
        this.treeData = this.$store.getters['treenode/data']
        console.log('tree 结束  耗时: ' + ( (new Date()).getTime() - start ) + '毫秒')
      })
    },

    loadNode(node, resolve) {
      console.log(node)
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
