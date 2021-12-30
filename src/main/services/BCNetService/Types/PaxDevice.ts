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
import BCNet from '../../../services/BCNetService'

import {
  AMOUNT_FUNC,
  CURRENCY_FUNC,
  TIMEDATE_FUNC,
  CODE_FUNC,
  UNUMBER_FUNC,
  IDENT_FUNC,
  VUNAME_FUNC
} from '../Constants'

import { PaxRequest } from './PaxRequest'
import { PaxMessage } from './PaxMessage'

/**
 * Class PaxDevice
 */
class PaxDevice extends EventEmitter {
  adr: number
  commands: any
  port: string
  currency: string
  date: any
  portOptions: any
  serial: any
  parser: any
  isDebug: any
  bills: any
  /* dev */
  paxRequest: any
  paxMessage: any

  /**
   * PaxDevice constructor.
   *
   * @param {String} port Serialport address.
   * @param {Boolean} debug Printing debug info flag.
   */
  constructor(port: string, currency: string, bills: number[], debug: boolean) {
    super()
    let self = this
    this.adr = ADR_PAX_TERMINAL
    this.commands = CMDS(this)
    this.port = port || ''
    this.currency = currency || 'RU'
    this.date = new Date()
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
    //  console.log('this.serial-->', this.serial)
    this.parser = this.serial.pipe(new BCNetParser())
    this.isDebug = debug || false
    this.bills = bills || []
    /* dev */
    //  this.terminalId = '00080951'
    this.paxRequest = PaxRequest
    this.paxMessage = PaxMessage
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
        //  console.log('PaxDevice-->connect-->response', response)
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
  dateFilter = (value: any, format = 'date') => {
    let yyyy = this.date.getFullYear()
    let mm = this.date.getMonth() + 1
    let dd = this.date.getDate()

    let hh =
      this.date.getHours() < 10
        ? '0' + this.date.getHours()
        : this.date.getHours()
    let min =
      this.date.getMinutes() < 10
        ? '0' + this.date.getMinutes()
        : this.date.getMinutes()
    let ss =
      this.date.getSeconds() < 10
        ? '0' + this.date.getSeconds()
        : this.date.getSeconds()

    return String(10000 * yyyy + 100 * mm + dd + hh + min + ss)
  }
  // toHex = (num: string) => Math.abs(num).toString(16)

  createMessage = (code: number, message: string) => {
    this.paxMessage.numField = code
    this.paxMessage.mesLen = message.length
    this.paxMessage.data = message

    // console.log('this.paxMessage-->', this.paxMessage)
    return this.paxMessage
  }

  getSaleRequest = (sum: number = 10, ern: number, dataLength: number) => {
    // this.paxRequest.messages[0] = AMOUNT_FUNC
    // this.paxRequest.messages[1] = CURRENCY_FUNC
    // this.paxRequest.messages[2] = TIMEDATE_FUNC
    // this.paxRequest.messages[3] = CODE_FUNC
    // this.paxRequest.messages[4] = UNUMBER_FUNC
    // this.paxRequest.messages[5] = IDENT_FUNC
    // this.paxRequest.messages[6] = VUNAME_FUNC

    // console.log('++this.currency-->', this.currency)

    this.paxRequest.messages[0] = this.createMessage(
      AMOUNT_FUNC,
      (sum * 100).toString()
    )
    this.paxRequest.messages[1] = this.createMessage(
      CURRENCY_FUNC,
      this.currency
    )
    this.date = new Date()
    this.paxRequest.messages[2] = this.createMessage(
      TIMEDATE_FUNC,
      this.dateFilter(this.date)
    )
    // console.log('TIMEDATE_FUNC-->', parseInt(TIMEDATE_FUNC.toString(), 16))
    console.log('this.paxRequest.messages[2]-->', this.paxRequest.messages[2])
    // ----------------------------------
    dataLength = 5
    this.paxRequest.messages.forEach((item: any, index: number) => {
      dataLength += 3
      dataLength += this.paxRequest.messages[index].toString().length
    })
    this.paxRequest.mesgsLen = dataLength - 5
    console.log('this.paxRequest.mesgsLen-->', this.paxRequest.mesgsLen)
    // ----------------------------------
    this.paxRequest.stx = BCNet.STX_RES
    let saleData: string =
      this.paxRequest.stx +
      (this.paxRequest.mesgsLen & 0xff).toString() +
      (this.paxRequest.mesgsLen >> 8).toString()

    console.log('++saleData-->', saleData)
    // ----------------------------------
    /* for (int i = 0; i < 7; i++) {
       saleData[offset++] = (char)(sale_req.messages[i].num_field);
       saleData[offset++] = (char)(sale_req.messages[i].mes_len & 0xff);
       saleData[offset++] = (char)(sale_req.messages[i].mes_len >> 8);
       strncpy(&saleData[offset], sale_req.messages[i].data, sale_req.messages[i].mes_len);
       offset += sale_req.messages[i].mes_len;
   } */

    const code = 42,
      message = '++SS'
    this.createMessage(code, message)
    // saleData: string =
    // for (let index in this.paxRequest.messages) {
    //   // console.log('index-->', index)
    //   saleData =
    // }

    // ----------------------------------
  }

  // end pax methods --------------------
} // end class PaxDevice

export default PaxDevice

/* End of file PaxDevice.ts */
