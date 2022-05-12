const EventEmitter = require('events')
// import { ipcRenderer } from 'electron'
const { ipcRenderer } = require('electron')

const Observer = require('./Observer.js')

let Config = {
  // ip: '',
  port: 0
}
class Pax extends EventEmitter {
  static item = null
  responseBank = null

  constructor(config) {
    super()
    this.config = Object.assign({}, Config, config)
    this.log = this.config.log || console.log
    this.opNumber = 0

    // singelton
    if (Pax.exists) {
      return Pax.instance
    }
    Pax.instance = this
    Pax.exists = true

    // observer
    this.observers = []
  }

  // getters
  get responseBankInfo() {
    return this.responseBank
  }
  // setters
  set responseBankInfo(newResponce) {
    this.responseBank = newResponce
  }

  // methods

  // observer methods
  subscribe(observer) {
    this.observers.push(observer)
  }
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }
  fire(action) {
    this.observers.forEach(observer => {
      observer.update(action)
    })
  }
  // end observer

  static connect(config) {
    let item = new Pax(config)
    item.connecting = item.connect()
    item.disconnecting = item.disconnect()

    this.item = item

    return item
  }

  async connect() {
    // console.log('$$ Pax.js-->connect' )
    return true
  }

  async disconnect() {}

  async pay(amount) {
    this.payProcess = true
    this.opNumber++
    /* dev */
    let params = await this.sendPRODUCT(amount).catch(e => ({}))

/*     if (params.amount != amount) {
      this.subscribe(Observer.item)
      this.fire({ type: 'REJECT', payload: params.amount })
      this.unsubscribe(Observer.item)
      throw new Error(
        `Wrond paid. Expected ${amount}, but result ${params.amount}`
      )
    } 
    else {
      this.sendFINAL()
    } */

    return params
  }
  async sendPRODUCT(amount) {
    let res = {}

    // try {
    //   res = await this.send({ amount })
    // } catch (e) {}

    // console.log('$$ Pax.js-->sendPRODUCT-->amount-->', amount)

    console.log('$$ ---JS PAX -->', ipcRenderer.sendSync('synchronous-message', amount.toString()))

    res.amount = 2
    return res
  }
  async sendFINAL() {
    // console.log('$$ sendFINAL success')
    return this.send('FIN')
  }
  async sendABORT() {
    return this.send('ABR')
  }
  async send(cmd) {
    let res = {}
    return res
  }
}

module.exports = Pax
