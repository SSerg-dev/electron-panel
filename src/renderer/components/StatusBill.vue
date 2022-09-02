<template>
  <div>
    <section>
      <div align="center" class="page-title">
        <div class="info-title" style="margin-bottom: 4em">
          <h3>
            <div id="message" align="center">
              {{ `${getStatusBillMessages}` | localize }}
            </div>

            <div
              v-if="this.seconds >= 0"
              align="center"
              style="font-size: 2em; padding-top: 2em; padding-left: 0.5em"
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
    timeoutResolveDelay: null,
    timeoutRejectDelay: null,

    seconds: 45,
    cardMessageIndex: -1,
    card: 0,
    terminal: null,
    observer: null,
    sleepMs: 1000,
    message: null,
    isShow: false,
    terminalType: '',
    SUCCESS: 1,
    UNSUCCESS: 0,
  }),
  computed: {
    ...mapGetters({
      getSecondsGotoProgramMenu: 'getSecondsGotoProgramMenu',
      getStatusBill: 'getStatusBill',
      getStatusBillMessages: 'getStatusBillMessages',
      getPanelType: 'getPanelType',
    }),
  },
  watch: {
    getStatusBillMessages(flag) {},
    seconds(flag) {
      if (flag === 0) {
        this.loading = false
        this.$router.push('/')
      }
    },
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
      this.intervalMainMenu = setInterval(() => {
        this.seconds = seconds--
        this.observer = Observer.item

        switch (this.terminalType) {
          case 'pax':
            if (
              +this.observer.state > 0 &&
              +this.observer.state === +this.card &&
              +this.observer.status === this.SUCCESS
            ) {
              this.cardMessageIndex = 3
              this.setStatusBillMessagesIndex(this.cardMessageIndex)

              this.timeoutResolveDelay = setTimeout(() => {
                seconds = 0
                this.resolve(this.terminalType)
              }, 2000)
            } else if (+this.observer.status === this.UNSUCCESS) {
              this.cardMessageIndex = 4
              this.setStatusBillMessagesIndex(this.cardMessageIndex)

              this.timeoutRejectDelay = setTimeout(() => {
                this.reject(this.terminalType)
              }, 2000)
              if (this.$route.name !== 'home') this.$router.push('/')
            }
            break
          case 'vendotek':
            if (
              +this.observer.state > 0
              // && +this.observer.state === +this.card
            ) {
              this.cardMessageIndex = 3
              this.setStatusBillMessagesIndex(this.cardMessageIndex)

              this.timeoutResolveDelay = setTimeout(() => {
                seconds = 0
                this.resolve(this.terminalType)
              }, 2000)

            } else {
              this.cardMessageIndex = 4
              this.setStatusBillMessagesIndex(this.cardMessageIndex)

              if (this.$route.name !== 'home') this.$router.push('/')

              // this.reject(this.terminalType)
            }
            break

          default:
            break
        }
      }, 1000)
    },
    resolve(type) {
      if (type === 'vendotek') this.observer.state /= BCNet.VENDOTEK_MONEY_SCALE

      console.log('Операция одобрена, сумма:', this.observer.state)
      this.cardMessageIndex = 3
      this.setStatusBillMessagesIndex(this.cardMessageIndex)

      const panelType = this.getPanelType
      switch (panelType) {
        case 'wash':
          this.updateWetMoney(this.observer.state)
          break
        case 'vacuum':
          this.updateDryMoney(this.observer.state)
          break

        default:
          break
      }

      this.$message(
        `Операция терминала ${type} одобрена, сумма:  ${this.observer.state}`
      )

      //seconds = 0
      this.setCardBonusState()
      if (this.$route.name !== 'cash') this.$router.push('/cash')
    },
    reject(type) {
      this.$message(`Операция терминала ${type} отклонена`)
      this.$router.push('/')
    },
    setCardBonusState() {
      this.setIsPayBonusMoney(false)
      this.setIsAppendBonusMoney(true)
    },
    ...mapActions({
      fetchStatus: 'fetchStatus',
      updateWetMoney: 'updateWetMoney',
      updateDryMoney: 'updateDryMoney',
    }),
    ...mapMutations({
      setStatusBill: 'setStatusBill',
      setStatusBillMessagesIndex: 'setStatusBillMessagesIndex',
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsAppendBonusMoney: 'setIsAppendBonusMoney',
    }),
    ...mapGetters({
      getCardMoney: 'getCardMoney',
      getDefaultTerminalType: 'getDefaultTerminalType',
    }),
  },
  mounted() {
    this.card = this.getCardMoney()
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
    clearTimeout(this.timeoutResolveDelay)
    clearTimeout(this.timeoutRejectDelay)
  },

  components: {},
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
