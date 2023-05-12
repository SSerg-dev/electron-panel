/**
 * SimplePoll.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class SimplePoll
 * 
 * Command for request activity status.
 * 
 * @description CCTalk Document 1
 * @version 1.0.0
 */
class SimplePoll extends Command {

	/**
	 * SimplePoll constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device) {
		super(254, device);
	}

}

export default SimplePoll

/* End of file SimplePoll.js */