import { storiesOf } from '@storybook/vue';  //storiesOf 

import LazyTree from '@/components/lazy-tree'; //lazy-tree组件

import getTreenodeData from './treenode' // 获得节点数据的方法

storiesOf('Lazytree (Element-ui Extensioin)', module)
  .add('default', () => ({
    components: { LazyTree },
    render(h) {
      return <lazy-tree 
        node-data={this.nodeData}
      />
    },
    methods: {
      nodeData(node){
        return getTreenodeData(node, {})
      }
    }
  }))
  
