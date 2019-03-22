import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import LazyTree from '@/components/lazy-tree';
// import * as TreenodeApi from '@/api/treenode'

storiesOf('Lazytree', module)
  .add('Default', () => ({
    components: { LazyTree },
    data() {
      return {
        pageSize: 10, //每页显示数
        defaultExpandedKeys: ['root'],
        dataType: 'middle', //测试数据量类型
        nodeClicked: {}
      };
    },
    render(h) {
      return <div><lazy-tree 
      ref='lazy-tree' 
      node-data={this.nodeData}
      node-icon-src={this.nodeIconSrc}
      page-size={this.pageSize}
      default-expanded-keys={this.defaultExpandedKeys}
      node-click={this.nodeClick}
    /></div>;
    },
    methods: { 
      nodeData(node){
        return []

        // return new Promise( resolve => {
        //   let params = {}
        //   if(node.data){
        //     if(node.data.type){
        //       params.p_type = node.data.type
        //       params.p_id = node.data.id
        //     }
        //     params.page = node.data.currentPage
        //   }
        //   params.page_size = this.pageSize
        //   params.data_type = this.dataType 
        //   TreenodeApi.get(params).then( res => {
        //     if ( res.data && res.data.code === 0){
        //       resolve(res.data.data)
        //     }
        //   })
        // })
      },
      nodeIconSrc(data){
        return null
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
    },
  }))
  
