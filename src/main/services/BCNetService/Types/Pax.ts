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
  isConnect: boolean

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
    // this.instance.connect()
    this.instance.flowSequence()

    // this.instance.disconnect()
    return item
  }
  private sleep(ms: number) {
    return new Promise(resolve => {
      setTimeout(() => resolve(ms), ms)
    })
  }

  // sleep(4000).then(() => {
  //   console.log('run after 4 sec')
  // })
  // flowSequence -----------------------
  private flowSequence = async () => {
    // const { port, number, currency } = Pax.instance.config
    // this.device = new BCNet.PaxDevice(port, currency, this.bills, conf.debug)
    // this.device.disconnect()

    this.connect()

    ipcMain.once('amount-message', (event, amount) => {
      this.amount = +amount
      // event.returnValue = '$$!! OK'
      try {
        if (this.amount > 0) {
          const request = this.device.getSaleRequest(this.amount)
          const writeResponse = this.device.write(request, 2000)
          if (writeResponse) {
            const readResponse = this.device.read()
            if (readResponse) {

              this.sleep(30000).then(() => {
                console.log('run after 4 sec')
                event.returnValue = this.amount.toString() //'$$!!!! OK'
              })
            }
          }
        }
      } catch (err) {
        console.log('Error', err)
      }

      // this.device.disconnect()
    })

    /* dev */
    // this.device.getSaleRequest(42)
    // this.device.getReconciliationRequest()
    // this.device.getCheckRequest()
    // this.device.sale()

    // this.getComPort()
  }

  // connect to pax ---------------------
  private connect = async () => {
    // let port_num = 10
    /* dev */
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
