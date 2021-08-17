/**
 * SetSecurity.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class SetSecurity
 * 
 * Command to sets Bill Validator security mode.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class SetSecurity extends Command {

	/**
	 * SetSecurity constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(0x32, device)
	}

	/**
	 * Preparing command to send.
	 * 
	 * @param {Array} params 
	 */
	request = (params = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00]) => this.assemble(Buffer.from(params))

}

export default SetSecurity

/* End of file SetSecurity.ts */