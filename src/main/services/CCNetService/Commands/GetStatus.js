/**
 * GetStatus.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class GetStatus
 * 
 * Command for request Bill Validator set-up status.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class GetStatus extends Command {

	/**
	 * GetStatus constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device) {
		super(0x31, device)
	}

	/**
	 * Processing command response.
	 * 
	 * @param {Buffer} data 
	 */
	response(data) {
		/*  */
		const hex2bin = (buf) => {
			const d = []
			for( let i = 0, max = buf.length; i < max; i++ ) {
				// Iterator by bits
				for( let j = 8; j > 0; j-- ) {
					if( buf[i] & Math.pow(2, j-1) ) {
						d.push(true)
					} else {
						d.push(false)
					}
				}
			}
			return d.reverse()
		}
		/*  */
		return {
			enabled: hex2bin(data.slice(0, 3)),
			security: hex2bin(data.slice(3, 6))
		}
	}

}

export default GetStatus

/* End of file GetStatus.js */