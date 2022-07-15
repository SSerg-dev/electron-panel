
class PaxMessage
{
  numField: number
  mesLen: number
  data: string
  constructor(numField: number, mesLen: number, data: string) {
    this.numField = numField
    this.mesLen =mesLen
    this.data = data
  }
}

export { PaxMessage }
