<template>
  <div>
    <div v-if="this.messageIndex > -1" class="message">
      {{ `${this.messages[this.messageIndex]}` }}

      <!-- <div v-if="getSecondsBonusTimer > 0" style="font-size: 2em">
        {{ ` ${ getSecondsBonusTimer }` }}
      </div> -->

    </div>

    <div class="locate">
      <section>
        <div class="popup">
          <p>
            <img v-if="isStop" src="/imgs/popup/popup-stop.png" />
            <img v-if="isOperator" src="/imgs/popup/popup-operator.png" />
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
      `БЕСПЛАТНЫЙ СТОП`,
      `ВЫЗОВ ОТПРАВЛЕН, ОЖИДАЙТЕ`,
      ''
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
      getSecondsGotoPopupMenu: 'getSecondsGotoPopupMenu',
      getPanelType: 'getPanelType',
      getWetStopFreeCount: 'getWetStopFreeCount',
      getWetSpend: 'getWetSpend',
      getSecondsBonusTimer: 'getSecondsBonusTimer'
    })
  },
  watch: {
    
    /* getWetStopFreeCount(flag) {
      try {
        if (parseInt(flag) > 0) {
          this.isStop = true
          this.messageIndex = 0
        } else {
          this.isStop = false
          if (this.$route.name !== 'home') this.$router.push('/')
        }
      } catch (err) {}
    }, */

    getSecondsBonusTimer (flag) {
      try {
        if (parseInt(flag) > 0) {
          this.isStop = true
          this.messageIndex = 0
        } else {
          this.isStop = false
          if (this.$route.name !== 'home') this.$router.push('/')
        }
      } catch (err) {}
    }
  },
  methods: {
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',
      setActiveProgramKit: 'setActiveProgramKit',
      setIsActiveProgramKit: 'setIsActiveProgramKit'
    }),
    ...mapGetters({
      getActiveProgram: 'getActiveProgram',
      getActiveProgramKit: 'getActiveProgramKit',
      getIsActiveProgramKit: 'getIsActiveProgramKit'
    }),
    setup() {
      this.activeProgram = this.getActiveProgram()
      this.activeProgramKit = this.getActiveProgramKit()
      if (!this.getIsActiveProgramKit()) {
        this.setIsActiveProgramKit(false)
        this.delay = 1000

        // footer
        if (this.activeProgram === 'stop') {
          this.isStop = true
          this.messageIndex = 0
        }
        if (this.activeProgram === 'operator') {
          this.isOperator = true
          this.messageIndex = 1
        }
        if (this.activeProgram === 'turbo') {
          this.isTurbo = true
          this.messageIndex = 2
        }
      }
      
      if (this.getIsActiveProgramKit()) {
        // x2, turbo, color,
        //this.setIsActiveProgramKit(true)
        this.delay = 1000000
      }
      
    },

    gotoProgramMenu(seconds) {
      try {
        this.intervalPopupMenu = setInterval(() => {
          if (--seconds <= 0) {
            this.$router.push('/')
            return
          }
        }, this.delay)
      } catch (err) {
        console.warn(err)
      }
    }
  },
  mounted() {
    // console.log('PopupType actives-->', this.actives[24])

    this.setup()
    if (parseInt(this.getWetStopFreeCount) === 0) {
      this.gotoProgramMenu(this.getSecondsGotoPopupMenu)
    }
  },
  beforeDestroy() {
    this.setIsActiveProgramKit(false)
    clearInterval(this.intervalPopupMenu)
  },
  components: {
    PopupTypeActive
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
  width: 32rem;
  top: 50%;
  left: 28%;
  color: white;
  text-align: center;
  font-size: 3.5rem;
  font-weight: bold;
  z-index: 1000;
}
.popup {
  margin-top: 10em;
}
</style>
