/**
 * Poll.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class Poll
 * 
 * Command for request Bill Validator activity status.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Poll extends Command {

	/**
	 * Poll constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(0x33, device);
	}

}

export default Poll

/* End of file Poll.ts */