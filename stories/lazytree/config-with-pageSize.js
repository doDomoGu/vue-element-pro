import { storiesOf } from '@storybook/vue';  //storybook
import { withKnobs, number } from '@storybook/addon-knobs'; //storybook knobs插件

import LazyTree from '@/components/lazy-tree'; //lazy-tree组件

import getTreenodeData from './treenode' // 获得节点数据的方法

storiesOf('Lazytree (Element-ui Extensioin)', module)
  .addDecorator(withKnobs) 
  .add('config with pageSize', () => ({
    components: { LazyTree },
    data() {
      return {
        defaultExpandedKeys: ['root'],
      };
    },
    props: {
      pageSize : {
        default: number('每页显示数', 20)
      }
    },
    watch: {
      pageSize(){
        const tree = this.$refs['lazy-tree'].$refs['tree']
        this.nodeData(tree.root).then(res=>{
          tree.root.setData(res)
        })
      }
    },
    render(h) {
      return <lazy-tree 
      ref='lazy-tree' 
      node-data={this.nodeData}
      page-size={this.pageSize}
      default-expanded-keys={this.defaultExpandedKeys}
    />;
    },
    methods: { 
      nodeData(node){
        return getTreenodeData(node,{
          pageSize : this.pageSize
        })
      },
      reloadTree(){
        
        
        /* const rootNode = tree.getNode('root')
        this.nodeData(rootNode).then(res=>{
          tree.updateKeyChildren('root',res)
          
        }) */
      }
    },
  }))
  
