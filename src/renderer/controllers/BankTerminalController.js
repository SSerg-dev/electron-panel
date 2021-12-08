import { EventEmitter } from 'events'
// import { type } from 'os'
import BCNet from '../services/BCNetService'
import Vendotek from '../services/BCNetService/Types/Vendotek'

const TAG = 'BANK TERMINAL'
class BankTerminalController extends EventEmitter {
  
  static type = 'BANK_TERMINAL'
  vendotek = null

  constructor() {
    super()
  }
  get vendotekItem() {
    return this.vendotek
  }
  
  connect = async options => {
    const { type, number } = options
    const ip = '192.168.1.' + (BCNet.VENDOTEK_IP_SUFFIX + number).toString()

    switch (type) {
      case 'vendotek':
        BCNet.Vendotek.connect({
          ip: ip,
          port: BCNet.VENDOTEK_PORT
        })
        this.vendotek = BCNet.Vendotek.item

        break

      default:
        break
    }
    let result = BCNet.Vendotek.item
    return result
  } // end connect

} // class BankTerminalController

export default BankTerminalController
