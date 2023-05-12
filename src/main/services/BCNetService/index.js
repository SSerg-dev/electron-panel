/**
 * index.js
 * 
 * @copyright 2021 Alles Good
 * 
 */

/* Get BCNet constants. */
import * as constant from './Constants'

//Object.preventExtensions(constant);
const BCNet = constant //Object.create(constant)

/* Add Pax object */
import Pax from './Types/Pax'
BCNet.Pax = Pax 

/* Add PaxDevice object */
import PaxDevice from './Types/PaxDevice'
BCNet.PaxDevice = PaxDevice



/* Export library objects. */
export default BCNet

/* End of file index.js */
