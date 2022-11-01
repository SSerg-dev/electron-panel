<template>
  <div class="page-title">
    <ul style="margin-top: 18em">
      <li
        v-if="this.IsWetBalance === true && this.getIsPing"
        @click="payUp('payBonus')"
      >
        <div class="card white waves-effect pay-end-bonus">
          <div class="card-content black-text noselect pay-end-bonus-title">
            {{ `RETURN_BONUSES_UP` | localize }}
          </div>
        </div>
      </li>

      <li v-if="this.IsWetBalance === false">
        <div class="card grey pay-input">
          <div
            class="card-content white-text noselect"
            style="font-size: 4em; padding-right: 1em; padding-top: 1em"
          >
            {{ `MAKE_A_PAYMENT` | localize }}
          </div>
        </div>
      </li>

      <li v-if="this.IsWetBalance === true" @click="payUp('payEnd')">
        <div
          class="card white waves-effect pay-end-bonus"
          style="
            width: 66em;
            height: 14em;
            margin-left: -8em;
            margin-top: -17em;

            border: solid 6px red;
            border-radius: 4em;
            box-shadow: 0px 13px 20px red;
          "
        >
          <div
            class="card-content black-text noselect"
            style="font-size: 4em; padding-right: 1em; padding-top: 0.2em"
          >
            {{ `COMPLETE_PAYMENT` | localize }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

import { Database } from '@/storage/database.js'
import { Fetch, FetchClient, methods, types } from '@/storage/fetch.js'
import { Storage } from '@/storage/index.js'

import { ipcRenderer } from 'electron'

import { dateFilter, getRndInteger } from '@/utils/order.js'

import sleep from '@/utils/sleep'
import { Queue } from '@/queue/index.js'

import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'cash-bill',
  data: () => ({
    title: '',
    body: '',
    // cash: 0,
    cash_enabler: false,
    isDown: {
      payEnd: false,
      payBonus: false,
    },

    /* dev */
    emoji: '',
    currency: '',
    symbol: '',

    sum: 0,
    // cash: true,
    order: '',
    coins: {},
    bills: {},
    delay: 2000,

    client: 'fetch',
    url: '', // 'https://192.168.1.3/',
    urlLocal: 'http://127.0.0.1/',

    storage: null,
    options: {},

    queue: null,
    queueType: '',
    localClient: 'local',
    localStorage: null,
  }),
  mounted() {
    this.order = this.createOrder()
    this.url = process.env.VUE_APP_URL_CONNECT
    this.storage = new Storage(this.client, this.url)

    this.localStorage = new Storage(this.localClient, this.urlLocal)
  },
  computed: {
    ...mapGetters({
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getVacuumNumber: 'getVacuumNumber',
      getPanelType: 'getPanelType',
      getWetOrder: 'getWetOrder',
      getDryOrder: 'getDryOrder',
      getWetBalance: 'getWetBalance',
      getIsPing: 'getIsPing',
      getPayType: 'getPayType',
      getInitCurrency: 'getInitCurrency',
    }),
    IsWetBalance: {
      get: function () {
        let flag
        this.getWetBalance > 0 ? (flag = true) : (flag = false)
        return flag
      },
    },
  },

  methods: {
    ...mapGetters({
      getCashEnabler: 'getCashEnabler',
      getStoreMoneyOptions: 'getStoreMoneyOptions',
      getAppendBonus: 'getAppendBonus',
    }),
    ...mapMutations({
      setCashEnabler: 'setCashEnabler',
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsAppendBonusMoney: 'setIsAppendBonusMoney',

      setIsMoneyToBonus: 'setIsMoneyToBonus',
      setWetBalance: 'setWetBalance',
    }),
    ...mapActions({}),

    initCurrency() {
      const { emoji, currency, symbol } = this.getInitCurrency

      this.emoji = emoji
      this.currency = currency
      this.symbol = symbol
    },

    payUp(program) {
      this.setDown(program)

      // payEnd
      if (program === 'payEnd') {
        this.getCashMoney()

        sleep(this.delay).then(() => {
          this.payCashMoney()
        })

        this.setCashEnabler(true)
        this.setIsAppendBonusMoney(false)
        this.setIsPayBonusMoney(true)
        if (this.$route.name !== 'program') this.$router.push('/program')
      }
      // payBonus
      else if (program === 'payBonus') {
        this.setIsAppendBonusMoney(true)
        this.setIsPayBonusMoney(false)
        this.$router.push('/bonus')
      }
    },

    /* dev */
    getCashMoney() {
      const options = 'ipcRenderer.send from CashBill'
      ipcRenderer.send('async-read-once', options)

      ipcRenderer.on('async-once-reply', (event, coins, bills) => {
        this.coins = JSON.parse(coins) || {}
        this.bills = JSON.parse(bills) || {}
      })
    },
    clearCashMoney() {
      let isClear = false
      if (+this.coins.amountCoin > 0 || +this.bills.amountBill > 0) {
        isClear = true
        // console.log('$$ clearCashMoney', this.coins.amountCoin)
        ipcRenderer.send('async-once-clear', isClear)
      }
    },
    /*     */

    async payCashMoney() {
      const method = methods[0]
      const type = types[0]

      this.options = this.getStoreMoneyOptions()
      this.sum = this.getWetBalance

      this.options.params.unit_id = this.getDefaultPanelNumber - 1
      this.options.params.type = this.getPayType || 'cash'
      this.options.params.sum = +this.sum

      // for coins
      this.options.params.detail.sum_coins = +this.coins.amountCoin || 0
      this.options.params.detail.coins_count = +this.coins.counterCoin || 0
      this.options.params.detail.coins_1 = +this.coins.counterC1 || 0
      this.options.params.detail.coins_2 = +this.coins.counterC2 || 0
      this.options.params.detail.coins_5 = +this.coins.counterC5 || 0
      this.options.params.detail.coins_10 = +this.coins.counterC10 || 0
      this.options.params.detail.coins_25 = +this.coins.counterC25 || 0

      // for bills
      this.options.params.detail.sum_bills = +this.bills.amountBill || 0
      this.options.params.detail.bills_count = +this.bills.counterBill || 0
      this.options.params.detail.bills_10 = +this.bills.counterB10 || 0
      this.options.params.detail.bills_50 = +this.bills.counterB50 || 0
      this.options.params.detail.bills_100 = +this.bills.counterB100 || 0
      this.options.params.detail.bills_200 = +this.bills.counterB200 || 0
      this.options.params.detail.bills_500 = +this.bills.counterB500 || 0

      if (!this.order) this.order = this.createOrder() /* 'W220220504143549' */
      this.options.params.order = this.order // ??
      this.options.params.detail.order = this.order

      console.log(
        '$$ CashBill ++payCashMoney-->options-->this.options-->',
        JSON.stringify(this.options)
      )
      // console.log('$$ this.coins', this.coins)

      const response = await this.storage.getClient(method, this.options, type)
      console.log('$$ CashBill response', response)

      if (response === undefined) {
        /* dev */
        this.queueType = 'setQueue'
        this.setQueue(method, this.options, this.queueType)

        if (this.$route.name !== 'program') this.$router.push('/program')
        this.$message(`Communication with connect cash is unavailable!`)
        return
      }
      if (+response.result === 0 && +this.getWetBalance > 0) {
        this.clearCashMoney()  
        if (this.$route.name !== 'program') this.$router.push('/program')
        // this.$message(
        //   `Оплата прошла успешно, внесенная сумма:  ${+this.getWetBalance} ₽`
        // )
        this.$message(
          localizeFilter(`${messages.The_payment_successful_amount}`) +
            `  ` +
            `${+this.getWetBalance}` +
            `  ` +
            `${this.currency}`
        )
      } else {
        // this.$error('payCashMoney $error')
      }
    },
    // ----------------------------------
    setQueue(method, options, type) {
      this.queueType = 'setQueue'

      const response = this.localStorage.getClient(method, options, type)
      console.log('$$!! response', response)
    },
    // ----------------------------------
    createOrder() {
      const type = this.getPanelType
      const date = dateFilter(new Date())
      let result, index, prefix, suffix
      suffix = getRndInteger(10000, 99999)

      switch (type) {
        case 'wash':
          if (this.getWetOrder === '') {
            prefix = 'W'
            index = this.getDefaultPanelNumber
            result = prefix + index + date
          } else result = this.getWetOrder
          break
        case 'vacuum':
          if (this.getDryOrder === '') {
            prefix = 'V'
            index = this.getVacuumNumber
            result = prefix + index + date
          } else result = this.getDryOrder
          break
        default:
          break
      }

      return result
    },
    // ----------------------------------
    async appendBonusMoney() {
      console.log('!!!CashBill-->appendBonusMoney-->', methods[10])
      const method = methods[10]
      const type = types[4]

      this.options = this.getAppendBonus()
      const response = await this.storage.getClient(method, this.options, type)
      if (+response.result === 0) {
        this.$message(`Bonuses append successfully!`)
      }
    },
    setEnabler() {
      this.getCashEnabler === true
        ? (this.cash_enabler = false)
        : (this.cash_enabler = true)
      this.setCashEnabler(this.cash_enabler)
      try {
        //ipcRenderer.send('cash_enabler', this.cash_enabler)
        ipcRenderer.send('cash_enabler', 'false')
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    setDown(program) {
      this.clearDown()
      switch (program) {
        case 'payEnd':
          this.isDown.payEnd = true
          break
        case 'payBonus':
          this.isDown.payBonus = true
          break
        default:
          break
      }
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
    },
  }, // end methods

  created() {
    this.initCurrency()
  },
  beforeDestroy() {},
}
</script>

<style scoped>
.pay-input {
  width: 66em;
  height: 14em;
  margin-left: -9em;
  margin-top: -16em;

  border: solid 2px white;
  border-radius: 1em;
  box-shadow: 0px 10px 20px #eee;
}
.pay-end-bonus {
  width: 66em;
  height: 22em;

  margin-top: -40em;
  margin-bottom: 20em;
  margin-left: -8em;

  border: solid 6px #7fe409;
  border-radius: 4em;
  box-shadow: 0px 10px 20px #7fe409;

  display: flex;
  align-items: center;
  justify-content: center;
}
.pay-end-no-bonus {
  background-color: black;
  margin-top: -20rem;
  margin-bottom: 10rem;
}
.pay-end-bonus-title {
  font-size: 4em;
}
.button-title-long {
  position: relative;
  top: -11rem;
  left: 0rem; /* 12.5rem; */
  color: black;
  font-size: 4rem;
  font-weight: bold;
  text-align: center; /* left; */
  z-index: 1;

  font-family: 'Plumb-Medium';
}
</style>
