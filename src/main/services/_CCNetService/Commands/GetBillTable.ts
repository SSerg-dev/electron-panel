/**
 * GetBillTable.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

// import Command from '../Command'
import Command from '../Command'
/**
 * Class GetBillTable
 * 
 * Command for get bill types description.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class GetBillTable extends Command {

	/**
	 * GetBillTable constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(0x41, device)
	}

	/**
	 * Processing command response.
	 * 
	 * @param {Buffer} data 
	 */
	response: any = (data: Buffer) => {
		let response: any[] = []
		let	word: any
		for( let i = 0; i < 24; i++ ) {
			/*  */
			word = data.slice(i * 5, (i * 5 + 5))
			/*  */
			response.push({
				amount: word[0] * Math.pow(10, word[4]),
				code: word.slice(1, 4).toString(),
				enabled: false,
				security: false
			})
		}
		return response
	}

}

export default GetBillTable

/* End of file GetBillTable.ts */
