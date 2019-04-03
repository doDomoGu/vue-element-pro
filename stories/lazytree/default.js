import { storiesOf } from '@storybook/vue';
import LazyTree from '@/components/lazy-tree';
import * as TreenodeApi from '@/api/treenode'

storiesOf('Lazytree', module)
  .add('Default', () => ({
    components: { LazyTree },
    data() {
      return {
        defaultExpandedKeys: ['root']
      };
    },
    render(h) {
      return <lazy-tree 
        node-data={this.nodeData}
        default-expanded-keys={this.defaultExpandedKeys}
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
          params.page_size = 10
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
  
