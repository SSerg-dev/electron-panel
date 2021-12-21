
import * as constant from './Constants'
let BCNet = constant

// import { Vendotek } from 'vendotek'
// BCNet.Vendotek = Vendotek 

import Vendotek from './Types/Vendotek'
BCNet.Vendotek = Vendotek 

import Observer from './Types/Observer'
BCNet.Observer = Observer 

export default BCNet

