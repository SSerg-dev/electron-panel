import { EventEmitter } from 'events'
import { ipcMain } from 'electron'
import { readFileSync, writeFileSync } from 'fs'

class DataService extends EventEmitter {
  // end collect
  constructor() {
    super()
    this.ConnectCert = null
    this.ConnectKey = null
    this.coins = null
    this.Coins = {
      sumC5: 0,
      sumC10: 0,
      sumC25: 0,
      counterC5: 0,
      counterC10: 0,
      counterC25: 0,
      amountCoin: 0,
      counterCoin: 0,
    }
    // coinsOnce
    this.coinsOnce = null
    this.CoinsOnce = {
      sumC5: 0,
      sumC10: 0,
      sumC25: 0,
      counterC5: 0,
      counterC10: 0,
      counterC25: 0,
      amountCoin: 0,
      counterCoin: 0,
    }
    this.bills = null
    this.Bills = {
      sumB10: 0,
      sumB50: 0,
      sumB100: 0,
      sumB200: 0,
      sumB500: 0,
      counterB10: 0,
      counterB50: 0,
      counterB100: 0,
      counterB200: 0,
      counterB500: 0,
      amountBill: 0,
      counterBill: 0,
    }
    // billsOnce
    this.billsOnce = null
    this.BillsOnce = {
      sumB10: 0,
      sumB50: 0,
      sumB100: 0,
      sumB200: 0,
      sumB500: 0,
      counterB10: 0,
      counterB50: 0,
      counterB100: 0,
      counterB200: 0,
      counterB500: 0,
      amountBill: 0,
      counterBill: 0,
    }
    // end bills & billsOnce
    // collect
    this.Collect = {
      timestamp: null,
      type: '',
      /* coin */
      sumC5: 0,
      sumC10: 0,
      sumC25: 0,
      counterC5: 0,
      counterC10: 0,
      counterC25: 0,
      amountCoin: 0,
      counterCoin: 0,
      /* bill */
      sumB10: 0,
      sumB50: 0,
      sumB100: 0,
      sumB200: 0,
      sumB500: 0,
      counterB10: 0,
      counterB50: 0,
      counterB100: 0,
      counterB200: 0,
      counterB500: 0,
      amountBill: 0,
      counterBill: 0,
      /* common amount */
      amountConnect: 0,
      amountCard: 0,
      amountCash: 0,
      amountCredit: 0,
      balance: 0,
    }
    this.setup()
  }
  setup() {
    this.initCoins()
    this.initBills()
    this.initConnectCert()
    this.initConnectKey()
  }
  initCoins() {
    const coins = this.readData(DataService.coinPath)
    this.Coins = JSON.parse(coins.toString())
  }
  initBills() {
    const bills = this.readData(DataService.billPath)
    this.Bills = JSON.parse(bills.toString())
  }
  initConnectCert() {
    const connectCert = this.readData(DataService.connectCertPath)
    this.ConnectCert = connectCert.toString()
  }
  initConnectKey() {
    const connectKey = this.readData(DataService.connectKeyPath)
    this.ConnectKey = connectKey.toString()
  }
  
  start(options) {
    ipcMain.on('async-certificate-start', (event, options) => {
      if (options.isCertificate) {
        const connectCert = this.ConnectCert
        const connectKey = this.ConnectKey
        event.sender.send('async-certificate-reply', connectCert, connectKey)
      }
    })
    ipcMain.on('async-cash-start', (event, options) => {
      const coins = this.readData(DataService.coinPath)
      const bills = this.readData(DataService.billPath)
      event.sender.send('async-cash-reply', coins, bills)
    })
    ipcMain.on('async-cash-clear', (event, options) => {
      if (options) {
        this.clearCoins()
        this.clearBills()
      }
    })
    ipcMain.on('async-once-clear', (event, options) => {
      if (options) {
        this.clearCoinsOnce()
        this.clearBillsOnce()
      }
    })
    ipcMain.on('async-cash-collect', (event, options) => {
      if (options) {
        this.collect()
      }
    })
    ipcMain.on('async-read-collect', (event, options) => {
      if (options) {
        const collect = this.readData(DataService.collectPath)
        event.sender.send('async-collect-reply', collect)
      }
    })
    ipcMain.on('async-read-once', (event, options) => {
      const coins = this.readData(DataService.coinOncePath)
      const bills = this.readData(DataService.billOncePath)
      event.sender.send('async-once-reply', coins, bills)
    })
  }
  async create() {
    console.log('[... start data]')
  }
  collect() {
    this.initCoins()
    this.initBills()
    // ----------------------------------
    const date = new Date()
    this.Collect.timestamp = date.toLocaleString('ru-RU')
    this.Collect.type = 'service'
    /* coin */
    this.Collect.sumC5 = this.Coins.sumC5
    this.Collect.sumC10 = this.Coins.sumC10
    this.Collect.sumC25 = this.Coins.sumC25
    this.Collect.counterC5 = this.Coins.counterC5
    this.Collect.counterC10 = this.Coins.counterC10
    this.Collect.counterC25 = this.Coins.counterC25
    this.Collect.amountCoin = this.Coins.amountCoin
    this.Collect.counterCoin = this.Coins.counterCoin
    /* bill */
    this.Collect.sumB10 = this.Bills.sumB10
    this.Collect.sumB50 = this.Bills.sumB50
    this.Collect.sumB100 = this.Bills.sumB100
    this.Collect.sumB200 = this.Bills.sumB200
    this.Collect.sumB500 = this.Bills.sumB500
    this.Collect.counterB10 = this.Bills.counterB10
    this.Collect.counterB50 = this.Bills.counterB50
    this.Collect.counterB100 = this.Bills.counterB100
    this.Collect.counterB200 = this.Bills.counterB200
    this.Collect.counterB500 = this.Bills.counterB500
    this.Collect.amountBill = this.Bills.amountBill
    this.Collect.counterBill = this.Bills.counterBill
    /* common amount */
    this.Collect.amountConnect = 0
    this.Collect.amountCard = 0
    this.Collect.amountCash = this.Coins.amountCoin + this.Bills.amountBill
    this.Collect.amountCredit = 0
    this.Collect.balance =
      this.Collect.amountConnect +
      this.Collect.amountCard +
      this.Collect.amountCash +
      this.Collect.amountCredit
    const data = JSON.stringify(this.Collect, null, 2)
    const path = DataService.collectPath
    const fileData = this.readData(path)
    if (!fileData) {
      this.writeData(path, data)
    } else {
      const json = JSON.parse(fileData.toString())
      const newData = Object.assign({}, this.Collect)
      const arr = Array.from(json)
      arr.push(newData)
      if (arr.length > DataService.collectMax) {
        arr.shift()
      }
      this.writeData(path, JSON.stringify(arr, null, 2))
    }
  } // end collect
  clearCoins() {
    this.Coins.sumC5 = 0
    this.Coins.sumC10 = 0
    this.Coins.sumC25 = 0
    this.Coins.counterC5 = 0
    this.Coins.counterC10 = 0
    this.Coins.counterC25 = 0
    this.Coins.amountCoin = 0
    this.Coins.counterCoin = 0
    const data = JSON.stringify(this.Coins, null, 2)
    const path = DataService.coinPath
    this.writeData(path, data)
  }
  clearCoinsOnce() {
    this.CoinsOnce.sumC5 = 0
    this.CoinsOnce.sumC10 = 0
    this.CoinsOnce.sumC25 = 0
    this.CoinsOnce.counterC5 = 0
    this.CoinsOnce.counterC10 = 0
    this.CoinsOnce.counterC25 = 0
    this.CoinsOnce.amountCoin = 0
    this.CoinsOnce.counterCoin = 0
    const data = JSON.stringify(this.CoinsOnce, null, 2)
    const path = DataService.coinOncePath
    this.writeData(path, data)
  }
  clearBills() {
    this.Bills.sumB10 = 0
    this.Bills.sumB50 = 0
    this.Bills.sumB100 = 0
    this.Bills.sumB200 = 0
    this.Bills.sumB500 = 0
    this.Bills.counterB10 = 0
    this.Bills.counterB50 = 0
    this.Bills.counterB100 = 0
    this.Bills.counterB200 = 0
    this.Bills.counterB500 = 0
    this.Bills.amountBill = 0
    this.Bills.counterBill = 0
    const data = JSON.stringify(this.Bills, null, 2)
    const path = DataService.billPath
    this.writeData(path, data)
  }
  clearBillsOnce() {
    this.BillsOnce.sumB10 = 0
    this.BillsOnce.sumB50 = 0
    this.BillsOnce.sumB100 = 0
    this.BillsOnce.sumB200 = 0
    this.BillsOnce.sumB500 = 0
    this.BillsOnce.counterB10 = 0
    this.BillsOnce.counterB50 = 0
    this.BillsOnce.counterB100 = 0
    this.BillsOnce.counterB200 = 0
    this.BillsOnce.counterB500 = 0
    this.BillsOnce.amountBill = 0
    this.BillsOnce.counterBill = 0
    const data = JSON.stringify(this.BillsOnce, null, 2)
    const path = DataService.billOncePath
    this.writeData(path, data)
  }
  calcCoin(coin) {
    this.initCoins()
    if (Number.isInteger(coin)) {
      const denomination = coin.toString()
      switch (denomination) {
        case DataService.coinC5.toString():
          /* Coins */
          this.Coins.counterC5++
          this.Coins.sumC5 += DataService.coinC5
          /* CoinsOnce */
          this.CoinsOnce.counterC5++
          this.CoinsOnce.sumC5 += DataService.coinC5
          break
        case DataService.coinC10.toString():
          this.Coins.counterC10++
          this.Coins.sumC10 += DataService.coinC10
          this.CoinsOnce.counterC10++
          this.CoinsOnce.sumC10 += DataService.coinC10
          break
        case DataService.coinC25.toString():
          this.Coins.counterC25++
          this.Coins.sumC25 += DataService.coinC25
          this.CoinsOnce.counterC25++
          this.CoinsOnce.sumC25 += DataService.coinC25
          break
        default:
          break
      }
      /* Coins */
      this.Coins.amountCoin =
        this.Coins.sumC5 + this.Coins.sumC10 + this.Coins.sumC25
      this.Coins.counterCoin =
        this.Coins.counterC5 + this.Coins.counterC10 + this.Coins.counterC25
      const data = JSON.stringify(this.Coins, null, 2)
      const path = DataService.coinPath
      this.writeData(path, data)
      /* CoinsOnce */
      this.CoinsOnce.amountCoin =
        this.CoinsOnce.sumC5 + this.CoinsOnce.sumC10 + this.CoinsOnce.sumC25
      this.CoinsOnce.counterCoin =
        this.CoinsOnce.counterC5 +
        this.CoinsOnce.counterC10 +
        this.CoinsOnce.counterC25
      const dataOnce = JSON.stringify(this.CoinsOnce, null, 2)
      const pathOnce = DataService.coinOncePath
      /* dev */
      // this.clearCoinsOnce()
      this.writeData(pathOnce, dataOnce)
      return true
    } else {
      return false
    }
  } // end calcCoin
  writeData(path, data) {
    try {
      writeFileSync(path, data)
    } catch (err) {
      console.error(err)
    }
  }
  readData(path) {
    try {
      return readFileSync(path, 'utf8')
    } catch (err) {
      console.error(err)
      return false
    }
  }
  calcBill(bill) {
    this.initBills()
    if (Number.isInteger(bill)) {
      const denomination = bill.toString()
      switch (denomination) {
        case DataService.billB10.toString():
          this.Bills.counterB10++
          this.Bills.sumB10 += DataService.billB10
          this.BillsOnce.counterB10++
          this.BillsOnce.sumB10 += DataService.billB10
          break
        case DataService.billB50.toString():
          this.Bills.counterB50++
          this.Bills.sumB50 += DataService.billB50
          this.BillsOnce.counterB50++
          this.BillsOnce.sumB50 += DataService.billB50
          break
        case DataService.billB100.toString():
          this.Bills.counterB100++
          this.Bills.sumB100 += DataService.billB100
          this.BillsOnce.counterB100++
          this.BillsOnce.sumB100 += DataService.billB100
          break
        case DataService.billB200.toString():
          this.Bills.counterB200++
          this.Bills.sumB200 += DataService.billB200
          this.BillsOnce.counterB200++
          this.BillsOnce.sumB200 += DataService.billB200
          break
        case DataService.billB500.toString():
          this.Bills.counterB500++
          this.Bills.sumB500 += DataService.billB500
          this.BillsOnce.counterB500++
          this.BillsOnce.sumB500 += DataService.billB500
          break
        default:
          break
      }
      /* Bills */
      this.Bills.amountBill =
        this.Bills.sumB10 +
        this.Bills.sumB50 +
        this.Bills.sumB100 +
        this.Bills.sumB200 +
        this.Bills.sumB500
      this.Bills.counterBill =
        this.Bills.counterB10 +
        this.Bills.counterB50 +
        this.Bills.counterB100 +
        this.Bills.counterB200 +
        this.Bills.counterB500
      const data = JSON.stringify(this.Bills, null, 2)
      const path = DataService.billPath
      this.writeData(path, data)
      /* BillsOnce */
      this.BillsOnce.amountBill =
        this.BillsOnce.sumB10 +
        this.BillsOnce.sumB50 +
        this.BillsOnce.sumB100 +
        this.BillsOnce.sumB200 +
        this.BillsOnce.sumB500
      this.BillsOnce.counterBill =
        this.BillsOnce.counterB10 +
        this.BillsOnce.counterB50 +
        this.BillsOnce.counterB100 +
        this.BillsOnce.counterB200 +
        this.BillsOnce.counterB500
      const dataOnce = JSON.stringify(this.BillsOnce, null, 2)
      const pathOnce = DataService.billOncePath
      // this.clearBillsOnce()
      this.writeData(pathOnce, dataOnce)
      return true
    } else {
      return false
    }
  } // end calcBill
}
// coins
DataService.coinC5 = 5
DataService.coinC10 = 10
DataService.coinC25 = 25
DataService.coinPath = './data/coin-statistic.json'
DataService.billPath = './data/bill-statistic.json'
DataService.collectPath = './data/collect-statistic.json'
DataService.coinOncePath = './data/coin-once.json'
DataService.billOncePath = './data/bill-once.json'
DataService.connectCertPath = './certificates/connect/cert.pem'
DataService.connectKeyPath = './certificates/connect/key.pkcs8'
DataService.collectMax = 12
// end coins & coinsOnce
// bills
DataService.billB10 = 10
DataService.billB50 = 50
DataService.billB100 = 100
DataService.billB200 = 200
DataService.billB500 = 500

export default DataService
