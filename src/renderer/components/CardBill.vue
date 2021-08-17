<template>
  <div>
    <section>
      <form @submit.prevent="">
        <!-- ////////////////////// -->
        <!-- {{ `${response.profile.firstname} ${response.profile.lastname}` }} -->
        
        <div v-if="getIsPayCardMoney()" align="center" class="page-title">
          <!-- v-if="this.messageIndex > -1" -->
          <div
            v-if="this.messageIndex > -1"
            class="info-title noselect"
            style="margin-bottom: 4em; "
          >
            <p align="center">
              {{ `${this.messages[0]}` }}
              {{ `${this.firstname}` }}
            </p>
            
            <p align="center" style="font-size: 140px;">
              {{ this.amountString }}
            </p>
            <!-- <p align="center">
              {{ `${this.messages[1]}` }}
            </p> -->
            
          </div>


          
        </div>

        <!-- ////////////////////// -->

        <table>
          <tbody>
            <tr>
              <td>
                <button class="btn" @click="setNumber('25')">
                  <img src="imgs/key/sum25-up.png" /> 
                </button>
              </td>

              <td>
                <button class="btn" @click="setNumber('-10')">
                  <!-- <img src="@/assets/svg/tdtd.svg" /> -->
                  <img src="imgs/key/tdtd.png" />
                </button>
              </td>
              <td>
                <div class="display">{{ display }}</div>
              </td>
              <td>
                <button class="btn" @click="setNumber('10')">
                  <!-- <img src="@/assets/svg/kinc10-up.svg" /> -->
                  <img src="imgs/key/kinc10-up.png" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <table>
          <tbody>
            <tr>
              <td>
                <button class="btn" @click="setNumber('50')">
                  <!-- <img src="@/assets/svg/sum50-up.svg" /> -->
                  <img src="imgs/key/sum50-up.png" />
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button class="btn" @click="setNumber('100')">
                  <!-- <img src="@/assets/svg/sum100-up.svg" /> -->
                  <img src="imgs/key/sum100-up.png" />
                </button>
              </td>
              <td></td>
              <td>
                <button class="btn" @click="setNumber('1')">
                  <!-- <img src="@/assets/svg/k1-up.svg" /> -->
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
              <td></td>
            </tr>
            <tr>
              <td>
                <button class="btn" @click="setNumber('150')">
                  <!-- <img src="@/assets/svg/sum150-up.svg" /> -->
                  <img src="imgs/key/sum150-up.png" />
                </button>
              </td>
              <td></td>
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
                <button class="btn" @click="setNumber('200')">
                  <!-- <img src="@/assets/svg/sum200-up.svg" /> -->
                  <img src="imgs/key/sum200-up.png" />
                </button>
              </td>
              <td></td>
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
              <td></td>
            </tr>

            <tr>
              <td>
                <button class="btn" @click="setNumber('250')">
                  <!-- <img src="@/assets/svg/sum250-up.svg" /> -->
                  <img src="imgs/key/sum250-up.png" />
                </button>
              </td>
              <td></td>
              <td></td>
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
            <tr>
              <td>
                <button class="btn" @click="setNumber('500')">
                  <!-- <img src="@/assets/svg/sum500-up.svg" /> -->
                  <img src="imgs/key/sum500-up.png" />
                </button>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>  
    
        <button
          style="border: none; background: #121212; width: 0px"
          @click="payUp"
        >
          <router-link v-if="this.amount" to="/status" class="btn black pay-up">
            <img src="/imgs/pay/pay-up.png" />
            <div class="button-title-long">{{ 'ЗАЧИСЛИТЬ' }}</div>
          </router-link>

          <!-- <router-link v-else to="/card" class="btn black pay-up">
            <img src="/imgs/pay/pay-up.png" />
            <div class="button-title-long">{{ 'ЗАЧИСЛИТЬ' }}</div>
          </router-link> -->
        </button>  
      </form>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'

import { Database } from '@/storage/database.js'
import { Fetch, FetchClient, methods, types } from '@/storage/fetch.js'
import { Storage } from '@/storage/index.js'

export default {
  data: () => ({
    amount: 0,
    amountString: '',
    display: 0,
    length: 0,
    title: '',
    body: '',
  
    // dev
    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {},

    balance: '',
    firstname: '',
    lastname: '',

    messages: [`Ваш баланс,`, `Выберите сумму списания`],
    messageIndex: -1
  }),
  mounted() {
    this.storage = new Storage(this.client, this.url)
    // console.log('this.firstname-->', this.firstname)
    this.payBonusMoney()
    
  },

  methods: {
    ...mapGetters({
      getLoginBonusOptions: 'getLoginBonusOptions',
      getLoginBonusPhone: 'getLoginBonusPhone',
      getIsPayCardMoney: 'getIsPayCardMoney'
    }),
    ...mapMutations({
      setLoginBonusPhone: 'setLoginBonusPhone',
      setLoginBonusPassword: 'setLoginBonusPassword'
    }),
    ...mapActions({
      updateWetMoney: 'updateWetMoney'
    }),

    payUp() {
      const card = this.amount
      if (this.amount > 0) {
        this.updateWetMoney(card)
        // clear
        this.display = this.title = this.body = '0'
      }
    },
    /* ////////////////////////////// */
    // ПОДТВЕРДИТЬ
    async payBonusMoney() {
      // console.log('ПОДТВЕРДИТЬ CardBill-->payBonusMoney!!!')
      this.phoneNotParse = this.getLoginBonusPhone()

      const method = methods[8]
      const type = types[2]

      let response
      // dev
      this.options = this.getLoginBonusOptions()

      /* console.log(
        'CardBill-->this.options.params',
        JSON.stringify(this.options.params)
      ) */
      if (this.options.params.pin.length > 0) {
        let response = await this.storage.getClient(method, this.options, type)
        if (+response.result === 0) {
          /* this.$message(
            `Уважаемый ${response.profile.firstname} ${response.profile.lastname} на Вашем бонусном счету ${response.profile.b_balance} ₽ `
          ) */
          this.balance = response.profile.b_balance
          this.firstname = response.profile.firstname
          this.lastname = response.profile.lastname
          this.messageIndex = 0

          this.setNumber(this.balance)
          // clear
          this.setLoginBonusPhone('')
          this.setLoginBonusPassword('')
        } else {
          this.$message(`Ошибка:  ${response.error}`)
          this.$router.push('/password')
        }
        //---
        //console.log('CardBill-->response', JSON.stringify(response))
        //---
      }

      //---
    }, // payBonusMoney
    /* ////////////////////////////// */

    setNumber(num) {
      if (num >= 10 || num == -10) {
        if (this.amount + parseInt(num) < 1000) this.amount += parseInt(num)
      }

      if (num < 10 && num != -10 && this.amount < 100) {
        //if(this.amountString.length < 3)
        this.amountString = this.amount.toString() + num.toString()
        this.amount = parseInt(this.amountString)
      }

      if (this.amount < 0) this.amount = 0
      this.amountString = this.amount.toString()
      this.display = this.amountString
      
    },

    /* deposit() {}, */

    backspace() {
      let res = this.amountString.substring(0, this.amountString.length - 1)
      this.display = this.amountString = res
      this.amount = parseInt(res)
      if (this.amountString.length === 0) {
        this.amountString = '0'
        this.amount = 0
        this.display = this.amountString
      }
    }
  }
}
</script>

<style scoped>
.display {
  padding-top: 0.5em;
  width: 253px;
  height: 125px;
  color: #ffffff;
  font-size: 140px;
  font-weight: 400;
  line-height: 70px;
  text-align: center;
  text-decoration: underline;

  font-weight: bold;
  font-family: 'Plumb-Medium';
}
.page-title {
  padding-top: 13em;
  padding-left: 4em;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 20em;
}
table,
th,
td {
  /* border: solid; */
  border: none;
  margin: 0em;
  /* margin-bottom: 1em; */
  /* padding-bottom: 6em; */
  padding: 0rem;
  height: 150px;
  width: 150px;

  border-color: #121212;
}
.btn {
  background-color: #121212;
  z-index: 1;
}
.pay-up {
  margin-top: -12em;
  margin-left: 24em;
}
/* Plumb-Medium */
.description {
  font-family: 'Plumb-Medium';
  font-size: 20px;
  font-weight: bold;
}
.button-title-long {
  position: relative;
  top: -8rem;
  left: 5rem;
  color: black;
  font-size: 3rem;
  font-weight: bold;
  text-align: left;
  z-index: 1;

  font-family: 'Plumb-Medium';
  text-transform: uppercase;
}
/* .tbody {
  width: 1780;
} */
/* ************************* */
.page-title {
  position: absolute;
  margin-top: -10em;
  margin-left: 5em;

  top: 0%;
  left: 0%;
  color: white;
  text-align: right;

  font-family: 'Plumb-Medium';
  font-weight: bold;
  z-index: 1;
}
.info-title {
  width: 800px;
  padding-top: 0.5em;
  margin-top: 0em;
  margin-left: 0em;
  font-size: 3em;
}
/* ************************* */
</style>
