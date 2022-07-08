/**
 * Pax.ts
 * @copyright 2021 Alles Good
 */

import { EventEmitter } from 'events'

import { ipcMain } from 'electron'

import {
  log,
  wait,
  getSerialDevicesInfo,
  getSerialPaxInfo
} from '../../../utils'
import * as conf from '../../../config'
import BCNet from '../../../services/BCNetService'
import { compile } from 'vue/types/umd'

const TAG = 'PAX TERMINAL'

const Currencies = ['RUS']
class Pax extends EventEmitter {
  static instance: any
  static exists: boolean

  device: any
  config: any
  bills: number[]
  amount: number
  status: any
  isConnect: boolean
  bankAmount: any = 0
  customEvent: any = null
  isWrite: boolean
  timestamp: number = 0

  constructor() {
    super()
    this.config = {}
    this.bills = []
    this.amount = 0
    this.isConnect = false
    this.isWrite = false
    // this.timestamp = 0

    // let self = this

    // singelton
    if (Pax.exists) {
      return Pax.instance
    }
    Pax.instance = this
    Pax.exists = true
  }

  // methods
  static connect(config: any) {
    let item = new Pax()

    item.config = config
    this.instance = item

    /* dev */
    // this.instance.check()

    this.instance.flowSequence()

    return item
  }
  sleep(ms: number) {
    return new Promise(resolve => {
      setTimeout(() => resolve(ms), ms)
    })
  }
  /* 
  private check = async () => {
    let self = this
    const request = self.device.getCheckRequest()
    self.device.write(request, 2000)
  }
  */
  // flowSequence -----------------------
  private flowSequence = async () => {
    this.connect()

    ipcMain.on('async-amount-message', (event, arg) => {
      let self = this

      self.amount = +arg
      self.timestamp = new Date().getTime()

      try {
        if (self.amount > 0 && self.device !== undefined) {

          // const requestCheck = self.device.getCheckRequest()
          const request = self.device.getSaleRequest(self.amount)
          // const request = this.device.getReconciliationRequest()

          if (!this.isWrite) {
            // const writeCheck = self.device.write(requestCheck, 2000)
            const writeResponse = self.device.write(request, 2000)
            const readResponse = self.device.read(request, 2000)

            console.log(
              '$$ Pax.ts request 00',
              request //,
              // readResponse,
              // self.timestamp
            )
            this.isWrite = true
          }
          // --------------------------
          function submitAmountHandler(amount: any, status: any) {
            self.sleep(2000).then(() => {
              event.reply(
                'async-amount-reply',
                amount.toString(),
                status.toString()
              )
              // self.device.disconnect()
            })
          }
          self.device.resultEmitter.on(
            'submitSuccessAmount',
            submitAmountHandler,
            this.amount,
            this.status
          )
          // --------------------------
        }
      } catch (err) {
        console.log('Error', err)
      }
      this.isWrite = false
      // this.device = null
    })

    /*     */
  }
  // ------------------------------------
  /* dev */
  // this.device.getSaleRequest(42)
  // this.device.getReconciliationRequest()
  // this.device.getCheckRequest()
  // this.device.sale()

  // this.getComPort()

  // ------------------------------------
  // getAmount(param: any) {
  //   this.bankAmount = param
  // }

  // connect to pax ---------------------
  private connect = async () => {
    const { port, number, currency } = Pax.instance.config
    // this.device = delete this.device
    // this.device = null

    this.device = new BCNet.PaxDevice(port, currency, this.bills, conf.debug)

    try {
      if (!this.isConnect) {
        await this.device.connect()
        log(TAG, '$$ Connected at port', port)
      }
      this.isConnect = true
    } catch (err) {
      log(TAG, '$$ Connected error', err)
      await this.device.disconnect()
      this.isConnect = false
      // delete this.device
    }
  }
  // private disconnect = async () => {}

  // test com port

  /* private getComPort() {
    const SerialPort = require('serialport')
    const port = new SerialPort('/dev/ttyPos0', function(err: any) {
      if (err) {
        return console.log('Error: ', err.message)
      }
    })
    port.write('main screen turn on', function(err: any) {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('message written')
    })
  } */

  // end methods
} // end class Pax

export default Pax
