/**
 * Return.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */

 import Command from '../Command'

 /**
  * Class Return
  * 
  * Command to return a terminal in escrow.
  * 
  * @description BCNet Document 1
  * @version 1.0.0
  */
 class Return extends Command {
 
   /**
    * Return constructor
    * 
    * @param {Object} device 
    */
   constructor (device: any) {
     super(0x36, device)
   }
   
 }
 
 export default Return
 
 /* End of file Return.ts */
