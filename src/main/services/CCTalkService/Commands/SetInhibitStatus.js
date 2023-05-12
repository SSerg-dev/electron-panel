/**
 * SetInhibitStatus.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class SetInhibitStatus
 * 
 * Command for set inhibit status.
 * 
 * @description CCTalk Document 1
 * @version 1.0.0
 */
class SetInhibitStatus extends Command {

	/**
	 * SetInhibitStatus constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device) {
		super(231, device);
	}

}

export default SetInhibitStatus

/* End of file SetInhibitStatus.js */