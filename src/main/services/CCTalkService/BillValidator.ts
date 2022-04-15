import { EventEmitter } from 'events'

import { ADR_COIN_ACCEPTOR, CRC_POLY } from './Constants'
import CCTalkParser from './CCTalkParser'
import CMDS from './Commands'
import { wait } from '../../utils'

/**
 * Class BillValidator
 * 
 * The object implements the main methods and events for working 
 * with the bill validator using the "CCTalk" protocol.
 * 
 * @version 1.0.0
 */
class BillValidator extends EventEmitter {
    constructor () {
        super()
    }
}

export default BillValidator

/* End of file BillValidator.ts */