<template>
  <div>
    <section>
      <div align="center" class="page-title">
        <div class="info-title" style="margin-bottom: 4em;">
          <h3>
            
            <div id="message" align="center">
              {{ ` ${ getStatusBillMessages } ` }}
            </div>
            <!-- <input v-model="isShow" v-if="isShow"> -->
            <!-- <div v-if="isShow" align="center">
              {{ ` SSS ` }}
            </div> -->

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
    })
  },
  watch: {
    getStatusBillMessages(flag) {
      console.log('getStatusBillMessages flag-->', flag)
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
        this.seconds = seconds
        
        this.observer = Observer.item
        
        if (this.observer.state > 0 && this.observer.state === this.card) {
          console.log('Операция одобрена, сумма:', this.observer.state)
          this.cardMessageIndex = 3
          this.setStatusBillMessagesIndex(this.cardMessageIndex)

          /* dev */
          this.updateWetMoney(this.observer.state)

          this.$message(`Операция одобрена, сумма:  ${this.observer.state}`)
          this.sleep(this.sleepMs)
          seconds = 0
          /* dev */
          this.setCardBonusState()
          // this.$router.push('/bonus')
          this.$router.push('/cash')
          
        }

        if (!(typeof this.observer.state === 'number') && this.card > 0) {
          
          this.cardMessageIndex = 4
          this.setStatusBillMessagesIndex(this.cardMessageIndex) 
          
          
          this.$message(`Операция отклонена`)
          this.sleep(this.sleepMs)
          this.$router.push('/')
        }
        
        /* dev */  
        // if (--seconds < 0 && this.$route.name !== 'program') {
        //   this.$router.push('/program')
        // }
      }, 1000)
    },
    /* dev */
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
      setCardMoney: 'setCardMoney',
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsAppendBonusMoney: 'setIsAppendBonusMoney'
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
</style>
