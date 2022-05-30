<template>
  <div>
    <section>
      <div align="center" class="page-title">
        <div class="info-title" style="margin-bottom: 4em;">
          <h3>
            <div id="message" align="center">
              {{ ` ${getStatusBillMessages} ` }}
            </div>
            <!-- <input v-model="isShow" v-if="isShow"> -->
            <!-- <div v-if="isShow" align="center">
              {{ ` SSS ` }}
            </div> -->

            <div
              v-if="this.seconds >= 0"
              align="center"
              style="font-size: 2em; padding-top: 2em; padding-left: 0.5em;"
            >
              {{ `${this.seconds}` }}
            </div>
          </h3>
        </div>

        <div>
          <img src="/imgs/arrow/arrow.png" />
        </div>

        <div v-if="loading">
          <loader
            object="#33ddff"
            color1="#ffffff"
            color2="#3217fd"
            size="20"
            speed="2"
            bg="#343a40"
            objectbg="#999793"
            opacity="0"
            name="dots"
          ></loader>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import EventBus from '@/bus/EventBus'
import BCNet from '../services/BCNetService'
const Observer = require('../services/BCNetService/Types/Observer.js')

export default Vue.extend({
  name: 'setting-panel-type',
  data: () => ({
    loading: true,

    intervalMainMenu: null,
    seconds: 45,
    cardMessageIndex: -1,
    card: 0,
    terminal: null,
    observer: null,
    sleepMs: 1000,
    message: null,
    isShow: false,
    terminalType: '',
    SUCCESS: 1
    
  }),
  computed: {
    ...mapGetters({
      getSecondsGotoProgramMenu: 'getSecondsGotoProgramMenu',
      getStatusBill: 'getStatusBill',
      getStatusBillMessages: 'getStatusBillMessages'
    })
  },
  watch: {
    getStatusBillMessages(flag) {},
    seconds(flag) {
      if (flag === 0) {
        this.loading = false
        this.$router.push('/')
      }
    }
  },

  methods: {
    sleep(ms) {
      const date = Date.now()
      let currentDate = null
      do {
        currentDate = Date.now()
      } while (currentDate - date < ms)
    },
    gotoMainMenu(seconds) {
      // this.sleep(this.sleepMs)
      this.intervalMainMenu = setInterval(() => {
        this.seconds = seconds--
        this.observer = Observer.item

        // console.log('$$ gotoMainMenu list:', this.observer.state, this.card, this.observer.status)

        if (+this.observer.state > 0 && +this.observer.state === +this.card && +this.observer.status === this.SUCCESS) {
          console.log('Операция одобрена, сумма:', this.observer.state)
          this.cardMessageIndex = 3
          this.setStatusBillMessagesIndex(this.cardMessageIndex)
          this.updateWetMoney(this.observer.state)
          this.$message(`Операция одобрена, сумма:  ${this.observer.state}`)
          
          seconds = 0
          this.setCardBonusState()
          this.$router.push('/cash')
        } 
        /* else {
          switch (this.terminalType) {
            case 'pax':
              if (+this.observer.state === 0 +this.card > 0) {
                this.$message(`Операция терминала pax отклонена`)
              }
              break
            case 'vendotek':
              if (
                !(typeof this.observer.state === 'number') &&
                +this.card > 0
              ) {
                this.$message(`Операция терминала vendotek отклонена`)
              }

              break

            default:
              this.$message(`Неизвестный терминал`)
              break
          }
          this.cardMessageIndex = 4
          this.setStatusBillMessagesIndex(this.cardMessageIndex)
          this.sleep(this.sleepMs)
          if (+this.seconds === 0) {
            this.$router.push('/')  
          }
          
        } */
      }, 1000)
    },
    setCardBonusState() {
      this.setIsPayBonusMoney(false)
      this.setIsAppendBonusMoney(true)
    },
    ...mapActions({
      fetchStatus: 'fetchStatus',
      updateWetMoney: 'updateWetMoney'
    }),
    ...mapMutations({
      setStatusBill: 'setStatusBill',
      setStatusBillMessagesIndex: 'setStatusBillMessagesIndex',
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsAppendBonusMoney: 'setIsAppendBonusMoney',
      setCardMoney: 'setCardMoney'
    }),
    ...mapGetters({
      getCardMoney: 'getCardMoney',
      getDefaultTerminalType: 'getDefaultTerminalType'
    })
  },
  mounted() {
    this.card = this.getCardMoney()
    /* $$dev */

    this.terminalType = this.getDefaultTerminalType()

    switch (this.terminalType) {
      case 'pax':
        this.terminal = BCNet.Pax.item
        // console.log('BCNet.Pax.item', BCNet.Pax.item)
        break
      case 'vendotek':
        this.terminal = BCNet.Vendotek.item
        // console.log('BCNet.Vendotek.item', BCNet.Vendotek.item)
        break

      default:
        break
    }

    // todo this.setStatusBill from ...
    this.setStatusBill('card')

    const type = this.getStatusBill

    switch (type) {
      case 'card':
        this.cardMessageIndex = 5
        this.setStatusBillMessagesIndex(this.cardMessageIndex)
        break
      case 'bonus':
        break

      default:
        break
    }

    this.gotoMainMenu(this.seconds) // this.getSecondsGotoMainMenu
  },

  beforeDestroy() {
    clearInterval(this.intervalMainMenu)
  },

  components: {}
})
</script>

<style scoped>
.locate {
  position: relative;
}
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
}
/* [v-cloak] {
  display: none;
} */
.progress .determinate {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #40c4ff;
  transition: width 0.3s linear;
}
</style>
