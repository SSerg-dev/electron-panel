/**
 * Nak.js
 * 
 * @copyright 2021 Alles Good
 * @license   MIT
 * 
 */

 import { SYNC } from '../Constants'
 import Command from '../Command'
 
 /**
  * Class Nak
  * 
  * Command for response was not correctly received.
  * 
  * @description CCNet Document 1
  * @version 1.0.0
  */
 class Nak extends Command {
 
   /**
    * Nak constructor
    * 
    * @param {Object} device 
    */
   constructor (device) {
     super(0xFF, device)
   }
 
   /**
    * Preparing command to send.
    * 
    * @param {*} data 
    */
   request() {
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
 
 export default Nak
 
 /* End of file Nak.js */
