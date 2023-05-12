import { PaxMessage } from './PaxMessage'

class PaxRequest
{
  constructor() {
    this.stx = ''
    this.mesgsLen = 0
    this.mesgsData = ''
    this.messages = []
    this.crc16 = 0 
  }

  get stx() {
    return this.stx
  }
  get stx() {
    return this.mesgsLen
  }
  get mesgsData() {
    return this.mesgsData
  }
  get messages() {
    return this.messages
  }
  get crc16() {
    return this.crc16
  }
}

export { PaxRequest } 
