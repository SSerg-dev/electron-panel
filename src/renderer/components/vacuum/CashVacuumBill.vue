<template>
  <div class="page-title">
    <ul style="margin-top: 18em">
      <li
        v-if="this.IsDryBalance === true && this.getIsPing"
        @click="payUp('payBonus')"
      >
        <div
          class="card white waves-effect pay-end-bonus"
          style="
            width: 945px;
            height: 320px;
            margin-left: -8em;
            margin-bottom: 16em;

            border: solid 6px #7fe409;
            border-radius: 4em;
            box-shadow: 0px 10px 20px #7fe409;
          "
        >
          <div
            class="card-content black-text button-content-style noselect"
            style="
              font-size: 4em;
              padding-right: 1.1em;
              padding-left: 1.1em;
              padding-top: 1.4em;
            "
          >
            {{ `RETURN_BONUSES_UP` | localize }}
          </div>
        </div>
      </li>

      <li v-if="this.IsDryBalance === false" @click="payUp('')">
        <div class="card grey pay-input" style="">
          <div
            class="card-content white-text button-content-style noselect"
            style="
            font-size: 4em; 
            padding-right: 0em; 
            padding-top: 1em;
            text-shadow: 1px 1px 1px #000, -2px 2px 2px #000;
            "
          >
            {{ `MAKE_A_PAYMENT` | localize }}
          </div>
        </div>
      </li>

      <li v-if="this.IsDryBalance === true" @click="payUp('payEnd')">
        <div
          class="card white waves-effect pay-end-bonus"
          style="
            width: 945px;
            height: 220px;
            margin-left: -8em;
            margin-top: -17em;

            border: solid 6px red;
            border-radius: 4em;
            box-shadow: 0px 13px 20px red;
          "
        >
          <div
            class="card-content black-text button-content-style noselect"
            style="font-size: 4em; padding-right: 0.5em; padding-top: 1em"
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
import sleep from '@/utils/sleep'
/* dev */
import { Component, Box, Circle, Button } from '@/shapes/index.js'

import { ipcRenderer } from 'electron'
import { dateFilter, getRndInteger } from '@/utils/order.js'
import { synchronize } from '@/utils/common.functions'

export default {
  name: 'cash-vacuum-bill',
  data: () => ({
    title: '',
    body: '',
    // cash: 0,
    cash_enabler: false,
    isDown: {
      payEnd: false,
      payBonus: false,
    },

    sum: 0,
    cash: true,
    order: '',
    coins: {},
    bills: {},
    delay: 2000,

    client: 'fetch',
    url: '',
    urlLocal: '',
    storage: null,
    options: {},

    queue: null,
    queueType: '',
    localClient: 'local',
    localStorage: null,

    date: new Date(),
  }),
  mounted() {
    this.order = this.createOrder()
    this.url = process.env.VUE_APP_URL_CONNECT
    this.storage = new Storage(this.client, this.url)

    this.urlLocal = process.env.VUE_APP_URL_LOCAL
    this.localStorage = new Storage(this.localClient, this.urlLocal)
  },
  computed: {
    ...mapGetters({
      getDryBalance: 'getDryBalance',
      getIsPing: 'getIsPing',
      getPanelNumber: 'getPanelNumber',
      getVacuumNumber: 'getVacuumNumber',
      getPanelType: 'getPanelType',
      getWetOrder: 'getWetOrder',
      getDryOrder: 'getDryOrder',
      getWetBalance: 'getWetBalance',
      getPayType: 'getPayType',
      getIsKktInstalled: 'getIsKktInstalled',
      getCnw: 'getCnw',
      getControllerTime: 'getControllerTime',
      getControllerDate: 'getControllerDate',
    }),
    IsDryBalance: {
      get: function () {
        let flag
        this.getDryBalance > 0 ? (flag = true) : (flag = false)
        return flag
      },
    },
  },
  methods: {
    ...mapGetters({
      getCashEnabler: 'getCashEnabler',
      getStoreMoneyOptions: 'getStoreMoneyOptions',
      getDryStoreMoneyOptions: 'getDryStoreMoneyOptions',
      getAppendBonus: 'getAppendBonus',
    }),
    ...mapMutations({
      //createCash: 'cash/createCash',
      setCashEnabler: 'setCashEnabler',
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsAppendBonusMoney: 'setIsAppendBonusMoney',
    }),
    ...mapActions({}),

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
        // if (this.$route.name !== 'program') this.$router.push('/program')
      } else if (program === 'payBonus') {
        this.setIsAppendBonusMoney(true)
        this.setIsPayBonusMoney(false)
        if (this.$route.name !== 'bonus') this.$router.push('/bonus')
      }
    },

    /* dev */
    getCashMoney() {
      const options = 'ipcRenderer.send from CashVacuumBill'
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
        ipcRenderer.send('async-once-clear', isClear)
      }
    },
    /*     */

    async payCashMoney() {
      const method = methods[0]
      const type = types[0]

      /* dev */
      // this.options = this.getDryStoreMoneyOptions()
      this.options = this.getStoreMoneyOptions()
      this.sum = this.getDryBalance

      this.options.params.unit_id = this.getVacuumNumber - 1
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

      if (!this.order) this.order = this.createOrder()
      this.options.params.order = this.order
      this.options.params.detail.order = this.order

      this.getCnw
        ? (this.options.params.detail.kkt_enabled = false)
        : (this.options.params.detail.kkt_enabled = this.getIsKktInstalled)

      // console.log(
      //   '$$ CashVacuumBill.vue: 240',
      //   JSON.stringify(this.options)
      // )

      const response = await this.storage.getClient(method, this.options, type)

      if (response === undefined) {
        /* dev */
        this.queueType = 'setQueue'
        this.setQueue(method, this.options, this.queueType)

        if (this.$route.name !== 'program') this.$router.push('/program')
        this.$message(
          `Communication with connect cash vacuum is unavailable!!!`
        )
        return
      }
      /* dev vacuum */

      if (+response.result === 0 && +this.getDryBalance > 0) {
        this.clearCashMoney()
        if (this.$route.name !== 'program') this.$router.push('/program')
        this.$message(
          `The payment was successful, the deposited amount:  ${+this
            .getDryBalance} ₽`
        )
      } else {
        this.$message(`Payment failed!`)
      }
    },
    // ----------------------------------
    setQueue(method, options, type) {
      // setQueue
      this.queueType = 'setQueue'

      const response = this.localStorage.getClient(method, options, type)
      // console.log('$$!! response', response)
    },
    // ----------------------------------

    createOrder() {
      const type = this.getPanelType

      const options = {
        date: this.getControllerDate,
        time: this.getControllerTime,
      }
      this.date = synchronize(options)

      const _date = dateFilter(this.date)

      let result, index, prefix, suffix
      suffix = getRndInteger(10000, 99999)

      switch (type) {
        case 'wash':
          if (this.getWetOrder === '') {
            prefix = 'W'
            index = this.getPanelNumber
            result = prefix + index + _date
          } else result = this.getWetOrder
          break
        case 'vacuum':
          if (this.getDryOrder === '') {
            prefix = 'V'
            index = this.getVacuumNumber
            result = prefix + index + _date
          } else result = this.getDryOrder
          break
        default:
          break
      }

      return result
    },
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
  },
}
</script>

<style scoped>
.pay-input {
  width: 66em;
  height: 14em;
  margin-left: -9em;
  margin-top: -17em;

  border: solid 2px white;
  border-radius: 1em;
  box-shadow: 0px 10px 20px #eee;
}
.pay-end-bonus {
  background-color: black;
  margin-left: -10rem;
  margin-top: -50rem;
  margin-bottom: 10rem;
}
.pay-end-no-bonus {
  background-color: black;
  margin-left: -10rem;
  margin-top: -20rem;
  margin-bottom: 10rem;
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
.button-content-style {
  font-size: 4em;
  padding-top: 1.1em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
