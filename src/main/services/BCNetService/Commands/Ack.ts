/**
 * Ack.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */

 import { SYNC } from '../Constants'
 import Command from '../Command'
 
 /**
  * Class Ack
  * 
  * Command to confirm a response correctly received.
  * 
  * @description CCNet Document 1
  * @version 1.0.0
  */
 class Ack extends Command {
 
   /**
    * Ack constructor
    * 
    * @param {Object} device 
    */
   constructor (device: any) {
     super(0x00, device)
   }
 
   /**
    * Preparing command to send.
    */
   request = () => {
     const cmd = Buffer.from([
       SYNC,
       this.device.adr,
       0x06,
       this.cmd
     ])
     return Buffer.concat([
       cmd,
       this.device.getCRC16(cmd)
     ])
   }
 
 }
 
 export default Ack
 
 /* End of file Ack.ts */
