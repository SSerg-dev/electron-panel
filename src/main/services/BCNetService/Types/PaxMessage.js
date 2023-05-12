
class PaxMessage
{
  constructor(numField, mesLen, data) {
    this.numField = numField
    this.mesLen = mesLen
    this.data = data
  }

  get numField() {
    return this.numField
  }
  set numField(val) {
    this.numField = val
  }
  get mesLen() {
    return this.mesLen
  }
  set mesLen(val) {
    this.mesLen = val
  }
  get data() {
    return this.data
  }
  set data(val) {
    this.data = val
  }
}

export { PaxMessage }
