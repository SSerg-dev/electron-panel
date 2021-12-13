/**
 * Reset.ts
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
   constructor (device: any) {
     super(0x30, device)
   }
   
 }
 
 export default Reset
 
 /* End of file Reset.ts */
