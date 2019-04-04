import { storiesOf } from '@storybook/vue';
import LazyTree from '@/components/lazy-tree';
import * as TreenodeApi from '@/api/treenode'


import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';


storiesOf('Lazytree', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { LazyTree },
    data() {
      return {
        page_size: 13,
        defaultExpandedKeys: ['root']
      };
    },
    props: {
      page_size : {
        default: number('每页显示数', 8)
      }
    },
    render(h) {
      return <lazy-tree 
        node-data={this.nodeData}
        default-expanded-keys={this.defaultExpandedKeys}
        page-size={this.page_size}
      />;
    },
    methods: {
      nodeData(node){
        return new Promise( resolve => {
          let params = {}
          if(node.data){
            if(node.data.type){
              params.p_type = node.data.type
              params.p_id = node.data.id
            }
            params.page = node.data.currentPage
          }
          params.page_size = this.page_size //10
          params.data_type = 'middle'
          TreenodeApi.get(params).then( res => {
            if ( res.data && res.data.code === 0){
              resolve(res.data.data)
            }
          })
        })
      },
    },
  }))
  
