/**
 * Pax.ts
 *
 * @copyright 2021 Alles Good
 *
 */

import { EventEmitter } from 'events'
import { log, wait, getSerialDevicesInfo } from '../../../utils'
import * as conf from '../../../config'
import BCNet from '../../../services/BCNetService'

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
    const { port, number, currency } = config

    let item = new Pax()
    item.config = config
    this.instance = item
    this.instance.connect()
    // this.instance.disconnect()

    // console.log('++Pax static connect port-->', item.config.port)
    // console.log('++Pax static connect number-->', item.config.number)
    // console.log('++Pax static connect currency-->', item.config.currency)

    return item
  }

  private connect = async () => {
    let _path: string
    let port_num = 10
    const portInfo = await getSerialDevicesInfo('USB')
    if (portInfo) {
      for (let i = 0; i < portInfo.lengthpo; i++) {
        /* dev */
        // _path = portInfo[i].path
        _path = '/dev/ttyUSB0'
        this.device = new BCNet.PaxDevice(_path, this.bills, conf.debug)
        try {
          await this.device.connect()
          log(TAG, 'Connected at port', _path)
          port_num = i
          break
        } catch (err) {
          log(TAG, 'Connected error', err)
          await this.device.disconnect()
          delete this.device
          port_num = 10
        }
      }
    }
  }
  private disconnect = async () => {
    // console.log('++async disconnect()')
  }

  // end methods
} // end class Pax

export default Pax
