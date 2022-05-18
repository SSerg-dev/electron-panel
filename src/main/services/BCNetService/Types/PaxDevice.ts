/**
 * PaxDevice.ts
 *
 * @copyright 2021 Alles Good
 *
 */

import { EventEmitter } from 'events'
import SerialPort from 'serialport'
import { ADR_CARD_READER, CRC_POLY_PAX, TERMINAL_ID } from '../Constants'
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
import { createContext } from 'vm'

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
  currency: string
  date: any
  terminalId: string
  terminalType: string = 'VM00080951'
  paxRequest: any
  paxMessage: any
  dataLength: number = 0
  messageType: any = MessageType.request
  ern: number = 11

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
    this.terminalId = TERMINAL_ID
    this.paxRequest = PaxRequest
    this.paxMessage = PaxMessage
  }

  // getters
  get isOpen() {
    return this.serial.isOpen
  }

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
    if (!this.isOpen) {
      try {
        const response = await this.open()
        // response--> true
      } catch (err) {
        throw err
      }
    }
    // device init --------------
    // try {
    //   this.execute(this.commands.Reset)
    //   return true
    // } catch (err) {
    //   throw err
    // }
  } // end connect

  disconnect = async () => {
    try {
      await this.close()
    } catch (err) {
      throw err
    }
  }

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
    let self = this
    return new Promise<any>(async (resolve, reject) => {
      
      // let timer: any = null
      // let timerHandler = () => {
      //     self.isSend = false
      //         reject(new Error('Request timeout.'))
      // }
      
      // const regular = /,/g
      // const convData = request.toJSON().data.toString().replace(regular," ")
      // console.log('$$ request', convData)
      
      console.log('$$ request', request)
      const response = self.serial.write(request)
      
      console.log('$$ response', response)

      // timer = setTimeout(timerHandler, timeout = 10000)
    })
  }

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
    // console.log('$$ this.paxRequest.messages', this.paxRequest.messages)

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
    // CRC 94 56
    // let result = Buffer.concat([cmd, this.device.getCRC16(cmd)])

    /* 
    Данные: 0x31,0x32,0x33
    Результат 32431
              7EAF

    Данные: 0x31
              Piter   Sergei
    Результат 42368 
              A580    00 07 
              
    */

    let result
    // result = Buffer.concat([head, body])
    // const crc = Buffer.from(this.getCRC16(result))
    // result = Buffer.concat([head, body, crc])
    // console.log('$$ CRC 65 66 bytes', result[65].toString(16), result[66].toString(16))
 
    const buff = Buffer.from('1') 
    console.log('$$ buff', buff)  
    console.log('$$ ++buff', this.getCRC16(buff)) 
    
    return result
  }

  getCRC16 = (buffer: Buffer) => {
    let CRC = 0
    let buf = Buffer.alloc(2)
    for (let i = 0; i < buffer.length; i++) {
      CRC ^= buffer[i]
      for (let j = 0; j < 8; j++) {
        if (CRC & 0x0001) {
          CRC >>= 1
          CRC ^= CRC_POLY_PAX
        } else CRC >>= 1
      }
    }
    if (+CRC >= 0 && +CRC <= 65535) buf.writeUInt16BE(CRC, 0)

    return Array.prototype.reverse.call(buf)
  }

  /* getCRC16(pBuf: any, lSize: number = 0) { 
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
  } */

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

  str2hex = (str: any) => {
    str = str.toString()
    let hex = []
    for (let i = 0; i < str.length; i++) {
      hex.push('0x' + str.charCodeAt(i).toString(16))
    }
    return hex
  }

  // ----------------------------------
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
  // console.log('buf-->', swap('42'))
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
  execute = (command: any, params: any[] = [], timeout: number = 1000) => {
    let self = this
    return new Promise<any>(async (resolve, reject) => {
      try {
        /* Preparing command to send. */
        const request = command.request(params)
        // console.log('request', request)

        await self.waitSending(timeout)
        await wait(100)

        const response = await self.send(request, timeout)
        // console.log('response', response)
        resolve(command.response(response))
      } catch (error) {
        reject(error)
      }
    })
  }
  // ------------------------------------
  // origin
  /* getCRC16(unsigned char *pBuf, int lSize)
{
   unsigned short s;
   for(s=0x0000 ; lSize>0 ; lSize--,pBuf++)
   {
       unsigned char b = *pBuf;
       for(int j=0 ; j<8 ; j++)
       {
           int x16 = (((b&0x80)&&(s&0x8000))||((!(b&0x80))&&(!(s&0x8000)))) ? 0 : 1;
           int x15 = (((x16)&&(s&0x4000))||((!x16 )&&(!(s&0x4000)))) ? 0 : 1;
           int x2 = (((x16)&&(s&0x0002))||((!x16)&&(!(s&0x0002)))) ? 0 : 1;
           s = s << 1;
           b = b << 1;
           s |= (x16) ? 0x0001 : 0;
           s = ( x2 ) ? s | 0x0004 : s & 0xfffb;
           s = ( x15) ? s | 0x8000 : s & 0x7fff;
       }
   }
   s= int(s<<8) + int(s>>8);
   return s;
} */

  //-------------------------------------

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
