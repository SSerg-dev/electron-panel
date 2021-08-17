/**
 * Return.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class Return
 * 
 * Command to return a bill in escrow.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Return extends Command {

	/**
	 * Return constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(0x36, device)
	}
  
}

export default Return

/* End of file Return.ts */