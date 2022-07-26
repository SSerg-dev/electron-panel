<template>
  <div class="page-title">
    <ul style="margin-top: 18em;">
      <li
        v-if="this.IsDryBalance === true && this.getIsPing"
        @click="payUp('payBonus')"
      >
        <div
          class="card white waves-effect pay-end-bonus"
          style="
                  
                  width: 945px;
                  height: 320px;
                  margin-left: -8.0em;
                  margin-bottom: 16em;

                  border: solid 6px #7FE409; 
                  border-radius: 4em;
                  box-shadow: 0px 10px 20px #7FE409;
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
            {{ 'ВЕРНУТЬ БОНУСАМИ ДО 30% И ЗАВЕРШИТЬ ОПЛАТУ' }}
          </div>
        </div>
      </li>

      <!--  & getIsPing -->

      <!-- <li v-if="this.IsDryBalance === false" @click="payUp('payEnd')">
        <div
          class="card white waves-effect pay-end-bonus"
          style="
                  
                  width: 945px;
                  height: 220px;
                  margin-left: -8.0em;
                  margin-top: -17em;

                  border: solid 6px #00B9E3; 
                  border-radius: 4em;
                  box-shadow: 0px 10px 20px #00b9e3;
                  "
        >
          <div
            class="card-content black-text button-content-style  noselect"
            style="
                  font-size: 4em;
                  padding-right: 0em;
                  padding-top: 1em;
                  "
          >
            {{ 'ВНЕСИТЕ ОПЛАТУ' }}
          </div>
        </div>
      </li> -->

      <!-- dev -->
      <li v-if="this.IsDryBalance === false" @click="payUp('')">
        <div class="card grey pay-input" style="">
          <div
            class="card-content white-text button-content-style  noselect"
            style="
                  font-size: 4em;
                  padding-right: 0em;
                  padding-top: 1em;
                  "
          >
            {{ 'ВНЕСИТЕ ОПЛАТУ' }}
          </div>
        </div>
      </li>
      <!--     -->

      <li v-if="this.IsDryBalance === true" @click="payUp('payEnd')">
        <div
          class="card white waves-effect pay-end-bonus"
          style="
                  
                  width: 945px;
                  height: 220px;
                  margin-left: -8.0em;
                  margin-top: -17em;

                  border: solid 6px red; 
                  border-radius: 4em;
                  box-shadow: 0px 13px 20px red;
                  "
        >
          <div
            class="card-content black-text button-content-style noselect"
            style="
                  font-size: 4em;
                  padding-right: 0.5em;
                  padding-top: 1em;
                  "
          >
            {{ 'ЗАВЕРШИТЬ ОПЛАТУ' }}
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

export default {
  name: 'cash-vacuum-bill',
  data: () => ({
    title: '',
    body: '',
    // cash: 0,
    cash_enabler: false,
    isDown: {
      payEnd: false,
      payBonus: false
    },

    sum: 0,
    cash: true,
    order: '',
    coins: {},
    bills: {},
    delay: 2000,

    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {}
  }),
  mounted() {
    this.order = this.createOrder()

    this.storage = new Storage(this.client, this.url)
  },
  computed: {
    ...mapGetters({
      getDryBalance: 'getDryBalance',
      getIsPing: 'getIsPing',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getVacuumNumber: 'getVacuumNumber',
      getPanelType: 'getPanelType',
      getWetOrder: 'getWetOrder',
      getDryOrder: 'getDryOrder',
      getWetBalance: 'getWetBalance'
    }),
    IsDryBalance: {
      get: function() {
        let flag
        this.getDryBalance > 0 ? (flag = true) : (flag = false)
        return flag
      }
    }
  },
  methods: {
    ...mapGetters({
      getCashEnabler: 'getCashEnabler',
      getStoreMoneyOptions: 'getStoreMoneyOptions',
      getDryStoreMoneyOptions: 'getDryStoreMoneyOptions',
      getAppendBonus: 'getAppendBonus',
      /* dev */
      getCreateReceiptOptions: 'getCreateReceiptOptions',
      getReadReceiptOptions: 'getReadReceiptOptions',
      getPrintReceiptOptions: 'getPrintReceiptOptions'
    }),
    ...mapMutations({
      //createCash: 'cash/createCash',
      setCashEnabler: 'setCashEnabler',
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsAppendBonusMoney: 'setIsAppendBonusMoney'
    }),
    ...mapActions({
      updateWetMoney: 'updateWetMoney'
    }),

    payUp(program) {
      this.setDown(program)
      this.doReceipt()

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
    // 01 readReceipt
    async readReceipt() {
      const method = methods[6]
      const type = types[4]

      this.options = this.getReadReceiptOptions()
      const response = (
        await this.storage.getClient(method, this.options, type)
      )(+response.result === 0)
        ? this.$message(`Выполняется панелью при формировании чека`)
        : this.$message(`НЕ выполняется панелью при формировании чека`)
    },

    // 02 createReceipt
    async createReceipt() {
      const method = methods[5]
      const type = types[4]

      this.options = this.getCreateReceiptOptions()
      const response = (
        await this.storage.getClient(method, this.options, type)
      )(+response.result === 0)
        ? this.$message(`Выполняется при запросе чека панелью`)
        : this.$message(`НЕ выполняется при запросе чека панелью`)
    },

    // 03 printReceipt
    async printReceipt() {
      const method = methods[7]
      const type = types[4]

      this.options = this.getPrintReceiptOptions()
      const response = (
        await this.storage.getClient(method, this.options, type)
      )(+response.result === 0)
        ? this.$message(`Выполняется панелью  на запрос печати чека`)
        : this.$message(`НЕ выполняется панелью  на запрос печати чека`)
    },

    doReceipt() {
      console.log('!!! Dry doReceipt()')
      // const storage = new Storage(this.client, this.url)

      /* dev */
      //this.readReceipt()
      //this.createReceipt()
      //this.printReceipt()
    },
    getCashMoney() {
      let isClear = false
      const options = 'ipcRenderer.send coin from CashBill'
      ipcRenderer.send('async-cash-start', options)

      ipcRenderer.on('async-cash-reply', (event, coins, bills) => {
        this.coins = coins
        this.bills = bills

        if (coins || bills) {
          isClear = true
          event.sender.send('async-cash-clear', isClear)
        }
      })
    },

    async payCashMoney() {
      const method = methods[0]
      const type = types[0]

      this.options = this.getDryStoreMoneyOptions()
      this.sum = this.getDryBalance

      this.options.params.unit_id = this.getVacuumNumber - 1
      this.options.params.type = 'cash'
      this.options.params.sum = +this.sum

      // for statistic coins
      this.options.params.detail.sum_coins = this.coins.amountCoin
      this.options.params.detail.coins_count = this.coins.counterCoin
      this.options.params.detail.coins_1 = 0
      this.options.params.detail.coins_2 = 0
      this.options.params.detail.coins_5 = this.coins.counterC5
      this.options.params.detail.coins_10 = this.coins.counterC10
      this.options.params.detail.coins_25 = this.coins.counterC25

      // for statistic bills
      this.options.params.detail.sum_bills = this.bills.amountBill
      this.options.params.detail.bills_count = this.bills.counterBill
      this.options.params.detail.bills_10 = this.bills.counterB10
      this.options.params.detail.bills_50 = this.bills.counterB50
      this.options.params.detail.bills_100 = this.bills.counterB100
      this.options.params.detail.bills_200 = this.bills.counterB200
      this.options.params.detail.bills_500 = this.bills.counterB500

      if (!this.order) this.order = this.createOrder() 
      this.options.params.order = this.order 
      this.options.params.detail.order = this.order

      console.log(
        '$$ CashVacuumBill ++payCashMoney-->options-->this.options-->',
        JSON.stringify(this.options)
      )

      const response = await this.storage.getClient(method, this.options, type)

      if (response === undefined) {
        if (this.$route.name !== 'program') this.$router.push('/program')
        this.$message(`Связь с connect недоступна!!!`)
        return
      }
      /* dev vacuum */

      if (+response.result === 0 && +this.getDryBalance > 0) {
        if (this.$route.name !== 'program') this.$router.push('/program')
        this.$message(
          `Оплата наличными прошла успешно, внесенная сумма:  ${+this
            .getDryBalance} ₽`
        )
      } else {
        this.$message(`Оплата наличными не прошла`)
      }
    },
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
    async appendBonusMoney() {
      console.log('!!!CashBill-->appendBonusMoney-->', methods[10])
      const method = methods[10]
      const type = types[4]

      this.options = this.getAppendBonus()

      const response = await this.storage.getClient(method, this.options, type)
      if (+response.result === 0) {
        this.$message(`Бонусы зачислены успешно`)
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
      //console.log('setDown-program-->', program)
      this.clearDown()
      switch (program) {
        case 'payEnd':
          this.isDown.payEnd = true
          //console.log('this.isDown.payEnd-->', this.isDown.payEnd)
          break
        case 'payBonus':
          this.isDown.payBonus = true
          //console.log('this.isDown.payEnd-->', this.isDown.payEnd)
          break
        default:
          break
      }
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
      //console.log('this.isDown.payEnd-clearDown-->', this.isDown.payEnd)
    }
  }

  /* components: {

  } */
}
</script>

<style scoped>
/* .btn {
  background-color: black;
  margin-left: -10rem;
  margin-top: -20rem;
  margin-bottom: 10rem;
} */
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
