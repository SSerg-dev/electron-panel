/**
 * BankTerminalController.ts
 * @copyright 2021 Alles Good
 */

import { EventEmitter } from 'events'
import BCNet from '../services/BCNetService'

class BankTerminalController extends EventEmitter {
  static type = 'BANK_TERMINAL'
  terminal = null

  constructor() {
    super()
  }
  get terminalItem() {
    return this.terminal
  }

  public start = async (options: any) => {
    const { type, number, currency } = options
    const config = {
      // port: BCNet.PAX_PORT,
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
  public stop = async () => {
    console.log('BankTermialController-->plug stop')
  }

}

export default BankTerminalController
