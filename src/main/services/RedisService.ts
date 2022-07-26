import { exec } from 'child_process'
import { EventEmitter } from 'events'
import { ipcMain } from 'electron'

import CoinAcceptorController from '../controllers/CoinAcceptorController'
import BillValidatorController from '../controllers/BillValidatorController'

import { wait } from '../utils'

class RedisService extends EventEmitter {

  // coins  
  static coinC5 = 5
  static coinC10 = 10
  static coinC25 = 25

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

  constructor() {
    super()
  }
  public start(options: any) {
    console.log('[...start redis]')

    this.bills = options.bill_validator.enable_bills
    this.coins = options.coin_acceptor.enable_coins

    ipcMain.on('async-cash-start', (event: any, options: any) => {
      const coins = this.Coins
      const bills = this.Bills  
      
      event.sender.send('async-cash-reply', coins, bills)
    })
    ipcMain.on('async-cash-clear', (event: any, options: any) => {
      if (options) {

        this.clearCoins()
        this.clearBills()
      }
    })
  }
  private clearCoins() {
    
    this.Coins.sumC5 = 0
    this.Coins.sumC10 = 0
    this.Coins.sumC25 = 0

    this.Coins.counterC5 = 0
    this.Coins.counterC10 = 0
    this.Coins.counterC25 = 0

    this.Coins.amountCoin = 0
    this.Coins.counterCoin = 0

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
  }
  public calcCoin(coin: number) {
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

      return true
    } else {
      return false
    }
  } // end calcCoin
  

  public calcBill(bill: any) {
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

      return true
    } else {
      return false
    }
  } // end calcBill
}

export default RedisService
