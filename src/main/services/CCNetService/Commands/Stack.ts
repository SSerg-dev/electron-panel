/**
 * Stack.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class Stack
 * 
 * Command for sent by Controller to send a bill in escrow to the drop cassette.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Stack extends Command {

	/**
	 * Stack constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(0x35, device)
	}
  
}

export default Stack

/* End of file Stack.ts */