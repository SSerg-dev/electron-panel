/**
 * GetStatus.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */

 import Command from '../Command'

 /**
  * Class GetStatus
  * 
  * Command for request BankTerminal set-up status.
  * 
  * @description BCNet Document 1
  * @version 1.0.0
  */
 class GetStatus extends Command {
 
   /**
    * GetStatus constructor
    * 
    * @param {Object} device 
    */
   constructor (device: any) {
     super(0x31, device)
   }
 
   /**
    * Processing command response.
    * 
    * @param {Buffer} data 
    */
   response = (data: Buffer) => {
     /*  */
     const hex2bin = (buf: any) => {
       let d = []
       for( let i = 0, max = buf.length; i < max; i++ ) {
         // Iterator by bits
         for( let j = 8; j > 0; j-- ) {
           if( buf[i] & Math.pow(2, j-1) ) {
             d.push(true)
           } else {
             d.push(false)
           }
         }
       }
       return d.reverse()
     }
     /*  */
     return {
       enabled: hex2bin(data.slice(0, 3)),
       security: hex2bin(data.slice(3, 6))
     }
   }
 
 }
 
 export default GetStatus
 
 /* End of file GetStatus.ts */
