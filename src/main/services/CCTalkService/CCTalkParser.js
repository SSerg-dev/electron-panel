/**
 * CCTalkParser.js
 *
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 *
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */
import { Transform } from 'stream';
/**
 * Class CCTalkParser
 *
 * Receive and pars CCTalk packet.
 *
 * @version 1.0.0
 */
class CCTalkParser extends Transform {
    /**
     * CCTalkParser constructor.
     */
    constructor(options = null) {
        super(options);
        /**
         * Receive and pars cctalk packet.
         */
        this._transform = (buffer, encoding, callback) => {
            //console.log("parser =>", buffer)
            /*  */
            if (this.maxDelayBetweenBytesMs > 0) {
                const now = Date.now();
                if (now - this.lastByteFetchTime > this.maxDelayBetweenBytesMs) {
                    this.array = [];
                    this.cursor = 0;
                }
                this.lastByteFetchTime = now;
            }
            this.cursor += buffer.length;
            // TODO: Better Faster es7 no supported by node 4
            // ES7 allows directly push [...buffer]
            // this.array = this.array.concat(Array.from(buffer)) //Slower ?!?
            Array.from(buffer).map(byte => this.array.push(byte));
            while (this.cursor > 1 && this.cursor >= this.array[1] + 5) {
                // full frame accumulated
                // copy command from the array
                const FullMsgLength = this.array[1] + 5;
                const frame = Buffer.from(this.array.slice(0, FullMsgLength));
                // Preserve Extra Data
                this.array = this.array.slice(frame.length, this.array.length);
                this.cursor -= FullMsgLength;
                this.push(frame);
            }
            callback();
        };
        this.array = [];
        this.cursor = 0;
        this.lastByteFetchTime = 0;
        this.maxDelayBetweenBytesMs = options && options.maxDelayBetweenBytesMs ? options.maxDelayBetweenBytesMs : 50;
    }
}
export default CCTalkParser;
/* End of file CCTalkParserParser.js */ 
