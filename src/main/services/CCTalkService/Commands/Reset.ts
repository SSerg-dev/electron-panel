/**
 * Reset.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class Reset
 * 
 * Command for request activity status.
 * 
 * @description CCTalk Document 1
 * @version 1.0.0
 */
class Reset extends Command {

	/**
	 * Reset constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(1, device);
	}

}

export default Reset

/* End of file Reset.ts */