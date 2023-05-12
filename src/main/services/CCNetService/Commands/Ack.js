/**
 * Ack.js
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
 * Class Ack
 * 
 * Command to confirm a response correctly received.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Ack extends Command {

	/**
	 * Ack constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device) {
		super(0x00, device)
	}

	/**
	 * Preparing command to send.
	 */
	request(){
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

export default Ack

/* End of file Ack.js */