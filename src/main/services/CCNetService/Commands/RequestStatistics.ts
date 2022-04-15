/**
 * RequestStatistics.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class RequestStatistics
 * 
 * Command for retrieving full information about acceptance performance.
 * 
 * @description CCNet Document 3
 * @version 1.0.0
 */
class RequestStatistics extends Command {

	/**
	 * RequestStatistics constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(0x60, device)
	}

	/**
	 * Processing command response.
	 * 
	 * @param {Buffer} data 
	 */
	response = (data: Buffer) => data

}

export default RequestStatistics;

/* End of file RequestStatistics.ts */