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
const enum States {
  CONNECTED,
  DISCONNECTED
}
const Currencies = ['RUS']

const Config = {
  ip: '',
  port: 0
}

class BankTerminalController extends EventEmitter {
  static type = 'BANK_TERMINAL'

  device: any
  counter: number
  state: States
  currency: number
  bills: number[]
  port: number

  /* dev */
  config: typeof Config

  constructor(config: typeof Config) {
    super()
    this.counter = 0
    this.currency = 0
    this.bills = []
    this.state = States.DISCONNECTED
    this.port = 10

    /* dev */
    this.config = config
  }
  // methods
  public start(options: string) {
    log(TAG, 'start BankTerminal...')
    /* console.log('conf-->',conf) */
    console.log('conf-->', options)

    this.connect(options)
  }
  private connect = async (options: string) => {
    log(TAG, 'BankTerminal Connecting...')
    let port: string
    // for (let i = 0; i < 4; i++) {
      
    switch (options) {
      case 'vendotek':
        console.log('++run vendotek')
        this.device = new BCNet.Vendotek()

      break

      default:
      break  
    }  


    //   this.device = new CCNet.BillValidator(port, conf.debug)
    //   this.setListeners()
    //   try {
    //     await this.device.connect()
    //     this.port = i
    //     this.state = States.CONNECTED
    //     log(TAG, 'Connected at port', port)
    //     break
    //   } catch (err) {
    //     this.state = States.DISCONNECTED
    //     log(TAG, 'Connected error', err)
    //   }
    // }

    // if (this.state !== States.CONNECTED) {
    //   this.port = 10
    //   throw new Error('No any device at /dev/ttyUSB[0-3] detected')
    // } else {
    //   return true
    // }
  } // end connect
}

export default BankTerminalController
