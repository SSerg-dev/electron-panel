/**
 * Poll.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */

 import Command from '../Command'

 /**
  * Class Poll
  * 
  * Command for request BankTerminal activity status.
  * 
  * @description BCNet Document 1
  * @version 1.0.0
  */
 class Poll extends Command {
 
   /**
    * Poll constructor
    * 
    * @param {Object} device 
    */
   constructor (device: any) {
     super(0x33, device);
   }
 
 }
 
 export default Poll
 
 /* End of file Poll.ts */
