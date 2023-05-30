/**
 * BankTerminalController.ts
 * @copyright 2021 Alles Good
 */
import { EventEmitter } from 'events'
import BCNet from '../services/BCNetService'
class BankTerminalController extends EventEmitter {
  static type = 'BANK_TERMINAL'
  terminal = null
  observer = null

  constructor() {
    super()
  }
  get terminalItem() {
    return this.terminal
  }
  get observerItem() {
    return this.observer
  }

  connect = async options => {
    const { type, number } = options

    switch (type) {
      case 'vendotek':
        const ip =
          '192.168.' +
          BCNet.VENDOTEK_IP_SUBNET.toString() +
          '.' +
          (BCNet.VENDOTEK_IP_SUFFIX + numyber).toString() 
        BCNet.Vendotek.connect({
          ip: ip,
          port: BCNet.VENDOTEK_PORT
        })
        this.terminal = BCNet.Vendotek.item
        // initial observer
        BCNet.Observer.initial()
        this.observer = BCNet.Observer.item

        break
      case 'pax':
        BCNet.Pax.connect({
        })
        this.terminal = BCNet.Pax.item
        // initial observer
        BCNet.Observer.initial()
        this.observer = BCNet.Observer.item
        break

      default:
        break
    }
    let result = BCNet.Vendotek.item
    return result
  } // end connect
} // class BankTerminalController

export default BankTerminalController
