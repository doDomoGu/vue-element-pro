import * as TreenodeApi from '@/api/treenode' // 数据获取的API

export default (node, config) => {
  return new Promise( resolve => {
    let params = {}
    if(node.data){
      if(node.data.type){
        params.p_type = node.data.type
        params.p_id = node.data.id
      }
      params.page = node.data.currentPage
    }
    params.page_size = config.pageSize ? config.pageSize : 10
    params.data_type = config.dataType ? config.dataType : 'middle'
    TreenodeApi.get(params).then( res => {
      if ( res.data && res.data.code === 0){
        resolve(res.data.data)
      }
    })
  })
}