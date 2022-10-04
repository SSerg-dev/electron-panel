<template>
  <div>
    <section>
      <ul class="collection">
        <!-- 1 cost -->
        <li class="collection-item cost" @click="payUp('cost')">
          <div
            class="card white waves-effect button-style"
            style="padding-left: 0em"
          >
            <div
              class="card-content black-text button-content-style"
              style="justify-content: center"
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
            <div class="card-content black-text button-content-style">
              💰 {{ 'CASH' | localize }}
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
          <div class="card white waves-effect button-style">
            <div class="card-content black-text button-content-style">
              💳 {{ 'BANK_CARD' | localize }}
            </div>
          </div>
        </li>

        <!-- 5 ₿ 🎁 -->
        <li v-if="getIsPing" class="collection-item" @click="payUp('bonus')">
          <div class="card white waves-effect button-style-bonus">
            <div class="card-content black-text button-content-style">
              🎁 {{ 'BONUSES' | localize }}
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import { ipcRenderer } from 'electron'

export default Vue.extend({
  data() {
    return {
      cash_enabler: false,
      isDirectCash: false,
      delay: 10000,
      timeoutDelay: null,
    }
  },
  props: ['type'],
  computed: {
    ...mapGetters({
      getWetBalance: 'getWetBalance',
      getMoneyToBonus: 'getMoneyToBonus',
      getIsPing: 'getIsPing',
      getTerminalInstalled: 'getTerminalInstalled',
    }),
  },
  watch: {
    getWetBalance(value) {
      if (value > 0 && this.getMoneyToBonus === 0) {
        /* dev */
        // this.setIsMoneyToBonusYes(false)
        this.setIsMoneyToBonus(false)
        this.$router.push('/cash')
      }
    },
  },

  mounted() {
    // initial timers
    /* dev */
    // this.$router.push('/finance')

    if (this.getWetBalance > 0) this.$router.push('/cash')

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
  },
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
  width: 64em;
  height: 11em;
  
  border: solid 6px #00b9e3;
  border-radius: 4em;
  box-shadow: 0px 10px 20px #00b9e3;
}
.button-style:hover {
  box-shadow: 0px 15px 30px #00b9e3;
}
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
  padding-top: 1.1em;
  display: flex;
  align-items: center;
  justify-content: left;
}


</style>
