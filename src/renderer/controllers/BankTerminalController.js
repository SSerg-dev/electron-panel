import { EventEmitter } from 'events'
import { type } from 'os'
// import BCNet from '../services/BCNetService'
import BCNet from '../services/BCNetService'

const TAG = 'BANK TERMINAL'
class BankTerminalController extends EventEmitter {
  static type = 'BANK_TERMINAL'
  constructor() {
    super()
  }
  // methods
  start(options) {
    this.connect(options)
    
  }
  connect = async options => {
    const { type, number } = options
    const ip = '192.168.1.' + (BCNet.VENDOTEK_IP_SUFFIX + number).toString()

    switch (type) {
      case 'vendotek':
        // console.log('type-->', type)
        BCNet.Vendotek.connect({
          ip: ip,
          port: BCNet.VENDOTEK_PORT
        })
        // ------------------------------
        break

      default:
        break
    }
  } // end connect
} // class BankTerminalController

export default BankTerminalController
