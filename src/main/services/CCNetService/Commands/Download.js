/**
 * Download.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class Download
 * 
 * Command for transition to download mode.
 * 
 * @description CCNet Document 2
 * @version 1.0.0
 */
class Download extends Command {

	/**
	 * Download constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device) {
		super(0x50, device)
	}

}

export default Download

/* End of file Download.js */