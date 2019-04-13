import { storiesOf } from '@storybook/vue';  //storiesOf 
import { withKnobs, boolean } from '@storybook/addon-knobs'; //storybook knobs插件

import LazyTree from '@/components/lazy-tree'; //lazy-tree组件

import getTreenodeData from './treenode' // 获得节点数据的方法
import { action } from '@storybook/addon-actions';

storiesOf('Lazytree (Element-ui Extensioin)', module)
  .addDecorator(withKnobs) //加载knob插件
  .add('expand-top-level', () => ({
    components: { LazyTree },
    props: {
      //使用props定义一个可被knobs修改的expandTopLevel
      expandTopLevel :{
        default: boolean('是否展开顶级节点', true)
      },
      onNodeClick: (data, node, t)=>{
        action('sss2')
        action(node)
        console.log(data)
        console.log(node)
        console.log(t)
      }
    },
    watch: {
      //监测expandTopLevel变化，更新根节点数据，以此来刷新树
      expandTopLevel(val){
        const tree = this.$refs.lazyTree.$refs.tree
        this.nodeData(tree.root).then(res=>{
          let defalutExpandedKeys
          if(val){
            defalutExpandedKeys = []
            for(let i = 0; i < res.length; i++){
              defalutExpandedKeys.push(res[i]['id'])
            }
          }else{
            defalutExpandedKeys = undefined
          }
          tree.store.setDefaultExpandedKeys(defalutExpandedKeys)
          
          tree.root.setData(res)
        })
      }
    },
    render(h) {
      return <lazy-tree 
        ref='lazyTree' 
        node-data={this.nodeData}
        expand-top-level={this.expandTopLevel}
        on-node-click={this.nodeClick}
      />
    },
    methods: {
      nodeData(node){
        return getTreenodeData(node, {})
      },
      nodeClick(data, node, t){
        action('sss')
        action(node)
        console.log(data)
        console.log(node)
        console.log(t)
      }
    }
  }))
  
