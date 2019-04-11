import { storiesOf } from '@storybook/vue';  //storiesOf 

import LazyTree from '@/components/lazy-tree'; //lazy-tree组件

import getTreenodeData from './treenode' // 获得节点数据的方法

storiesOf('Lazytree (Element-ui Extensioin)', module)
  .add('node-icon-src', () => ({
    components: { LazyTree },
    data() {
      return {
        defaultExpandedKeys : ['root']
      }
    },
    render(h) {
      return <lazy-tree 
        node-data={this.nodeData}
        default-expanded-keys={this.defaultExpandedKeys}
        node-icon-src={this.nodeIconSrc}
      />;
    },
    methods: {
      nodeData(node){
        return getTreenodeData(node, {})
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
      }
    }
  }))
  
