<template>
  <div>
    <section>
      <div align="center" class="page-title">
        <div class="info-title" style="margin-bottom: 4em;">
          <h3>
            <div align="center">
              {{ ` ${this.getStatusBillMessages} ` }}
            </div>

            <div
              v-if="this.seconds > 0"
              align="center"
              style="font-size: 2em; padding-top: 2em;"
            >
              {{ `${this.seconds}` }}
            </div>
          </h3>
        </div>

        <div>
          <img src="/imgs/arrow/arrow.png" />
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
    intervalMainMenu: null,
    seconds: 42,
    cardMessageIndex: 5,
    card: 0,
    terminal: null,
    observer: null
  }),
  computed: {
    ...mapGetters({
      getSecondsGotoProgramMenu: 'getSecondsGotoProgramMenu',

      getStatusBill: 'getStatusBill',
      getStatusBillMessages: 'getStatusBillMessages'
    })
  },

  methods: {
    gotoMainMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        this.seconds = seconds

        this.observer = Observer.item

        if (this.observer.state > 1 && this.observer.state === this.card) {
          console.log('Операция одобрена, сумма:', this.observer.state)
          this.cardMessageIndex = 3
          this.setStatusBillMessagesIndex(this.cardMessageIndex)

          /* dev */
          // this.updateWetMoney(this.observer.state)
          
          this.$message(`Операция одобрена, сумма:  ${this.observer.state}`)
          seconds = 0
        }

        //  if (this.observer.state !== 1) {
        //  console.log('this.observer.state typeof-->',typeof this.observer.state)
        //  console.log('this.observer.state -->',this.observer.state)
        //  }
           
        /* if (this.observer.state === 0) {  
          console.log('Операция отклонена')
          this.cardMessageIndex = 4
          this.setStatusBillMessagesIndex(this.cardMessageIndex)

          this.$message(`Операция отклонена`)
          seconds = 0
        } */




        if (--seconds < -4 && this.$route.name !== 'program') {
          this.$router.push('/program')
        }
      }, 1000)
    },

    ...mapActions({
      fetchStatus: 'fetchStatus',
      updateWetMoney: 'updateWetMoney'
    }),
    ...mapMutations({
      setStatusBill: 'setStatusBill',
      setStatusBillMessagesIndex: 'setStatusBillMessagesIndex',
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
</style>
