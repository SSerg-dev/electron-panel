<template>
  <div>
    <section>
      <!--       <div class="page-title white-text">
        <h3>Bonus Bill</h3>
      </div>
       -->

      <!-- style="width: 800px; padding-top: 2em; margin-top: 0em; margin-left: 4em; font-size: 2.5em;" -->

      <div class="info-title">
        <p align="center">
          Для зачисления бонусов
        </p>
        <p align="center">
          введите номер телефона
        </p>
      </div>

      <form @submit.prevent="" novalidate>
        <div class="imgs" style="padding-top: 2em">
          <div class="display" style="padding-left: 4em">
            <!-- style="font-size: 10rem; height: 8rem; border-bottom: 4px solid #fff;" -->
            <input
              type="tel"
              class="phone"
              v-model="phone"
              autocomplete="tel"
              required
              style="font-size: 7.2rem; height: 8rem; border-bottom: 6px solid #fff; padding-left: 0em"
            />
          </div>

          <!-- 
            <button
                v-if="this.isDown.dryShine === false"
                style="background-image:url('./imgs/blue/blue_long.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('dryShine')"
              >
           -->

          <div class="row" style="padding-top: 10em;">
            <div class="col s6 num">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <button class="btn" @click="setNumber('1')">
                        <img src="imgs/key/k1-up.png" />
                      </button>
                    </td>
                    <td>
                      <button class="btn" @click="setNumber('2')">
                        <!-- <img src="@/assets/svg/k2-up.svg" /> -->
                        <img src="imgs/key/k2-up.png" />
                      </button>
                    </td>
                    <td>
                      <button class="btn" @click="setNumber('3')">
                        <!-- <img src="@/assets/svg/k3-up.svg" /> -->
                        <img src="imgs/key/k3-up.png" />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <button class="btn" @click="setNumber('4')">
                        <!-- <img src="@/assets/svg/k4-up.svg" /> -->
                        <img src="imgs/key/k4-up.png" />
                      </button>
                    </td>
                    <td>
                      <button class="btn" @click="setNumber('5')">
                        <!-- <img src="@/assets/svg/k5-up.svg" /> -->
                        <img src="imgs/key/k5-up.png" />
                      </button>
                    </td>
                    <td>
                      <button class="btn" @click="setNumber('6')">
                        <!-- <img src="@/assets/svg/k6-up.svg" /> -->
                        <img src="imgs/key/k6-up.png" />
                      </button>
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>
                      <button class="btn" @click="setNumber('7')">
                        <!-- <img src="@/assets/svg/k7-up.svg" /> -->
                        <img src="imgs/key/k7-up.png" />
                      </button>
                    </td>
                    <td>
                      <button class="btn" @click="setNumber('8')">
                        <!-- <img src="@/assets/svg/k8-up.svg" /> -->
                        <img src="imgs/key/k8-up.png" />
                      </button>
                    </td>
                    <td>
                      <button class="btn" @click="setNumber('9')">
                        <!-- <img src="@/assets/svg/k9-up.svg" /> -->
                        <img src="imgs/key/k9-up.png" />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <button class="btn" @click="setNumber('0')">
                        <!-- <img src="@/assets/svg/k0-up.svg" /> -->
                        <img src="imgs/key/k0-up.png" />
                      </button>
                    </td>
                    <td>
                      <button class="btn" @click="backspace">
                        <!-- <img src="@/assets/svg/kdel-up.svg" /> -->
                        <img src="imgs/key/kdel-up.png" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col s2"></div>

            <!-- <div v-if="!this.getIsAppendBonusMoney()"> -->
            <div>
              <BonusBillQr />
            </div>

            <!-- <div>
              <Password />
            </div> -->
          </div>
        </div>

        <div class="pay-up-title">
          <!-- //////////////////////////// -->
          <div v-if="this.getIsAppendBonusMoney()">
            <button
              style="margin-left: -2.0em; border: none; background: #121212; width: 0px"
              @click="payUp('append')"
            >
              <div class="btn black pay-up">
                <img src="/imgs/pay/pay-up.png" />

                <div class="button-title-long">
                  {{ 'ЗАЧИСЛИТЬ' }}
                </div>
              </div>
            </button>
          </div>

          <div v-else>
            <button
              style="margin-left: -5.0em; border: none; background: #121212; width: 0px"
              @click="payUp('confirm')"
            >
              <div class="btn pay-up">
                <img src="/imgs/pay/pay-up.png" />

                <div style="padding-right: 3.2em;" class="button-title-long">
                  {{ 'ПОДТВЕРДИТЬ' }}
                </div>
              </div>
            </button>
          </div>
          <!-- //////////////////////////// -->
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import BonusBillQr from '@/components/BonusBillQr'
// VuePassword
// import Password from '@/views/Password'

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
    order: '42',

    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {},

    password: '',
    clickCount: 0

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
    /* dev */
    /* emitGlobalClickEvent() {
      this.clickCount++
      console.log('this.clickCount-->', this.clickCount)
      EventBus.$emit('clicked', this.clickCount)
    }, */

    emitClick(program) {
      //console.log('emitClick!!!')
      EventBus.$emit('submitBonusBill', program)
    },

    payUp(program) {
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

      this.options.params.sum = this.sum
      this.options.params.cash = this.cash
      this.options.params.order = this.order

      this.setAppendBonus(this.options.params)
      this.options = this.getAppendBonus()
      // console.log('options-->this.options-->', JSON.stringify(this.options))

      let response
      if (this.phone.length === this.phoneParseLength) {
        response = await this.storage.getClient(method, this.options, type)
        // dev
        if (+response.result === 0) {
          this.$message(`Вам насчислены бонусы`)
          this.setIsAppendBonusMoney(false)
          //this.$router.push('/program')
          this.$router.push('/')
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
  position: absolute;
  background-color: white;

  width: 320px;
  height: 320px;
  margin-top: 8em;
  margin-left: 45em;
  padding-top: 0.5em;
  padding-left: 0.5em;
  z-index: 1;
}
/* dev */
.pay-up-title {
  position: absolute;

  margin-top: 0em;
  margin-left: 0em;
  z-index: 1;
}
.num {
  padding-left: 5rem;
}
table,
th,
td {
  /* border: solid; */
  border: none;

  height: 150px;
  width: 150px;

  border-color: #121212;
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
