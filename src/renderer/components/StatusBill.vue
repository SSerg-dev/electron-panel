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
    seconds: 60,
    cardMessageIndex: -1,
    card: 0,
    terminal: null,
    observer: null,
    sleepMs: 4000,
    message: null,
    isShow: false
  }),
  computed: {
    ...mapGetters({
      getSecondsGotoProgramMenu: 'getSecondsGotoProgramMenu',
      getStatusBill: 'getStatusBill',
      getStatusBillMessages: 'getStatusBillMessages'
      /* dev */
      // width() {
      //   return `${this.seconds}%`
      // },
    })
  },
  watch: {
    getStatusBillMessages(flag) {
      // console.log('getStatusBillMessages flag-->', flag)
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
      this.intervalMainMenu = setInterval(() => {
        this.seconds = seconds--
        this.observer = Observer.item

        if (this.observer.state > 0 && this.observer.state === this.card) {
          console.log('Операция одобрена, сумма:', this.observer.state)
          this.cardMessageIndex = 3
          this.setStatusBillMessagesIndex(this.cardMessageIndex)
          this.updateWetMoney(this.observer.state)
          this.$message(`Операция одобрена, сумма:  ${this.observer.state}`)
          this.sleep(this.sleepMs)
          seconds = 0
          this.setCardBonusState()
          this.$router.push('/cash')
        }

        if (!(typeof this.observer.state === 'number') && this.card > 0) {
          this.cardMessageIndex = 4
          this.setStatusBillMessagesIndex(this.cardMessageIndex)

          this.$message(`Операция отклонена`)
          this.sleep(this.sleepMs)
          this.$router.push('/')
        }
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
      getCardMoney: 'getCardMoney'
    })
  },
  mounted() {
    this.card = this.getCardMoney()
    this.terminal = BCNet.Vendotek.item

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
