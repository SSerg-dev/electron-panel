/**
 * Nak.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import { SYNC } from '../Constants'
import Command from '../Command'

/**
 * Class Nak
 * 
 * Command for response was not correctly received.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Nak extends Command {

	/**
	 * Nak constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(0xFF, device)
	}

	/**
	 * Preparing command to send.
	 * 
	 * @param {*} data 
	 */
	request = () => {
		const cmd = Buffer.from([
			SYNC,
			this.device.adr,
			0x06,
			this.cmd
		])
		return Buffer.concat([
			cmd,
			this.device.getCRC16(cmd)
		])
	}

}

export default Nak

/* End of file Nak.ts */