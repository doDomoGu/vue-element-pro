import { return_format, checkToken, getParams } from '../utils'
import campaigns from '../models/campaign'
import orders from '../models/order'
import solutions from '../models/solution'
import banners from '../models/banner'
// import FileSaver from 'file-saver'

// import treenodeData from './treenode.json'

export default {
  data: config => {
    let code = 0
    let data = null
    let msg = null
    if(!checkToken(config.url)){
      code = 1001
      msg = 'Token 错误'
    }else{
      const params = getParams(config.url)

      data = []
      // data = treenodeData
      // console.log(treenodeData)
      let _campaigns = JSON.parse(JSON.stringify(campaigns))

      for(let i in _campaigns){
      if(params.type != 'campaign') {
        
          let _orders = JSON.parse(JSON.stringify(orders))
          let children = []
          for(let j in _orders){
            if(_campaigns[i].id == _orders[j].p_id){


              if(params.type != 'order') {
                let children2 = []
                let _solutions = JSON.parse(JSON.stringify(solutions))
                for(let k in _solutions){
                  if(_orders[j].id == _solutions[k].p_id){

                    if(params.type != 'solution') {
                      let children3 = []
                      let _banners = JSON.parse(JSON.stringify(banners))
                      for(let l in _banners){
                        if(_solutions[k].id == _banners[l].p_id){

                          children3.push(_banners[l])
                        }
                      }
                      if(children3.length>0){
                        _solutions[j].children = children3
                      }
                    }
                      
                      children2.push(_solutions[k])
                    }
                }
                if(children2.length>0){
                  _orders[j].children = children2
                }
              }

              children.push(_orders[j])
            }
          }
          if(children.length>0){
            _campaigns[i].children = children
          }
          
        }
        data.push(_campaigns[i])
      }

    } 


    
      /* const data2 = JSON.stringify(data)
      const blob = new Blob([data2], {type: ''})
      FileSaver.saveAs(blob, 'data.json') */

    return return_format(code, data, msg)
  }
  
}
