/**
 * ExtractBarcodeData.ts
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
 * Class ExtractBarcodeData
 * 
 * Command for retrieving barcode data if barcode coupon is found. 
 * If this command is sent when barcode coupon is not found the 
 * Bill Validator returns ILLEGAL COMMAND response.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class ExtractBarcodeData extends Command {

	/**
	 * ExtractBarcodeData constructor
	 * 
	 * @param {Object} device 
	 */
	constructor (device: any) {
		super(0x3A, device)
	}

	/**
	 * Processing command response.
	 * 
	 * @param {Buffer} data 
	 */
	response: any = (data: Buffer) => data.toString()

}

export default ExtractBarcodeData

/* End of file ExtractBarcodeData.ts */
