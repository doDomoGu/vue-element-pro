import { storiesOf } from '@storybook/vue';  //storybook
import { withKnobs, number } from '@storybook/addon-knobs'; //storybook knobs插件

import LazyTree from '@/components/lazy-tree'; //lazy-tree组件

import getTreenodeData from './treenode' // 获得节点数据的方法

storiesOf('Lazytree (Element-ui Extensioin)', module)
  .addDecorator(withKnobs) //加载knob插件
  .add('config with pageSize', () => ({
    components: { LazyTree },
    data() {
      return {
        defaultExpandedKeys: ['root']
      }
    },
    props: {
      //使用props定义一个可被knobs修改的pageSize
      pageSize : {
        default: number('每页显示数', 20)
      }
    },
    watch: {
      //监测pageSize变化，更新根节点数据，以此来刷新树
      pageSize(){
        const tree = this.$refs.lazyTree.$refs.tree
        this.nodeData(tree.root).then(res=>{
          tree.root.setData(res)
        })
      }
    },
    render(h) {
      return <lazy-tree 
      ref='lazyTree' 
      node-data={this.nodeData} 
      default-expanded-keys={this.defaultExpandedKeys}
      page-size={this.pageSize}
      />;
    },
    methods: { 
      nodeData(node){
        return getTreenodeData(node,{
          pageSize : this.pageSize
        })
      }
    },
  }))
  
