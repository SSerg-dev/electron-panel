<template>
  <div
    class="overlay"
    ref="overlay"
    style="
      background: none;
      width: 80em;
      height: 90em;
      padding-top: 14em;
      padding-left: 4em;
      margin-top: -2em;
      margin-left: -4em;
      z-index: 1;
    "
  >
    <section
      style="
        width: 66em;
        height: 72em;
        margin-left: 0.2em;
        margin-top: -6em;
        padding-left: 1.8em;
        padding-top: 8em;
        border: solid 3px #00b9e3;
        border-radius: 2em;
        box-shadow: 0px 0px 20px 15px #00b9e3;
      "
    >
      <form @submit.prevent="">
        <div v-if="loading">
          <loader
            object="#33ddff"
            color1="#ffffff"
            color2="#3217fd"
            size="10"
            speed="2"
            bg="#343a40"
            objectbg="#999793"
            opacity="80"
            name="box"
          ></loader>
        </div>

        <div v-else>
          <!--  || isQrAuthorization -->
          <div v-if="getIsPayCardMoney()" align="center" class="page-title">
            <div
              v-if="this.messageIndex > -1"
              class="info-title noselect"
              style="margin-bottom: 4em"
            >
              <p align="center">
                {{ `${this.messages[0]}` | localize }}
                {{ `${this.firstname}` }}
              </p>
              <p align="center" style="font-size: 140px">
                {{ parseFloat(this.balance).toFixed(this.digits) }}
              </p>
              <p align="center">
                {{ `${this.messages[1]}` | localize }}
              </p>
            </div>
          </div>
        </div>

        <table>
          <tbody>
            <!-- row 01 -->
            <tr>
              <td colspan="4" class="display">
                <div style="font-size: 1em; color: yellow">
                  {{ parseFloat(this.display).toFixed(this.digits) }}
                </div>
              </td>
              <td colspan="1" class="white-text currency">
                <div align="center" style="font-size: 1em">
                  <p>{{ this.emoji }}</p>
                  {{ this.currency }}
                  <!-- {{ this.symbol }} -->
                </div>
              </td>
            </tr>
            <!-- row 02 -->
            <tr class="bonus-row">
              <td>
                <div
                  @click="setNumber('')"
                  class="card black waves-effect"
                  style="
                    width: 220px;
                    height: 120px;
                    border: none;
                    border-radius: 2.5em;
                    box-shadow: 0px 6px 10px #00b9e3;
                  "
                >
                  <div
                    v-if="isMinBlinking && isMin"
                    id="blink"
                    class="card-content"
                    style="
                      font-size: 3rem;
                      padding-left: 2.4rem;
                      padding-top: 1.4rem;
                    "
                  >
                    {{ `Min ${getPaymentLimitMin}` }}
                  </div>

                  <div
                    v-else
                    class="card-content white-text"
                    style="
                      font-size: 3rem;
                      padding-left: 2.4rem;
                      padding-top: 1.4rem;
                    "
                  >
                    {{ `Min ${getPaymentLimitMin}` }}
                  </div>
                </div>
              </td>
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
              <td>
                <div
                  @click="setNumber('')"
                  class="card black waves-effect"
                  style="
                    width: 220px;
                    height: 120px;
                    border: none;
                    border-radius: 2.5em;
                    box-shadow: 0px 6px 10px #00b9e3;
                  "
                >
                  <div
                    v-if="isMaxBlinking && isMax"
                    id="blink"
                    class="card-content"
                    style="
                      font-size: 3rem;
                      padding-left: 1.5rem;
                      padding-top: 1.4rem;
                    "
                  >
                    <div>
                      {{
                        `Max ${parseFloat(getPaymentLimitMax).toFixed(
                          this.digits
                        )}`
                      }}
                    </div>
                  </div>

                  <div
                    v-else
                    class="card-content white-text"
                    style="
                      font-size: 3rem;
                      padding-left: 1.5rem;
                      padding-top: 1.4rem;
                    "
                  >
                    <div>
                      {{
                        `Max ${parseFloat(getPaymentLimitMax).toFixed(
                          this.digits
                        )}`
                      }}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <!--     -->
            <!-- row 03 -->
            <tr>
              <td>
                <div
                  @click="setNumber('100', (fixed = true))"
                  class="card white waves-effect"
                  style="
                    width: 220px;
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
                    100
                  </div>
                </div>
              </td>
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
              <td>
                <div
                  @click="setNumber('500', (fixed = true))"
                  class="card white waves-effect"
                  style="
                    width: 220px;
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
                    500
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  @click="setNumber('200', (fixed = true))"
                  class="card white waves-effect"
                  style="
                    width: 220px;
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
                    200
                  </div>
                </div>
              </td>
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
              <td>
                <div
                  @click="setNumber('600', (fixed = true))"
                  class="card white waves-effect"
                  style="
                    width: 220px;
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
                    600
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 04 -->
            <tr>
              <td>
                <div
                  @click="setNumber('300', (fixed = true))"
                  class="card white waves-effect"
                  style="
                    width: 220px;
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
                    300
                  </div>
                </div>
              </td>
              <td>
                <div
                  @click="setNumber('.')"
                  class="card white waves-effect"
                  style="
                    width: 125px;
                    height: 120px;
                    border: solid 6px #00b9e3;
                    border-radius: 2.5em;
                    box-shadow: 0px 6px 10px #00b9e3;
                    opacity: 1;
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
              </td>
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
              <td>
                <div
                  @click="setNumber('700', (fixed = true))"
                  class="card white waves-effect"
                  style="
                    width: 220px;
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
                    700
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 05 -->
            <tr>
              <td>
                <div
                  @click="setNumber('400', (fixed = true))"
                  class="card white waves-effect"
                  style="
                    width: 220px;
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
                    400
                  </div>
                </div>
              </td>
              <td colspan="3">
                <div
                  @click="payUp('append')"
                  class="card white waves-effect"
                  style="
                    width: 420px;
                    height: 120px;
                    border: solid 6px rgb(118, 255, 3);
                    border-radius: 2.5em;
                    box-shadow: 0px 6px 10px rgb(118, 255, 3);
                  "
                >
                  <div
                    class="card-content black-text"
                    style="
                      display: flex;
                      justify-content: center;

                      font-size: 4em;
                      padding-top: 0.2em;
                    "
                  >
                    {{ `APPEND` | localize }}
                    <!-- {{`Card`}} -->
                  </div>
                </div>
              </td>

              <td>
                <div
                  @click="setNumber('', (fixed = true))"
                  class="card white waves-effect"
                  style="
                    width: 220px;
                    height: 120px;
                    border: solid 6px #00b9e3;
                    border-radius: 2.5em;
                    box-shadow: 0px 6px 10px #00b9e3;
                    opacity: 0.2;
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
import EventBus from '@/bus/EventBus'
const { ipcRenderer } = require('electron')
import { profile } from 'console'

export default {
  data: () => ({
    loading: false,

    profile: {
      isQrAuthorization: false,
      isPhoneAuthorization: false,
      isCashAuthorization: false,
      phone: '',
      balance: 0,
      firstname: '',
      lastname: '',
    },

    amount: 0,
    amountString: '',
    display: 0,
    length: 0,
    title: '',
    body: '',
    digits: 0,

    isCardRow: false,
    isBonusRow: false,

    isMin: false,
    isMax: false,

    delay: 2000,
    timeoutMinDelay: null,
    timeoutMaxDelay: null,
    timeoutDelay: null,

    minX: 55,
    minY: 560,
    maxX: 1030,
    maxY: 1620,

    client: 'fetch',
    url: '',//'https://192.168.1.3/',
    storage: null,
    options: {},
    payType: '',

    cardLimitMax: 0,
    balance: '',
    firstname: '',
    lastname: '',

    messages: [
      /* `Ваш баланс,` */
      `Your_balance`,
      /* `Выберите сумму списания` */
      `Select_charge_amount`,
    ],
    messageIndex: -1,

    /* dev */
    emoji: '',
    currency: '',
    symbol: '',
    currencies: [],
  }),
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',

      getInitCurrency: 'getInitCurrency',
      getDefaultCurrency: 'getDefaultCurrency',
      getLanguageNatives: 'getLanguageNatives',
      getFixedCurrency: 'getFixedCurrency',

      getPaymentLimitMin: 'getPaymentLimitMin',
      getPaymentLimitMax: 'getPaymentLimitMax',
      getIsCardMoney: 'getIsCardMoney',
      getIsBonusMoney: 'getIsBonusMoney',

      getProfile: 'getProfile',
      getCardLimitMax: 'getCardLimitMax',
    }),

    isMinBlinking: {
      get: function () {
        const flags = [true, false]
        let index
        if (this.amount < this.getPaymentLimitMin) {
          index = 0
          this.isMin = true
        } else {
          index = 1
          this.isMin = false
        }
        // if (index === 0) this.$message('Сумма меньше минимальной')
        flags.modeBlink = function (index) {
          return flags[index]
        }
        this.timeoutMinDelay = setTimeout(() => {
          this.isMin = false
          flags.modeBlink(1)
        }, this.delay)

        return flags.modeBlink(index)
      },
    },

    isMaxBlinking: {
      get: function () {
        const flags = [true, false]
        let index
        if (this.amount > this.getPaymentLimitMax) {
          index = 0
          this.isMax = true
        } else {
          index = 1
          this.isMax = false
        }
        flags.modeBlink = function (index) {
          return flags[index]
        }
        this.timeoutMaxDelay = setTimeout(() => {
          this.isMax = false
          flags.modeBlink(1)
        }, this.delay)
        if (index === 0) {
          this.$message('Сумма больше максимальной')
        }
        return flags.modeBlink(index)
      },
    },
  },
  watch: {
    getFixedCurrency(flag) {
      this.digits = flag
    },
    getIsCardMoney(flag) {
      if (flag) {
        if (!this.getIsBonusMoney) this.setPaymentLimitMax(this.cardLimitMax)
      }
    },
  },
  mounted() {
    const options = {}

    this.setup()
    this.url = process.env.VUE_APP_URL_CONNECT
    this.storage = new Storage(this.client, this.url)

    // console.log('this.getProfile-->', this.getProfile)
    const {
      isQrAuthorization,
      isPhoneAuthorization,
      isCashAuthorization,
      balance,
      phone,
      firstname,
      lastname,
    } = this.getProfile

    this.profile.isQrAuthorization = isQrAuthorization
    this.profile.isPhoneAuthorization = isPhoneAuthorization
    this.profile.isCashAuthorization = isCashAuthorization
    this.profile.phone = phone
    this.profile.balance = balance
    this.profile.firstname = firstname
    this.profile.lastname = lastname

    if (!this.profile.isQrAuthorization) {
      this.profile.isPhoneAuthorization = true
      this.setProfile(this.profile)

      this.payBonusMoney()
    }

    if (this.profile.isQrAuthorization) {
      /* dev */
      this.loading = true

      /* dev */
      this.setPaymentLimitMax(this.profile.balance)

      this.balance = this.profile.balance
      this.phone = this.profile.phone
      this.firstname = this.profile.firstname
      this.lastname = this.profile.lastname
      this.messageIndex = 0

      this.timeoutDelay = setTimeout(() => {
        this.loading = false
      }, this.delay)
    }
  },
  created() {
    this.initCurrency()
    if (parseInt(this.getFixedCurrency) > 0) {
      this.digits = this.getFixedCurrency
    }
  },

  beforeDestroy() {
    this.setIsCardMoney(false)
    // this.setIsBonusMoney(false)

    this.setPaymentLimitMax(this.cardLimitMax)

    clearTimeout(this.timeoutMinDelay)
    clearTimeout(this.timeoutMaxDelay)
    clearTimeout(this.timeoutDelay)

    this.profile.isQrAuthorization = false
    this.profile.isPhoneAuthorization = false
    this.profile.isCashAuthorization = false
    this.setProfile(this.profile)
  },

  methods: {
    emitBonusMoney(balance) {
      EventBus.$emit('submitBonusMoney', balance)
    },
    emitCardMoney(card = 0) {
      EventBus.$emit('submitCardMoney', card)
    },
    changeRowOfTable(balance) {
      if (balance < 1) {
        this.isCardRow = true
        this.isBonusRow = false
      } else {
        this.isCardRow = false
        this.isBonusRow = true
      }
    },
    initCurrency() {
      /* dev */
      const { id, title, key, emoji, currency, symbol } = this.getInitCurrency

      this.current = id
      this.select = title

      this.emoji = emoji
      this.currency = currency
      this.symbol = symbol
      /*     */
    },

    overlay() {
      const overlay = this.$refs.overlay

      overlay.onclick = (evt) => {
        if (
          evt.clientX > this.minX &&
          evt.clientY > this.minY &&
          evt.clientX < this.maxX &&
          evt.clientY < this.maxY
        ) {
          return
        } else {
          this.$router.push('/')
        }
      }
    },
    setup() {
      this.display = this.amount = this.getPaymentLimitMin
      this.cardLimitMax = this.getCardLimitMax

      this.overlay()
    },
    ...mapGetters({
      getLoginBonusOptions: 'getLoginBonusOptions',
      getLoginBonusPhone: 'getLoginBonusPhone',
      getIsPayCardMoney: 'getIsPayCardMoney',
      getCardMoney: 'getCardMoney',
    }),
    ...mapMutations({
      setLoginBonusPhone: 'setLoginBonusPhone',
      setLoginBonusPassword: 'setLoginBonusPassword',
      setIsCardMoney: 'setIsCardMoney',
      setIsBonusMoney: 'setIsBonusMoney',
      setCardMoney: 'setCardMoney',
      setPaymentLimitMax: 'setPaymentLimitMax',
      setProfile: 'setProfile',
    }),
    ...mapActions({
      updateWetBonusMoney: 'updateWetBonusMoney',
      updateDryBonusMoney: 'updateDryBonusMoney',
    }),

    payUp(program) {
      const card = this.amount
      if (
        this.amount > 0 &&
        this.amount >= this.getPaymentLimitMin &&
        this.amount <= this.getPaymentLimitMax
      ) {
        // console.log(
        //   `CardBill.vue 996: this.getIsCardMoney ${this.getIsCardMoney} this.getIsBonusMoney ${this.getIsBonusMoney}`
        // )

        // payCard
        if (this.getIsCardMoney && !this.getIsBonusMoney) {
          this.emitCardMoney(card)
          this.setCardMoney(card)
          this.$message(`Банковской картой будет оплачено:  ${+card} ₽`)
          this.$router.push('/status')
        }
        // payBonus
        
        if (this.getIsBonusMoney && this.getIsCardMoney) {
          const type = this.getPanelType
          switch (type) {
            case 'wash':
              this.updateWetBonusMoney(card)
              if (this.$route.name !== 'cash') this.$router.push('/cash')
              break
            case 'vacuum':
              this.updateDryBonusMoney(card)
              if (this.$route.name !== 'cash') this.$router.push('/cash')
              break

            default:
              break
          }

          this.$message(`Оплата бонусами:  ${+card} ₽`)
        }

        this.display = this.title = this.body = '0'
      } else this.$message(`Введите правильную сумму`)
    },
    // ПОДТВЕРДИТЬ
    async payBonusMoney() {
      this.phoneNotParse = this.getLoginBonusPhone()

      const method = methods[8]
      const type = types[2]

      let response
      this.options = this.getLoginBonusOptions()
      

      this.options.params.pin.length > 0
        ? (this.payType = 'bonus')
        : (this.payType = 'card')
      // console.log('$$ this.payType', this.payType)        

      if (this.options.params.pin.length > 0) {
        this.loading = true

        let response = await this.storage.getClient(method, this.options, type)
        if (+response.result === 0) {
          this.loading = false

          this.balance = response.profile.b_balance
          this.firstname = response.profile.firstname
          this.lastname = response.profile.lastname
          this.messageIndex = 0

          this.setPaymentLimitMax(this.balance)

          this.emitBonusMoney(this.balance)
          this.changeRowOfTable(this.balance)

          // clear
          this.setLoginBonusPhone('')
          this.setLoginBonusPassword('')
          /* dev */
        //   this.timeoutDelay = setTimeout(() => {
        //   this.loading = false
        // }, this.delay)

        } else {
          this.$message(`Ошибка:  ${response.error}`)
          this.$router.push('/password')
        }
        
      }
    },

    setNumber(num, fixed) {
      if (num < 10 && this.amount < this.getPaymentLimitMax) {
        this.amountString = this.amount.toString() + num.toString()
        this.amount = parseInt(this.amountString)
      }
      if (fixed) {
        this.amount = 0
        if (this.amount + parseInt(num) <= 1000) this.amount = parseInt(num)
      }

      /* dev */
      this.timeoutMaxDelay = setTimeout(() => {
        if (this.amount > this.getPaymentLimitMax) {
          this.amount = this.getPaymentLimitMax
        }
        this.amountString = this.amount.toString()
        this.display = this.amountString
      }, (this.delay = 100))
    },

    backspace() {
      /* dev */
      this.amountString = this.amount.toString()

      let res = this.amountString.substring(0, this.amountString.length - 1)
      this.display = this.amountString = res
      this.amount = parseInt(res)
      if (this.amountString.length === 0) {
        this.amountString = '0'
        this.amount = 0
        this.display = this.amountString
      }
    },
  },
}
</script>

<style scoped>
.currency {
  padding-left: 1em;
  font-size: 3em;
}
.display {
  width: 0em;
  margin-top: 0em;
  margin-left: 0em;
  text-decoration: none;
  color: #ffffff;
  font-size: 10em;
  line-height: 1em;
  z-index: 1;

  font-weight: bold;
  font-family: 'Plumb-Medium';
}
.bonus-row {
  margin-top: 0em;
  z-index: 1;
}
.page-title {
  padding-top: 13em;
  padding-left: 4em;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 20em;
}

table {
  margin-top: -3em;
  margin-left: -0.2em;
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

.info-title {
  position: absolute;

  width: 800px;
  padding-top: 3em;
  padding-left: 0em;
  padding-right: 0em;
  padding-bottom: 0em;

  margin-top: 0em;
  margin-left: 0em;
  font-size: 3.5em;

  color: #ffffff;
  text-align: center;
  font-family: 'Plumb-Medium';
}

@-webkit-keyframes pulsate {
  50% {
    color: #fff;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.3), 0 0 5px #ffd, 0 0 8px #fff;
  }
}
@keyframes pulsate {
  50% {
    color: #fff;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.3), 0 0 5px #ffd, 0 0 8px #fff;
  }
}
#blink {
  /* color: rgb(245,245,245); */
  color: red;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.1);
  background: black;
  -webkit-animation: pulsate 1.2s linear infinite;
  animation: pulsate 1.2s linear infinite;
}
/* .loader {
  margin-left: 30em;
  margin-top: 0em;
  width: 4.5em;
} */
</style>
