/**
 * CoinAcceptorController.js
 *
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 *
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

/*  */
import { EventEmitter } from 'events'
import {constants, statSync} from 'fs' 

import { log, wait, getSerialDevicesInfo } from '../utils'
import CCTalk from '../services/CCTalkService'
import * as conf from '../config'

const TAG = 'COIN_ACCEPTOR'

const Currencies = ['RUS']

class CoinAcceptorController extends EventEmitter {
  constructor() {
    super()
    this.counter = 0
    this.currency = 0
    this.bills = []
    this.port = 10
  }

  /*  */
  async connect() {
    let _path
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
          // log(TAG, "Connected error", err)
          await this.device.disconnect()
          delete this.device
          port_num = 10
        }
      }
    }
    this.port = port_num
    if (port_num === 10) {
      /* dev */
      //log(TAG, "No any device at ports /dev/ttyUSB[n] detected")
      await wait(500)
      this.connect()
    } else {
      this.emit('connect')
    }
  }

  async start(currency, bills) {
    this.currency = currency || 0
    this.bills = bills || []

    this.once('connect', async () => {
      let info = this.device.getDeviceInfo //{}
      //info.manufacturer = await this.device.getManufacturedId()
      //info.product = await this.device.getProductCode()
      log(TAG, 'Info:', JSON.stringify(info))

      let table = this.device.getCoinTable //await this.device.getCoinInfo()
      //await this.device.setCoinInfo(table, bills)
      //table = await this.device.getCoinInfo()
      log(TAG, 'Table of bills:', JSON.stringify(table))

      this.poll(this.device)
    })

    this.connect()
  }

  async stop() {
    await this.device.disconnect()
    this.port = 10
  }

  enabler(state = false) {
    if (this.port !== 10) {
      this.device.setEnabler(state)
    }
  }

  poll(device) {
    device.on('accepted', (coin) => {
      this.emit('accepted', coin)
      log(TAG, 'Accepted coin:', coin)
      /* dev */
      this.sendCoin(coin)
    })
    device.on('enabler', (state) => {
      log(TAG, 'Enabled:', state ? 'ON' : 'OFF')
    })
    device.statusTimerStart()
  }
  sendCoin(coin) {
    this.emit('current-coin', coin)
  }
  permitAccess(path) {
    fs.chmod(path,  constants.S_IRUSR | constants.S_IWUSR, () => {
      console.log('$$ coin port mode', path, statSync(path).mode)
    })
  } 
}

export default CoinAcceptorController
/* End of file CoinAcceptorController.js */
