import { exec } from 'child_process'
import { EventEmitter } from 'events'
import { ipcMain } from 'electron'

import CoinAcceptorController from '../controllers/CoinAcceptorController'
import BillValidatorController from '../controllers/BillValidatorController'

import { wait } from '../utils'

class RedisService extends EventEmitter {
  // resultEmitter: any = null
  // CoinAcceptor: CoinAcceptorController
  static coinC5 = 5
  static coinC10 = 10
  static coinC25 = 25

  bills: any = null
  coins: any = null

  Coins: any = {
    sumC5: 0,
    sumC10: 0,
    sumC25: 0,

    counterC5: 0,
    counterC10: 0,
    counterC25: 0,

    amountCoin: 0
  }

  constructor() {
    super()
    // this.resultEmitter = new EventEmitter()
    // this.CoinAcceptor = new CoinAcceptorController()
  }
  public start(options: any) {
    console.log('[...start redis]')

    this.bills = options.bill_validator.enable_bills
    this.coins = options.coin_acceptor.enable_coins

    // console.log('enable_bills', this.enable_bills)
    // console.log('enable_coins', this.enable_coins)

    // ipcMain.on('async-bills-message', (event: any, options: any) => {
    //   console.log('$$ ipcMain.on 01', options)
    //   const reply = 'redis-reply 01'
    //   event.sender.send('async-redis-reply', reply)
    // })

    // ipcMain.on('async-client', (event: any, options: any) => {
    //   console.log('$$ ipcMain.on 02', options)
    // })

    ipcMain.on('async-coin-start', (event: any, options: any) => {
      const coins = this.Coins
      event.sender.send('async-coin-reply', coins)
    })
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
      // console.log('$$ receiveCoin this.amountCoin -->', this.Coins)
      return true
    } else {
      return false
    }
  } // end calsCoin

  public calcBill(bill: any) {
    console.log('$$ receiveBill', bill.amount)
  }
}

export default RedisService
