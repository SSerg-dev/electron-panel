<template>
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
            {{ `${this.messages[0]}` }}
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
            {{ `${this.messages[1]}` }}
          </p>
        </h3>
        <h3 v-else-if="getMoneyToBonus && getIsMoneyToBonus">
          <p align="center">
            {{ `${this.messages[2]}` }}
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
              style="font-size: 7.2rem; height: 8rem; border-bottom: 4px solid #fff; padding-left: 0em"
            />
          </div>

          <div class="row" style="padding-top: 10em;">
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
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                        border: solid 6px #00B9E3; 
                        border-radius: 2.5em;
                        box-shadow: 0px 6px 10px #00b9e3;
                        "
                      >
                        <div
                          class="card-content black-text"
                          style="
                        font-size: 3.5em;
                        padding-left: 4rem;
                        padding-top: 0.3em;
                        "
                        >
                          {{ `ЗАЧИСЛИТЬ` }}
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
                  border: solid 6px #00B9E3; 
                  border-radius: 2.5em;
                  box-shadow: 0px 6px 10px #00b9e3;
                  
                  "
                      >
                        <div
                          class="card-content black-text"
                          style="
                  font-size: 3.5em;
                  padding-left: 1.8rem;
                  padding-top: 0.3em;
                  "
                        >
                          {{ `ПОДТВЕРДИТЬ` }}
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
    actives: [],

    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {},

    password: '',
    clickCount: 0,

    messages: [
      `Для входа в систему введите номер телефона
       или отсканируйте QR код`,
      `Для зачисления бонусов,
       введите номер телефона`,
      `Нажимая "Зачислить", Вы даете свое согласие на отправку
      Вам СМС-сообщения и обработку персональных данных,
      согласно условиям, размещенным на сайте: www.alles-bonus.com`
    ],
    messageIndex: -1,
    delay: 1000,
    timeoutDelay: null
  }),
  created() {},
  mounted() {
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
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
  },
  components: {
    BonusBillQr
  },
  computed: {
    ...mapGetters({
      getWetBalance: 'getWetBalance',
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
      getActiveProgramNumber: 'getActiveProgramNumber'
    }),
    IsWetBalance: {
      get: function() {
        let flag
        this.getWetBalance > 0 ? (flag = true) : (flag = false)
        return flag
      }
    }
  },
  watch: {},
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
      getLoginBonusPhone: 'getLoginBonusPhone',
      getCompleteWash: 'getCompleteWash',

      getChargeBonus: 'getChargeBonus'
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

      setCompleteWashOrder: 'setCompleteWashOrder'
    }),
    ...mapActions({
      // updateWetBonusMoney: 'updateWetBonusMoney',
      updateWetZeroMoney: 'updateWetZeroMoney'
    }),

    emitClick(program) {
      EventBus.$emit('submitBonusBill', program)
    },

    dateFilter(value, format = 'datetime') {
      const options = {}

      options.day = '2-digit'
      options.month = '2-digit'
      options.year = 'numeric'

      options.hour = '2-digit'
      options.minute = '2-digit'
      options.second = '2-digit'

      let year, month, day
      let hour, minute, second

      let result = new Intl.DateTimeFormat('ru-RU', options).format(
        new Date(value)
      )

      year = result.slice(6, 10)
      month = result.slice(3, 5)
      day = result.slice(0, 2)

      hour = result.slice(12, 14)
      minute = result.slice(15, 17)
      second = result.slice(18, 20)

      if (format.includes('date')) result = year + month + day
      if (format.includes('time')) result = hour + minute + second
      if (format.includes('datetime'))
        result = year + month + day + hour + minute + second

      return result
    },
    createOrder() {
      const type = this.getPanelType
      const date = this.dateFilter(new Date())
      let result, index, prefix

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
    getIsPhoneNumber() {
      if (this.phone.length === this.phoneParseLength) {
        return true
      } else {
        this.$message(`Введите правильно номер мобильного телефона`)
        return false
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
        /* dev */
        this.appendBonusMoney()

        this.payStoreMoney()

        // this.chargeBonusMoney()

        // this.completeWash()
      }
      // --------------------------------
      if (this.getMoneyToBonus > 0 && program === 'append') {
        this.saveBonusMoney()
      }
      // --------------------------------
      if (
        this.getIsPayBonusMoney() &&
        program === 'confirm' &&
        !this.getIsMoneyToBonus
      ) {
        this.payBonusMoney()
      }
      // --------------------------------
      this.emitClick(program)
    },

    // ЗАЧИСЛИТЬ
    // --------------------------------
    async appendBonusMoney() {
      // console.log('++appendBonusMoney')

      const method = methods[10]
      const type = types[4]

      this.options = this.getAppendBonus()

      this.getMoneyToBonus === 0
        ? (this.sum = this.getWetBalance)
        : (this.sum = this.getMoneyToBonus)

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

      // let response
      if (this.phone.length === this.phoneParseLength) {
        const response = await this.storage.getClient(
          method,
          this.options,
          type
        )
        if (+response.result === 0) {
          this.$message(
            `Вам начислено appendBonusMoney ${this.options.params.sum} бонуса(ов) `
          )
          this.setIsAppendBonusMoney(false)
          if (this.$route.name !== 'program') this.$router.push('/program')
        } else {
          this.$message(`Ошибка:  ${response.error}`)
        }
      } else {
        this.$message(`Введите правильно номер мобильного телефона`)
      }
    },
    async payStoreMoney() {
      // console.log('++payStoreMoney')

      const method = methods[0]
      const type = types[0]

      this.options = this.getStoreMoneyOptions()

      this.getMoneyToBonus === 0
        ? (this.sum = this.getWetBalance)
        : (this.sum = this.getMoneyToBonus)

      this.options.params.unit_id = this.getDefaultPanelNumber - 1
      this.options.params.type = 'cash'
      this.options.params.sum = +this.sum

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
      /* dev vacuum */
      if (+response.result === 0 && +this.getWetBalance > 0) {
        if (this.$route.name !== 'program') this.$router.push('/program')
        this.$message(
          `На бонусную систему connect payStoreMoney зачислено ${+this
            .getWetBalance} `
        )
      } else {
        this.$error('payCashMoney $error')
        //this.$message(`Оплата наличными не прошла`)
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

          this.$message(`Ваш остаток ${this.getMoneyToBonus} сохранен бонусами`)
          this.setIsAppendBonusMoney(false)

          this.timeoutDelay = setTimeout(() => {
            try {
              this.$router.push('/popup')
            } catch (err) {}
          }, (this.delay = 0))
        } else {
          this.$message(`Ошибка:  ${response.error}`)
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
    }
  }
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
