/**
 * PaxDevice.ts
 *
 * @copyright 2021 Alles Good
 *
 */

import { EventEmitter } from 'events'
import SerialPort from 'serialport'
import { ADR_CARD_READER, CRC_POLY } from '../Constants'
import BCNetParser from '../BCNetParser'
import CMDS from '../Commands'
import { wait } from '../../../utils'
import BCNet from '..'

import {
  ACK_RES,
  NAK_RES,
  EOT_RES,
  STX_RES,
  TIMEOUT_1,
  TIMEOUT_2,
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
import { resolve } from 'dns'
import { reject } from 'lodash'

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
  status: any

  isSend: boolean
  /* dev */
  currency: string
  date: any
  terminalId: string
  paxRequest: any
  paxMessage: any
  dataLength: number = 0
  messageType: any = MessageType.request

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
    debug: boolean = false
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
    this.serial = new SerialPort(this.port, this.portOptions, err =>
      this.debug(err)
    )
    /* On serial open event. */
    this.serial.on('open', () => self.onSerialPortOpen())
    /* On serial error event. */
    this.serial.on('error', (error: any) => self.onSerialPortError(error))
    /* On serial close event. */
    this.serial.on('close', () => this.onSerialPortClose())

    this.parser = this.serial.pipe(new BCNetParser())
    /* Device identification information. */
    this.info = {
      model: '',
      serial: '',
      asset: ''
    }
    this.isDebug = debug || false
    this.bills = bills || []
    this.terminalId = '00080951'
    this.paxRequest = PaxRequest
    this.paxMessage = PaxMessage

    // this.messageType = MessageType.wait
    // console.log('this.commands-->', this.commands)
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
      } catch (err) {
        throw err
      }
    }
    // device init --------------
    try {
      /* dev */
      // await this.reset()
      await this.request2()
      // await this.execute(this.commands.Ack)
      // await this.execute(this.commands.Nak)

      // this.sale()

      // await this.waitStatus('13', 5000)
      // console.log('++this.commands.Identification-->', this.commands.Identification)

      // this.info = await this.execute(this.commands.Identification)
      // console.log('++this.info-->', this.info )

      return true
    } catch (error) {
      throw error
    }
  } // end connect

  reset = async () => {
    try {
      await this.execute(this.commands.Reset)
      // console.log('!!++reset')
    } catch (error) {
      console.log(error)
    }
  }

  request2 = async () => {
    try {
      // console.log('++this.commands.Request')
      await this.execute(this.commands.Request)
    } catch (error) {
      console.log(error)
    }
  }

  isBusy = () => {
    switch (this.status) {
      case ACK_RES:
        return false
      case NAK_RES:
      case EOT_RES:
      case STX_RES:
      case TIMEOUT_1:
      case TIMEOUT_2:
        return true
      default:
        return false
    }
  }

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
  send = (request: Buffer, timeout: number = 1000) => {
    /* Linked self. */
    let self = this
    /* Async worker. */
    return new Promise<any>(async (resolve, reject) => {
      /* Timeout timer. */
      let timer: any = null
      /* Timeout timer handler. */
      let timerHandler = () => {
        /* Update flag. */
        self.isSend = false
        /* Send event. */
        reject(new Error('Request timeout: 286'))
      }
      /* Receive packet handler. */
      let handler = async (response: Buffer) => {
        /* Unbind timeout handler. */
        clearTimeout(timer)
        /* Unbind event. */
        self.parser.removeListener('data', handler)

        this.debug(`response => ${response.toString()}`)
        await wait(100)

        /* Check CRC */
        let ln = response.length
        let check = response.slice(ln - 2, ln)
        let slice = response.slice(0, ln - 2)
        /* Check response CRC. */
        if (check.toString() !== self.getCRC16(slice).toString()) {
          /* Send NAK. */
          this.debug('Send NAK')
          await self.serial.write(self.commands.Nak.request())
          /* Update flag. */
          self.isSend = false
          /* Send event. */
          reject(new Error('Wrong response data hash.'))
        }
        /* Get data from packet. */
        let data = response.slice(3, ln - 2)
        /* Check response type. */
        if (data.length == 1 && data[0] == 0x00) {
          /* Response receive as ACK. */
        } else if (data.length == 1 && data[0] == 0xff) {
          /* Response receive as NAK. */
          reject(new Error('Wrong request data hash.'))
        } else {
          /* Send ACK. */
          this.debug('Send ACK')
          await self.serial.write(self.commands.Ack.request())
        }
        /* Update flag. */
        self.isSend = false
        /* Send event. */
        resolve(data)
      }
      /* Bind event. */
      self.parser.once('data', handler)
      /* Update flag. */
      self.isSend = true
      /* Send packet. */
      this.debug(`request => ${request.toString()}`)
      await wait(100)
      self.serial.write(request)
      /* Bind timeout handler. */
      timer = setTimeout(timerHandler, timeout)
    })
  }

  sendRequest = async (request: Buffer, timeout: number = 1000) => {
    let self = this
    this.status = false
    this.reset()

    let temp: any = 'AAA'

    temp = Buffer.from(temp)
    // console.log('from temp-->', temp)
    const isResponse = await self.serial.write(temp)

    // self.serial.on('readable', function () {
    //   console.log('Data:', self.serial.read())
    // })

    // temp = self.serial.read()
    // console.log('read temp-->', temp)

    const promise = new Promise((resolve, reject) => {
      // setTimeout(() => {

      // }, timeout)

      const paxData = { name: 'pax', value: 42 }

      if (isResponse) {
        this.status = true
        resolve(paxData)
      } else {
        this.status = false
        reject(new Error('Response reject error'))
      }
    })
    promise
      .then(data => {
        console.log('promise data-->', data)
      })
      .catch(error => console.log('Response data error', error))
  } // end sendRequest

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
      /* dev */
      // this.currency
      '643'
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
    /* dev */
    this.paxRequest.messages[6] = this.createMessage(
      VUNAME_FUNC,
      'VM' + this.terminalId
    )

    return this.getRequest()
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

  /* dev */

  /* getRequest() {
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
    console.log('request header data-->', data)

    this.paxRequest.messages.forEach((item: any, index: number) => {
      data += this.paxRequest.messages[index].numField.toString()
      data += (this.paxRequest.messages[index].mesLen & 0xff).toString()
      data += (this.paxRequest.messages[index].mesLen >> 8).toString()
      data += this.paxRequest.messages[index].data.toString()
    })

    const crc16 = this._getCRC16(data, this.dataLength - 2)
    data += crc16 & 0xff
    data += crc16 >> 8 // ?

    console.log('request header + body data-->', data)
    return data
  } */

  /* dev */
  // converters -------------------------
  str2hex = (str: any) => {
    str = str.toString()
    let hex = []
    for (let i = 0; i < str.length; i++) {
      hex.push('0x' + str.charCodeAt(i).toString(16))
    }
    return hex
  }
  hex2bin = (buf: any) => {
    let d = []
    for (let i = 0, max = buf.length; i < max; i++) {
      // Iterator by bits
      for (let j = 8; j > 0; j--) {
        if (buf[i] & Math.pow(2, j - 1)) {
          d.push(true)
        } else {
          d.push(false)
        }
      }
    }
    return d.reverse()
  }

  // end converters ---------------------

  getRequest() {
    let result
    this.paxRequest.stx = BCNet.STX_RES

    this.paxRequest.mesgsLen = 0
    this.paxRequest.mesgsData = ''

    this.paxRequest.messages.forEach((item: any, index: number) => {
      this.paxRequest.mesgsLen += this.paxRequest.messages[index].mesLen
      this.paxRequest.mesgsData += this.paxRequest.messages[index].data
    })
    // console.log('request header + body data-->', data)
    // ----------------------------------
    const stx = Buffer.from([this.paxRequest.stx])

    // buf.swap16()
    // console.log('++buf-->',buf)
    // ----------------------------------

    let cmd = Buffer.concat([
      Buffer.from([this.paxRequest.stx]), // stx 1 byte
      /* dev */
      // Buffer.from([this.paxRequest.mesgsLen, '00']), // mesgsLen 2 byte ??
      Buffer.from(['46', '00']),
      Buffer.from(['00']), // field number 1 byte
      Buffer.from([this.paxRequest.messages[0].mesLen, '00']), // mesgsLen 2 byte ??
      Buffer.from(this.str2hex(this.paxRequest.messages[0].data.toString(10))), // data
      Buffer.from(['04']),
      Buffer.from([this.paxRequest.messages[1].mesLen, '00']),
      Buffer.from(this.str2hex(this.paxRequest.messages[1].data.toString(10))),
      Buffer.from(['21']),
      Buffer.from([this.paxRequest.messages[2].mesLen, '00']),
      Buffer.from(this.str2hex(this.paxRequest.messages[2].data.toString(10))),
      Buffer.from(['25']),
      Buffer.from([this.paxRequest.messages[3].mesLen, '00']),
      Buffer.from(this.str2hex(this.paxRequest.messages[3].data.toString(10))),
      Buffer.from(['26']),
      Buffer.from([this.paxRequest.messages[4].mesLen, '00']),
      Buffer.from(this.str2hex(this.paxRequest.messages[4].data.toString(10))),
      Buffer.from(['27']),
      Buffer.from([this.paxRequest.messages[5].mesLen, '00']),
      Buffer.from(this.str2hex(this.paxRequest.messages[5].data.toString(10))) // 00080951

      /* 
      02 2e 00 00 03 00 31 30 30 04 03 00 36 34 33 15 0e
      00 32 30 32 32 30 31 31 39 31 33 31 30 30 31 19 01 
      00 31 1a 01 00 31 1b 08 00 30 30 30 38 30 39 35 31
      */
    ])

    console.log('--cmd-->', cmd)
    result = cmd

    return result
  }

  sale(sum: number = 10, ern: number = 1) {
    let result
    this.clear()
    this.messageType = MessageType[5]

    let data: any = this.getSaleRequest(sum, ern)

    result = this.request(data)
    // console.log('++result-->', data)

    return result
  }
  request(request: any) {
    // ----------------------------------
    // let buff: string,
    //   ebuf: string,
    //   end: boolean = true,
    //   res: number = 0,
    //   nakCount: number = 0
    // const chWait = [0x2, 0x5, 0x0, 0x19, 0x2, 0x0, 0x32, 0x31, 0xa5, 0xc2]
    // ----------------------------------

    // ----------------------------------

    switch (this.messageType) {
      case 'request':
        // console.log('++request-->', this.messageType)
        this.sendRequest(request, TIMEOUT_1 * 1000)

        break

      case 'wait':
        break
      case 'answer':
        break
      case 'response':
        break
      case 'eot':
        break

      default:
        break
    }
  }

  /*     */

  _getCRC16(pBuf: any, lSize: number) {
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

  /* Utils methods --------------------------------------------------------- */
  /* ----------------------------------------------------------------------- */

  /**
   * Waits for the occurrence of the specified status event.
   *
   * @param {String} status Number of status code.
   * @param {Number} timeout The maximum time to complete this action.
   * @returns {Promise}
   */
  waitStatus = (status: string, timeout: number = 1000) => {
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
  } // end waitStatus

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
  execute = (command: any, params: any[] = [], timeout: number = 1000) => {
    let self = this
    return new Promise<any>(async (resolve, reject) => {
      try {
        let request = command.request(params)
        await self.waitSending(timeout)
        let response = await self.send(request, timeout)
        resolve(command.response(response))
      } catch (error) {
        reject(error)
      }
    })
  }
  /**
   * Calculation packet checksum.
   *
   * @param {Buffer} buffer Raw data for calculation.
   * @returns {Number} Calculated checksum.
   */
  getCRC16 = (buffer: Buffer) => {
    let CRC = 0
    let buf = Buffer.alloc(2)
    for (let i = 0; i < buffer.length; i++) {
      CRC ^= buffer[i]
      for (let j = 0; j < 8; j++) {
        if (CRC & 0x0001) {
          CRC >>= 1
          CRC ^= CRC_POLY
        } else CRC >>= 1
      }
    }
    buf.writeUInt16BE(CRC, 0)
    return Array.prototype.reverse.call(buf)
  }

  /**
   * Printing data to console.
   *
   * @param {Any} params Data for printing to console.
   */
  debug = (...params: any) => {
    if (this.isDebug) {
      console.log(params)
    }
  }
  // end pax methods --------------------
} // end class PaxDevice

export default PaxDevice

/* End of file PaxDevice.ts */
