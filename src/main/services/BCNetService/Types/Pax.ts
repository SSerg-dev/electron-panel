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

  constructor() {
    super()
    this.config = {}
    this.bills = []
    this.amount = 0
    this.isConnect = false

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
    this.instance.flowSequence()

    // this.instance.disconnect()
    return item
  }
  sleep(ms: number) {
    return new Promise(resolve => {
      setTimeout(() => resolve(ms), ms)
    })
  }

  // flowSequence -----------------------
  private flowSequence = async () => {
    this.connect()

    /* dev */
    ipcMain.on('async-amount-message', (event, arg) => {
      let self = this
      console.log('$$ Pax.ts async-amount-message 01', arg)
      
      self.amount = +arg
      try {
        if (self.amount > 0) {
          console.log('$$ Pax.ts async-amount-message 02', arg)
          if (self.device !== undefined) {
            const request = self.device.getSaleRequest(self.amount)
            
            /* dev */
            console.log('$$ Pax.ts async-amount-message 03', arg)
            // console.log('$$ Pax.ts request', request)
            const writeResponse = self.device.write(request, 2000)
            // console.log('$$ writeResponse', writeResponse)
            console.log('$$ Pax.ts async-amount-message 04', writeResponse)

            const readResponse = self.device.read()
            // console.log('$$ readResponse', readResponse)

            /* dev */
            function submitAmountHandler(amount: any, status: any) {
              // console.log('$$ replyAmount', amount)
              self.sleep(2000).then(() => {
                event.reply('async-amount-reply', amount.toString(), status.toString())
              })
            }
            self.device.resultEmitter.on(
              'submitSuccessAmount',
              submitAmountHandler,
              this.amount,
              this.status
            )
          }
        }
      } catch (err) {
        console.log('Error', err)
      }
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
      delete this.device
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
