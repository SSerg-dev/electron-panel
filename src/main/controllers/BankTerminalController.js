/**
 * BankTerminalController.js
 * @copyright 2021 Alles Good
 */

import { EventEmitter } from 'events'
import BCNet from '../services/BCNetService'

class BankTerminalController extends EventEmitter {
  constructor() {
    super()
    this.type = 'BANK_TERMINAL'
    this.terminal = null
  }
  
  get terminalItem() {
    return this.terminal
  }

  async start(options) {
    const { type, number, currency } = options
    const config = {
      port: null,
      number: number, 
      currency: currency
    }
    switch (type) {
      case 'pax':
        config.port = BCNet.PAX_PORT
        BCNet.Pax.connect(config)
        break
      case 'mdb':
        break

      default:
        break
    }
  }
  stop() {
    console.log('BankTermialController-->plug stop')
  }

}

export default BankTerminalController
