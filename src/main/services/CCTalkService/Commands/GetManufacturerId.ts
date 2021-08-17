/**
 * GetManufacturerId.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class GetManufacturerId
 * 
 * Command for request activity status.
 * 
 * @description CCTalk Document 1
 * @version 1.0.0
 */
class GetManufacturerId extends Command {

	/**
	 * GetManufacturerId constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(246, device);
	}

	response = (buffer: Buffer) => buffer.toString('ascii')

}

export default GetManufacturerId

/* End of file GetManufacturerId.ts */