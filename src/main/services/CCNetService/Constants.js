/**
 * Constants.js
 * 
 * @author    LeoDiMark <tigroidit@gmail.com>
 * @copyright 2020 Alles Good
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

/* Message transmission start code. */
export const SYNC = 0x02

/*  */
export const CRC_POLY = 0x08408

/* Peripheral addresses. */
export const ADR_BILL_TO_BILL   = 0x01
export const ADR_COIN_CHANGER   = 0x02
export const ADR_BILL_VALIDATOR = 0x03
export const ADR_CARD_READER    = 0x04

/* End of file Constants.js */