/**
 * Command.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */
import { SYNC } from './Constants'

/**
 * Class Command
 * 
 * An abstract class of device command logic.
 * 
 * @version 1.0.0
 */
class Command {
    /**
     * Command constructor.
     * 
     * @param {Number} cmd 
     * @param {Object} device 
     */
    constructor (cmd, device) {
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
    request(params = Buffer.from([])) {
        return this.assemble(Buffer.from(params))
    }

    /**
     * Processing command response.
     * 
     * @param {Buffer} data 
     */
    response(data) {
        return data
    }

    /* Utils methods --------------------------------------------------------- */
    /* ----------------------------------------------------------------------- */

    /**
     * Assemble command packet.
     * 
     * @param {Buffer} params 
     */
    assemble(params = Buffer.from([0])) {
        /* Assemble main packet data. */
        let cmd = Buffer.concat([
            /* Header. */
            Buffer.from([
                SYNC,
                this.device.adr
            ]),
            /* Length. */
            Buffer.from([
                (params.length + 6)
            ]),
            /* Command. */
            Buffer.from([
                this.cmd
            ])
        ]);
        /*Assemble params packet data.  */
        if ( params.length ) {
            cmd = Buffer.concat([
                /* Main packet data. */
                cmd,
                /* Command params. */
                params
            ]);
        }
        /* Assemble full packet data. */
        return Buffer.concat([
            cmd,
            this.device.getCRC16(cmd)
        ]);
    }
}

export default Command
