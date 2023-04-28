/**
 * Hold.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class Hold
 * 
 * Command for holding of Bill Validator in Escrow state.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Hold extends Command {

	/**
	 * Hold constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(0x38, device)
	}

}

export default Hold

/* End of file Hold.ts */