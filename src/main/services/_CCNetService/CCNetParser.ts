/**
 * CCNetParser.js
 *
 * @author    alles-good
 * @copyright alles-good
 * @license   MIT
 *
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

// const Transform = require('stream').Transform


import { Transform } from 'stream'

class CCNetParser extends Transform {
  packet: Buffer
  packetLength: number

  constructor(options: any = null) {
    super(options)

    this.packet = new Buffer(0)

    this.packetLength = 0
  }
  _transform(buffer: any, encoding: any, callback: any) {
    this.packet = Buffer.concat([this.packet, buffer])

    if (this.packet.length >= 3 && this.packetLength === 0) {
      this.packetLength = parseInt(this.packet[2].toString())
    }

    if (this.packet.length == this.packetLength) {
      this.push(this.packet)

      this.packet = new Buffer(0)

      this.packetLength = 0
    }

    callback()
  }
}


export default CCNetParser
