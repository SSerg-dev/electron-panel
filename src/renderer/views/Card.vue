<template>
  <div>
    <div class="locate">
      <div class="back">
        <router-link to="/">
          <div class="card white small-button waves-effect">
            <div class="card-content- black-text small-button-title">
              <img style="width: 65%" src="@/assets/imgs/native/undo.png" />
            </div>
          </div>
        </router-link>
      </div>
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
      lastname: '',
    },

    intervalMainMenu: null,
    messages: [`Введите сумму пополнения`, ` `],
    messageIndex: -1,
    balance: 0,
    card: 0,
    terminalItem: {},
    isInitBankTerminal: false,
  }),
  computed: {
    ...mapGetters({
      getWetBusyPanel: 'getWetBusyPanel',
      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu',
      getDefaultTerminalType: 'getDefaultTerminalType',
      getTerminalInstalled: 'getTerminalInstalled',
      getPanelNumber: 'getPanelNumber',
      getIsCardMoney: 'getIsCardMoney',
      getProfile: 'getProfile',
      getPayType: 'getPayType',
    }),
  },

  methods: {
    ...mapActions({}),
    initBankTerminal() {
      const bankTerminal = new BankTerminalController()

      if (this.getTerminalInstalled) {
        const options = {
          type: this.getDefaultTerminalType,
          number: this.getPanelNumber,
        }
        bankTerminal.connect(options)

        const item = bankTerminal.terminalItem
        const stream$ = item

        if (!this.isInitBankTerminal) {
          const observer = bankTerminal.observerItem
          if (observer) stream$.subscribe(observer)
        }
        console.log('$$ Card.vue: 102', options.type, this.isInitBankTerminal)
        switch (options.type) {
          case 'vendotek':
            !this.isInitBankTerminal
              ? this.flowSequenceVendotek(item)
              : item.sendIDLE()
            // item.enable()
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
      console.log('$$ Card.vue: 122', this.card, BCNet.VENDOTEK_MONEY_SCALE)
      const amount = this.card * BCNet.VENDOTEK_MONEY_SCALE
      item.pay(amount)
      item.sendFINAL()
    },

    flowSequencePax(item) {
      if (item !== undefined) {
        const amount = this.card
        // console.log('$$ flowSequencePax')
        item.pay(amount)
      }
    },

    submitBonusHandler(balance) {
      // console.log('$$ submitBonusHandler', balance)
      if (balance !== undefined) {
        this.balance = balance
      }
    },

    submitCardHandler(card) {
      if (card !== undefined) {
        this.card = card
        this.isInitBankTerminal = false
        this.initBankTerminal()
        // if (this.getPayType === 'card') {
        //   console.log('$$ submitCardHandler', card)
        //   this.initBankTerminal()
        // }
      }
    },

    ...mapMutations({
      setRouter: 'setRouter',
      setPayType: 'setPayType',
      setIsCardMoney: 'setIsCardMoney',
      setIsBonusMoney: 'setIsBonusMoney',
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
    },
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
      lastname,
    } = this.getProfile

    this.profile.isQrAuthorization = isQrAuthorization
    this.profile.isPhoneAuthorization = isPhoneAuthorization
    this.profile.isCashAuthorization = isCashAuthorization
    this.profile.phone = phone
    this.profile.balance = balance
    this.profile.firstname = firstname
    this.profile.lastname = lastname

    /* dev */
    // this.isInitBankTerminal = true
    // console.log('$$ getPayType', this.getPayType)
    // this.initBankTerminal()
  },
  beforeDestroy() {
    // this.setIsCardMoney(false)
    // this.isInitBankTerminal = false
    clearInterval(this.intervalMainMenu)
  },
  components: {
    CardBill,
  },
})
</script>

<style scoped>
.locate {
  position: relative;
}
.back {
  position: fixed;
  top: 11em;
  left: 2.5em;
  z-index: 99;
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
.small-button {
  width: 125px;
  height: 120px;
  border: solid 6px #00b9e3;
  border-radius: 2.5em;
  box-shadow: 0px 6px 10px #00b9e3;
}
.small-button-title {
  padding-top: 1em;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
