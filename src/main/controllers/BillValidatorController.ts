/**
 * BillValidatorController.ts
 *
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 *
 * Working with "CashCode" Bill Validator devices from Node.js app.
 */

/*  */
import { EventEmitter } from 'events'

import { log, wait } from '../utils'
import { CCNet } from 'cashcode-bv'
import * as conf from '../config'

const TAG = 'BILL VALIDATOR'
const enum States {
  CONNECTED,
  DISCONNECTED
}
const Currencies = ['RUS']

class BillValidatorController extends EventEmitter {
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
      port = `/dev/ttyUSB${i}`
      this.device = new CCNet.BillValidator(port, conf.debug)
      this.setListeners()
      try {
        /* dev */
        await this.device.connect()
        this.port = i
        this.state = States.CONNECTED
        log(TAG, 'Connected at bill port', port)
        break
      } catch (err) {
        this.state = States.DISCONNECTED
        // log(TAG, 'Connected error', err)
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
    try {
      await this.connect()
      log(TAG, 'Info:', this.device.info)
      log(TAG, 'Table of bills:', this.device.billTable)
      this.emit('connect')
    } catch (err) {
      log(TAG, 'Fault while connecting', err)
      setTimeout(this.start, 4000)
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
    /*  */
    //this.device.on('status', (status: string) => console.log('on:status', status))
    /* ----------------------------------------------------------------------- */
    /*  */
    const power_up_handler = () => log(TAG, 'Powered UP')
    this.device.on('power-up', power_up_handler)
    this.device.on('power-up-with-bill', power_up_handler)
    this.device.on('power-up-with-bill-in-stacker', power_up_handler)
    /* ----------------------------------------------------------------------- */
    /*  */
    this.device.on('initialize', () => log(TAG, 'Init'))
    this.device.on('disabled', () => log(TAG, 'Disabled'))
    this.device.on('idling', async () => {
      log(TAG, 'Idling')
      /*  */
      /*if ( counter >= 2 ) {
				await this.device.end()
				setTimeout(async () => {
					counter = 0
					await this.device.begin()
				}, (60 * 1000) * 5)
			}*/
    })
    /* ----------------------------------------------------------------------- */
    /*  */
    this.device.on('cassette-full', () => log(TAG, 'Cassette is full'))
    this.device.on('cassette-out-of-position', () =>
      log(TAG, 'Cassette out of position')
    )
    this.device.on('validator-jammed', () => log(TAG, 'Jammed in validator'))
    this.device.on('cassette-jammed', () => log(TAG, 'Jammed in cassette'))
    this.device.on('cheated', () => log(TAG, 'Cheated'))
    this.device.on('failure', (msg: string, code: string) =>
      log(TAG, msg, code)
    )
    /* ----------------------------------------------------------------------- */
    /*  */
    this.device.on('rejecting', (msg: string, code: string) =>
      log(TAG, msg, code)
    )
    /* ----------------------------------------------------------------------- */
    /*  */
    this.device.on('holding', () => log(TAG, 'Holding...'))
    this.device.on('pause', () => log(TAG, 'Pause'))
    /* ----------------------------------------------------------------------- */
    /*  */
    this.device.on('accepting', () => log(TAG, 'Accepting...'))
    /*  */
    this.device.on('escrow', async (bill: any) => {
      log(TAG, 'Escrow:', bill)
      if (self.bills.indexOf(parseInt(String(bill.amount), 10)) != -1) {
        await self.device.stack()
        self.counter++
      } else {
        await self.device.retrieve()
      }
    })
    /*  */
    this.device.on('stacking', () => log(TAG, 'Stacking...'))
    this.device.on('stacked', (bill: any) => {
      log(TAG, 'Stacked:', bill.amount)
      self.emit('stacked', bill.amount)
      /* dev */
      this.sendBill(bill.amount)
    })
    /*  */
    this.device.on('returning', () => log(TAG, 'Returning...'))
    this.device.on('returned', (bill: any) => log(TAG, 'Returned:', bill))
  }
  /* dev */
  private sendBill = (bill: number) => {
    this.emit('current-bill', bill)
  }
}

export default BillValidatorController
/* End of file BillValidatorController.ts */
