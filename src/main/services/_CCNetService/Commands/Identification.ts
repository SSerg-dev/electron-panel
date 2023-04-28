/**
 * Identification.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class Identification
 * 
 * Command for request "Software Part Number", "Serial Number", "Asset Number".
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Identification extends Command {

	/**
	 * Identification constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(0x37, device)
	}

	/**
	 * Processing command response.
	 * 
	 * @param {Buffer} data 
	 */
	response:any = (data: Buffer) => {
		return {
			model  : data.slice(0, 15).toString().trim(),
			serial : data.slice(15, 27).toString().trim(),
			asset  : data.slice(27, 34).toString('hex')
		}
	}

}

export default Identification

/* End of file Identification.ts */
