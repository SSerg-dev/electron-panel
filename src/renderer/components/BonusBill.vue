<template>
  <div>
    <div>
      <section>
        <div class="info-title">
          <h3
            v-if="
              this.getIsPayBonusMoney() &&
              !this.getIsAppendBonusMoney() &&
              !getIsMoneyToBonus
            "
          >
            <p align="center">
              {{ `${this.messages[0]}` | localize}}
            </p>
          </h3>
          <h3
            v-else-if="
              !this.getIsPayBonusMoney() &&
              this.getIsAppendBonusMoney() &&
              !getIsMoneyToBonus
            "
          >
            <p align="center">
              {{ `${this.messages[1]}` | localize }}
            </p>
          </h3>
          <h3 v-else-if="getMoneyToBonus && getIsMoneyToBonus">
            <p align="center">
              {{ `${this.messages[2]}` | localize }}
            </p>
          </h3>
        </div>

        <form @submit.prevent="" novalidate>
          <div class="imgs">
            <div class="display" style="padding-left: 4em">
              <input
                type="tel"
                class="phone"
                v-model="phone"
                autocomplete="tel"
                required
                style="
                  font-size: 7.2rem;
                  height: 8rem;
                  border-bottom: 4px solid #fff;
                  padding-left: 0em;
                "
              />
            </div>

            <div class="row" style="padding-top: 10em">
              <div class="col s6 num">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <div
                          @click="setNumber('1')"
                          class="card white waves-effect"
                          style="
                            width: 125px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              font-size: 5.2rem;
                              padding-left: 2.5rem;
                              padding-top: 0em;
                            "
                          >
                            1
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          @click="setNumber('2')"
                          class="card white waves-effect"
                          style="
                            width: 125px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              font-size: 5.2rem;
                              padding-left: 2.5rem;
                              padding-top: 0em;
                            "
                          >
                            2
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          @click="setNumber('3')"
                          class="card white waves-effect"
                          style="
                            width: 125px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              font-size: 5.2rem;
                              padding-left: 2.5rem;
                              padding-top: 0em;
                            "
                          >
                            3
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div
                          @click="setNumber('4')"
                          class="card white waves-effect"
                          style="
                            width: 125px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              font-size: 5.2rem;
                              padding-left: 2.5rem;
                              padding-top: 0em;
                            "
                          >
                            4
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          @click="setNumber('5')"
                          class="card white waves-effect"
                          style="
                            width: 125px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              font-size: 5.2rem;
                              padding-left: 2.5rem;
                              padding-top: 0em;
                            "
                          >
                            5
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          @click="setNumber('6')"
                          class="card white waves-effect"
                          style="
                            width: 125px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              font-size: 5.2rem;
                              padding-left: 2.5rem;
                              padding-top: 0em;
                            "
                          >
                            6
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div
                          @click="setNumber('7')"
                          class="card white waves-effect"
                          style="
                            width: 125px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              font-size: 5.2rem;
                              padding-left: 2.5rem;
                              padding-top: 0em;
                            "
                          >
                            7
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          @click="setNumber('8')"
                          class="card white waves-effect"
                          style="
                            width: 125px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              font-size: 5.2rem;
                              padding-left: 2.5rem;
                              padding-top: 0em;
                            "
                          >
                            8
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          @click="setNumber('9')"
                          class="card white waves-effect"
                          style="
                            width: 125px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              font-size: 5.2rem;
                              padding-left: 2.5rem;
                              padding-top: 0em;
                            "
                          >
                            9
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div
                          @click="setNumber('0')"
                          class="card white waves-effect"
                          style="
                            width: 125px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              font-size: 5.2rem;
                              padding-left: 2.5rem;
                              padding-top: 0em;
                            "
                          >
                            0
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          @click="backspace"
                          class="card white waves-effect"
                          style="
                            width: 125px;
                            height: 120px;
                            border: solid 6px red;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px red;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              font-size: 4.2rem;
                              padding-left: 1.8rem;
                              padding-top: 1rem;
                            "
                          >
                            <!-- del -->
                            <i class="medium material-icons">backspace</i>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <!-- ЗАЧИСЛИТЬ -->
                    <tr v-if="this.getIsAppendBonusMoney()">
                      <td colspan="3">
                        <div
                          @click="payUp('append')"
                          class="card white waves-effect"
                          style="
                            margin-top: 4em;
                            width: 420px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                          <div
                            class="card-content black-text"
                            style="
                              display: flex;
                              justify-content: center;

                              font-size: 3.5em;
                              padding-top: 0.3em;
                              
                            "
                          >
                            {{ `APPEND` | localize}}
                            <!-- {{`Bonus`}} -->
                          </div>

                        </div>
                      </td>
                    </tr>

                    <!-- ПОДТВЕРДИТЬ -->
                    <tr v-else>
                      <td colspan="3">
                        <div
                          @click="payUp('confirm')"
                          class="card white waves-effect"
                          style="
                            margin-top: 4em;
                            width: 420px;
                            height: 120px;
                            border: solid 6px #00b9e3;
                            border-radius: 2.5em;
                            box-shadow: 0px 6px 10px #00b9e3;
                          "
                        >
                        <!-- 
                          display: flex;
                          align-items: center;
                          justify-content: center;
                         -->
                          <div
                            class="card-content black-text"
                            style="
                              display: flex;
                              justify-content: center;

                              font-size: 3.5em;
                              padding-top: 0.3em;
                            "
                          >
                            {{ `CONFIRM` | localize }}
                          </div>
                        </div>
                      </td>
                    </tr>

                    <!--     -->
                  </tbody>
                </table>
              </div>
              <div>
                <BonusBillQr />
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import BonusBillQr from '@/components/BonusBillQr'

import { Database } from '@/storage/database.js'
import { Fetch, FetchClient, methods, types } from '@/storage/fetch.js'
import { Storage } from '@/storage/index.js'
import EventBus from '@/bus/EventBus'
import { result } from 'lodash'
import program from '../store/program'

const { ipcRenderer } = require('electron')

import {
  dateFilter,
  getRndInteger,
  /* createOrder, */ log,
} from '@/utils/order.js'

export default {
  name: 'bonus-bill',
  data: () => ({

    phone: '',
    phoneNotParse: '',
    phoneLength: 10,
    phoneParseLength: 18,
    totString: '',
    code: '+7 ',

    sum: 0,
    cash: true,
    order: '',
    id: 0,
    actives: [],

    coins: {},
    bills: {},

    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {},

    password: '',
    clickCount: 0,

    messages: [
      /* `Для входа в систему введите номер телефона
       или отсканируйте QR код` */
       `To_enter_the_system`,

      /* `Для зачисления бонусов,
       введите номер телефона` */
       `To_credit_Bonuses_to_your_account`,

      /* `Нажимая "Зачислить", Вы даете свое согласие на отправку
      Вам СМС-сообщения и обработку персональных данных,
      согласно условиям, размещенным на сайте: www.alles-bonus.com` */
      `By_clicking_on_CONFIRM`

    ],
    messageIndex: -1,
    delay: 1000,
    timeoutDelay: null,
  }),
  created() {},
  mounted() {
    /* dev */
    this.getCashMoney()

    this.order = this.createOrder()
    this.setCompleteWashOrder(this.order)

    this.actives = this.getPrograms()

    this.storage = new Storage(this.client, this.url)
    this.setIsLoginSettingPassword(false)
    this.setRouter('/bonus')

    if (this.getIsMoneyToBonus) {
      this.setIsAppendBonusMoney(true)
      this.setIsPayBonusMoney(false)
    }
    // submitBonusQrMoney
    EventBus.$on('submitBonusQrMoney', this.submitBonusQrHandler)

    /* dev */
    // this.calcBills()
  }, // end mounted
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
  },
  components: {
    BonusBillQr,
  },
  computed: {
    ...mapGetters({
      getWetBalance: 'getWetBalance',
      getDryBalance: 'getDryBalance',
      getIsMoneyToBonus: 'getIsMoneyToBonus',
      getMoneyToBonus: 'getMoneyToBonus',
      getWetZeroMoney: 'getWetZeroMoney',

      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getVacuumNumber: 'getVacuumNumber',
      getPanelType: 'getPanelType',
      getWetOrder: 'getWetOrder',
      getDryOrder: 'getDryOrder',

      getWetBusyPanel: 'getWetBusyPanel',
      getActiveProgram: 'getActiveProgram',
      getActiveProgramNumber: 'getActiveProgramNumber',

      getProfile: 'getProfile',
      getServiceBalance: 'getServiceBalance',
      getPayType:'getPayType'

    }),
    IsWetBalance: {
      get: function () {
        let flag
        this.getWetBalance > 0 ? (flag = true) : (flag = false)
        return flag
      },
    },
    IsDryBalance: {
      get: function () {
        let flag
        this.getDryBalance > 0 ? (flag = true) : (flag = false)
        return flag
      },
    },
  },
  /* watch: {
    getProfile(flag) {
      console.log('getProfile(flag)', flag)
    }
  }, */
  methods: {
    ...mapGetters({
      getLoginBonusOptions: 'getLoginBonusOptions',
      getAppendBonus: 'getAppendBonus',
      getStoreMoneyOptions: 'getStoreMoneyOptions',

      getChargeBonus: 'getChargeBonus',
      getCompleteWash: 'getCompleteWash',
      getPrograms: 'getPrograms',

      getIsPayBonusMoney: 'getIsPayBonusMoney',
      getIsAppendBonusMoney: 'getIsAppendBonusMoney',
      // getLoginBonusPhone: 'getLoginBonusPhone',
      getCompleteWash: 'getCompleteWash',

      getChargeBonus: 'getChargeBonus',
    }),
    ...mapMutations({
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsAppendBonusMoney: 'setIsAppendBonusMoney',
      setLoginBonusPhone: 'setLoginBonusPhone',
      setLoginBonusPassword: 'setLoginBonusPassword',
      setAppendBonus: 'setAppendBonus',
      setChargeBonus: 'setChargeBonus',
      setCompleteWash: 'setCompleteWash',

      setIsLoginSettingPassword: 'setIsLoginSettingPassword',
      setRouter: 'setRouter',
      setIsMoneyToBonus: 'setIsMoneyToBonus',
      setMoneyToBonus: 'setMoneyToBonus',
      setWetZeroMoney: 'setWetZeroMoney',

      setCompleteWashOrder: 'setCompleteWashOrder',
    }),
    ...mapActions({
      updateWetZeroMoney: 'updateWetZeroMoney',
    }),

    emitClick(program) {
      EventBus.$emit('submitBonusBill', program)
    },

    /* dev */
    /* createOrder( 
      type = this.getPanelType, 
      wetOrder = this.getWetOrder, 
      dryOrder = this.getDryOrder, 
      panelNumber = this.getDefaultPanelNumber, 
      vacuumNumber = this.getVacuumNumber)
     */

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
            // result = prefix + index + date + '_' + suffix.toString()
          } else result = this.getWetOrder
          break
        case 'vacuum':
          if (this.getDryOrder === '') {
            prefix = 'V'
            index = this.getVacuumNumber
            result = prefix + index + date
            // result = prefix + index + date + '_' + suffix.toString()
          } else result = this.getDryOrder
          break
        default:
          break
      }

      return result
    },
    getIsPhoneNumber() {
      if (this.phone.length === this.phoneParseLength) {
        return true
      } else {
        this.$message(`Введите правильно номер мобильного телефона`)
        return false
      }
    },
    submitBonusQrHandler(isCashAuthorization) {
      if (isCashAuthorization) {
        /* dev */
        this.appendBonusQrMoney()
        this.payStoreMoney()
      }
    },
    payUp(program) {
      // ЗАЧИСЛИТЬ
      // check phone number
      if (!this.getIsPhoneNumber()) return
      if (
        this.getIsAppendBonusMoney() &&
        program === 'append' &&
        !this.getIsMoneyToBonus
      ) {
        this.appendBonusMoney()
        this.payStoreMoney()
      }
      // --------------------------------
      if (
        this.getIsPayBonusMoney() &&
        program === 'confirm' &&
        !this.getIsMoneyToBonus
      ) {
        /* dev */
        this.payBonusMoney()
        // this.getCashMoney()
      }
      // --------------------------------
      this.emitClick(program)
    },

    // ЗАЧИСЛИТЬ ЧЕРЕЗ Qr code
    // --------------------------------
    async appendBonusQrMoney() {
      // console.log('++appendBonusMoney')

      const method = methods[10]
      const type = types[4]

      this.options = this.getAppendBonus()

      const panelType = this.getPanelType
      switch (panelType) {
        case 'wash':
          this.getMoneyToBonus === 0
            ? (this.sum = this.getWetBalance)
            : (this.sum = this.getMoneyToBonus)
          break
        case 'vacuum':
          this.getMoneyToBonus === 0
            ? (this.sum = this.getDryBalance)
            : (this.sum = this.getMoneyToBonus)
          break
        default:
          break
      }

      const res = this.getProfile
      const prefix = '+'

      this.options.params.phone = prefix + res.phone
      this.options.params.sum = +this.sum
      this.options.params.cash = this.cash
      this.options.params.order = this.order

      this.setAppendBonus(this.options.params)
      this.options = this.getAppendBonus()

      console.log(
        '++appendBonusMoney-->options-->this.options-->',
        JSON.stringify(this.options)
      )

      if (!this.getServiceBalance) {
        const response = await this.storage.getClient(
          method,
          this.options,
          type
        )

        if (+response.result === 0) {
          // this.$message(
          //   `Вам начислено appendBonusQrMoney ${this.options.params.sum} бонуса(ов) `
          // )
          this.setIsAppendBonusMoney(false)
          if (this.$route.name !== 'program') this.$router.push('/program')
        } else {
          // this.$message(`appendBonusQrMoney Ошибка:  ${response.error}`)
        }
      } else {
        this.$message(`Бонусы не зачислены, на мойке сервисные деньги`)
      }
    },

    // ЗАЧИСЛИТЬ ЧЕРЕЗ номер телефона
    // --------------------------------
    async appendBonusMoney() {
      // console.log('++appendBonusMoney')

      const method = methods[10]
      const type = types[4]

      this.options = this.getAppendBonus()

      const panelType = this.getPanelType
      switch (panelType) {
        case 'wash':
          this.getMoneyToBonus === 0
            ? (this.sum = this.getWetBalance)
            : (this.sum = this.getMoneyToBonus)
          break
        case 'vacuum':
          this.getMoneyToBonus === 0
            ? (this.sum = this.getDryBalance)
            : (this.sum = this.getMoneyToBonus)
          break
        default:
          break
      }

      this.options.params.phone = (this.code + this.totString).replace(
        /\s+/g,
        ''
      )
      this.options.params.sum = +this.sum
      this.options.params.cash = this.cash
      this.options.params.order = this.order

      this.setAppendBonus(this.options.params)
      this.options = this.getAppendBonus()
      console.log(
        '++appendBonusMoney-->options-->this.options-->',
        JSON.stringify(this.options)
      )

      if (this.phone.length === this.phoneParseLength) {
        const response = await this.storage.getClient(
          method,
          this.options,
          type
        )
        if (+response.result === 0) {
          // this.$message(
          //   `Вам начислено appendBonusMoney ${this.options.params.sum} бонуса(ов) `
          // )
          this.setIsAppendBonusMoney(false)
          if (this.$route.name !== 'program') this.$router.push('/program')
        } else {
          this.$message(`Ошибка:  ${response.error}`)
        }
      } else {
        this.$message(`Введите правильно номер мобильного телефона`)
      }
    },
    /* dev */
    getCashMoney() {
      let isClear = false
      const options = {}
      ipcRenderer.send('async-cash-start', options)

      ipcRenderer.on('async-cash-reply', (event, coins, bills) => {
        this.coins = coins
        this.bills = bills

        // if (coins || bills) {
        //   isClear = true
        //   event.sender.send('async-cash-clear', isClear)
        // }
      })
    },

    async payStoreMoney() {
      // console.log('++payStoreMoney')

      const method = methods[0]
      const type = types[0]

      this.options = this.getStoreMoneyOptions()

      const panelType = this.getPanelType
      switch (type) {
        case 'wash':
          this.id = this.getDefaultPanelNumber - 1
          this.getMoneyToBonus === 0
            ? (this.sum = this.getWetBalance)
            : (this.sum = this.getMoneyToBonus)
          break
        case 'vacuum':
          this.id = this.getVacuumNumber - 1
          this.getMoneyToBonus === 0
            ? (this.sum = this.getDryBalance)
            : (this.sum = this.getMoneyToBonus)
          break
        default:
          break
      }
      /* dev */
      this.options.params.unit_id = this.id //this.getDefaultPanelNumber - 1
      console.log('$$ BonusBill this.getPayType', this.getPayType)
      this.options.params.type = this.getPayType || 'cash'
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

      if (!this.order) this.order = this.createOrder() // 'W220220504143549'
      this.options.params.order = this.order // for compatibility
      this.options.params.detail.order = this.order

      console.log(
        '++payStoreMoney-->options-->this.options-->',
        JSON.stringify(this.options)
      )
      const response = await this.storage.getClient(method, this.options, type)

      if (response === undefined) {
        if (this.$route.name !== 'program') this.$router.push('/program')
        this.$message(`Связь с connect недоступна!!!`)
        return
      }

      switch (panelType) {
        case 'wash':
          if (+response.result === 0 && +this.getWetBalance > 0) {
            if (this.$route.name !== 'program') this.$router.push('/program')
            // this.$message(
            //   `На бонусную систему wash connect payStoreMoney зачислено ${+this
            //     .getWetBalance} `
            // )
          }
          break
        case 'vacuum':
          if (+response.result === 0 && +this.getDryBalance > 0) {
            if (this.$route.name !== 'program') this.$router.push('/program')
            // this.$message(
            //   `На бонусную систему vacuum connect payStoreMoney зачислено ${+this
            //     .getDryBalance} `
            // )
          }
          break
        default:
          break
      }
    },

    // ----------------------------------

    // ЗАЧИСЛИТЬ БОНУСЫ ПОСЛЕ НАЖАТИЯ СТОП И СОХРАНИТЬ ПРОГРАММЫ
    // --------------------------------
    async saveBonusMoney() {
      // console.log('++saveBonusMoney')

      const method = methods[10]
      const type = types[4]

      this.options = this.getAppendBonus()
      this.sum = +this.getMoneyToBonus

      this.options.params.phone = this.phone
      this.options.params.sum = this.sum
      this.options.params.cash = this.cash
      this.options.params.order = this.order

      this.setAppendBonus(this.options.params)
      this.options = this.getAppendBonus()

      let response
      if (this.phone.length === this.phoneParseLength) {
        response = await this.storage.getClient(method, this.options, type)
        if (+response.result === 0) {
          this.updateWetZeroMoney(true)
          // this.setIsMoneyToBonus(false)

          // this.$message(`Ваш остаток ${this.getMoneyToBonus} сохранен бонусами`)
          this.setIsAppendBonusMoney(false)

          this.timeoutDelay = setTimeout(() => {
            try {
              this.$router.push('/popup')
            } catch (err) {}
          }, (this.delay = 0))
        } else {
          // this.$message(`Ошибка:  ${response.error}`)
        }
      } else {
        this.$message(`Введите правильно номер мобильного телефона`)
      }
    },

    // ПОДТВЕРДИТЬ
    // --------------------------------
    payBonusMoney() {
      if (this.phone.length === this.phoneParseLength) {
        this.phoneNotParse = this.phone.replace(/[^+0-9]/g, '')
        this.setLoginBonusPhone(this.phoneNotParse)

        this.options = this.getChargeBonus()
        this.options.params.phone = this.phoneNotParse
        this.setChargeBonus(this.options.params)

        this.$router.push('/password')
      } else {
        this.$message(`Введите правильно номер мобильного телефона`)
      }
    },
    // --------------------------------

    setNumber(num) {
      if (this.totString.length < this.phoneLength + 1)
        this.totString = this.totString + num.toString()
      const x = this.totString
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
      const parse = !x[2]
        ? x[1]
        : '(' +
          x[1] +
          ') ' +
          x[2] +
          (x[3] ? '-' + x[3] : '') +
          (x[4] ? '-' + x[4] : '')
      this.phone = this.code + parse
      //this.phoneNotParse = this.code + x
    },

    backspace() {
      this.totString = this.totString.substring(0, this.totString.length - 1)
      if (this.totString.length === 0) this.phone = this.code
      this.phone = this.code + this.totString
    },
  },
}
</script>

<style scoped>
.info-title {
  width: 800px;
  padding-top: 0.5em;
  margin-top: 0em;
  margin-left: 4em;
  font-size: 2.5em;
}
.imgs {
  position: absolute;
  padding-top: 1em;
}
.display {
  position: absolute;
  width: 66em;
  z-index: 1;
}
.phone {
  width: 16em; /* 253px; */
  height: 8em; /* 125px; */
  color: #ffffff;
  text-align: left;
  font-family: 'Plumb-Medium';
  text-transform: uppercase;
}
.pay-up-title {
  position: absolute;
  margin-top: 0em;
  margin-left: 0em;
  z-index: 1;
}
.num {
  padding-left: 8em;
}
table,
th,
td {
  border: none;
  height: 150px;
  width: 150px;
  padding-right: 1.5em;
}

.btn {
  background-color: #121212;
}
.pay-up {
  margin-top: 4rem;
  margin-left: 11rem;
}
.button-title-long {
  position: relative;
  top: -8rem;
  left: 5rem;
  color: black;
  font-size: 3rem;
  /* font-weight: bold; */
  font-weight: bold;
  text-align: left;
  z-index: 1;

  font-family: 'Plumb-Medium';
  text-transform: uppercase;
}
/*  */
</style>
