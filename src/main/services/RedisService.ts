import { exec } from 'child_process'
import { EventEmitter } from 'events'
import { ipcMain } from 'electron'

import CoinAcceptorController from '../controllers/CoinAcceptorController'
import BillValidatorController from '../controllers/BillValidatorController'

import { wait } from '../utils'

class RedisService extends EventEmitter {
  // resultEmitter: any = null
  // CoinAcceptor: CoinAcceptorController
  bills: any = null
  coins: any = null
  sumC5: number = 0
  sumC10: number = 0
  sumC25: number = 0

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
  }
  public calcCoin(coin: any) {
    console.log('$$ receiveCoin-->', coin)
    // get one by one bill
    // this.CoinAcceptor.on('current-coin', (coin) => console.log('$$ Redis CoinAcceptor', coin))
    
    // const index = this.coins.findIndex((c: any) => c === coin)
    // console.log('$$ index', index)
    // const type = this.coins[index]
    const type = coin.toString()
    

    switch (type) {
      case '5':
        this.sumC5 += 5
        console.log('$$ receiveCoin 5 -->', type, this.sumC5)
        break
      case '10':
        this.sumC10 += 10
        console.log('$$ receiveCoin 10 -->', type, this.sumC10)
        break
      case '25':
        break

      default:
        break
    }
  }
  public calcBill(bill: any) {
    console.log('$$ receiveBill', bill.amount)
  }
}

export default RedisService
