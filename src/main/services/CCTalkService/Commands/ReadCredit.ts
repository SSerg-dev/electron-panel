/**
 * ReadCredit.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class ReadCredit
 * 
 * Command for request activity status.
 * 
 * @description CCTalk Document 1
 * @version 1.0.0
 */
class ReadCredit extends Command {
	store_counter: boolean
	last_counter: number

	/**
	 * ReadCredit constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(229, device)
		this.store_counter = false
		this.last_counter = 0
	}

}

export default ReadCredit

/* End of file ReadCredit.ts */