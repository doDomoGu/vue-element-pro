import { return_format } from '../utils'
import address from '../models/address'

export default {
  list: () => {
    return return_format(0, address, null)
  },
  
}
