/**
 * CCTalkParser.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

import { Transform } from 'stream'

/**
 * Class CCTalkParser
 * 
 * Receive and pars CCTalk packet.
 * 
 * @version 1.0.0
 */
class CCTalkParser extends Transform {
    array: any
    cursor: number
    lastByteFetchTime: number
    maxDelayBetweenBytesMs: number

    /**
     * CCTalkParser constructor.
     */
    constructor (options: any = null) {
        super(options)
        this.array = []
        this.cursor = 0
        this.lastByteFetchTime = 0
        this.maxDelayBetweenBytesMs = options && options.maxDelayBetweenBytesMs ? options.maxDelayBetweenBytesMs : 50
    }

    /**
     * Receive and pars cctalk packet. 
     */
    _transform = (buffer: Buffer, encoding: string, callback: any) => {
        //console.log("parser =>", buffer)
        /*  */
        if (this.maxDelayBetweenBytesMs > 0) {
            const now = Date.now()
            if (now - this.lastByteFetchTime > this.maxDelayBetweenBytesMs) {
                this.array = []
                this.cursor = 0
            }
            this.lastByteFetchTime = now
        }
        this.cursor += buffer.length
        // TODO: Better Faster es7 no supported by node 4
        // ES7 allows directly push [...buffer]
        // this.array = this.array.concat(Array.from(buffer)) //Slower ?!?
        Array.from(buffer).map(byte => this.array.push(byte))
        while (this.cursor > 1 && this.cursor >= this.array[1] + 5) {
            // full frame accumulated
            // copy command from the array
            const FullMsgLength = this.array[1] + 5
        
            const frame = Buffer.from(this.array.slice(0, FullMsgLength))
            // Preserve Extra Data
            this.array = this.array.slice(frame.length, this.array.length)
            this.cursor -= FullMsgLength
            this.push(frame)
        }
        callback()
    }

}

export default CCTalkParser

/* End of file CCTalkParserParser.ts */