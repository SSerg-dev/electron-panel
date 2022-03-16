<template>
  <div>
    <div class="message">
      <div>
        <p align="center">{{ `${this.messages[0]}` }}</p>
        <p align="center">{{ `${this.messages[1]}` }}</p>
        <div style="font-size: 2.2em;">
          <p align="center">{{ `${this.getWetBalance}` }}</p>
        </div>
        <p align="center">{{ `${this.messages[2]}` }}</p>
      </div>
    </div>

    <div class="message-info">
      <p align="center">{{ `${this.messages[3]}` }}</p>
      <p align="center">{{ `${this.messages[4]}` }}</p>
      <p align="center">{{ `${this.messages[5]}` }}</p>
      <p align="center">{{ `${this.messages[6]}` }}</p>
    </div>

    <div class="locate">
      <section>
        <div class="popup">
          <p>
            <img src="/imgs/popup/popup-bonus.svg" />
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters } from 'vuex'
import PopupTypeActive from '@/components/PopupTypeActive'

export default Vue.extend({
  data: () => ({
    activeProgram: '',
    activeProgramKit: {},

    intervalPopupMenu: null,
    isStop: false,
    isOperator: false,
    messages: [
      'На Ваш счет',
      'зачислено',
      'бонуса(ов)',
      'Баланс всегда доступен',
      'в личном кабинете',
      'в мобильном приложении',
      'ALLES BONUS'
    ],
    messageIndex: -1,
    delay: 0
  }),
  props: {
    actives: {
      required: true,
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      // getSecondsGotoPopupMenu: 'getSecondsGotoPopupMenu',
      // getPanelType: 'getPanelType',
      // getWetStopFreeCount: 'getWetStopFreeCount',
      // getWetSpend: 'getWetSpend',
      // getWetBalance: 'getWetBalance'
    })
  },
  watch: {
    // getWetStopFreeCount(flag) {
    //   try {
    //     if (parseInt(flag) > 0) {
    //       this.isStop = true
    //       this.messageIndex = 0
    //     } else {
    //       this.isStop = false
    //       if (this.$route.name !== 'program') this.$router.push('/program')
    //     }
    //   } catch (err) {}
    // }
  },
  methods: {
    ...mapMutations({
      // setActiveProgram: 'setActiveProgram',
      // setActiveProgramKit: 'setActiveProgramKit',
      // setIsActiveProgramKit: 'setIsActiveProgramKit'
    }),
    ...mapGetters({
      // getActiveProgram: 'getActiveProgram',
      // getActiveProgramKit: 'getActiveProgramKit',
      // getIsActiveProgramKit: 'getIsActiveProgramKit'
    }),
    setup() {
      // this.activeProgram = this.getActiveProgram()
      // this.activeProgramKit = this.getActiveProgramKit()
      // if (!this.getIsActiveProgramKit()) {
      //   this.setIsActiveProgramKit(false)
      //   this.delay = 1000

      //   // footer
      //   if (this.activeProgram === 'stop') {
      //     this.isStop = true
      //     this.messageIndex = 0
      //   }
      //   if (this.activeProgram === 'operator') {
      //     this.isOperator = true
      //     this.messageIndex = 1
      //   }
      //   if (this.activeProgram === 'turbo') {
      //     this.isTurbo = true
      //     this.messageIndex = 2
      //   }
      // }

      // if (this.getIsActiveProgramKit()) {
      //   this.delay = 1000000
      // }
    },

    gotoProgramMenu(seconds) {
      // try {
      //   this.intervalPopupMenu = setInterval(() => {
      //     if (--seconds <= 0) {
      //       this.$router.push('/program')
      //       return
      //     }
      //   }, this.delay)
      // } catch (err) {
      //   console.warn(err)
      // }
    }
  },
  mounted() {
    // console.log('PopupType actives-->', this.actives[24])

    console.log('++PopupBonus')

    /* this.setup()
    if (parseInt(this.getWetStopFreeCount) === 0) {
      this.gotoProgramMenu(this.getSecondsGotoPopupMenu)
    } */
  },
  beforeDestroy() {
    this.setIsActiveProgramKit(false)
    clearInterval(this.intervalPopupMenu)
  },
  components: {
    // PopupTypeActive
  }
})
</script>

<style scoped>
.page-title {
  padding-top: 0em;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 32rem;
}
h3 {
  color: white;
}
.locate {
  position: relative;
}
.message {
  position: absolute;
  top: 32%;
  left: 32%;
  color: white;
  font-size: 5em;
  z-index: 1000;
}
.message-info {
  position: absolute;
  padding: 1em 3.5em;
  top: 64%;
  left: 11.2%;
  color: white;
  border: solid 3px #00b9e3;
  border-radius: 0.5em;
  font-size: 3em;
  z-index: 1000;
}

.popup {
  margin-top: 10em;
  margin-left: 0.8em;
}
</style>
