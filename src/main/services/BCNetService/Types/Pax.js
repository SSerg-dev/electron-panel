/**
 * Pax.js
 * @copyright 2021 Alles Good
 */

import { EventEmitter } from 'events'

import { ipcMain } from 'electron'

import {
  log,
  // wait,
  // getSerialDevicesInfo
} from '../../../utils'
import * as conf from '../../../config'
import BCNet from '..'
// import { compile } from 'vue/types/umd'

const TAG = 'PAX TERMINAL'

const Currencies = ['RUS']
class Pax extends EventEmitter {
  constructor() {
    super()
    this.config = {}
    this.bills = []
    this.amount = 0
    this.device = null
    this.timestamp = 0

    // singelton
    if (Pax.exists) {
      return Pax.instance
    }
    Pax.instance = this
    Pax.exists = true
  }

  // methods
  static connect(config) {
    let item = new Pax()
    item.config = config
    Pax.instance = item

    Pax.instance.flowSequence()

    return item
  }
  sleep(ms) {
    return new Promise(resolve => {
      setTimeout(() => resolve(ms), ms)
    })
  }
  
  // flowSequence -----------------------
  async flowSequence() {
    let counterRequest = 0
    let firstTimestamp = 0,
      lastTimestamp = 0,
      deltaTimestamp = 0
    let self = this
    self.connect()

    ipcMain.on('async-amount-message', (event, arg) => {
      self.amount = +arg
      self.timestamp = new Date().getTime()
      counterRequest++

      // self.reconnect()
      try {
        if (self.amount > 0 && self.device !== undefined) {
          /* 01 CheckRequest */
          // this.check()

          /* 02 Reconciliation */
          // this.reconcile()

          /* 03 SaleRequest */
          const request = self.device.getSaleRequest(self.amount)

          lastTimestamp = self.timestamp
          deltaTimestamp = lastTimestamp - firstTimestamp

          if (deltaTimestamp > 10000) {
            const writeResponse = self.device.write(request, 2000)
            const readResponse = self.device.read(request, 2000)
            firstTimestamp = lastTimestamp
          } else {
            return
          }
          // --------------------------
          function submitAmountHandler(amount, status) {
            self.sleep(2000).then(() => {
              // console.log('Pax.ts amount', amount)
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
    ipcMain.on('async-reconciliation-message', (event, arg) => {
      self.reconcile()
      /* dev */
      // self.check()
    })
    self.disconnect()
  }
  // ------------------------------------
  /* Reconciliation */
  reconcile() {
    let self = this
    const requestReconciliation = self.device.getReconciliationRequest()
    const writeReconciliation = self.device.write(requestReconciliation, 2000)
    const readReconciliation = self.device.read(requestReconciliation, 2000)
  }
  // ------------------------------------
  /* CheckRequest */
  check() {
    let self = this
    const requestCheck = self.device.getCheckRequest()
    // console.log('$$ requestCheck', requestCheck)
    const writeCheck = self.device.write(requestCheck, 2000)
  }
  // ------------------------------------
  // this.getComPort()

  // reconnect to pax -------------------
  async reconnect() {
    let self = this
    const { port, number, currency } = Pax.instance.config

    try {
      if (self.device.isOpen) {
        await self.device.disconnect()

        await self.device.connect()
        log(TAG, 'Reconnect to pax at port', port)
      }
    } catch (err) {
      log(TAG, 'Reconnect to pax error', err)
    }
  }

  // connect to pax ---------------------
  async connect() {
    let self = this

    const { port, number, currency } = Pax.instance.config
    self.device = new BCNet.PaxDevice(port, currency, self.bills, conf.debug)

    try {
      if (!self.device.isOpen) {
        await self.device.connect()
        log(TAG, 'Connected at port', port)
      }
    } catch (err) {
      // log(TAG, '$$ Connected error', err)
      await self.device.disconnect()
    }
  }
  async disconnect() {
    try {
      let self = this
      const { port, number, currency } = Pax.instance.config

      if (self.device.isOpen) {
        await self.device.disconnect()
        log(TAG, 'Disconnected', port)
      }
    } catch (err) {
      log(TAG, 'Disconnected error', err)
    }
  }
  // end methods
} // end class Pax

export default Pax
