<template>
  <div>
    <section>
      <div class="info-title">
        <h3>
          <p align="center">
            {{ `${this.messages[0]}` }}
          </p>
          <p align="center">
            {{ `${this.messages[1]}` }}
          </p>
        </h3>
      </div>

      <form @submit.prevent="" novalidate>
        <div class="imgs" style="padding-top: 2em">
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

            <div class="qr-code">
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

    sum: 42,
    cash: true,
    order: '13',

    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {},

    password: '',
    clickCount: 0,

    messages: [`Для зачисления бонусов,`, `введите номер телефона`],
    messageIndex: -1

    /*
    this.payBonusMoney()
    this.appendBonusMoney()
    */
  }),
  mounted() {
    this.storage = new Storage(this.client, this.url)
    /* dev */
    // getIsLoginSettingPassword
    this.setIsLoginSettingPassword(false)
    this.setRouter('/bonus')
  },
  components: {
    BonusBillQr
    //Password
  },
  computed: {
    ...mapGetters({
      getWetBalance: 'getWetBalance'
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
      setRouter: 'setRouter'
    }),
    ...mapActions({
      updateWetBonusMoney: 'updateWetBonusMoney'
    }),

    emitClick(program) {
      //console.log('emitClick!!!')
      EventBus.$emit('submitBonusBill', program)
    },
    

    payUp(program) {
      //console.log('++program-->', program)
      if (this.getIsAppendBonusMoney() && program === 'append') {
        this.appendBonusMoney()
      }
      if (this.getIsPayBonusMoney() && program === 'confirm') {
        this.payBonusMoney()
      }
      this.emitClick(program)
    },

    async appendBonusMoney() {
      const method = methods[10]
      const type = types[4]

      this.options = this.getAppendBonus()
      this.options.params.phone = this.phone

      // 
      this.options.params.sum = this.sum
      this.options.params.cash = this.cash
      this.options.params.order = this.order

      this.setAppendBonus(this.options.params)
      this.options = this.getAppendBonus()
      // console.log('options-->this.options-->', JSON.stringify(this.options))

      let response
      if (this.phone.length === this.phoneParseLength) {
        response = await this.storage.getClient(method, this.options, type)
        if (+response.result === 0) {
          /* dev */
          console.log('BonusBill-row-517-->type-->options-->', type, this.options)
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
    // ПОДТВЕРДИТЬ
    async payBonusMoney() {
      //console.log('ПОДТВЕРДИТЬ BonusBill-->payBonusMoney!!!')
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      /* this.phoneNotParse = this.phone.replace(/[^+0-9]/g, '')
      this.setLoginBonusPhone(this.phoneNotParse)
      this.$router.push('/password') */
      if (this.phone.length === this.phoneParseLength) {
        this.phoneNotParse = this.phone.replace(/[^+0-9]/g, '')
        this.setLoginBonusPhone(this.phoneNotParse)
        this.$router.push('/password')
      } else {
        this.$message(`Введите правильно номер мобильного телефона`)
      }
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      /*
      const method = methods[8]
      const type = types[2]

      let response
      if (this.phone.length === this.phoneParseLength) {
        // dev
        // if (this.options.params.phone === this.phoneNotParse) {
        if (true) {
          // if (this.IsWetBalance) {
          if (true) {
            // dev
            this.$router.push('/password')
            this.options = this.getLoginBonusOptions()

            console.log(
              'BonusBill-->this.options.params',
              JSON.stringify(this.options.params)
            )
            if (this.options.params.pin) {
              response = await this.storage.getClient(
                method,
                this.options,
                type
              )
              if (+response.result === 0) {
                this.$message(
                  `Уважаемый ${response.profile.firstname} ${response.profile.lastname} на Вашем бонусном счету ${response.profile.b_balance} ₽ `
                )
                //this.setIsPayBonusMoney(false)
                // clear
                this.setLoginBonusPhone('')
                this.setLoginBonusPassword('')
              } else this.$message(`Ошибка оплаты Вашего бонусного счета`)
            }
          } else {
            this.$message('Внесите минимальную сумму (10 руб.)')
            // this.$router.push('/bonus')
            // dev
          }
        } else {
          this.$message(
            `Телефон с номером ${this.phone} в бонусной системе не зарегистрирован`
          )
        }

        //---
      } else {
        this.$message(`Введите правильно номер мобильного телефона`)
      }
      */
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  position: relative;
}

.display {
  width: 980px;
  /* padding-left: 6rem;
  margin-bottom: 0rem; */

  position: absolute;
  margin-top: 0em;
  margin-left: 0em;
  z-index: 1;
}
.phone {
  /* margin-top: 0em; */
  margin: 0 auto;
  /* padding-top: 6em; */
  width: 253px;
  height: 125px;
  color: #ffffff;
  text-align: left;
  font-family: 'Plumb-Medium';
  text-transform: uppercase;

  /* font-size: 3rem; */
  /* border-bottom: 2px solid #eee; */
}
.qr-title {
  position: absolute;
  margin-top: 5.5em;
  margin-left: 25em;

  top: 0%;
  left: 0%;
  color: white;
  text-align: right;

  font-size: 2em;
  font-family: 'Plumb-Medium';
  font-weight: bold;
  z-index: 1;
}

.qr-code {

  /* position: absolute;
  background-color: white;

  width: 320px;
  height: 320px;
  margin-top: 8em;
  margin-left: 45em;
  padding-top: 0.5em;
  padding-left: 0.5em;
  z-index: 1; */
  
}
/* dev */
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
  /* border-color: #121212; */
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
