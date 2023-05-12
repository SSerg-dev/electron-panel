/**
 * Request.js
 * 
 * @copyright 2021 Alles Good
 * 
 */

 import Command from '../Command'

 /**
  * Class Request
  * @description BCNet Document 1
  * @version 1.0.0
  */
 class Request extends Command {
 
   /**
    * Request constructor
    * 
    * @param {Object} device 
    */
   constructor (device) {
     super(0x2a, device) // 42

    // console.log('++Request constructor')
   }
   
 }
 
 export default Request
 
 /* End of file Request.js */
