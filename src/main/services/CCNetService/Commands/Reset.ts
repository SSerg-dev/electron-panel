/**
 * Reset.ts
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

import Command from '../Command'

/**
 * Class Reset
 * 
 * Command for Bill Validator to self-reset.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Reset extends Command {

  /**
   * Reset constructor
   * 
   * @param {Object} device 
   */
  constructor (device: any) {
    super(0x30, device)
  }
  
}

export default Reset

/* End of file Reset.ts */