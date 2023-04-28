/**
 * BillValidator.js
 *
 * @author    alles-good
 * @copyright alles-good
 * @license   MIT
 *
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

const EventEmitter = require('events')
const CCNet = require('./Constants')

import CCNetParser from './CCNetParser'
const { SerialPort } = require('serialport')

/**
 * Class BillValidator
 */
class BillValidator extends EventEmitter {
  constructor(port: string, debug = false) {

    super()
    let self = this
    this.adr = CCNet.ADR_BILL_VALIDATOR
    this.port = port || ''
    this.commands = require('./Commands')

    this.portOptions = {
      path: this.port,
      baudRate: 9600,
      databits: 8,
      stopbit: 1,
      parity: 'none',
      autoOpen: false
    }


    this.serial = new SerialPort(this.portOptions)
    
    this.serial.on('open', function() {
      self.onSerialPortOpen()
    })

    this.serial.on('error', function(error: any) {
      self.onSerialPortError(error)
    })
    
    this.serial.on('close', function() {
      self.onSerialPortClose()
    })

    console.log('$$ BillValidator.ts: 53 this.serial'/* , this.serial.pipe */)

    this.parser = this.serial.pipe(new CCNetParser())

    // console.log('$$ BillValidator.ts: 57',  CCNetParser)

    this.info = {
      model: '',
      serial: '',
      asset: ''
    }

    this.billTable = []
    this.status = null
    this.secondStatus = null

    this.isDebug = debug
    this.isConnect = false
    this.isSend = false

    this.statusTimer = null
    this.statusTimerInterval = 200
    this.statusTimerEnable = false
    // console.log('$$ BillValidator.ts: 98', this.serial)

  }

  get isOpen() {
    return this.serial.isOpen
  }

  open() {
    let self = this
    // console.log('$$ BillValidator.ts: 122 open', )

    return new Promise(function(resolve, reject) {
      if (self.serial.isOpen) {
        resolve(true)
      } else {
        self.serial.open(function(error: any) {
          if (error) {
            console.log('$$ BillValidator.ts: 93 open error--', )
            reject(error)
          }
          console.log('$$ BillValidator.ts: 96 open', )
          resolve(true)
        })
      }
    })
  }

  async connect() {
    console.log('$$ BillValidator.ts: 143 connect', )
    if (!this.isOpen) {
      try {
        await this.open()
      } catch (error) {
        throw error
      }
    }

    try {
      await this.reset()
      await this.waitStatus('13', 1000)
      
      this.info = await this.execute(this.commands.Identification)

      this.billTable = await this.execute(this.commands.GetBillTable)

      return true
    } catch (error) {
      throw error
    }
  }

  async reset() {
    try {
      await this.execute(this.commands.Reset)
    } catch (error) {
      console.log(error)
    }
  }

  async begin() {
    try {
      await this.execute(this.commands.EnableBillTypes, [
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff
      ])
    } catch (error) {
      console.log(error)
    }
  }
  
  async stack() {
    try {
      await this.execute(this.commands.Stack)
    } catch (error) {
      console.log(error)
    }
  }

  async retrieve() {
    try {
      await this.execute(this.commands.Return)
    } catch (error) {
      console.log(error)
    }
  }

  async end() {
    try {
      await this.execute(this.commands.EnableBillTypes, [
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00
      ])
    } catch (error) {
      console.log(error)
    }
  }

  async disconnect() {
    this.close()
  }

  close() {
    let self = this

    return new Promise(function(resolve, reject) {
      if (self.serial.isOpen) {
        self.serial.close(function(error: any) {
          if (error) {
            reject(error)
          }

          resolve(true)
        })
      } else {
        resolve(true)
      }
    })
  }

  onSerialPortOpen() {
    console.log('$$ BillValidator.ts: 296 serial open!!!', )
    this.debug('Serialport Open.')
  }
  onSerialPortError(error: any) {
    this.debug('Serialport Error:', error)
  }

  onSerialPortClose() {
    this.debug('Serialport Close.')
  }

    onStatus(status: Buffer) {  
    if (status.length >= 2) {
      if (
        this.status !== status[0].toString(16) ||
        this.secondStatus !== status[1].toString(16)
      ) {
        this.status = status[0].toString(16)
        this.secondStatus = status[1].toString(16)

        this.emit('status', this.status, this.secondStatus)

        switch (status[0]) {
          case 0x1b:
            break

          case 0x1c:
            switch (status[1]) {
              case 0x60:
                break

              case 0x61:
                break

              case 0x62:
                break

              case 0x63:
                break

              case 0x64:
                break

              case 0x65:
                break

              case 0x66:
                break

              case 0x67:
                break

              case 0x68:
                break

              case 0x69:
                break

              case 0x6a:
                break

              case 0x6c:
                break

              case 0x6d:
                break

              case 0x92:
                break

              case 0x93:
                break

              case 0x94:
                break

              case 0x95:
                break
            }
            break

          case 0x47:
            switch (status[1]) {
              case 0x50:
                break

              case 0x51:
                break

              case 0x52:
                break

              case 0x53:
                break

              case 0x54:
                break

              case 0x55:
                break

              case 0x56:
                break

              case 0x5f:
                break
            }
            break

          case 0x80:
            this.emit(
              'escrow',
              this.billTable[parseInt(status[1].toString(10))]
            )
            break

          case 0x81:
            this.emit(
              'stacked',
              this.billTable[parseInt(status[1].toString(10))]
            )
            break

          case 0x82:
            this.emit(
              'returned',
              this.billTable[parseInt(status[1].toString(10))]
            )
            break
        }
      }
    } else {
      if (this.status !== status[0].toString(16)) {
        this.status = status[0].toString(16)
        this.secondStatus = ''

        this.emit('status', this.status, '')

        switch (status[0]) {
          case 0x10:
            this.emit('power-up')
            break

          case 0x11:
            this.emit('power-up-with-bill')
            break

          case 0x12:
            this.emit('power-up-with-bill-in-stacker')
            break

          case 0x13:
            this.emit('initialize')
            break

          case 0x14:
            this.emit('idling')
            break

          case 0x15:
            this.emit('accepting')
            break

          case 0x17:
            this.emit('stacking')
            break

          case 0x18:
            this.emit('returning')
            break

          case 0x19:
            this.emit('disabled')
            break

          case 0x1a:
            this.emit('holding')
            break

          case 0x41:
            this.emit('cassette-full')
            break

          case 0x42:
            this.emit('cassette-out-of-position')
            break

          case 0x43:
            this.emit('jammed')
            break

          case 0x44:
            this.emit('cassette-jammed')
            break

          case 0x45:
            this.emit('cheated')
            break

          case 0x46:
            this.emit('pause')
            break
        }
      }
    }
  }

  onStatusTimer() {
    let self = this

    clearInterval(this.statusTimer)

    if (!this.isOpen) {
      return
    }

    this.execute(this.commands.Poll)
      .then(function(data: any) {
        if (self.statusTimerEnable) {
          self.statusTimer = setTimeout(function() {
            self.onStatusTimer()
          }, self.statusTimerInterval)
        }

        self.onStatus(data)
      })
      .catch(function(error) {
        if (self.statusTimerEnable) {
          self.statusTimer = setTimeout(function() {
            self.onStatusTimer()
          }, self.statusTimerInterval)
        }

        self.debug(error)
      })
  }

  statusTimerStart() {
    let self = this

    this.statusTimerEnable = true

    this.statusTimer = setTimeout(function() {
      self.onStatusTimer()
    }, this.statusTimerInterval)
  }

  statusTimerStop() {
    this.statusTimerEnable = false

    clearTimeout(this.statusTimer)
  }

  waitStatus(status: string, timeout = 1000) {
    let self = this

    return new Promise(function(resolve, reject) {
      if (self.status == status) {
        resolve(true)
      }

      let timer: any = null

      let timerHandler = function() {
        clearTimeout(timer)

        self.removeListener('status', handler)

        reject(new Error('Request timeout.'))
      }
      let handler = function(primary: string) {
        if (primary == status) {
          clearTimeout(timer)

          self.removeListener('status', handler)

          resolve(true)
        }
      }

      self.on('status', handler)

      if (timeout) {
        timer = setTimeout(timerHandler, timeout)
      }
    })
  }

  waitSending(timeout = 1000) {
    let self = this

    return new Promise(function(resolve, reject) {
      let timer: any = null

      let interval = 50

      let counter = 0

      if (!self.isSend) {
        resolve(true)
      }

      let timerHandler = function() {
        counter += interval

        if (!self.isSend) {
          clearInterval(timer)

          resolve(true)
        } else if (counter >= timeout) {
          clearInterval(timer)

          reject(new Error('Request timeout.'))
        }
      }

      timer = setInterval(timerHandler, interval)
    })
  }

  send(request: Buffer, timeout = 1000) {
    let self = this

    return new Promise(function(resolve, reject) {
      let timer: any = null

      let timerHandler = function() {
        self.isSend = false

        reject(new Error('Request timeout.'))
      }

      let handler = async function(response: Buffer) {
        clearTimeout(timer)

        self.parser.removeListener('data', handler)

        let ln = response.length
        let check = response.slice(ln - 2, ln)
        let slice = response.slice(0, ln - 2)

        if (check.toString() !== self.getCRC16(slice).toString()) {
          await self.serial.write(self.commands.Nak.request())

          self.isSend = false

          reject(new Error('Wrong response data hash.'))
        }

        let data = response.slice(3, ln - 2)

        if (data.length == 1 && data[0] == 0x00) {
        } else if (data.length == 1 && data[0] == 0xff) {
          reject(new Error('Wrong request data hash.'))
        } else {
          await self.serial.write(self.commands.Ack.request())
        }

        self.isSend = false

        resolve(data)
      }

      self.parser.once('data', handler)

      self.isSend = true

      self.serial.write(request)

      timer = setTimeout(timerHandler, timeout)
    })
  }

  execute(command: any, params: any[] = [], timeout = 1000) {
    let self = this

    return new Promise(async function(resolve, reject) {
      try {
        let request = command.request(params)

        await self.waitSending(timeout)

        let response = await self.send(request, timeout)

        resolve(command.response(response))
      } catch (error) {
        reject(error)
      }
    })
  }

  getCRC16(buffer: Buffer) {
    var CRC, i, j
    var sizeData = buffer.length

    CRC = 0

    for (i = 0; i < sizeData; i++) {
      CRC ^= buffer[i]

      for (j = 0; j < 8; j++) {
        if (CRC & 0x0001) {
          CRC >>= 1
          CRC ^= CCNet.CRC_POLY
        } else CRC >>= 1
      }
    }

    var buf = new Buffer(2)
    buf.writeUInt16BE(CRC, 0)

    CRC = buf

    return Array.prototype.reverse.call(CRC)
  }

  debug(...params: any) {
    if (this.isDebug) {
      console.log(params)
    }
  }
}

export default BillValidator

