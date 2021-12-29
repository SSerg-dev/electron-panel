import { PaxMessage } from './PaxMessage'

class PaxRequest
{
  static  stx: string = ''
  static  mesgsLen: number = 0
  static  messages: PaxMessage = []
  static  crc16: number = 0
}

export { PaxRequest } 
