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

const TAG = "COIN ACCEPTOR"

const Currencies = [
	"RUS"
]

class CoinAcceptorController extends EventEmitter {
	device: any
	counter: number
	currency: number
	bills: number[]
	port: number

	constructor () {
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
			for ( let i = 0; i < portInfo.length; i++ ) {
				_path = portInfo[i].path
				this.device = new CCTalk.CoinAcceptor(_path, this.bills, conf.debug)
				try {
					await this.device.connect()
					log(TAG, "Connected at port", _path)
					port_num = i
					break
				} catch (err) {
          /* dev */
					//log(TAG, "Connected error", err)
					await this.device.disconnect()
					delete this.device
					port_num = 10
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
			let info: any = this.device.getDeviceInfo //{}
			//info.manufacturer = await this.device.getManufacturedId()
			//info.product = await this.device.getProductCode()
			log(TAG, "Info:", JSON.stringify(info))
			
			let table = this.device.getCoinTable //await this.device.getCoinInfo()
			//await this.device.setCoinInfo(table, bills)
			//table = await this.device.getCoinInfo()
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
		device.on('accepted', (coin: number) => {
			this.emit("accepted", coin)
			log(TAG, 'Accepted coin:', coin)
      /* dev */
      this.setCoinOptions(coin)

		});
		device.on('enabler', (state: boolean) => {
			log(TAG, 'Enabled:', state ? 'ON' : 'OFF')
		})
		device.statusTimerStart()
	}
  /* dev */
  // let: number sum_coins
  private setCoinOptions = (coin: number) => {
    // log(TAG, 'add coin:', coin)
    
    
  }
}

export default CoinAcceptorController
/* End of file CoinAcceptorController.ts */
