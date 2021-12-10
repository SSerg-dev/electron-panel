/**
 * index.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */

/* Get BCNet constants. */
import * as constant from './Constants'
let BCNet: any = constant

/* Add Pax object */
import Pax from './Types/Pax'
BCNet.Pax = Pax 


/* Export library objects. */
export default BCNet

/* End of file index.ts */
