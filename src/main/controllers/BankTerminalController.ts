/**
 *  BankTerminalController.ts
 *
 * @copyright 2021 Alles Good
 *
 */

import { EventEmitter } from 'events'

import { log, wait } from '../utils'
import { Vendotek } from 'vendotek'
import * as conf from '../config'
import { TypesFolder } from 'node-opcua'
import BCNet from '../services/BCNetService'

const TAG = 'BANK TERMINAL'
class BankTerminalController extends EventEmitter {
  static type = 'BANK_TERMINAL'
  constructor() {
    super()
  }
  // methods
  public start(options: string) {
    // log(TAG, 'start BankTerminal...')
    this.connect(options)
  }
  private connect = async (options: string) => {
    switch (options) {
      case 'vendotek':
        // STA +
        // ------------------------------
        log(TAG, 'BankTerminal Connecting to Vendotek')
        BCNet.Vendotek.connect({
          ip: '192.168.1.52',
          port: 62801
        })
        // ------------------------------
        // BCNet.Vendotek.sendIDLE() 

        break

      default:
        break
    }
  } // end connect
} // class BankTerminalController

export default BankTerminalController
