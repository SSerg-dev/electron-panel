/**
 * CoinAcceptor.ts
 *
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 *
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

import { EventEmitter } from 'events'
import { ADR_COIN_ACCEPTOR, ADR_SOURCE } from './Constants'
import CCTalkParser from './CCTalkParser'
import CMDS from './Commands'
import { wait } from '../../utils'

const { SerialPort } = require('serialport')

/**
 * Class CoinAcceptor
 *
 * The object implements the main methods and events for working
 * with the coin acceptor using the "CCTalk" protocol.
 *
 * @version 1.0.0
 */
class CoinAcceptor extends EventEmitter {
  adr: number
  commands: any
  port: string
  portOptions: any
  serial: any
  parser: any
  isDebug: any
  isConnect: boolean
  isSend: boolean
  statusTimer: any
  statusTimerInterval: number
  statusTimerEnable: boolean
  enabler: any
  deviceInfo: any
  coinTable: any
  bills: any
  last_counter: number
  store_counter: boolean
  eventBuffer!: Buffer
  execute_counter: number
  eventCodes: any = {
    254: 'return',
    20: 'string',
    19: 'slow',
    13: 'busy',
    8: 'following',
    2: 'inhibited',
    1: 'rejected',
    0: 'accepted',
    accepted: 0,
    rejected: 1,
    inhibited: 2,
    following: 8,
    busy: 13,
    slow: 19,
    string: 20,
    return: 254
  }

  /**
   * CoinAcceptor constructor.
   *
   * @param {String} port Serialport address.
   * @param {Boolean} debug Printing debug info flag.
   */
  constructor(port: string, bills: number[], debug: boolean) {
    super()
    let self = this
    this.adr = ADR_COIN_ACCEPTOR
    this.commands = CMDS(this)
    this.port = port || ''

    this.portOptions = {
      path: this.port,
      baudRate: 9600,
      databits: 8,
      stopbit: 1,
      parity: 'none',
      autoOpen: false
    }

    /* old */
    // let serialport = require('serialport')
    // let SerialPort = serialport.SerialPort
    // this.serial = new SerialPort(this.port, this.portOptions, (err: any) => this.debug(err))

    // const { SerialPort } = require('serialport')
    this.serial = new SerialPort(this.portOptions)

    this.serial.on('open', () => self.onSerialPortOpen())
    this.serial.on('error', (error: any) => self.onSerialPortError(error))
    this.serial.on('close', () => self.onSerialPortClose())

    this.parser = this.serial.pipe(new CCTalkParser())

    this.isDebug = debug || false
    this.isConnect = false
    this.isSend = false

    this.statusTimer = null
    this.statusTimerInterval = 200
    this.statusTimerEnable = false

    this.enabler = {
      trigger: true,
      state: false
    }
    this.last_counter = 0
    this.store_counter = false

    this.deviceInfo = {}
    this.coinTable = []

    this.bills = bills || []

    this.execute_counter = 3
  }

  /* Getters / Setters methods --------------------------------------------- */
  /* ----------------------------------------------------------------------- */

  /**
   * Get serial open state.
   */
  get isOpen() {
    return this.serial.isOpen
  }

  get getDeviceInfo() {
    return this.deviceInfo
  }

  get getCoinTable() {
    return this.coinTable
  }

  /* Logics methods -------------------------------------------------------- */
  /* ----------------------------------------------------------------------- */

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
        await this.open()
      } catch (err) {
        throw err
      }
    }
    /* Begin device init. -------------------------------------------------- */

    try {
      /* Reset device. */
      await this.execute(this.commands.Reset)
      await this.execute(this.commands.SimplePoll)

      this.deviceInfo.manufacturer = await this.getManufacturedId()
      this.deviceInfo.product = await this.getProductCode()

      this.coinTable = await this.getCoinInfo()
      await this.setCoinInfo(this.coinTable, this.bills)
      this.coinTable = await this.getCoinInfo()
    } catch (err) {
      throw err
    }
  }

  /* ----------------------------------------------------------------------- */

  /**
   *
   */
  reset = async () => {
    try {
      /* Reset device. */
      await this.execute(this.commands.Reset)
    } catch (err) {
      throw err
    }
  }

  /**
   *
   */
  getCoinInfo = async () => {
    let data: any = {}
    let status: number
    let table: any = []
    try {
      status = await this.execute(this.commands.GetInhibitStatus)
      for (let i = 0; i < 16; i++) {
        /*  */
        await wait(100)
        data = await this.execute(this.commands.GetCoinId, [i + 1])
        const v: number =
          data.coin === '100'
            ? 1
            : data.coin === '200'
            ? 2
            : data.coin === '500'
            ? 5
            : data.coin === '1K0'
            ? 10
            : 0
        //if ( v > 0 && data.country === "RU" ) {
        table.push({
          index: i,
          code: data.coin,
          value: v,
          enabled: (status & (1 << i)) != 0 ? true : false
        })
        //}
      }
    } catch (err) {
      console.log('getCoinInfo Error:', err)
      throw err
    }
    return table
  }

  /**
   *
   */
  setCoinInfo = async (coin_table: any[] = [], enable_coins: number[] = []) => {
    let status = 0
    try {
      coin_table.forEach((el: any, index: number) => {
        if (enable_coins.indexOf(el.value) != -1) {
          status |= 1 << el.index
        }
      })
      await this.execute(this.commands.SetInhibitStatus, [
        status & 0xff,
        (status >> 8) & 0xff
      ])
      //console.log("setCoinInfo inhibit status:", status)
    } catch (err) {
      console.log('setCoinInfo Error:', err)
      throw err
    }
  }

  /**
   *
   */
  getManufacturedId = async () => {
    let ret = ''
    try {
      ret = await this.execute(this.commands.GetManufacturerId)
    } catch (err) {
      console.log('getManufacturedId Error:', err)
      throw err
    }
    return ret
  }

  /**
   *
   */
  getProductCode = async () => {
    let ret = ''
    try {
      ret = await this.execute(this.commands.GetProductCode)
    } catch (err) {
      console.log('getProductCode Error:', err)
      throw err
    }
    return ret
  }

  setEnabler = (state: boolean) => {
    this.enabler.state = state
    this.enabler.trigger = true
  }

  /**
   *
   */
  begin = async () => {
    try {
      await this.execute(this.commands.SetMasterInhibitStatus, [0xff])
    } catch (err) {
      throw err
    }
  }

  /**
   *
   */
  end = async () => {
    try {
      await this.execute(this.commands.SetMasterInhibitStatus, [0x00])
    } catch (err) {
      throw err
    }
  }

  /* ----------------------------------------------------------------------- */

  /**
   * Disconnect from device.
   */
  disconnect = async () => {
    try {
      await this.close()
    } catch (err) {
      this.debug('Serialport Close  error:', err)
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

  /* Events methods -------------------------------------------------------- */
  /* ----------------------------------------------------------------------- */

  /**
   * On serial open event.
   */
  onSerialPortOpen = () => {
    this.debug('Serialport Open.')
  }

  /**
   * On serial error event.
   */
  onSerialPortError = (error: any) => this.debug('Serialport Error:', error)

  /**
   * On serial close event.
   */
  onSerialPortClose = () => this.debug('Serialport Close.')

  /* ----------------------------------------------------------------------- */

  /**
   * All device events handler.
   *
   * @param {Buffer} status
   */
  onCredit = (buffer: Buffer) => {
    let coin: any
    if (this.eventBuffer && buffer[0] != this.eventBuffer[0]) {
      const dEventCounter =
        buffer[0] > this.eventBuffer[0]
          ? buffer[0] - this.eventBuffer[0]
          : 255 - this.eventBuffer[0] + buffer[0]
      const maxI = Math.min(buffer.length, dEventCounter * 2 + 1)

      for (let i = 1; i < maxI; i += 2) {
        coin = this.coinTable.find((el: any) => el.index === buffer[i] - 1)
        coin && this.emit('accepted', coin.value)
      }
    }
    this.eventBuffer = buffer
  }

  /**
   * Event of processing the status timer.
   */
  onStatusTimer = async () => {
    /* Linked self. */
    let self = this
    /* Clear timer. */
    clearInterval(this.statusTimer)
    /* Check comport init. */
    if (!self.isOpen) {
      return
    }
    /* Read coin credit. */
    try {
      if (self.enabler.trigger) {
        await self.execute(self.commands.SetMasterInhibitStatus, [
          self.enabler.state === true ? 0xff : 0x00
        ])
        self.emit('enabler', self.enabler.state)
        self.enabler.trigger = false
      }
      const data = await self.execute(self.commands.ReadCredit)
      /* Send event. */
      self.onCredit(data)
    } catch (error) {
      self.debug(error)
    }
    /* Check permission to run. */
    if (self.statusTimerEnable) {
      /* Start status timer. */
      self.statusTimer = setTimeout(() => {
        self.onStatusTimer()
      }, self.statusTimerInterval)
    }
  }

  /* Utils methods --------------------------------------------------------- */
  /* ----------------------------------------------------------------------- */

  /**
   * Start status timer.
   */
  statusTimerStart = () => {
    if (this.statusTimerEnable) {
      clearTimeout(this.statusTimer)
    }
    /* Linked self. */
    let self = this
    /* Set flag. */
    this.statusTimerEnable = true
    /* Start status timer. */
    this.statusTimer = setTimeout(() => {
      self.onStatusTimer()
    }, this.statusTimerInterval)
  }

  /**
   * Stop status timer.
   */
  statusTimerStop = () => {
    /* Set flag. */
    this.statusTimerEnable = false
    /* Clear status timer. */
    clearTimeout(this.statusTimer)
  }

  /* ----------------------------------------------------------------------- */

  /**
   * Waiting for the completion of the processing of the current command.
   *
   * @param {Number} timeout The maximum time to complete this action.
   * @returns {Promise}
   */
  waitSending = (timeout: number = 1000) => {
    /* Linked self. */
    let self = this
    /* Async worker. */
    return new Promise<any>((resolve, reject) => {
      /* Waiting timer. */
      let timer: any = null
      /* Interval for checking the status in ms. */
      let interval: number = 50
      /* Waiting timeout. */
      let counter: number = 0
      /* Check flag. */
      if (!self.isSend) {
        /* Send event. */
        resolve(true)
      }
      /* Timeout timer handler. */
      let timerHandler = () => {
        counter += interval
        /* Check flag. */
        if (!self.isSend) {
          /* Clear timer. */
          clearInterval(timer)
          /* Send event. */
          resolve(true)
        } else if (counter >= timeout) {
          /* Clear timer. */
          clearInterval(timer)
          /* Send event. */
          reject(new Error('Request timeout.'))
        }
      }
      /* Bind timeout handler. */
      timer = setInterval(timerHandler, interval)
    })
  }

  /* ----------------------------------------------------------------------- */

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
      let recv_counter = 0
      /* Timeout timer handler. */
      let timerHandler = () => {
        /* Update flag. */
        self.isSend = false
        /* Send event. */
        // if ( self.execute_counter > 0 ) {
        //     self.execute_counter--
        //     clearTimeout(timer)
        //     self.send(request, timeout)
        // } else {
        reject(new Error('Request timeout.'))
        // }
      }
      /* Receive packet handler. */
      let handler = async (response: Buffer) => {
        this.debug('response =>', response)
        /* */
        const ln = response.length
        /* Unbind timeout handler. */
        clearTimeout(timer)
        /* */
        //await wait(100)
        /* Check Header */
        if (
          recv_counter == 0 &&
          (response[0] !== ADR_COIN_ACCEPTOR || response[2] != ADR_SOURCE)
        ) {
          /* Update flag. */
          self.isSend = false
          /* Send event. */
          reject(new Error('cctalk: data format error.'))
        }
        /* */
        if (response[1] == 255) {
          /* Update flag. */
          self.isSend = false
          /* Send event. */
          reject(new Error('cctalk: wrong data length.'))
        }
        /* */
        //if ( recv_counter > 0 && response[3] != 0 ) {
        /* Update flag. */
        //    self.isSend = false
        /* Send event. */
        //    reject(new Error('cctalk: request crc error.'))
        //}
        /* Check response CRC. */

        if (response[ln - 1] != self.getCRCSimple(response.slice(0, ln - 1))) {
          /* Update flag. */
          self.isSend = false
          /* Send event. */
          // if ( self.execute_counter > 0 ) {
          //     self.execute_counter--
          //     clearTimeout(timer)
          //     self.send(request, timeout)
          // } else {
          reject(new Error('cctalk: response crc error.'))
          // }
        }
        /* */
        if (recv_counter == 0) {
          recv_counter++
          timer = setTimeout(timerHandler, timeout)
          return
        }
        /* Unbind event. */
        self.parser.removeListener('data', handler)
        /* Get data from packet. */
        let data = response.slice(4, ln - 1)
        /* Update flag. */
        self.isSend = false
        /* Send event. */
        resolve(data)
      }
      /* Bind event. */
      self.parser.on('data', handler)
      /* Update flag. */
      self.isSend = true
      /* Send packet. */
      this.debug('request =>', request)
      //await wait(100)
      // console.log('$$ CoinAcceptor.ts: 625 request', request)
      self.serial.write(request)
      /* Bind timeout handler. */
      timer = setTimeout(timerHandler, timeout)
    })
  }

  /**
   * Execute the specified command.
   *
   * @param {Object} command Target command.
   * @param {Object} params Execute parameters.
   * @param {Number} timeout The maximum time to complete this action.
   * @returns {Promise}
   */
  execute = (command: any, params: any[] = [], timeout: number = 1000) => {
    /* Linked self. */
    let self = this
    /* Async worker. */
    return new Promise<any>(async (resolve, reject) => {
      try {
        /* Preparing command to send. */
        let request = command.request(params)

        /* Waiting if another command is being sending. */
        await self.waitSending(timeout)
        await wait(100)

        /* Send command to device. */
        this.execute_counter = 3
        let response = await self.send(request, timeout)

        /* Processing command response. */
        resolve(command.response(response))
      } catch (error) {
        reject(error)
        this.execute
      }
    })
  }

  /* ----------------------------------------------------------------------- */

  /**
   * Calculation packet checksum.
   *
   * @param {Buffer} buffer Raw data for calculation.
   * @returns {Number} Calculated checksum.
   */
  getCRCSimple = (buffer: Buffer) => {
    let CRC = 0
    for (let i = 0; i < buffer.length; i++) {
      CRC += parseInt(buffer[i].toString(), 10)
    }
    return 0x100 - (CRC % 0x100)
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
}

export default CoinAcceptor

/* End of file CoinAcceptor.ts */
