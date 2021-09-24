/**
 * CCNetParser.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import { Transform } from 'stream'

/**
 * Class CCNetParser
 * 
 * Receive and pars CCNet packet.
 * 
 * @version 1.0.0
 */
class CCNetParser extends Transform {
    packet: Buffer
    packetLength: number

    /**
     * CCNetParser constructor.
     */
    constructor (options: any = null) {
        super(options)
        /* Packet container. */
        this.packet = Buffer.from([])
        /* Packet full length. */
        this.packetLength = 0
    }

    /**
     * Receive and pars ccnet packet. 
     */
    _transform = (buffer: Buffer, encoding: string, callback: any) => {
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
        callback()
    }

}

export default CCNetParser

/* End of file CCNetParser.ts */