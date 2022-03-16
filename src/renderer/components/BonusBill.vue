<template>
  <div>
    <section>
      <div class="info-title">
        <h3 v-if="getIsPayBonusMoney && !getIsMoneyToBonus">
          <p align="center">
            {{ `${this.messages[0]}` }}
          </p>
        </h3>
        <!-- <h3 v-if="getIsAppendBonusMoney">
          <p align="center">
            {{ `${this.messages[1]}` }}
          </p>
        </h3> -->
        <h3 v-if="getIsMoneyToBonus">
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

                  <!-- dev -->
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
                  <!--     -->
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
            <!-- <div class="col s2"></div> -->

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
    order: '13',

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
  mounted() {
    this.storage = new Storage(this.client, this.url)
    this.setIsLoginSettingPassword(false)
    this.setRouter('/bonus')

    // this.setWetZeroMoney(false)
    // console.log('--getWetZeroMoney:',this.getWetZeroMoney)
    // this.setWetZeroMoney(true)
    // console.log('++getWetZeroMoney:', this.getWetZeroMoney)
    // this.updateWetZeroMoney(true)
    // this.$message(`Ваш остаток ${this.getMoneyToBonus} сохранен бонусами`)

    if (this.getIsMoneyToBonus) {
      // this.getMoneyToBonus
      // this.setWetZeroMoney(true)
      this.setIsAppendBonusMoney(true)
      this.setIsPayBonusMoney(false)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
    this.setIsMoneyToBonus(false)
    this.setMoneyToBonus(0)

  },
  components: {
    BonusBillQr
    //Password
  },
  computed: {
    ...mapGetters({
      getWetBalance: 'getWetBalance',
      getIsMoneyToBonus: 'getIsMoneyToBonus',
      getMoneyToBonus: 'getMoneyToBonus',
      getWetZeroMoney: 'getWetZeroMoney'
    }),
    IsWetBalance: {
      get: function() {
        let flag
        this.getWetBalance > 0 ? (flag = true) : (flag = false)
        //console.log('flag-->', flag)
        // if (!flag) this.$message('Внесите минимальную сумму (10 руб.)')
        return flag
      }
    }
  },
  methods: {
    ...mapGetters({
      getLoginBonusOptions: 'getLoginBonusOptions',
      getAppendBonus: 'getAppendBonus',
      // dev
      getIsPayBonusMoney: 'getIsPayBonusMoney',
      getIsAppendBonusMoney: 'getIsAppendBonusMoney',
      getLoginBonusPhone: 'getLoginBonusPhone'
    }),
    ...mapMutations({
      //createBonus: 'bonuses/createBonus'
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsAppendBonusMoney: 'setIsAppendBonusMoney',
      setLoginBonusPhone: 'setLoginBonusPhone',
      setLoginBonusPassword: 'setLoginBonusPassword',
      setAppendBonus: 'setAppendBonus',
      setIsLoginSettingPassword: 'setIsLoginSettingPassword',
      setRouter: 'setRouter',
      setIsMoneyToBonus: 'setIsMoneyToBonus',
      setMoneyToBonus: 'setMoneyToBonus',
      setWetZeroMoney: 'setWetZeroMoney'
    }),
    ...mapActions({
      updateWetBonusMoney: 'updateWetBonusMoney',
      updateWetZeroMoney: 'updateWetZeroMoney'
    }),

    emitClick(program) {
      // console.log('emitClick!!!')
      EventBus.$emit('submitBonusBill', program)
    },

    payUp(program) {
      if (
        this.getIsAppendBonusMoney() &&
        program === 'append' &&
        !this.getIsMoneyToBonus
      ) {
        console.log('BonusBill-->appendBonusMoney')
        this.appendBonusMoney()
      }
      /* if (this.getIsMoneyToBonus && program === 'append') { */
      if (this.getIsMoneyToBonus && program === 'confirm') {
        console.log('BonusBill-->saveBonusMoney')
        this.saveBonusMoney()
      }
      if (this.getIsPayBonusMoney() && program === 'confirm' && !this.getIsMoneyToBonus) {
        console.log('BonusBill-->payBonusMoney')
        this.payBonusMoney()
      }

      this.emitClick(program)
    },

    // ЗАЧИСЛИТЬ
    async appendBonusMoney() {
      const method = methods[10]
      const type = types[4]

      this.options = this.getAppendBonus()
      this.sum = 42 //this.getMoneyToBonus

      this.options.params.phone = this.phone
      this.options.params.sum = this.sum
      this.options.params.cash = this.cash
      this.options.params.order = this.order

      this.setAppendBonus(this.options.params)
      this.options = this.getAppendBonus()
      console.log('options-->this.options-->', JSON.stringify(this.options))

      let response
      if (this.phone.length === this.phoneParseLength) {
        response = await this.storage.getClient(method, this.options, type)
        if (+response.result === 0) {
          /* dev */
          console.log(
            'BonusBill-row-517-->type-->options-->',
            type,
            this.options
          )
          /* ??? how match */
          this.$message(`Вам насчислены бонусы`)
          this.setIsAppendBonusMoney(false)
          this.$router.push('/program')
          //this.$router.push('/')
        } else {
          this.$message(`Ошибка:  ${response.error}`)
        }
        // ---
      } else {
        this.$message(`Введите правильно номер мобильного телефона`)
      }
    },
    // ЗАЧИСЛИТЬ НА БОНУСЫ ПОСЛЕ НАЖАТИЯ СТОП И СОХРАНИТЬ ПРОГРАММЫ
    async saveBonusMoney() {
      console.log('++saveBonusMoney')

      const method = methods[10]
      const type = types[4]
      // options = params: { "phone":"","sum":0,"cash":true,"order":"" }
      this.options = this.getAppendBonus()
      this.sum = +this.getMoneyToBonus

      this.options.params.phone = this.phone
      this.options.params.sum = this.sum
      this.options.params.cash = this.cash
      this.options.params.order = this.order

      this.setAppendBonus(this.options.params)
      this.options = this.getAppendBonus()
      // console.log('++options-->this.options-->', JSON.stringify(this.options))

      let response
      if (this.phone.length === this.phoneParseLength) {
        response = await this.storage.getClient(method, this.options, type)
        if (+response.result === 0) {
          /* dev */
          this.updateWetZeroMoney(true)
          this.setIsMoneyToBonus(false)

          this.$message(`Ваш остаток ${this.getMoneyToBonus} сохранен бонусами`)
          this.setIsAppendBonusMoney(false)

          this.timeoutDelay = setTimeout(() => {
            try {
              this.$router.push('/program')
            } catch (err) {}
          }, this.delay)
      
          this.$router.push('/popup')
        } else {
          this.$message(`Ошибка:  ${response.error}`)
        }
      } else {
        this.$message(`Введите правильно номер мобильного телефона`)
      }
    },
    // ПОДТВЕРДИТЬ
    payBonusMoney() {
      if (this.phone.length === this.phoneParseLength) {
        this.phoneNotParse = this.phone.replace(/[^+0-9]/g, '')
        this.setLoginBonusPhone(this.phoneNotParse)
        console.log('this.phoneNotParse', this.phoneNotParse)
        this.$router.push('/password')
      } else {
        this.$message(`Введите правильно номер мобильного телефона`)
      }
    }, // payBonusMoney

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
