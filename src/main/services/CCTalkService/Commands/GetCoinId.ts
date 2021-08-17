/**
 * GetCoinId.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class GetCoinId
 * 
 * Command for request activity status.
 * 
 * @description CCTalk Document 1
 * @version 1.0.0
 */
class GetCoinId extends Command {

	/**
	 * GetCoinId constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(184, device);
	}

	response = (buffer: Buffer) => {
		const data = buffer.toString('ascii')
		return {
			coin: data.substr(2, 3),
			country: data.substr(0, 2),
		}

	}

}

export default GetCoinId

/* End of file GetCoinId.ts */