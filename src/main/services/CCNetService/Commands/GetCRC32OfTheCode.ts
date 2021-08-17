/**
 * GetCRC32OfTheCode.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class GetCRC32OfTheCode
 * 
 * Command for request Bill Validator firmware CRC32.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class GetCRC32OfTheCode extends Command {

	/**
	 * GetCRC32OfTheCode constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(0x51, device)
	}

}

export default GetCRC32OfTheCode

/* End of file GetCRC32OfTheCode.ts */