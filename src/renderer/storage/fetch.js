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

const suffix = 'Direct'

const methodsDirect = [
  'storeMoneyDirect', // выполняется при окончании оплаты клиентом
  'collectDirect', // выполняется инкассации панели
  'readCashDirect', // выполняется при запросе наличных средств находящихся в панели
  'pingDirect', // выполняется панелью ping коннекта
  'registerKktDirect', // выполняется при регистрации ККТ. Производится отправка данных предприятия на коннект
  'createReceiptDirect', // выполняется при запросе чека панелью
  'readReceiptDirect', //  выполняется панелью при формировании чека
  'printReceiptDirect', // выполняется панелью  на запрос печати чека
  'loginBonusDirect', // выполняется при авторизации в бонусной системе
  'getQrDirect', // выполняется панелью для получения QR-кода
  'appendBonusDirect', // выполняется панелью для зачисления бонусов клиенту
  'completeWashDirect', // выполняется панелью после  окончания мойки клиентом
  'pingUrlDirect', // выполняется панелью ping Url
  'chargeBonusDirect', // выполняется панелью для изменения суммы бонусов на облаке
  'checkBonusQrDirect' // выполняется при авторизации Qr code
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
  constructor(certificate) {
    this.httpsAgent = new require('https').Agent({
      rejectUnauthorized: false
      // cert: certificate.cert,
      // key: certificate.key
    })
    this.httpsAgentDirect = new require('https').Agent({
      cert: certificate.cert,
      key: certificate.key
    })
  }

  async request(url, options, type, certificate) {
    const isDirect =
      process.env.VUE_APP_IS_BONUS_DIRECT === 'true' ? true : false

    let response

    switch (type) {
      case 'cash':
        response = await this.cashRequest(url, options)
        break
      case 'bonus':
        response = await this.bonusRequest(url, options)
        break
      case 'finance':
        response = await this.financeRequest(url, options)
        break
      case 'common':
        response = await this.commonRequest(url, options)
        break
      case 'ping':
        response = await this.pingUrl(
          // (url = process.env.VUE_APP_URL_CONTROLLER),
          url,
          options
        )
        break
      case 'qr':
        if (isDirect) {
          url = process.env.VUE_APP_URL_BONUS
          response = await this.commonRequestDirect(url, options, certificate)
        } else {
          url = process.env.VUE_APP_URL_CONNECT
          response = await this.commonRequest(url, options, certificate)
        }
        break

      default:
    }

    return response
  } // end request

  // methods

  async cashRequest(url, body) {
    let res
    const httpsAgent = this.httpsAgent
    const response = await axios
      .post(url, body, { httpsAgent }, { timeout: 2000 })
      .then(res => {
        this.res = res.data
      })
      .catch(e => {
        console.log('Axios request failed:', JSON.stringify(e))
      })

    return this.res
  }

  // end cashRequest

  async bonusRequest(url, body) {
    let res
    const httpsAgent = this.httpsAgent
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

  async financeRequest(url, body) {
    let res
    const httpsAgent = this.httpsAgent
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

  async commonRequest(url, body) {
    let res
    const httpsAgent = this.httpsAgent
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

  /* async pingUrl(url, body) {
    let start = Date.now()

    try {
      await fetch(url)
    } catch (err) {}

    return Date.now() - start
  } */
  async pingUrl(url, body) {
    // console.log('$$ fetch.js: 153', JSON.stringify(body))
    let res
    const httpsAgent = this.httpsAgent
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

  // end methods

  // ------------------------------------
  // methodsDirect

  async commonRequestDirect(url, body, certificate) {
    let res
    const httpsAgentDirect = this.httpsAgentDirect
    const response = await axios
      .post(url, body, { httpsAgentDirect }, { timeout: 2000 })
      .then(res => {
        this.res = res.data
      })
      .catch(e => {
        console.log('Axios request failed:', JSON.stringify(e))
      })

    return this.res
  } // end commonRequestDirect
} // end class Fetch

class FetchClient {
  constructor(url, method, options, type, certificate) {
    this.url = url
    this.method = method
    this.options = options
    this.type = type
    this.certificate = certificate

    this.fetch = new Fetch(certificate)
  }
  async getClient() {
    return await this.fetch.request(
      this.url,
      this.options,
      this.type, 
      this.certificate 
    )
  }
}

export { Fetch, FetchClient, methods, types }
