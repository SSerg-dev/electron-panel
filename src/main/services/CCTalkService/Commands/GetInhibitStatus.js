/**
 * GetInhibitStatus.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class GetInhibitStatus
 * 
 * Command for request inhibit status.
 * 
 * @description CCTalk Document 1
 * @version 1.0.0
 */
class GetInhibitStatus extends Command {

	/**
	 * GetInhibitStatus constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device) {
		super(230, device);
	}

	response(buffer) {
		return buffer.readUInt16LE(0)
	}

}

export default GetInhibitStatus

/* End of file GetInhibitStatus.js */