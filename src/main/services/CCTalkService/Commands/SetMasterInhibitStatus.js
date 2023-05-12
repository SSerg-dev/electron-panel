/**
 * SetMasterInhibitStatus.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class SetMasterInhibitStatus
 * 
 * Command for set inhibit status.
 * 
 * @description CCTalk Document 1
 * @version 1.0.0
 */
class SetMasterInhibitStatus extends Command {

	/**
	 * SetMasterInhibitStatus constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device) {
		super(228, device);
	}

}

export default SetMasterInhibitStatus

/* End of file SetMasterInhibitStatus.js */