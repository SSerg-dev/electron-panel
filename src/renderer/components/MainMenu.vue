<template>
  <div>
    <section>
      <ul class="collection">
        <!-- 1 cost -->
        <li
          v-if="
            (getWetIsShowPrice && getPanelType === 'wash') ||
            (getDryIsShowPrice && getPanelType === 'vacuum')
          "
          class="collection-item cost"
          @click="payUp('cost')"
        >
          <div
            class="card white waves-effect button-style"
            style="padding-left: 0em;  padding-top: 1.8em;"
          >
            <div
              class="card-content black-text button-content-style"
              style="justify-content: center;"
            >
              {{ 'PROGRAMS_COST' | localize }}
            </div>
          </div>
        </li>

        <!-- 2 -->
        <li class="collection-item title-pay">
          <h2 align="center">{{ 'Choose_your_payment_method' | localize }}</h2>
        </li>

        <!-- 3 -->
        <li class="collection-item cash" @click="payUp('cash')">
          <div class="card white waves-effect button-style">
            <div
              class="card-content black-text button-content-style"
              style="justify-content: left"
            >
              <!-- <div class="emoji">💰</div> -->
                <img style="width: 8%; height: 8%;" src="@/assets/imgs/native/money.png" />
              &nbsp;&nbsp;
              <div class="align-content">{{ 'CASH' | localize }}</div>
            </div>
          </div>
        </li>

        <!-- 4  -->
        <!-- v-if="getIsPing && getTerminalInstalled" -->
        <!-- v-if="getTerminalInstalled" -->
        <li
          v-if="getIsPing && getTerminalInstalled"
          class="collection-item"
          @click="payUp('card')"
        >
          <div class="card white waves-effect button-style"
          style="padding-top: 0.6em;"
          >
            <div
              class="card-content black-text button-content-style"
              style="justify-content: left"
            >
              <!-- <div class="emoji">💳</div> -->
              <img style="width: 8%; height: 8%;" src="@/assets/imgs/native/credit-card.png" />

              &nbsp;&nbsp;
              <div class="align-content">{{ 'BANK_CARD' | localize }}</div>

              <!-- <img src="@/assets/imgs/sbp/sbp.svg"  style="width: 8%"/> -->
            </div>
          </div>
        </li>

        <!-- 5 ₿ -->
        <li v-if="getIsPing" class="collection-item" @click="payUp('bonus')">
          <div class="card white waves-effect button-style-bonus"
          style="padding-top: 0.6em;">
            <div
              class="card-content black-text button-content-style"
              style="justify-content: left"
            >
              <!-- <div class="emoji">🎁</div> -->
              <img style="width: 8%; height: 8%;" src="@/assets/imgs/native/bitcoin.png"/>
              &nbsp;&nbsp;
              <div class="align-content">{{ `BONUSES` | localize }}</div>
            </div>
          </div>
        </li>
        <!-- <li style="font-size: 10em;">
          {{ `🇬🇧` }}
        </li> -->
      </ul>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import { Component, Box, Circle, Button } from '@/shapes/index.js'

import { ipcRenderer } from 'electron'

export default Vue.extend({
  data() {
    return {
      cash_enabler: false,
      isDirectCash: false,
      delay: 10000,
      timeoutDelay: null,

      /* dev */
      /* isDown: {
      price: false,
    }, */
      buttonPrice: null,

      emoji: '',
    }
  },
  props: ['type'],
  computed: {
    ...mapGetters({
      getWetBalance: 'getWetBalance',
      getMoneyToBonus: 'getMoneyToBonus',
      getIsPing: 'getIsPing',
      getTerminalInstalled: 'getTerminalInstalled',
      getIsStandbyFreeEnable: 'getIsStandbyFreeEnable',
      getWetIsShowPrice: 'getWetIsShowPrice',
      getDryIsShowPrice: 'getDryIsShowPrice',
      getPanelType: 'getPanelType',
    }),
  },
  watch: {
    getWetBalance(value) {
      // console.log('$$ MainMenu: 97', value, this.getMoneyToBonus, this.getIsStandbyFreeEnable)
      if (
        value > 0 &&
        +this.getMoneyToBonus === 0
        // || (value > 0 && this.getMoneyToBonus === 0 && this.getIsStandbyFreeEnable)
      ) {
        /* dev */
        // this.setIsMoneyToBonusYes(false)
        this.setIsMoneyToBonus(false)
        this.$router.push('/cash')
      }
    },
  },

  mounted() {
    this.initial()

    if (this.getWetBalance > 0) this.$router.push('/cash')

    // initial timers
    this.setIsFirstTimer(true)
    this.setSecondsFirstTimer(15)

    this.setIsMoneyToBonusYes(false)
    this.setMoneyToBonus(0)
    this.setIsMoneyToBonus(false)

    this.setIsCardMoney(false)
    this.setIsBonusMoney(false)

    this.setIsPayCardMoney(false)
    this.setIsPayBonusMoney(false)

    this.isDirectCash = this.getDirectCash()

    if (this.isDirectCash) {
      this.timeoutDelay = setTimeout(() => {
        this.setEnabler()
      }, this.delay)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
  },
  created() {},

  methods: {
    ...mapGetters({
      getCashEnabler: 'getCashEnabler',
      getIsPayCardMoney: 'getIsPayCardMoney',
      getDirectCash: 'getDirectCash',
      getSecondsFirstTimer: 'getSecondsFirstTimer',
    }),
    ...mapMutations({
      setCashEnabler: 'setCashEnabler',
      setIsConfig: 'setIsConfig',
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsAppendBonusMoney: 'setIsAppendBonusMoney',
      setIsPayCardMoney: 'setIsPayCardMoney',
      setIsFirstTimer: 'setIsFirstTimer',
      setSecondsFirstTimer: 'setSecondsFirstTimer',
      setIsMoneyToBonusYes: 'setIsMoneyToBonusYes',
      setMoneyToBonus: 'setMoneyToBonus',
      setIsMoneyToBonus: 'setIsMoneyToBonus',

      setIsCardMoney: 'setIsCardMoney',
      setIsBonusMoney: 'setIsBonusMoney',
      setPayType: 'setPayType',
      setPrevRouter: 'setPrevRouter',
    }),

    payUp(program) {
      switch (program) {
        case 'bonus':
          this.setIsAppendBonusMoney(false)
          this.setIsPayBonusMoney(true)

          this.setIsPayCardMoney(true)
          this.setPayType('bonus')
          this.$router.push('/bonus')
          break
        case 'card':
          this.setIsPayCardMoney(false)

          this.setPayType('card')
          this.$router.push('/card')
          break
        case 'cost':
          this.setPrevRouter('/')
          this.$router.push('/cost')
          break
        case 'cash':
          this.setEnabler()

          this.setPayType('cash')
          this.$router.push('/cash')
          break

        default:
          break
      }
    },

    setEnabler() {
      this.getCashEnabler() === false
        ? (this.cash_enabler = true)
        : (this.cash_enabler = false)

      this.setCashEnabler(this.cash_enabler)
      ipcRenderer.send('cash_enabler', 'true')
    },
    initial() {},
  }, // end methods
})
</script>

<style scoped>
.collection {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0em;
  border-color: #121212;
  padding-top: 8em;
}
.collection-item {
  margin-bottom: 2em;
  background-color: #121212;
  border-color: #121212;
}
h2 {
  color: white;
  margin-top: 0em;
  margin-left: -0.6em;
  justify-content: center;
}
section {
  margin-top: 18em;
  margin-left: 3em;
}
.button-style {
  padding-left: 4em;
  padding-bottom: 0em;
  
  width: 64em;
  height: 11em;

  border: solid 6px #00b9e3;
  border-radius: 4em;
  box-shadow: 0px 10px 20px #00b9e3;
}
/* .button-style:hover {
  box-shadow: 0px 15px 30px #00b9e3;
} */
.button-style-bonus {
  padding-left: 4em;
  width: 64em;
  height: 11em;

  border: solid 6px rgb(118, 255, 3);
  border-radius: 4em;
  box-shadow: 0px 10px 20px rgb(118, 255, 3);
}
/* rgb(118, 255, 3); */
.button-content-style {
  font-size: 4em;
  padding-top: 0.6em;
  padding-left: 0em;
  /* text-shadow: 2px 2px 4px #3a3a37, -1px 1px 1px #f3f2e7; */

  display: flex;
  align-items: center;
  justify-content: left;
}

.price {
  /* position: absolute; */
  margin-top: 0em;
  margin-left: 0em;
}
/* .emoji {
  text-shadow: 6px 6px 6px #3a3a37, -1px 1px 1px #5c5710;
  font-family: 'Emoji-Regular';
} */
.button-price-style {
  font-size: 6.5em;
  font-family: 'Plumb-Medium';
  margin-left: 0em;
  padding-top: 0em;
  padding-right: 0em;

  display: flex;
  align-items: center;
  justify-content: center;
}
.align-content {
  display: flex;
  align-items: center;
  justify-content: left;
}


</style>
