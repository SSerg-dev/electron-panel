/**
 * Stack.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */

 import Command from '../Command'

 /**
  * Class Stack
  * 
  * Command for sent by Controller to send a bill in escrow.
  * 
  * @description BCNet Document 1
  * @version 1.0.0
  */
 class Stack extends Command {
 
   /**
    * Stack constructor
    * 
    * @param {Object} device 
    */
   constructor (device: any) {
     super(0x35, device)
   }
   
 }
 
 export default Stack
 
 /* End of file Stack.ts */
