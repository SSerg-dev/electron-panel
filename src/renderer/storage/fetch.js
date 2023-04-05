import axios, { AxiosInstance, Method } from 'axios'

const methods = [
  'storeMoney', // выполняется при окончании оплаты клиентом
  'collect', // выполняется инкассации панели
  'readCash', // выполняется при запросе наличных средств находящихся в панели
  'ping', // выполняется панелью ping коннекта
  'registerKkt', // выполняется при регистрации ККТ. Производится отправка данных предприятия на коннект
  'createReceipt', // выполняется при запросе чека панелью
  'readReceipt', //  выполняется панелью при формировании чека
  'printReceipt', // выполняется панелью  на запрос печати чека
  'loginBonus', // выполняется при авторизации в бонусной системе
  'getQr', // выполняется панелью для получения QR-кода
  'appendBonus', // выполняется панелью для зачисления бонусов клиенту
  'completeWash', // выполняется панелью после  окончания мойки клиентом
  'pingUrl', // выполняется панелью ping Url
  'chargeBonus', // выполняется панелью для изменения суммы бонусов на облаке
  'checkBonusQr' // выполняется при авторизации Qr code
]

const types = [ 
  'cash',
  'card',
  'bonus',
  'service',
  'common',
  'ping',
  'finance',
  'qr'
]

class Fetch {
  async request(url, options, type) {
    let response
    switch (type) {
      case 'cash':
        response = await this.cashRequest(url, options)
        break
      /* case 'card':
        response = await this.cardRequest(url, options)
        break */
      case 'bonus':
        response = await this.bonusRequest(url, options)
        break
      /* case 'service':
        response = await this.serviceRequest(url, options)
        break */
      case 'finance':
        response = await this.financeRequest(url, options)
        break
      case 'common':
        response = await this.commonRequest(url, options)
        break
      case 'ping':
        console.log('$$ this.pingUrl')
        response = await this.pingUrl(
          (url = process.env.VUE_APP_URL_CONTROLLER),
          options
        )
        break
      case 'qr':
        response = await this.commonRequest(url, options)
        break

      default:
    }

    return response
  } // end request

  // methods

  async cashRequest(url, body) {
    let res
    const httpsAgent = new require('https').Agent({
      rejectUnauthorized: false
    })
    const response = await axios
      .post(url, body, { httpsAgent }, { timeout: 2000 })
      .then(res => {
        this.res = res.data
      })
      .catch(e => {
        console.log('Axios request failed:', JSON.stringify(e))
      })

    return this.res
  } // end cashRequest

  async bonusRequest(url, body) {
    let res
    const httpsAgent = new require('https').Agent({
      rejectUnauthorized: false
    })
    const response = await axios
      .post(url, body, { httpsAgent }, { timeout: 2000 })
      .then(res => {
        this.res = res.data
      })
      .catch(e => {
        console.log('Axios request failed:', JSON.stringify(e))
      })

    return this.res
  } // end bonusReques

  /* dev */
  async financeRequest(url, body) {
    let res
    const httpsAgent = new require('https').Agent({
      rejectUnauthorized: false
    })
    const response = await axios
      .post(url, body, { httpsAgent }, { timeout: 2000 })
      .then(res => {
        this.res = res.data
      })
      .catch(e => {
        console.log('Axios request failed:', JSON.stringify(e))
      })

    return this.res
  } // end financeRequest
  /*     */

  async commonRequest(url, body) {
    let res
    const httpsAgent = new require('https').Agent({
      rejectUnauthorized: false
    })
    const response = await axios
      .post(url, body, { httpsAgent }, { timeout: 2000 })
      .then(res => {
        this.res = res.data
      })
      .catch(e => {
        console.log('Axios request failed:', JSON.stringify(e))
      })

    return this.res
  } // end commonRequest

  async pingUrl(url, body) {
    let start = Date.now()

    try {
      await fetch(url)
    } catch (err) {}

    return Date.now() - start
  }
} // end class Fetch

class FetchClient {
  constructor(url, method, options, type) {
    this.url = url
    this.method = method
    this.options = options
    this.type = type

    this.fetch = new Fetch()
  }
  async getClient() {
    return await this.fetch.request(this.url, this.options, this.type)
  }
}

export { Fetch, FetchClient, methods, types }
