/**
 * index.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

/* Get CCNet constants. */
import * as constant from './Constants'

//Object.preventExtensions(constant);
const CCNet = constant //Object.create(constant)

/* Add Bill Validator object. */
import BillValidator from './BillValidator'
CCNet.BillValidator = BillValidator

/* Add Coin Acceptor object. */
import CoinAcceptor from './CoinAcceptor'
CCNet.CoinAcceptor = CoinAcceptor

/* Export library objects. */
export default CCNet

/* End of file index.js */