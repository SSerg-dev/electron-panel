/**
 * Identification.js
 * 
 * @copyright 2021 Alles Good
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

 import Command from '../Command'

 /**
  * Class Identification
  * 
  * Command for request "Software Part Number", "Serial Number", "Asset Number".
  * 
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
   response = (data: Buffer) => {
     debugger
     console.log('++Identification constructor')
     return {
       model  : data.slice(0, 15).toString().trim(),
       serial : data.slice(15, 27).toString().trim(),
       asset  : data.slice(27, 34).toString('hex')
     }
   }
 
 }
 
 export default Identification
 
 /* End of file Identification.ts */
