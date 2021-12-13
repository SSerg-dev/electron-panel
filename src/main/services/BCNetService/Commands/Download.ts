/**
 * Download.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */

 import Command from '../Command'

 /**
  * Class Download
  * 
  * Command for transition to download mode.
  * 
  * @description BCNet Document 2
  * @version 1.0.0
  */
 class Download extends Command {
 
   /**
    * Download constructor
    * 
    * @param {Object} device 
    */
   constructor (device: any) {
     super(0x50, device)
   }
 
 }
 
 export default Download
 
 /* End of file Download.ts */
