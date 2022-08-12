<template>
  <div>
    <div class="locate">
      <router-link to="/">
        <div class="back">
          <img src="imgs/key/back.png" />
        </div>
      </router-link>

      <!-- <div v-if="this.balance < 1" class="message"> -->
      <div
        v-if="
          this.balance < 1 &&
            !this.profile.isQrAuthorization &&
            !this.profile.isPhoneAuthorization
        "
        class="message"
      >
        <h3>
          <p align="center">
            {{ `${this.messages[0]}` }}
          </p>
        </h3>
      </div>
    </div>

    <section>
      <div class="row">
        <div><CardBill /></div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import CardBill from '@/components/CardBill'
import EventBus from '@/bus/EventBus'

import BankTerminalController from '@/controllers/BankTerminalController'
import Vendotek from '../services/BCNetService/Types/Vendotek'
import { type } from 'os'
import BCNet from '../services/BCNetService'

export default Vue.extend({
  name: 'card',
  data: () => ({
    profile: {
      isQrAuthorization: false,
      isPhoneAuthorization: false,
      isCashAuthorization: false,
      phone: '',
      balance: 0,
      firstname: '',
      lastname: ''
    },

    intervalMainMenu: null,
    messages: [`Введите сумму пополнения`, ` `],
    messageIndex: -1,
    balance: 0,
    card: 0,
    terminalItem: {}
  }),
  computed: {
    ...mapGetters({
      getWetBusyPanel: 'getWetBusyPanel',
      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu',
      getDefaultTerminalType: 'getDefaultTerminalType',
      getTerminalInstalled: 'getTerminalInstalled',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getIsCardMoney: 'getIsCardMoney',
      getProfile: 'getProfile'
    })
  },

  methods: {
    ...mapActions({
    }),
    initBankTerminal() {
      const bankTerminal = new BankTerminalController()

      if (this.getTerminalInstalled) {
        const options = {
          type: this.getDefaultTerminalType,
          number: this.getDefaultPanelNumber
        }
        bankTerminal.connect(options)
        
        const item = bankTerminal.terminalItem
        const stream$ = item
        const observer = bankTerminal.observerItem
        
        stream$.subscribe(observer)

        switch (options.type) {
          case 'vendotek':
            this.flowSequenceVendotek(item)
            break
          case 'pax':
            this.flowSequencePax(item)
            break

          default:
            break
        }
      }
    },

    flowSequenceVendotek(item) {
      const amount = this.card * BCNet.VENDOTEK_MONEY_SCALE
      item.pay(amount)
      item.sendFINAL()
    },
    
    flowSequencePax(item) {
      if (item !== undefined) {
      const amount = this.card
      item.pay(amount)
      } 
    },

    submitBonusHandler(balance) {
      if (balance !== undefined) {
        this.balance = balance
      }
    },

    submitCardHandler(card) {
      if (card !== undefined) {
        this.card = card
        this.initBankTerminal()
      }
    },

    ...mapMutations({
      setRouter: 'setRouter',
      setIsCardMoney: 'setIsCardMoney',
      setIsBonusMoney: 'setIsBonusMoney'
    }),
    gotoMainMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        if (
          --seconds < 0 &&
          this.getWetBusyPanel === 'false' &&
          this.$route.name !== 'home'
        ) {
          this.$router.push('/')
        }
      }, 1000)
    }
  },
  mounted() {

    this.setRouter('/card')
    this.setIsCardMoney(true)

    EventBus.$on('submitBonusMoney', this.submitBonusHandler)
    EventBus.$on('submitCardMoney', this.submitCardHandler)

    this.gotoMainMenu(this.getSecondsGotoMainMenu)

    /* dev */
    const {
      isQrAuthorization,
      isPhoneAuthorization,
      isCashAuthorization,
      phone,
      balance,
      firstname,
      lastname
    } = this.getProfile

    this.profile.isQrAuthorization = isQrAuthorization
    this.profile.isPhoneAuthorization = isPhoneAuthorization
    this.profile.isCashAuthorization = isCashAuthorization
    this.profile.phone = phone
    this.profile.balance = balance
    this.profile.firstname = firstname
    this.profile.lastname = lastname
  },
  beforeDestroy() {
    // this.setIsCardMoney(false)
    clearInterval(this.intervalMainMenu)
  },
  components: {
    CardBill
  }
})
</script>

<style scoped>
.locate {
  position: relative;
}
.back {
  position: absolute;
  margin-top: 8em;
  margin-left: 1.5em;
  z-index: 1;
}
.message {
  width: 800px;
  position: absolute;
  margin-top: 8.5em;
  margin-left: 3.5em;
  color: white;
  font-size: 2.5em;
  z-index: 1;
}
.row {
  padding-top: 25em;
  padding-left: 4em;
}
</style>
