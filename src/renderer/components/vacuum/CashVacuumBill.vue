<template>
  <div class="page-title">
    <!-- <div
      id="button-main"
      style="background: white; margin-left: -8.0em; width: 945px;"
    >
    </div> -->

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

      <li v-if="this.IsDryBalance === false" @click="payUp('payEnd')">
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
      </li>
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

export default {
  name: 'cash-vacuum-bill',
  data: () => ({
    title: '',
    body: '',
    cash: 0,
    cash_enabler: false,
    isDown: {
      payEnd: false,
      payBonus: false
    },

    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {}
  }),
  mounted() {
    this.storage = new Storage(this.client, this.url)
    /* dev */
    // sleep(4000).then(() => {
    //   console.log('run after 4 sec')
    // })

    /* 
    const button = new Button({
      selector: '#button-main',
      width: 60,
      height: 5,

      color: 'rgb(255, 255, 255)',
      borderTopRightRadius: 2,
      borderTopLeftRadius: 2,
      borderBottomRightRadius: 2,
      borderBottomLeftRadius: 2,

      border: 'solid 0.4em #00B9E3',

      boxShadow: '0px 13px 20px #00B9E3'
    })
    button.hide()
    button.show()
    button.opacity(0.5)
    */
    /*     */

    //console.log('getDryBalance-->', this.getDryBalance)
  },
  computed: {
    ...mapGetters({
      getDryBalance: 'getDryBalance',
      getIsPing: 'getIsPing'
    }),
    IsDryBalance: {
      get: function() {
        let flag
        this.getDryBalance > 0 ? (flag = true) : (flag = false)
        // console.log('flag-->', flag)
        console.log('--getDryBalance-->', this.getDryBalance)
        if (!flag) this.$message('Внесите минимальную сумму (10 руб.)')
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
      /* dev */
      this.doReceipt()

      if (program === 'payEnd') {
        this.payCashMoney()
        this.setCashEnabler(true)
        this.setIsAppendBonusMoney(false)
        this.setIsPayBonusMoney(true)
        this.$router.push('/program')
      } else if (program === 'payBonus') {
        this.setIsAppendBonusMoney(true)
        this.setIsPayBonusMoney(false)
        this.$router.push('/bonus')
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
      const storage = new Storage(this.client, this.url)

      /* dev */
      //this.readReceipt()
      //this.createReceipt()
      //this.printReceipt()
    },

    async payCashMoney() {
      const method = methods[0]
      const type = types[0]

      //console.log('payCashMoney')

      const storage = new Storage(this.client, this.url)
      /* dev */
      //this.options = this.getStoreMoneyOptions()
      this.options = this.getDryStoreMoneyOptions()
      //console.log('this.options-->', this.options)

      const response = await this.storage.getClient(method, this.options, type)

      /* dev */
      //console.log('storeMoney-->', typeof response)
      if (response === undefined) {
        this.$router.push('/program')
        this.$message(`Связь с connect недоступна!!!`)
        return
      }
      /* dev vacuum */

      if (+response.result === 0 && +this.getDryBalance > 0) {
        this.$router.push('/program')
        this.$message(
          `Оплата наличными прошла успешно, внесенная сумма:  ${+this
            .getDryBalance} ₽`
        )
      } else {
        this.$error('payCashMoney $error')
        //this.$message(`Оплата наличными не прошла`)
      }
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
