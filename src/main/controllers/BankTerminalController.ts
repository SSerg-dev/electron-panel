/**
 * BankTerminalController.ts
 * @copyright 2021 Alles Good
 */

/*  */
import { EventEmitter } from 'events'

import { log, wait } from '../utils'
import BCNet from '../services/BCNetService'
import * as conf from '../config'

const TAG = 'BANK TERMINAL'
const enum States {
  CONNECTED,
  DISCONNECTED
}
const Currencies = ['RUS']

class BankTerminalController extends EventEmitter {
  device: any
  counter: number
  state: States
  currency: number
  bills: number[]
  port: number

  constructor() {
    super()
    this.counter = 0
    this.currency = 0
    this.bills = []
    this.state = States.DISCONNECTED
    this.port = 10
  }

  /*  */
  private connect = async () => {
    log(TAG, 'Connecting...')
    let port: string

    for (let i = 0; i < 4; i++) {
      if (this.port !== 10 && this.port !== i) {
        continue
      }
      /* dev */
      // port = `/dev/ttyUSB${i}`
      port = '/dev/ttyUSB0'
      if (i === 0)
        this.device = new BCNet.Pax(port, conf.debug) 

      this.setListeners()
      try {
        await this.device.connect()
        this.port = i
        this.state = States.CONNECTED
        log(TAG, 'Connected at port', port)
        break
      } catch (err) {
        this.state = States.DISCONNECTED
        log(TAG, '++Connected error', err)
      }
    }

    if (this.state !== States.CONNECTED) {
      this.port = 10
      throw new Error('No any device at /dev/ttyUSB[0-3] detected')
    } else {
      return true
    }
  }

  public stop = async () => await this.device.disconnect()

  public start = async (currency: number = 0, bills: number[] = []) => {
    this.currency = currency
    this.bills = bills
    console.log('++bank terminal start')
    try {
      /* dev */
      // if (this.state) await this.device.disconnect()
      
      await this.connect()
      log(TAG, 'Info:', this.device.info)
      this.emit('connect')
    } catch (err) {
      log(TAG, '++Fault while connecting', err)
      /* dev */
      setTimeout(this.start, 400000)
    }
  } 

  public enabler = async (enable: boolean = false) => {
    const status = this.device.getStatus
    if (
      this.state === States.DISCONNECTED ||
      status == 0x15 ||
      status == 0x17
    ) {
      return
    }
    if (!enable) {
      await this.device.end()
    } else {
      await this.device.begin()
    }
  }

  private setListeners = async () => {
    let self = this
  }
}

export default BankTerminalController
