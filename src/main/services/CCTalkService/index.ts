/**
 * index.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with Bill Validator & Coin Acceptor devices from Node.js app.
 */

/* Get CCTalk constants. */
import * as constant from './Constants'
let CCTalk: any = constant

/* Add Bill Validator object. */
import BillValidator from './BillValidator'
CCTalk.BillValidator = BillValidator

/* Add Coin Acceptor object. */
import CoinAcceptor from './CoinAcceptor'
CCTalk.CoinAcceptor = CoinAcceptor

/* Export library objects. */
export default CCTalk

/* End of file index.ts */