<template>
  <div>
    <div class="locate">
      <router-link to="/">
        <div class="back">
          <img src="imgs/key/back.png" />
        </div>
      </router-link>

      <!-- dev -->
      <div v-if="this.balance < 1" class="message">
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

export default Vue.extend({
  name: 'card',
  data: () => ({
    intervalMainMenu: null,
    messages: [`Введите сумму пополнения`, `Минимальная сумма 10 руб`],
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
      getIsCardMoney: 'getIsCardMoney'
    })
  },

  methods: {
    ...mapActions({
      updateWetMoney: 'updateWetMoney'
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

        /* dev */
        const stream$ = item
        
        const observer = bankTerminal.observerItem
        stream$.subscribe(observer)
        
        switch (options.type) {
          case 'vendotek':
            this.flowSequenceVendotek(item)
            break
          // case 'pax':
          //   this.flowSequencePax(item)
          //   break

          default:
            break
        }
      }
    },

    flowSequenceVendotek(item) {
      
      const amount = this.card
      item.pay(amount)
      item.sendFINAL()
      /* dev */
      // this.updateWetMoney(this.card)
      
    },
    flowSequencePax(item) {
      console.log('++flowSequencePax')
      const amount = this.card

      
    },

    submitBonusHandler(balance) {
      this.balance = balance
    },
    
    submitCardHandler(card) {
      this.card = card
      this.initBankTerminal()
    },

    ...mapMutations({
      setRouter: 'setRouter',
      setIsCardMoney: 'setIsCardMoney'
    }),
    gotoMainMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        if (
          --seconds < 0 &&
          this.getWetBusyPanel === 'false' &&
          this.$route.name !== 'home'
        ) {
          // console.log('seconds-->', seconds)
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
  },
  beforeDestroy() {
    /* dev */
    // this.setIsCardMoney(false)
    // console.log('false++getIsCardMoney-->', this.getIsCardMoney)
  
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
  color:white; 
  font-size: 2.5em;
  z-index: 1;
}
.row {
  padding-top: 25em;
  padding-left: 4em;
}

</style>
