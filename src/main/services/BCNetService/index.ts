/**
 * index.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */

/* Get BCNet constants. */
import * as constant from './Constants'
let BCNet: any = constant

/* Add BankTerminal object. */
// import BankTerminal from './BankTerminal'
// BCNet.BankTerminal = BankTerminal

/* Add Vendotek object */
// import { Vendotek } from 'vendotek'
// BCNet.Vendotek = Vendotek 

import Vendotek from './Types/Vendotek'
BCNet.Vendotek = Vendotek 


/* Export library objects. */
export default BCNet

/* End of file index.ts */
