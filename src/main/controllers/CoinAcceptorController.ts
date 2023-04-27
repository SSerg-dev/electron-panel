/**
 * CoinAcceptorController.ts
 *
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 *
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

/*  */
import { EventEmitter } from 'events'

import { log, wait, getSerialDevicesInfo } from '../utils'
import CCTalk from '../services/CCTalkService'
import * as conf from '../config'

import fs from 'fs' 

const TAG = 'COIN ACCEPTOR'

const Currencies = ['RUS']

class CoinAcceptorController extends EventEmitter {
  device: any
  counter: number
  currency: number
  bills: number[]
  port: number

  constructor() {
    super()
    this.counter = 0
    this.currency = 0
    this.bills = []
    this.port = 10
  }

  /*  */
  private connect = async () => {
    let _path: string
    let port_num = 10
    const portInfo = await getSerialDevicesInfo('USB')
    if (portInfo) {
      for (let i = 0; i < portInfo.length; i++) {
        _path = portInfo[i].path
        this.device = new CCTalk.CoinAcceptor(_path, this.bills, conf.debug)
        
        try {
          await this.device.connect()
          log(TAG, 'Connected at coin port', _path)
          port_num = i
          break
        } catch (err) {
          log(TAG, "Connected error", err)
          await this.device.disconnect()
          delete this.device
          port_num = 10
        }
      }
    }
    this.port = port_num
    if (port_num === 10) {
      log(TAG, "No any device at ports /dev/ttyUSB[n] detected", this.port)
      await wait(500)
      this.connect()
    } else {
      this.emit('connect')
    }
  }

  public start = async (currency: number, bills: number[]) => {
    this.currency = currency || 0
    this.bills = bills || []

    this.once('connect', async () => {
      let info: any = this.device.getDeviceInfo 
      log(TAG, 'Info:', JSON.stringify(info))

      let table = this.device.getCoinTable 
      log(TAG, 'Table of coins:', JSON.stringify(table))

      this.poll(this.device)
    })

    this.connect()
  }

  public stop = async () => {
    await this.device.disconnect()
    this.port = 10
  }

  public enabler = (state: boolean = false) => {
    if (this.port !== 10) {
      this.device.setEnabler(state)
    }
  }

  private poll = (device: any) => {
    device.on('accepted', (coin: number) => {
      this.emit('accepted', coin)
      log(TAG, 'Accepted coin:', coin)
      /* dev */
      this.sendCoin(coin)
    })
    device.on('enabler', (state: boolean) => {
      log(TAG, 'Enabled:', state ? 'ON' : 'OFF')
    })
    device.statusTimerStart()
  }
  private sendCoin = (coin: number) => {
    this.emit('current-coin', coin)
  }
  private permitAccess = (path: string) => {
    fs.chmod(path,  fs.constants.S_IRUSR | fs.constants.S_IWUSR, () => {
      console.log('$$ coin port mode', path, fs.statSync(path).mode)
    })
  } 
}

export default CoinAcceptorController
/* End of file CoinAcceptorController.ts */
