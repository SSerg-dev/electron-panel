/**
 * PaxDevice.ts
 *
 * @copyright 2021 Alles Good
 *
 */

import { EventEmitter } from 'events'
import SerialPort from 'serialport'
import { ADR_PAX_TERMINAL } from '../Constants'
import BCNetParser from '../BCNetParser'
import CMDS from '../Commands'
import { wait } from '../../../utils'

import { 
  AMOUNT_FUNC, 
  CURRENCY_FUNC,
  TIMEDATE_FUNC,
  CODE_FUNC,
  UNUMBER_FUNC,
  IDENT_FUNC,
  VUNAME_FUNC

} from '../Constants'


/**
 * Class PaxDevice
 */
class PaxDevice extends EventEmitter {
  adr: number
  commands: any
  port: string
  portOptions: any
  serial: any
  parser: any
  isDebug: any
  bills: any
  /* dev */
  terminalId: string
  messages: any

  /**
   * PaxDevice constructor.
   *
   * @param {String} port Serialport address.
   * @param {Boolean} debug Printing debug info flag.
   */
  constructor(port: string, bills: number[], debug: boolean) {
    super()
    let self = this
    this.adr = ADR_PAX_TERMINAL
    this.commands = CMDS(this)
    this.port = port || ''
    this.portOptions = {
      baudRate: 11520,
      databits: 8,
      stopbit: 1,
      parity: 'none',
      autoOpen: false
    }
    /* Create comport driver.  */
    this.serial = new SerialPort(this.port, this.portOptions, err =>
      console.log(err)
    )
    this.parser = this.serial.pipe(new BCNetParser())
    this.isDebug = debug || false
    this.bills = bills || []
    /* dev */
    this.terminalId = '00080951'
    this.messages = []


  }
  // getters
  get isOpen() {
    return this.serial.isOpen
  }
  // end getters

  // methods

  // comport methods --------------------
  /**
   * Open comport.
   */

  open = () => {
    let self = this
    return new Promise<any>((resolve, reject) => {
      if (self.serial.isOpen) {
        resolve(true)
      } else {
        self.serial.open((error: any) => {
          if (error) {
            reject(error)
          }
          resolve(true)
        })
      }
    })
  }

  /**
   * Connect to device.
   */
  connect = async () => {
    /* Check comport. */
    if (!this.isOpen) {
      try {
        const response = await this.open()
        console.log('PaxDevice-->connect-->response', response)
      } catch (err) {
        throw err
      }
    }
  } // end connect

  /**
   * Disconnect from device.
   */
  disconnect = async () => {
    try {
      await this.close()
    } catch (err) {
      //throw err
    }
  }

  /**
   * Close comport.
   */
  close = () => {
    let self = this
    return new Promise<any>((resolve, reject) => {
      if (self.serial.isOpen) {
        self.serial.close((error: any) => {
          if (error) {
            reject(error)
          }
          resolve(true)
        })
      } else {
        resolve(true)
      }
    })
  }
  // end comport methods ----------------

  // pax methods ------------------------
  getSaleRequest = () => {
    // console.log('++getSaleRequest')
    this.messages[0] = AMOUNT_FUNC
    this.messages[1] = CURRENCY_FUNC
    this.messages[2] = TIMEDATE_FUNC 
    this.messages[3] = CODE_FUNC 
    this.messages[4] = UNUMBER_FUNC
    this.messages[5] = IDENT_FUNC
    this.messages[6] = VUNAME_FUNC

    // this.messages.forEach((item: any, index: number) => {
    //   console.log((index + 1), this.messages[index])
    // })
    
    let dataLength = 5 
    for (let i = 0; i < 7; i++) {
        dataLength += 3
        dataLength += this.messages[i].toString().length
        console.log(i, this.messages[i], dataLength)
    }
    let messagesLength = dataLength - 5
    console.log('++messagesLength-->', messagesLength) 
    
  }  
      




  
  // end pax methods --------------------
 



} // end class PaxDevice

export default PaxDevice

/* End of file PaxDevice.ts */
