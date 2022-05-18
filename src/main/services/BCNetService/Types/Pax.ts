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

  // flowSequence -----------------------
  private flowSequence = async () => {
    this.connect()
    // const self = this

    ipcMain.on('amount-message', (event, amount) => {
      this.amount = +amount
      event.returnValue = 'OK'
      if (this.amount > 0) {
        /* dev */

        const request = this.device.getSaleRequest(this.amount)  
        this.device.send(request, 2000)

        // console.log('$$ request2-->', request2)
      }
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
    const { port, number, currency } = Pax.instance.config 
    // let port_num = 10
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
  private getComPort() {
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
  }

  // end methods
} // end class Pax

export default Pax
