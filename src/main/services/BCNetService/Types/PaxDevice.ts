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
import BCNet from '..'

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

enum MessageType {
  sale,
  ack,
  nak,
  eot,
  wait,
  response,
  answer,
  succes,
  fail
}

/**
 * Class PaxDevice
 */
class PaxDevice extends EventEmitter {
  adr: number
  terminalId: string
  commands: any
  port: string
  currency: string
  date: any
  portOptions: any
  serial: any
  parser: any
  isDebug: any
  bills: any
  paxRequest: any
  paxMessage: any
  dataLength: number = 0
  messageType: MessageType = MessageType.wait  
  
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
    this.parser = this.serial.pipe(new BCNetParser())
    this.isDebug = debug || false
    this.bills = bills || []
    this.terminalId = '00080951'
    this.paxRequest = PaxRequest
    this.paxMessage = PaxMessage

    // this.messageType = MessageType.wait  
  
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
      throw err
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

  dateFilter = (value: any, format = 'datetime') => {
    const options: any = {}

    options.day = '2-digit'
    options.month = '2-digit'
    options.year = 'numeric'

    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'

    let year, month, day
    let hour, minute, second

    let result = new Intl.DateTimeFormat('ru-RU', options).format(
      new Date(value)
    )

    year = result.slice(6, 10)
    month = result.slice(3, 5)
    day = result.slice(0, 2)

    hour = result.slice(12, 14)
    minute = result.slice(15, 17)
    second = result.slice(18, 20)

    if (format.includes('date')) result = year + month + day
    if (format.includes('time')) result = hour + minute + second
    if (format.includes('datetime'))
      result = year + month + day + hour + minute + second

    return result
  }

  toHex = (num: any) => Math.abs(num).toString(16)

  clear() {
    this.paxRequest.messages = []
    this.dataLength = 0
  }

  createMessage = (code: any, message: string) => {
    /* dev */
    // code = '0x' + this.toHex(code).toUpperCase()
    code = this.toHex(code)
    this.paxMessage = new PaxMessage(code, message.length, message)
    return new PaxMessage(code, message.length, message)
  }

  getSaleRequest = (sum: number = 100, ern: number = 3) => {
    this.clear()

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
    this.paxRequest.messages[3] = this.createMessage(CODE_FUNC, '1')
    this.paxRequest.messages[4] = this.createMessage(
      UNUMBER_FUNC,
      ern.toString()
    )
    this.paxRequest.messages[5] = this.createMessage(
      IDENT_FUNC,
      this.terminalId
    )
    this.paxRequest.messages[6] = this.createMessage(
      VUNAME_FUNC,
      'VM' + this.terminalId
    )

    this.dataLength = 5
    this.paxRequest.messages.forEach((item: any, index: number) => {
      this.dataLength += 3
      this.dataLength += this.paxRequest.messages[index].mesLen
    })
    this.paxRequest.mesgsLen = this.dataLength - 5

    this.paxRequest.stx = BCNet.STX_RES
    let saleData: string =
      this.paxRequest.stx +
      (this.paxRequest.mesgsLen & 0xff).toString() +
      (this.paxRequest.mesgsLen >> 8).toString()

    this.paxRequest.messages.forEach((item: any, index: number) => {
      saleData += this.paxRequest.messages[index].numField.toString()
      saleData += (this.paxRequest.messages[index].mesLen & 0xff).toString()
      saleData += (this.paxRequest.messages[index].mesLen >> 8).toString()
      saleData += this.paxRequest.messages[index].data.toString()
    })

    const crc16 = this.getCRC16(saleData, this.dataLength - 2)
    saleData += crc16 & 0xff
    saleData += crc16 >> 8 // ?

    // console.log('++saleData-->', saleData.length, saleData)
    return saleData

    /* dev */
    // return this.getRequest()
  }

  getReconciliationRequest() {
    this.clear()
    this.paxRequest.messages[0] = this.createMessage(CODE_FUNC, '59')
    this.paxRequest.messages[1] = this.createMessage(
      IDENT_FUNC,
      this.terminalId
    )
    this.paxRequest.messages[2] = this.createMessage(
      VUNAME_FUNC,
      'VM' + this.terminalId
    )
    return this.getRequest()
  }

  getCheckRequest() {
    this.clear()
    this.paxRequest.messages[0] = this.createMessage(CODE_FUNC, '26')
    return this.getRequest()
  }

  getRequest() {
    this.dataLength = 5
    this.paxRequest.messages.forEach((item: any, index: number) => {
      this.dataLength += 3
      this.dataLength += this.paxRequest.messages[index].mesLen
    })
    this.paxRequest.mesgsLen = this.dataLength - 5

    this.paxRequest.stx = BCNet.STX_RES
    let data: string =
      this.paxRequest.stx +
      (this.paxRequest.mesgsLen & 0xff).toString() +
      (this.paxRequest.mesgsLen >> 8).toString()
    console.log('--request data-->', data)

    this.paxRequest.messages.forEach((item: any, index: number) => {
      data += this.paxRequest.messages[index].numField.toString()
      data += (this.paxRequest.messages[index].mesLen & 0xff).toString()
      data += (this.paxRequest.messages[index].mesLen >> 8).toString()
      data += this.paxRequest.messages[index].data.toString()
    })

    const crc16 = this.getCRC16(data, this.dataLength - 2)
    data += crc16 & 0xff
    data += crc16 >> 8 // ?

    console.log('++request data-->', data.length, data)
    return data
  }
  /* dev */
  sale(sum: number = 100, ern: number = 3) {
    this.clear()
    let data: string = this.getSaleRequest(sum, ern)
    return this.request(data)
  }
  request(data: string) {
    console.log('request data-->', data)
    /* dev */
    // ----------------------------------
    let buff: string,
      ebuf: string,
      end: boolean = true,
      res: number = 0,
      nakCount: number = 0
    const chWait = [0x2, 0x5, 0x0, 0x19, 0x2, 0x0, 0x32, 0x31, 0xa5, 0xc2]
    // ----------------------------------
    console.log('this.messageType-->', this.messageType)
    // while (end) {

    // }
  }

  /*     */

  getCRC16(pBuf: any, lSize: number) {
    let s: number
    for (s = 0x0000; lSize > 0; lSize--, pBuf++) {
      let b = pBuf
      for (let j = 0; j < 8; j++) {
        let x16 =
          (b & 0x80 && s & 0x8000) || (!(b & 0x80) && !(s & 0x8000)) ? 0 : 1
        let x15 = (x16 && s & 0x4000) || (!x16 && !(s & 0x4000)) ? 0 : 1
        let x2 = (x16 && s & 0x0002) || (!x16 && !(s & 0x0002)) ? 0 : 1
        s = s << 1
        b = b << 1
        s |= x16 ? 0x0001 : 0
        s = x2 ? s | 0x0004 : s & 0xfffb
        s = x15 ? s | 0x8000 : s & 0x7fff
      }
    }
    s = (s << 8) + (s >> 8)
    return s
  }

  // end pax methods --------------------
} // end class PaxDevice

export default PaxDevice

/* End of file PaxDevice.ts */
