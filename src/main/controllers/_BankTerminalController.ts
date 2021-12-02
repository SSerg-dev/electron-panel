/**
 *  BankTerminalController.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */
 const net = require('net')
// const EventEmitter = require('events')

import { EventEmitter } from 'events'

 import { log, wait } from '../utils'
 import { Vendotek } from 'vendotek'
 import * as conf from '../config'
import { TypesFolder } from 'node-opcua'
 
const TAG = "BANK TERMINAL"

const enum States {
  CONNECTED,
	DISCONNECTED	
}

const Config = {
  ip: '',
  port: 0
}

class BankTerminalController extends EventEmitter {

  static type = 'BANK_TERMINAL'

  device: any
	state: States

  config: typeof Config
  opNumber: number
  
  constructor(config: typeof Config) {
    super()
		this.state = States.DISCONNECTED

	  this.config = config
    this.opNumber = 0 
  }
  // methods
  public start() {
    log(TAG, "start BankTerminal...")
  }
  public print() {
    console.log(`ip: ${this.config.ip} port: ${this.config.port} `)
  }
  // ------------------------------------
  /* static connect(config: typeof Config) {
    let item = new Vendotek(config);
    item.connecting = item.connect();
    return item;
  } */
   

  // end methods
} // end class BankTerminalController


export default BankTerminalController
