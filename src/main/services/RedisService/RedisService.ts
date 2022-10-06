import { exec } from 'child_process'
import { EventEmitter } from 'events'
import { ipcMain } from 'electron'

import CoinAcceptorController from '../../controllers/CoinAcceptorController'
import BillValidatorController from '../../controllers/BillValidatorController'

import { wait } from '../../utils'
import { readFileSync, writeFileSync } from 'fs'

/* redis */
// import { createClient } from 'redis'
// import { Client } from 'redis-om'
// import { Entity, Schema } from 'redis-om'
// import { client } from './server.js'
// import client from './server.js'

// import { plus } from './server.js'

class RedisService extends EventEmitter {
  // coins
  static coinC5 = 5
  static coinC10 = 10
  static coinC25 = 25

  static coinPath = './data/coin-statistic.json'
  static billPath = './data/bill-statistic.json'
  static collectPath = './data/collect-statistic.json'
  static collectMax = 10

  coins: any = null

  Coins: any = {
    sumC5: 0,
    sumC10: 0,
    sumC25: 0,

    counterC5: 0,
    counterC10: 0,
    counterC25: 0,

    amountCoin: 0,
    counterCoin: 0
  }
  // end coins

  // bills
  static billB10 = 10
  static billB50 = 50
  static billB100 = 100
  static billB200 = 200
  static billB500 = 500

  bills: any = null

  Bills: any = {
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
    counterBill: 0
  }
  // end bills

  // collect
  Collect: any = {
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
    amountBonus: 0,
    amountCard: 0,
    amountCash: 0,
    amountCredit: 0,

    balance: 0
  }

  // end collect

  constructor() {
    super()
    this.setup()
  }
  private setup() {
    this.initCoins()
    this.initBills()
  }
  private initCoins() {
    const coins = this.readData(RedisService.coinPath)
    this.Coins = JSON.parse(coins.toString())
  }
  private initBills() {
    const bills = this.readData(RedisService.billPath)
    this.Bills = JSON.parse(bills.toString())
  }
  public start(options: any) {
    // this.create()
    /* dev */
    // this.collect()

    ipcMain.on('async-cash-start', (event: any, options: any) => {
      const coins = this.readData(RedisService.coinPath)
      const bills = this.readData(RedisService.billPath)

      event.sender.send('async-cash-reply', coins, bills)
    })
    ipcMain.on('async-cash-clear', (event: any, options: any) => {
      if (options) {
        this.clearCoins()
        this.clearBills()
      }
    })
    ipcMain.on('async-cash-collect', (event: any, options: any) => {
      if (options) {
        console.log('$$ Redis options', options)
        this.collect()
        
      }
    })
    ipcMain.on('async-read-collect', (event: any, options: any) => {
      if (options) {
        const collect = this.readData(RedisService.collectPath)
        event.sender.send('async-collect-reply', collect)
      }
    })

  }

  async create() {
    console.log('[... start redis]')
    // console.log('redis function-->', plus(40, 2))
  }
  /* dev */
  private collect() {
    this.initCoins()
    this.initBills()

    // ----------------------------------
    // this.Collect.timestamp = new Date().getTime()
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
    this.Collect.amountBonus = 0
    this.Collect.amountCard = 0
    this.Collect.amountCash = this.Coins.amountCoin + this.Bills.amountBill
    this.Collect.amountCredit = 0

    this.Collect.balance =
      this.Collect.amountBonus +
      this.Collect.amountCard +
      this.Collect.amountCash +
      this.Collect.amountCredit

    const data = JSON.stringify(this.Collect, null, 2)
    const path = RedisService.collectPath
    const fileData = this.readData(path)

    if (!fileData) {
      this.writeData(path, data)
    } else {
      const json = JSON.parse(fileData.toString())
      const newData = { ...this.Collect }
      const arr = Array.from(json)
      arr.push(newData)

      if (arr.length > RedisService.collectMax) {
        arr.shift()
      }
      this.writeData(path, JSON.stringify(arr, null, 2))
    }
  } // end collect

  private clearCoins() {
    this.Coins.sumC5 = 0
    this.Coins.sumC10 = 0
    this.Coins.sumC25 = 0

    this.Coins.counterC5 = 0
    this.Coins.counterC10 = 0
    this.Coins.counterC25 = 0

    this.Coins.amountCoin = 0
    this.Coins.counterCoin = 0

    const data = JSON.stringify(this.Coins, null, 2)
    const path = RedisService.coinPath
    this.writeData(path, data)
  }
  private clearBills() {
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
    const path = RedisService.billPath
    this.writeData(path, data)
  }
  public calcCoin(coin: number) {
    this.initCoins()
    if (Number.isInteger(coin)) {
      const denomination = coin.toString()

      switch (denomination) {
        case RedisService.coinC5.toString():
          this.Coins.counterC5++
          this.Coins.sumC5 += RedisService.coinC5
          break
        case RedisService.coinC10.toString():
          this.Coins.counterC10++
          this.Coins.sumC10 += RedisService.coinC10
          break
        case RedisService.coinC25.toString():
          this.Coins.counterC25++
          this.Coins.sumC25 += RedisService.coinC25
          break

        default:
          break
      }
      this.Coins.amountCoin =
        this.Coins.sumC5 + this.Coins.sumC10 + this.Coins.sumC25
      this.Coins.counterCoin =
        this.Coins.counterC5 + this.Coins.counterC10 + this.Coins.counterC25

      const data = JSON.stringify(this.Coins, null, 2)
      const path = RedisService.coinPath
      this.writeData(path, data)

      return true
    } else {
      return false
    }
  } // end calcCoin
  private writeData(path: any, data: any) {
    try {
      writeFileSync(path, data)
    } catch (err) {
      console.error(err)
    }
  }
  private readData(path: any) {
    try {
      return readFileSync(path, 'utf8')
    } catch (err) {
      console.error(err)
      return false
    }
  }

  public calcBill(bill: any) {
    this.initBills()
    if (Number.isInteger(bill)) {
      const denomination = bill.toString()

      switch (denomination) {
        case RedisService.billB10.toString():
          this.Bills.counterB10++
          this.Bills.sumB10 += RedisService.billB10
          break
        case RedisService.billB50.toString():
          this.Bills.counterB50++
          this.Bills.sumB50 += RedisService.billB50
          break
        case RedisService.billB100.toString():
          this.Bills.counterB100++
          this.Bills.sumB100 += RedisService.billB100
          break
        case RedisService.billB200.toString():
          this.Bills.counterB200++
          this.Bills.sumB200 += RedisService.billB200
          break
        case RedisService.billB500.toString():
          this.Bills.counterB500++
          this.Bills.sumB500 += RedisService.billB500
          break

        default:
          break
      }
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
      const path = RedisService.billPath
      this.writeData(path, data)

      return true
    } else {
      return false
    }
  } // end calcBill
}

export default RedisService
