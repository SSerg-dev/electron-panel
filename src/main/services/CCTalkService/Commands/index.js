/**
 * index.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Coin Acceptor devices from Node.js app.
 */

import Reset from './Reset'
import SimplePoll from './SimplePoll'
import GetManufacturerId from './GetManufacturerId'
import GetProductCode from './GetProductCode'
import GetCoinId from './GetCoinId'
import GetInhibitStatus from './GetInhibitStatus'
import SetInhibitStatus from './SetInhibitStatus'
import SetMasterInhibitStatus from './SetMasterInhibitStatus'
import ReadCredit from './ReadCredit'

export default function(device) {
    return {
        Reset : new Reset(device),
        SimplePoll : new SimplePoll(device),
        GetManufacturerId : new GetManufacturerId(device),
        GetProductCode : new GetProductCode(device),
        GetCoinId : new GetCoinId(device),
        GetInhibitStatus: new GetInhibitStatus(device),
        SetInhibitStatus: new SetInhibitStatus(device),
        SetMasterInhibitStatus: new SetMasterInhibitStatus(device),
        ReadCredit: new ReadCredit(device)
    }
}

/* End of file index.js */