/**
 * EnableBillTypes.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class EnableBillTypes
 * 
 * Command to set indicates Bill Type enable or disable.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class EnableBillTypes extends Command {

	/**
	 * EnableBillTypes constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device) {
		super(0x34, device)
	}

	/**
	 * Preparing command to send.
	 * 
	 * @param {Array} params 
	 */
	request(params = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00]) {
		return this.assemble(Buffer.from(params))
	}

}

export default EnableBillTypes

/* End of file EnableBillTypes.js */