<template>
  <div
    class="overlay"
    ref="overlay"
    style="background: none;
  width: 80em;   
  height: 90em; 
  padding-top: 14em;
  padding-left: 4em;
  margin-top: -2em;
  margin-left: -4em;
  z-index: 999;
  "
  >
    <!-- <input style="margin-left: 0em;" class="info-title" onclick="this.value = event.clientX+':'+event.clientY"> -->
    <section
      style="
          width: 66em; 
          height: 72em; 
          margin-left: 0.2em; 
          margin-top: -6em;
          padding-left: 1.8em;
          padding-top: 8em;
          border: solid 3px #00B9E3; 
          border-radius: 2em;
          box-shadow: 0px 0px 20px 15px #00b9e3;  
          
    "
    >
      <form @submit.prevent="">
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
          </div>
        </div>

        <!-- new component -->
        <!-- style="background: yellow" -->
        <table>
          <tbody>
            <!-- row 01 -->
            <!--  class="info-title" align="center" -->
            <tr>
              <td colspan="5">
                <div class="display">{{ display }}</div>
              </td>
            </tr>
            <!-- row 02 -->
            <tr>
              <td>
                <div
                  @click="setNumber('-10')"
                  class="card white"
                  style="
                  width: 220px;
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
                    -10
                  </div>
                </div>
              </td>
              <td>
                <!-- dev -->
                <div
                  @click="setNumber('1')"
                  class="card white"
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
                <!--     -->
              </td>
              <td>
                <!-- dev -->
                <div
                  @click="setNumber('2')"
                  class="card white"
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
                <!--     -->
              </td>
              <td>
                <!-- dev -->
                <div
                  @click="setNumber('3')"
                  class="card white"
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
                <!--     -->
              </td>
              <td>
                <!-- <button class="btn" @click="setNumber('10')">
                  <img src="imgs/key/kinc10-up.png" />
                </button> -->
                <div
                  @click="setNumber('10')"
                  class="card white"
                  style="
                  width: 220px;
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
                    +10
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 03 -->
            <tr>
              <td>
                <div
                  @click="setNumber('25')"
                  class="card white"
                  style="
                  width: 220px;
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
                    25
                  </div>
                </div>
              </td>
              <td>
                <!-- dev -->
                <div
                  @click="setNumber('4')"
                  class="card white"
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
                <!--     -->
              </td>
              <td>
                <!-- dev -->
                <div
                  @click="setNumber('5')"
                  class="card white"
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
                <!--     -->
              </td>
              <td>
                <!-- dev -->
                <div
                  @click="setNumber('6')"
                  class="card white"
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
                <!--     -->
              </td>
              <td>
                <div
                  @click="setNumber('200')"
                  class="card white"
                  style="
                  width: 220px;
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
                    200
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  @click="setNumber('50')"
                  class="card white"
                  style="
                  width: 220px;
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
                    50
                  </div>
                </div>
              </td>
              <td>
                <!-- dev -->
                <div
                  @click="setNumber('7')"
                  class="card white"
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
                <!--     -->
              </td>
              <td>
                <!-- dev -->
                <div
                  @click="setNumber('8')"
                  class="card white"
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
                <!--     -->
              </td>
              <td>
                <!-- dev -->
                <div
                  @click="setNumber('9')"
                  class="card white"
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
                <!--     -->
              </td>
              <td>
                <div
                  @click="setNumber('250')"
                  class="card white"
                  style="
                  width: 220px;
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
                    250
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 04 -->
            <tr>
              <td>
                <div
                  @click="setNumber('100')"
                  class="card white"
                  style="
                  width: 220px;
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
                    100
                  </div>
                </div>
              </td>
              <td>
                <!-- dev -->
                <div
                  @click="setNumber('.')"
                  class="card white"
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
                  padding-left: 3rem;
                  padding-top: 0rem;
                  padding-bottom: 0rem;
                  "
                  >
                    .
                  </div>
                </div>
                <!--     -->
              </td>
              <td>
                <!-- dev -->
                <div
                  @click="setNumber('0')"
                  class="card white"
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
                <!--     -->
              </td>
              <td>
                <!-- <button class="btn" @click="backspace">
                  <img src="imgs/key/kdel-up.png" />
                </button> -->
                <div
                  @click="backspace"
                  class="card white"
                  style="
                  width: 125px;
                  height: 120px; 
                  border: solid 6px red; 
                  border-radius: 2.5em;
                  box-shadow: 0px 6px 10px red;
                  
                  "
                >
                  <div
                    class="card-content red-text"
                    style="
                  font-size: 4.2rem;
                  padding-left: 1rem;
                  padding-top: 1rem;
                  "
                  >
                    del
                  </div>
                </div>
              </td>
              <td>
                <div
                  @click="setNumber('500')"
                  class="card white"
                  style="
                  width: 220px;
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
                    500
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 05 -->
            <tr>
              <td>
                <div
                  @click="setNumber('150')"
                  class="card white"
                  style="
                  width: 220px;
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
                    150
                  </div>
                </div>
              </td>
              <td colspan="3">
                <div
                  @click="payUp('append')" 
                  class="card white"
                  style="
                  width: 420px;
                  height: 120px; 
                  border: solid 6px #00B9E3; 
                  border-radius: 2.5em;
                  box-shadow: 0px 6px 10px #00b9e3;
                  
                  ">
                  <div class="card-content black-text" 
                  style="
                  font-size: 4em;
                  padding-left: 2.8rem;
                  padding-top: 0.2em;
                  ">
                  ЗАЧИСЛИТЬ</div>
                </div>
              </td>
              
              <td>
                <div
                  @click="setNumber('1000')"
                  class="card white"
                  style="
                  width: 220px;
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
                  padding-left: 1.2rem;
                  padding-top: 0em;
                  "
                  >
                    1000
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- end new component -->
      </form>
    </section>
    <!-- <input style="margin-left: 0em;" class="info-title" onclick="this.value = event.clientX+':'+event.clientY"> -->
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
    minX: 55,
    minY: 560,
    maxX: 1030,
    maxY: 1620,

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
    this.setup()

    this.storage = new Storage(this.client, this.url)
    // console.log('this.firstname-->', this.firstname)
    this.payBonusMoney()
  },

  methods: {
    /* dev */
    setup() {
      const overlay = this.$refs.overlay

      overlay.onclick = evt => {
        if (
          evt.clientX > this.minX &&
          evt.clientY > this.minY &&
          evt.clientX < this.maxX &&
          evt.clientY < this.maxY
        ) {
          //console.log('inside overlay-->', evt.clientX, evt.clientY)
          return
        } else {
          //console.log('outside overlay-->', evt.clientX, evt.clientY)
          this.$router.push('/')
        }
      }
    },
    payUp(program) {
      if (program === 'append') {
        this.$router.push('/status')
      }
      
    },

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
  /* padding-top: 0em;
  padding-bottom: 0em;;
  width: 253px;
  position: absolute;

  color: #ffffff;
  font-size: 10em;
  line-height: 1em;
  text-align: center;
  text-decoration: underline; */

  width: 0em;
  position: absolute;
  margin-top: -0.8em;
  margin-left: 0em;/* 2.3em; */
  text-decoration: underline;
  color: #ffffff;
  font-size: 10em;
  line-height: 1em;
  z-index: 1;

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
/* table { 
  width: 840px;
} */

/* table,
tr {
  width: 840px;
} */

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
  height: 150px;
  width: 150px;

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
  left: 3rem;
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
/* .info-title {
  width: 800px;
  padding-top: 0.5em;
  margin-top: 0em;
  margin-left: 0em;
  font-size: 3em;
} */
.info-title {
  position: absolute;

  width: 800px;
  padding-top: 0em;
  padding-left: 0em;
  padding-right: 0em;
  padding-bottom: 0em;

  margin-top: 0em;
  margin-left: 0em;
  font-size: 3em;

  color: #ffffff;
  text-align: center;
  font-family: 'Plumb-Medium';
}
/* ************************* */
</style>
