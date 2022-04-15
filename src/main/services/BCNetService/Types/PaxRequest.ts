import { PaxMessage } from './PaxMessage'

class PaxRequest
{
  static  stx: string = ''
  static  mesgsLen: number = 0
  static mesgsData: string = ''
  // static  messages: PaxMessage = []
  static  messages: any = []
  static  crc16: number = 0 
  
}

export { PaxRequest } 
