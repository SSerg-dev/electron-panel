/**
 * Command.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */
import { ADR_SOURCE } from './Constants'

/**
 * Class Command
 * 
 * An abstract class of device command logic.
 * 
 * @version 1.0.0
 */
class Command {
    cmd: number
    device: any
    
    /**
     * Command constructor.
     * 
     * @param {Number} cmd 
     * @param {Object} device 
     */
    constructor (cmd: number, device: any) {
        /* Command code. */
        this.cmd = cmd
        /* Parent device object. */
        this.device = device
    }

    /* Logics methods -------------------------------------------------------- */
    /* ----------------------------------------------------------------------- */

    /**
     * Preparing command to send.
     * 
     * @param {Any} params 
     */
    request = (params: any = Buffer.from([])): Buffer => this.assemble(Buffer.from(params))

    /**
     * Processing command response.
     * 
     * @param {Buffer} data 
     */
    response = (data: Buffer): any => data

    /* Utils methods --------------------------------------------------------- */
    /* ----------------------------------------------------------------------- */

    /**
     * Assemble command packet.
     * 
     * @param {Buffer} params 
     */
    assemble = (params: Buffer = Buffer.from([])) => {
        /* Assemble main packet data. */
        const header = Buffer.concat([
            /* Destination. */
            Buffer.from([
                this.device.adr
            ]),
            /* Length. */
            Buffer.from([
                params.length
            ]),
            /* Source. */
            Buffer.from([
                ADR_SOURCE
            ]),
            /* Command. */
            Buffer.from([
                this.cmd
            ])
        ]);
        /*Assemble params packet data.  */
        const message = Buffer.concat([
            /* Header. */
            header,
            /* Data. */
            params
        ]);
        /* Assemble full packet data. */
        return Buffer.concat([
            message,
            Buffer.from([
                this.device.getCRCSimple(message)
            ])
        ]);
    }
}

export default Command
