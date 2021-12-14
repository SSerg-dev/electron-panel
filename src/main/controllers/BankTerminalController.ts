/**
 * BankTerminalController.ts
 * @copyright 2021 Alles Good
 */

/*  */
import { EventEmitter } from 'events'

import { log, wait, getSerialDevicesInfo } from '../utils'
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
  // port = '/dev/ttyUSB0'
  // this.device = new BCNet.Pax(port, conf.debug)


  private connect = async () => {
		let _path: string
		let port_num = 10
		const portInfo = await getSerialDevicesInfo('USB')
		if (portInfo) {
			for ( let i = 0; i < portInfo.length; i++ ) {
				_path = portInfo[i].path
				this.device = new BCNet.Pax(_path, this.bills, conf.debug)
				try {
					await this.device.connect()
					log(TAG, "Connected at port", _path)
					port_num = i
					break
				} catch (err) {
					/* dev */
          // await this.device.disconnect()
					// delete this.device
					// port_num = 10

				}
			}
		}
		this.port = port_num
		if ( port_num === 10 ) {
      /* dev */
			//log(TAG, "No any device at ports /dev/ttyUSB[n] detected")
			await wait(500)
			this.connect()
		} else {
			this.emit("connect")
		}
	}

  
  public start = async (currency: number, bills: number[]) => {
		this.currency = currency || 0
		this.bills = bills || []

		this.once("connect", async () => {
			let info: any = this.device.getDeviceInfo 
			log(TAG, "Info:", JSON.stringify(info))
			
			let table = this.device.getCoinTable 
			log(TAG, "Table of bills:", JSON.stringify(table))

			this.poll(this.device)
		})
		
		this.connect()
	} 

  public stop = async () => {
		await this.device.disconnect() 
		this.port = 10
	}

  public enabler = (state: boolean = false) => {
		if ( this.port !== 10 ) {
			this.device.setEnabler(state)
		}
	}

  private poll = (device: any) => {
		/* dev */
    /* device.on('accepted', (coin: number) => {
			this.emit("accepted", coin)
			log(TAG, 'Accepted coin:', coin)
		}); */
		device.on('enabler', (state: boolean) => {
			log(TAG, 'Enabled:', state ? 'ON' : 'OFF')
		})
		device.statusTimerStart()
	}
}

export default BankTerminalController
