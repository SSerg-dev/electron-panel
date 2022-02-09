/**
+ * Constants.ts
+ * 
+ * @copyright 2021 Alles Good
+ * 
+ */

/* Message transmission start code. */
export const SYNC = 0x02
/*  */
export const CRC_POLY = 0x08408
/* Peripheral addresses. */
export const ADR_CARD_READER = 0x04
/* port */
export const PAX_PORT = '/dev/ttyPos0' //  '/dev/ttyUSB2'  
export const TERMINAL_ID = '00080951'

// from Qt src --------------------------
export const ACK_RES = 0x06
export const NAK_RES = 0x15
export const EOT_RES = 0x4
export const STX_RES = 0x2
export const TIMEOUT_1 =  5
export const TIMEOUT_2 = 45

export const AMOUNT_FUNC = 0
export const CURRENCY_FUNC = 4
export const TIMEDATE_FUNC = 0x15
export const CODE_FUNC = 0x19
export const UNUMBER_FUNC = 0x1A
export const IDENT_FUNC = 0x1B
export const VUNAME_FUNC = 0x59

// --------------------------------------


/* End of file Constants.ts */
