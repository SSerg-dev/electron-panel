/**
 * Pax.ts
 * @copyright 2021 Alles Good
 */

import { EventEmitter } from 'events'
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
  device: any
  config: any
  bills: number[]

  constructor() {
    super()
    this.config = {}
    this.bills = []
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

    /* dev */
    // this.device.getSaleRequest()
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
      await this.device.connect()
      log(TAG, 'Connected at port', port)
    } catch (err) {
      log(TAG, 'Connected error', err)
      await this.device.disconnect()
      delete this.device
      // port_num = 10
    }
  }

  // test com port
  private getComPort() {
    const SerialPort = require('serialport')
    const port = new SerialPort('/dev/ttyPos0', function(err: any) {
      if (err) {
        return console.log('Error: ', err.message)
      }
      // console.log('++getComPort-->', port)
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
