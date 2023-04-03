/**
 * PaxDevice.ts
 *
 * @copyright 2021 Alles Good
 *
 */

import { EventEmitter } from 'events'
import SerialPort from 'serialport'
import { ADR_CARD_READER, CRC_POLY_PAX, TERMINAL_ID, TERMINAL_TYPE } from '../Constants'
import BCNetParser from '../BCNetParser'
import CMDS from '../Commands'
import { wait } from '../../../utils'
import BCNet from '..'
import Pax from './Pax'

import {
  AMOUNT_FUNC,
  CURRENCY_FUNC,
  TIMEDATE_FUNC,
  CODE_FUNC,
  UNUMBER_FUNC,
  IDENT_FUNC,
  VUNAME_FUNC,
  SUCCESS
} from '../Constants'

import { PaxRequest } from './PaxRequest'
import { PaxMessage } from './PaxMessage'
import { createContext } from 'vm'
import { setTimeout } from 'timers'

import { ipcMain } from 'electron'
import { type } from 'os'
// const { MessageChannelMain } = require('electron')

const { crc8, crc16, crc32 } = require('easy-crc')

enum MessageType {
  sale,
  ack,
  nak,
  eot,
  wait,
  request,
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
  commands: any
  port: string
  portOptions: any
  serial: any
  parser: any
  info: any
  isDebug: any
  bills: any
  status: string = ''

  isSend: boolean
  currency: string
  date: any
  terminalId: string
  terminalType: string = TERMINAL_TYPE || 'VM00080951'
  paxRequest: any
  paxMessage: any
  dataLength: number = 0
  messageType: any = MessageType.request
  ern: number = 11
  readResponse: any = 0
  amount: number = 0
  resultEmitter: any = null
  time: string = ''
  counter: number = 5

  /**
   * PaxDevice constructor.
   *
   * @param {String} port Serialport address.
   * @param {Boolean} debug Printing debug info flag.
   */
  constructor(
    port: string,
    currency: string,
    bills: number[],
    debug: boolean = true
  ) {
    super()
    let self = this
    this.adr = ADR_CARD_READER
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
    this.isSend = false

    /* Create comport driver.  */
    let serialport = require("serialport")
    let SerialPort = serialport.SerialPort
    this.serial = null
    this.serial = new SerialPort(this.port, this.portOptions, (err: any) =>
      this.debug(err)
    )
    /* On serial open event. */
    this.serial.on('open', () => self.onSerialPortOpen())

    /* On serial error event. */
    this.serial.on('error', (error: any) => self.onSerialPortError(error))

    /* On serial close event. */
    this.serial.on('close', () => this.onSerialPortClose())

    /* Device identification information. */
    this.info = {
      model: '',
      serial: '',
      asset: ''
    }
    this.isDebug = debug || true
    this.bills = bills || []
    this.terminalId = TERMINAL_ID
    this.paxRequest = PaxRequest
    this.paxMessage = PaxMessage

    ipcMain.on('async-amount-message', (event, arg) => {
      this.amount = +arg
    })

    this.resultEmitter = new EventEmitter()
  }

  // getters
  get isOpen() {
    return this.serial.isOpen
  }
  // methods
  // comport methods --------------------

  connect = async () => {
    let self = this
    if (!self.serial.isOpen) {
      try {
        await self.open()
      } catch (err) {
        throw new Error(`Wrond connect ${err}`)
      }
    }
  }
  // end connect

  open = () => {
    let self = this
    return new Promise<any>((resolve, reject) => {
      if (self.serial.isOpen) {
        resolve(true)
      } else {
        self.serial.open((err: any) => {
          if (err) {
            reject(err)
          }
          // console.log('$$ PaxDevice self.serial.open')
          resolve(true)
        })
      }
    }).catch(err => console.error('Wrond open', err))
  }
  // end open

  disconnect = async () => {
    let self = this
    if (this.serial.isOpen) {
      try {
        await self.close()
      } catch (err) {
        throw new Error(`Wrond disconnect ${err}`)
      }
    }
  } // end disconnect

  close = () => {
    let self = this
    return new Promise<any>((resolve, reject) => {
      if (self.serial.isOpen) {
        self.serial.close((error: any) => {
          if (error) {
            reject(error)
          }
          console.log('$$ PaxDevice self.serial.close')
          resolve(true)
        })
      } else {
        resolve(true)
      }
    }).catch(err => console.error('Wrond close', err))
  } // end close

  // end comport methods ----------------

  /**
   * On serial events
   */
  onSerialPortOpen = () => this.debug('Serialport Open.')
  onSerialPortError = (error: any) => this.debug('Serialport Error:', error)
  onSerialPortClose = () => this.debug('Serialport Close.')

  // request & response methods ---------

  /**
   * Sending a data packet.
   *
   * @param {Buffer} request Data packet.
   * @param {Number} timeout The maximum time to complete this action.
   * @returns {Promise}
   */

  send = (request: Buffer, timeout: number = 2000) => {
    let self = this
    return new Promise<any>(async (resolve, reject) => {
      let timer: any = null
      let timerHandler = () => {
        reject(new Error('send: Request timeout'))
      }

      const res = self.serial.write(request)
      console.log('$$ response', res)

      timer = setTimeout(timerHandler, timeout)
    })
  }

  // dev
  // ------------------------------------
  write = (request: Buffer, timeout: number = 2000) => {
    let self = this
    setTimeout(() => {
      const res = self.serial.write(request)
      /* dev */
      /* let chunk
        while (null !== (chunk = self.serial.read())) {
          self.readResponse = chunk
        }
      console.log('$$ self.readResponse', self.readResponse ) */

      return res
    }, timeout)
  }
  // ------------------------------------
  read = (request: Buffer, timeout: number = 2000) => {
    let self = this
    let result
    try {
      self.connect()
      self.serial.on('readable', () => {
        let chunk
        while (null !== (chunk = self.serial.read())) {
          self.readResponse = chunk
        }
        self.parseReadResponse(self.readResponse)
      })
    } catch (err) {
      throw new Error(`serial read  ${err}`)
    }
  }
  // ------------------------------------
  // end read
  // ------------------------------------
  async readNextResponse(request: Buffer) {
    let self = this
    let res = 42
    self.counter

    const eot = Buffer.from([BCNet.EOT_RES])
    const ack = Buffer.from([BCNet.ACK_RES])

    console.log('$$ readNextResponse self.isOpen 01', self.serial.isOpen)

    if (self.serial.isOpen) {
      await self.disconnect()
      await self.connect()

      console.log(
        '$$ readNextResponse self.serial.isOpen 02',
        self.serial.isOpen
      )
    }

    return res
  }
  // ------------------------------------
  parseReadResponse(response: any) {
    let self = this
    let res
    let result

    const ack = Buffer.from([BCNet.ACK_RES])
    const eot = Buffer.from([BCNet.EOT_RES])
    const stx = Buffer.from([BCNet.STX_RES])
    const timeout1 = BCNet.TIMEOUT_1 * 1000
    const timeout2 = BCNet.TIMEOUT_2 * 1000

    // ----------------------------------
    try {
      const resAck = response[0] 
      if (resAck === ack[0]) {
        setTimeout(() => {
          res = self.serial.write(ack)
          console.log('ASK res', res, response /* JSON.stringify(response) */)
        }, timeout1)
      }
    } catch (err) {
      console.log('$$ catch err ASK--> ', err)
    }

    try {
      if (response[0] === stx[0] && response[1] === 0x5) {
        setTimeout(() => {
          res = self.serial.write(ack)
          console.log('WAIT res', res, response)
        }, timeout1)
      }
    } catch (err) {
      console.log('$$ err WAIT--> ', err)
    }

    try {
      if (response[0] === stx[0] && response[1] !== 0x5) {
        setTimeout(() => {
          res = self.serial.write(ack)
          console.log('FIN res', res, response)

          const amount =
            response[6].toString(16) +
            response[7].toString(16) +
            response[8].toString(16)

          result = parseInt(self.hexToAscii(amount))
          const amountLength = self.amount.toString().length
          result = +result.toString().slice(0, amountLength)

          this.status = this.getStatus(response)

          this.amount = result
          if (+this.amount > 0) {
            this.sendSuccessAmount(result, this.status)

            /* dev */
            // res = self.serial.write(eot)
            // this.disconnect()
          }
        }, timeout1)
      }
    } catch (err) {
      // console.log('$$ err FIN', err)
    }
    // ----------------------------------

    return true
  }
  // ------------------------------------
  getStatus(response: any) {
    const index = response.findIndex((s: any) => s === SUCCESS)
    return response[index + 1].toString(16)
  }
  sendSuccessAmount(amount: number, status: string) {
    this.resultEmitter.emit('submitSuccessAmount', amount, status)
  }

  // ------------------------------------
  hexToAscii(str: string) {
    var hex = str.toString()
    var str = ''
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
    }
    return str
  }
  // ------------------------------------

  // end request & response methods -----

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
    code = this.toHex(code)
    this.paxMessage = new PaxMessage(code, message.length, message)
    return this.paxMessage
  }

  getSaleRequest = (sum: number = 100, ern: number) => {
    this.clear()
    ++this.ern

    this.paxRequest.messages[0] = this.createMessage(
      AMOUNT_FUNC,
      (sum * 100).toString()
    )

    this.paxRequest.messages[1] = this.createMessage(
      CURRENCY_FUNC,
      '643' // this.currency
    )

    this.date = new Date()
    this.paxRequest.messages[2] = this.createMessage(
      TIMEDATE_FUNC,
      this.dateFilter(this.date)
    )

    this.paxRequest.messages[3] = this.createMessage(CODE_FUNC, '1')

    this.paxRequest.messages[4] = this.createMessage(
      UNUMBER_FUNC,
      this.ern.toString()
    )

    this.paxRequest.messages[5] = this.createMessage(
      IDENT_FUNC,
      this.terminalId
    )

    this.paxRequest.messages[6] = this.createMessage(
      VUNAME_FUNC,
      this.terminalType
    )

    return this.getRequest()
  }

  getRequest() {
    const base = 10
    const headSize = 3

    this.paxRequest.stx = BCNet.STX_RES
    this.paxRequest.mesgsLen = 0
    this.paxRequest.mesgsData = ''

    this.paxRequest.messages.forEach((item: any, index: number) => {
      this.paxRequest.mesgsLen += this.paxRequest.messages[index].mesLen
      this.paxRequest.mesgsData += this.paxRequest.messages[index].data
    })

    const requestLength =
      this.paxRequest.mesgsLen + this.paxRequest.messages.length * headSize

    const head = Buffer.concat([
      Buffer.from([this.paxRequest.stx]), // stx 1 byte
      Buffer.from([requestLength.toString(base), '00']) // requestLength 2 byte
    ])

    const body = Buffer.concat([
      Buffer.from([this.paxRequest.messages[0].numField]), // field number 1 byte
      Buffer.from([this.paxRequest.messages[0].mesLen, '00']), // mesgsLen 2 byte
      Buffer.from(
        this.str2hex(this.paxRequest.messages[0].data.toString(base))
      ),

      Buffer.from([this.paxRequest.messages[1].numField]),
      Buffer.from([this.paxRequest.messages[1].mesLen, '00']),
      Buffer.from(
        this.str2hex(this.paxRequest.messages[1].data.toString(base))
      ),

      Buffer.from([this.paxRequest.messages[2].numField]),
      Buffer.from([this.paxRequest.messages[2].mesLen, '00']),
      Buffer.from(
        this.str2hex(this.paxRequest.messages[2].data.toString(base))
      ),

      Buffer.from([this.paxRequest.messages[3].numField]),
      Buffer.from([this.paxRequest.messages[3].mesLen, '00']),
      Buffer.from(
        this.str2hex(this.paxRequest.messages[3].data.toString(base))
      ),

      Buffer.from([this.paxRequest.messages[4].numField]),
      Buffer.from([this.paxRequest.messages[4].mesLen, '00']),
      Buffer.from(
        this.str2hex(this.paxRequest.messages[4].data.toString(base))
      ),

      Buffer.from([this.paxRequest.messages[5].numField]),
      Buffer.from([this.paxRequest.messages[5].mesLen, '00']),
      Buffer.from(
        this.str2hex(this.paxRequest.messages[5].data.toString(base))
      ),

      // VM00080951
      Buffer.from([this.paxRequest.messages[6].numField]),
      Buffer.from([this.paxRequest.messages[6].mesLen, '00']),
      Buffer.from(this.str2hex(this.paxRequest.messages[6].data.toString(base)))
    ])

    let result
    result = Buffer.concat([head, body])
    const crc = this.getCRC16(result)
    result = Buffer.concat([head, body, crc])

    return result
  }

  getCRC16 = (buffer: Buffer) => {
    const crc = crc16('BUYPASS', buffer)
    const result = Buffer.alloc(2)
    result.writeUInt16BE(crc, 0)

    return result
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
      this.terminalType
    )
    return this.getReconciliationPackRequest()
  }
  getReconciliationPackRequest() {
    const base = 10
    const headSize = 3

    this.paxRequest.stx = BCNet.STX_RES
    this.paxRequest.mesgsLen = 0
    this.paxRequest.mesgsData = ''

    this.paxRequest.messages.forEach((item: any, index: number) => {
      this.paxRequest.mesgsLen += this.paxRequest.messages[index].mesLen
      this.paxRequest.mesgsData += this.paxRequest.messages[index].data
    })

    const requestLength =
      this.paxRequest.mesgsLen + this.paxRequest.messages.length * headSize

    const head = Buffer.concat([
      Buffer.from([this.paxRequest.stx]), // stx 1 byte
      Buffer.from([requestLength.toString(base), '00']) // requestLength 2 byte
    ])

    const body = Buffer.concat([
      Buffer.from([this.paxRequest.messages[0].numField]), // field number 1 byte
      Buffer.from([this.paxRequest.messages[0].mesLen, '00']), // mesgsLen 2 byte
      Buffer.from(
        this.str2hex(this.paxRequest.messages[0].data.toString(base))
      ),

      Buffer.from([this.paxRequest.messages[1].numField]),
      Buffer.from([this.paxRequest.messages[1].mesLen, '00']),
      Buffer.from(
        this.str2hex(this.paxRequest.messages[1].data.toString(base))
      ),

      Buffer.from([this.paxRequest.messages[2].numField]),
      Buffer.from([this.paxRequest.messages[2].mesLen, '00']),
      Buffer.from(this.str2hex(this.paxRequest.messages[2].data.toString(base)))
    ])

    let result
    result = Buffer.concat([head, body])
    const crc = this.getCRC16(result)
    result = Buffer.concat([head, body, crc])

    return result
  }

  /* dev */
  // ------------------------------------
  getCheckRequest() {
    this.clear()
    this.paxRequest.messages[0] = this.createMessage(CODE_FUNC, '26')
    return this.getCheckPackRequest()
  }
  getCheckPackRequest() {
    const base = 10
    const headSize = 3

    this.paxRequest.stx = BCNet.STX_RES
    this.paxRequest.mesgsLen = 0
    this.paxRequest.mesgsData = ''

    this.paxRequest.messages.forEach((item: any, index: number) => {
      this.paxRequest.mesgsLen += this.paxRequest.messages[index].mesLen
      this.paxRequest.mesgsData += this.paxRequest.messages[index].data
    })

    const requestLength =
      this.paxRequest.mesgsLen + this.paxRequest.messages.length * headSize

    const head = Buffer.concat([
      Buffer.from([this.paxRequest.stx]), // stx 1 byte
      Buffer.from([requestLength.toString(base), '00']) // requestLength 2 byte
    ])

    const body = Buffer.concat([
      Buffer.from([this.paxRequest.messages[0].numField]), // field number 1 byte
      Buffer.from([this.paxRequest.messages[0].mesLen, '00']), // mesgsLen 2 byte
      Buffer.from(this.str2hex(this.paxRequest.messages[0].data.toString(base)))
    ])

    let result
    result = Buffer.concat([head, body])
    const crc = this.getCRC16(result)
    result = Buffer.concat([head, body, crc])

    return result
  }
  // ------------------------------------

  str2hex = (str: any) => {
    str = str.toString()
    let hex = []
    for (let i = 0; i < str.length; i++) {
      hex.push('0x' + str.charCodeAt(i).toString(16))
    }
    return hex
  }

  // ----------------------------------
  /* 
  swap = (number: any, base: any = 16) => {
    let buf
    switch (number.length) {
      case 1:
        buf = Buffer.from(['0', number.charCodeAt(0).toString(base)])
        break
      case 2:
        buf = Buffer.from([
          number.charCodeAt(0).toString(base),
          number.charCodeAt(1).toString(base)
        ])
        break
      default:
        buf = Buffer.from(['0', '0'])
    }
    buf = buf.swap16()
    return buf
  } 
  */
  // --------------------------------------

  /* Utils methods --------------------------------------------------------- */
  /**
   * Waits for the occurrence of the specified status event.
   *
   * @param {String} status Number of status code.
   * @param {Number} timeout The maximum time to complete this action.
   * @returns {Promise}
   */

  /* waitStatus = (status: string, timeout: number = 1000) => {
    console.log('++waitStatus')
    let self = this
    return new Promise<any>((resolve, reject) => {
      if (self.status == status) {
        resolve(true)
      }
      let timer: any = null
      let timerHandler = () => {
        clearTimeout(timer)
        self.removeListener('status', handler)
        reject(new Error('Request timeout: 703'))
      }
      let handler = (primary: string) => {
        if (primary == status) {
          clearTimeout(timer)
          self.removeListener('status', handler)
          resolve(true)
        }
      }
      self.on('status', handler)
      if (timeout) {
        timer = setTimeout(timerHandler, timeout)
      }
    })
  } */

  // end waitStatus

  /**
   * Waiting for the completion of the processing of the current command.
   *
   * @param {Number} timeout The maximum time to complete this action.
   * @returns {Promise}
   */
  waitSending = (timeout: number = 1000) => {
    // console.log('++waitSending')
    let self = this
    return new Promise<any>((resolve, reject) => {
      let timer: any = null
      let interval: number = 50
      let counter: number = 0
      if (!self.isSend) {
        resolve(true)
      }
      let timerHandler = () => {
        counter += interval
        if (!self.isSend) {
          clearInterval(timer)
          resolve(true)
        } else if (counter >= timeout) {
          clearInterval(timer)
          reject(new Error('Request timeout: 742'))
        }
      }
      timer = setInterval(timerHandler, interval)
    })
  } // end waitSending

  /**
   * Execute the specified command.
   *
   * @param {Object} command Target command.
   * @param {Object} params Execute parameters.
   * @param {Number} timeout The maximum time to complete this action.
   * @returns {Promise}
   */

  /* execute = (command: any, params: any[] = [], timeout: number = 1000) => {
    let self = this
    return new Promise<any>(async (resolve, reject) => {
      try {
        const request = command.request(params)
        await self.waitSending(timeout)
        await wait(100)
        const response = await self.send(request, timeout)
        resolve(command.response(response))
      } catch (error) {
        reject(error)
      }
    })
  } */
  // ------------------------------------

  /**
   * Printing data to console.
   *
   * @param {Any} params Data for printing to console.
   */
  debug = (...params: any) => {
    if (this.isDebug) {
      // console.log('$$ PaxDevice.ts debug',params)
    }
  }
  // end pax methods --------------------
} // end class PaxDevice

export default PaxDevice

/* End of file PaxDevice.ts */
