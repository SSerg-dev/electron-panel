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
  timestamp: number = 0

  constructor() {
    super()
    this.config = {}
    this.bills = []
    this.amount = 0
    this.device = null

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
    Pax.instance = item

    Pax.instance.flowSequence()

    return item
  }
  sleep(ms: number) {
    return new Promise(resolve => {
      setTimeout(() => resolve(ms), ms)
    })
  }
  // flowSequence -----------------------
  private flowSequence = async () => {
    let self = this
    self.connect()

    ipcMain.on('async-amount-message', (event, arg) => {
      self.amount = +arg
      self.timestamp = new Date().getTime()

      // self.reconnect()
      try {
        if (self.amount > 0 && self.device !== undefined) {
          
          /* 01 CheckRequest */
          // const requestCheck = self.device.getCheckRequest()
          // const writeCheck = self.device.write(requestCheck, 2000)
          
          /* 02 Reconciliation */
          // const request = self.device.getReconciliationRequest()
          // const writeResponse = self.device.write(request, 2000)
          // const readResponse = self.device.read(request, 2000)
          
          /* 03 SaleRequest */
          const request = self.device.getSaleRequest(self.amount)
          const writeResponse = self.device.write(request, 2000)
          const readResponse = self.device.read(request, 2000)
          
          // --------------------------
          function submitAmountHandler(amount: any, status: any) {
            self.sleep(2000).then(() => {
              event.reply(
                'async-amount-reply',
                amount.toString(),
                status.toString()
              )
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
    })
    self.disconnect()
  }
  // ------------------------------------
  // this.getComPort()

  // reconnect to pax -------------------
  private reconnect = async () => {
    let self = this
    const { port, number, currency } = Pax.instance.config

    try {
      if (self.device.isOpen) {
        await self.device.disconnect()

        await self.device.connect()
        log(TAG, '$$ reconnect to pax at port', port)
      }
    } catch (err) {
      log(TAG, '$$ reconnect to pax error', err)
    }
  }

  // connect to pax ---------------------
  private connect = async () => {
    let self = this

    const { port, number, currency } = Pax.instance.config
    self.device = new BCNet.PaxDevice(port, currency, self.bills, conf.debug)

    try {
      if (!self.device.isOpen) {
        await self.device.connect()
        log(TAG, '$$ Connected at port', port)
      }
    } catch (err) {
      log(TAG, '$$ Connected error', err)
      await self.device.disconnect()
    }
  }
  private disconnect = async () => {
    try {
      let self = this
      const { port, number, currency } = Pax.instance.config

      if (self.device.isOpen) {
        await self.device.disconnect()
        log(TAG, '$$ Disconnected', port)
      }
    } catch (err) {
      log(TAG, '$$ Disconnected error', err)
    }
  }
  // end methods
} // end class Pax

export default Pax
