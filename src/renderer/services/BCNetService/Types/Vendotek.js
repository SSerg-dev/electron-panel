// import { Vendotek } from 'vendotek'
// export default Vendotek

const net = require('net')
const EventEmitter = require('events')

let Config = {
  ip: '',
  port: 0
}
class Vendotek extends EventEmitter {
  static item = null
  responseBank = null

  constructor(config) {
    super()
    this.config = Object.assign({}, Config, config)
    this.log = this.config.log || console.log
    this.opNumber = 0
  }
  // getters
  get responseBankInfo() {
    return this.responseBank
  } 
  // setters
  set responseBankInfo( newResponce ) {
    this.responseBank = newResponce
  }

  // methods
  static connect(config) {
    let item = new Vendotek(config)
    item.connecting = item.connect()
    // item.disconnecting = item.disconnect()

    this.item = item
    return item
  }

  async connect() {
    this.socket = new net.Socket()
    this.socket.on('data', this.onData.bind(this))
    this.socket.on('error', this.onError.bind(this))

    const response = await new Promise((resolve, reject) => {
      const data = this.socket.connect(
        this.config.port,
        this.config.ip,
        err => {
          if (err) return reject(err)
          resolve(data)
        }
      )
    })
    /* dev */
    // response.then((data) => {
    //   console.log('data-->',typeof data)
    // })
  }

  async disconnect() {
    this.disconnected = true
    this.disable()
    this.conn.end()
    this.conn.destroy()
  }

  getCmdName(cmd) {
    switch (cmd) {
      case 'IDL':
        return 'idle'
      case 'DIS':
        return 'disabled'
      case 'STA':
        return 'session'
      case 'VRP':
        return 'paid'
      case 'FIN':
        return 'final'
      case 'ABR':
        return 'abort'
      case 'CDP':
        return 'cash'
    }
  }

  onData(data) {
    let params
    try {
      params = this.parseData(data)
    } catch (e) {
      this.log(`PARSE ERROR: ${e.message}`)
      return
    }

    this.log('VENDOTEK Data received', JSON.stringify(params))
    /* dev */
    // if(params.amount) this.responseBankInfo = params.amount 

    if (this.opNumber < params.number) this.opNumber = params.number

    this.log('Emit event', this.getCmdName(params.cmd))
    this.emit(this.getCmdName(params.cmd), params)

    switch (params.cmd) {
      case 'FIN':
        this.sendIDLE()
        break
      case 'CDP':
        this.sendIDLE()
        break
    }
  }

  onError(err) {
    if (this.disconnected) {
      this.log('Error after disconnect', err)
      return
    }
    this.log('Vendotek error:', err)

    this.emit('error', err)
  }

  parseData(data) {
    let lengthData = data.slice(0, 2)
    lengthData = lengthData.readUInt16BE()

    data = data.slice(2)

    if (data.length != lengthData) throw new Error('Bad data received')

    let discriminator = data.slice(0, 2)

    if (discriminator[0] != 0x97 || discriminator[1] != 0xfb)
      throw new Error('Bad discriminator received')

    data = data.slice(2)
    let params = {}

    while (data.length) {
      let tag = data[0]
      let length = data[1]
      let value = data.slice(2, length + 2).toString()

      switch (tag) {
        case 0x01:
          params.cmd = value
          break
        case 0x03:
          params.number = parseInt(value)
          break
        case 0x04:
          params.amount = parseInt(value)
          break
        case 0x05:
          params.keepalive = parseInt(value)
          break
        case 0x06:
          params.timeout = parseInt(value)
          break
      }

      data = data.slice(length + 2)
    }
    return params
  }

  async awaitEvent(event, timeout) {
    return new Promise((resolve, reject) => {

      let check_response = data => {
        clearTimeout(timeoutFunc)
        resolve(data)
      }

      let timeoutFunc = () => {
        this.removeListener(event, check_response)
        reject(new Error(`Timeout response ${event}`))
      }

      this.once(event, check_response)
      setTimeout(timeoutFunc, timeout)
    })
  }

  async send(cmd, params = {}, noIdle = false) {
    let cmdBuffer = Buffer.concat([
      new Buffer([0x01]),
      new Buffer([cmd.length]),
      new Buffer(cmd)
    ])
    let numberBuffer = Buffer.concat([
      new Buffer([0x03]),
      new Buffer([this.opNumber.toString().length]),
      new Buffer(this.opNumber.toString())
    ])
    let paramsBuffer = Buffer.concat(
      Object.keys(params).map(key => {
        let code
        switch (key) {
          case 'amount':
            code = 0x04
            break
          case 'keepalive':
            code = 0x05
            break
          case 'timeout':
            code = 0x06
            break

          default:
            return new Buffer()
        }

        return Buffer.concat([
          new Buffer([code]),
          new Buffer([params[key].toString().length]),
          new Buffer(params[key].toString())
        ])
      })
    )

    let discriminator = new Buffer([0x96, 0xfb])

    let dataBuffer = Buffer.concat([
      discriminator,
      cmdBuffer,
      numberBuffer,
      paramsBuffer
    ])

    let lengthBuffer = Buffer.alloc(2)
    lengthBuffer.writeUInt16BE(dataBuffer.length)

    let messageBuffer = Buffer.concat([lengthBuffer, dataBuffer])

    this.log('SEND', messageBuffer.toString('hex'))

    this.socket.write(messageBuffer)

    let res = await this.awaitEvent(this.getCmdName(cmd), 30000)

    return res
  }

  async sendIDLE() {
    this.enabled = true
    return this.send('IDL')
  }

  async sendDISABLED() {
    this.enabled = false
    return this.send('DIS')
  }

  async sendPRODUCT(amount) {
    let res
    try {
      res = await this.send('VRP', { amount })
    } catch (e) {
      if (e.message == 'Timeout response') this.sendABORT()
      throw e
    }
    return res
  }

  async sendFINAL() {
    return this.send('FIN')
  }

  async sendABORT() {
    return this.send('ABR')
  }

  async sendACCEPT() {
    return this.send('CDP')
  }

  async disable() {
    if (this.pingInterval) clearInterval(this.pingInterval)
    return this.sendDISABLED()
  }

  async enable() {
    if (this.enabled) return

    if (this.pingInterval) clearInterval(this.pingInterval)

    this.pingInterval = setInterval(() => {
      if (this.payProcess) return
      this.sendIDLE()
    }, 10000)

    return this.sendIDLE()
  }

  async pay(amount) {
    this.payProcess = true
    await this.sendIDLE()
    this.opNumber++

    let params = await this.sendPRODUCT(amount).catch(e => ({}))
    // this.responseBankInfo = params

    if (params.amount != amount) {
      setTimeout(() => {
        
        this.payProcess = false
        this.sendIDLE()
      }, 10000)
      throw new Error(
        `Wrond paid. Expected ${amount}, but result ${params.amount}`
      )
    }

    await this.sendIDLE()
    this.payProcess = false

    return params
  }
  
  async refund(amount, params) {
    await this.sendIDLE()
    return this.send('ABR')
  }
}

module.exports = Vendotek
