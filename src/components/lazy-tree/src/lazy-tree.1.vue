<template>
  <div>
    <!--<div> pages: {{this.pages}}</div>
    <div> pagesOld: {{this.pagesOld}}</div> -->
    <div> {{this.checkedNodes}} </div>
    <el-tree
      ref='tree'
      :props="props"
      :load="loadNode"
      :lazy=true
      :show-checkbox="showCheckbox"
      empty-text='没有资源'
      @check-change="checkNodes" 
      :current-node-key="100001"
      node-key="id"
      :render-content="renderContent"
      :default-expanded-keys="['root']"
      :def2222ault-expand-all="true"
      :expand-on-click-node="false"
      >
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'LazyTree',
  props: {
    loadNode: Function,
    getData: Function,
    renderContent: Function,
    showCheckbox: Boolean,
    props: {
      default() {
        return {
          children: 'children',
          label: 'label',
          disabled: 'disabled',
          isLeaf: 'isLeaf'
        };
      }
    },
    pages: Object,
  },
  data() {
    return {
      treeData: [],
      pagesOld: {},
      checkedNodes: []
    }
  },
  computed:{
  },
  watch: {
    pages:{
      // const that = this
      handler(val) {
        /* console.log(55)
        console.log('pages:' + JSON.stringify(val))
        console.log('pagesOld:' + JSON.stringify(this.pagesOld)) */

        let nodeId = null
        // let curPage = null

        for(let i in val){
          if(nodeId != null){
            continue
          }

          /* console.log('--------')
          console.log('id: ' + i)
          console.log('newPage: ' + val[i]) */
          let oldPage = null
          if(this.pagesOld.hasOwnProperty(i)){
            oldPage = this.pagesOld[i]
          }
          // console.log('oldPage: ' + oldPage)
          if(oldPage!=null && oldPage !=val[i]){
            nodeId = i
            // curPage = val[i]
          }
        }

        if(nodeId != null){
          const node = this.$refs.tree.getNode(nodeId)
          /* console.log(84)
          console.log(node.data) */
          this.getData(node).then(r=>{
            this.$refs.tree.updateKeyChildren(nodeId,r)
          })
        }
        // console.log('========')
        // console.log(nodeId)
        // console.log(curPage)




        this.pagesOld = JSON.parse(JSON.stringify(val))

        /* if(oldVal && !(val.id == oldVal.id && val.page == oldVal.page)){
          const node = this.$refs.tree.getNode(val.id)
          // console.log(this.loadNode(node))
         }*/

      

      // this.handleSelectChange(this.node.checked, val);
      },
      deep: true
    },
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
    
    checkNodes(){

      this.checkedNodes = this.$refs.tree.getCheckedKeys();
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

.el-tree >>> .el-tree-node__content {
  cursor: default;
}

.el-tree >>> .el-tree-node__label {
  color: #333;
}

.el-tree >>> .el-pagination {
  display: inline-block;
}
</style>
