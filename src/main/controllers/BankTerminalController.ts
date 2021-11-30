/**
 *  BankTerminalController.ts
 * 
 * @copyright 2021 Alles Good
 * @license   MIT
 * 
 */

 import { EventEmitter } from 'events'

 import { log, wait } from '../utils'
 import { CCNet } from 'cashcode-bv'
 import * as conf from '../config'
 
const TAG = "BANK TERMINAL"

const enum States {
  CONNECTING,
	DISCONNECTED

  // NOT_INSTALLED,
  // CONNECTED,
  // TIMEOUT
	
}
const Currencies = [
	"RUS"
]

class BankTerminalController extends EventEmitter {
  
  // bankTerminalDevice
	
  // 01 group
  state: States
  // isFirstTime: boolean
  // isTryConnect: boolean
  // isCancel: boolean
  // isRequested: boolean 
  // isNotInstalled: boolean
  port: number

  // 02 group
  // socket: string
  // serial: string
  // vendotek: string
  // pax: string

  
  constructor() {
    super()
		this.state = States.DISCONNECTED
    this.port = 10 

  }

  // methods
  private connect = async () => {
    log(TAG, "++Connecting...")
    let port: string
    
  }
  // end methods
} 
