/**
 * Reset.js
 * 
 * @copyright 2021 Alles Good
 * 
 */

 import Command from '../Command'

 /**
  * Class Reset
  * 
  * Command for BankTerminal to self-reset.
  * 
  * @description BCNet Document 1
  * @version 1.0.0
  */
 class Reset extends Command {
 
   /**
    * Reset constructor
    * 
    * @param {Object} device 
    */
   constructor (device) {
     super(0x30, device)
    //  console.log('!!++reset constructor')
   }
   
 }
 
 export default Reset
 
 /* End of file Reset.js */
