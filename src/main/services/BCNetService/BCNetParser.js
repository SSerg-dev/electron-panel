/**
 * BCNetParser.js
 * 
 * @copyright 2021 Alles Good
 * 
 */

 import { Transform } from 'stream'

 /**
  * Class BCNetParser
  * 
  * Receive and pars BCNet packet.
  * 
  * @version 1.0.0
  */
 class BCNetParser extends Transform {
     /**
      * BCNetParser constructor.
      */
     constructor (options = null) {
         super(options)
         /* Packet container. */
         this.packet = Buffer.from([])
         /* Packet full length. */
         this.packetLength = 0
     }
 
     /**
      * Receive and pars ccnet packet. 
      */
     _transform(buffer, callback) {
         /*  */
         this.packet = Buffer.concat([this.packet, buffer])
         /*  */
         if ( this.packet.length >= 3 && this.packetLength === 0 ) {
             this.packetLength = parseInt(this.packet[2].toString())
         }
         /*  */
         if ( this.packet.length == this.packetLength ) {
             /*  */
             this.push(this.packet)
             /*  */
             this.packet = Buffer.from([])
             /*  */
             this.packetLength = 0
         }
         /*  */
         callback && callback()
     }
 
 }
 
 export default BCNetParser
 
 /* End of file BCNetParser.js */
