const EventEmitter = require('events')
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
  /* dev */
  async connect() {
    return true
  }
  /* dev */
  async disconnect() {}

  async pay(amount) {
    this.payProcess = true
    this.opNumber++
    let res = await this.sendPRODUCT(amount).catch(e => ({}))

    return res
  }
  /* dev */
  check(amount, amountReply, status) {
    let res
    if (+amountReply === 0 && +status !== 1) {
      this.subscribe(Observer.item)
      this.fire({ type: 'REJECT', payload: null })
      this.unsubscribe(Observer.item)
      throw new Error(
        `Wrond paid. Expected ${amount}, but result ${amountReply}`
      )
    } else if (+amountReply > 0 && +status === 1) {
      this.subscribe(Observer.item)
      this.fire({ type: 'RESOLVE', payload: amountReply, status })
      this.unsubscribe(Observer.item)
    }

    this.sendFINAL()
    return res
  }

  async sendPRODUCT(amount) {
    let res
    try {
      res = await this.send('PAY', { amount })
    } catch (e) {
      // if (e.message == 'Timeout response') this.sendABORT()
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
  async send(cmd, params = {}) {
    let res = {}

    switch (cmd) {
      case 'PAY':
        console.log('$$ Pax.js --PAY')
        // async-amount-message
        ipcRenderer.send('async-amount-message', params.amount.toString())

        // async-amount-reply
        ipcRenderer.on('async-amount-reply', (event, amount, status) => {
          this.check(params.amount, amount, status)
        })

        break
      case 'FIN':
        break
      case 'ABR':
        break
      default:
        break
    }
    return res
  }
} // end class Pax

module.exports = Pax
