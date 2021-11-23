<template>
  <div>
    <div v-if="this.messageIndex > -1" class="message">
      {{ `${this.messages[this.messageIndex]}` }}
      <div v-if="getWetStopFreeCount > 0" style="font-size: 2em">
        {{ ` ${getWetStopFreeCount}` }}
      </div>
    </div>

    <div class="locate">
      <section>
        <div class="popup">
          <p>
            <img v-if="isBasic" src="/imgs/popup/popup-basic.png" />
            <img v-if="isFoam" src="/imgs/popup/popup-foam.png" />
            <img v-if="isBrush" src="/imgs/popup/popup-brush.png" />
            <img v-if="isWasher" src="/imgs/popup/popup-washer.png" />
            <img v-if="isAir" src="/imgs/popup/popup-air.png" />
            <img v-if="isStop" src="/imgs/popup/popup-stop.png" />
            <img v-if="isOperator" src="/imgs/popup/popup-operator.png" />
            <img v-if="isTurbo" src="/imgs/popup/popup-turbo.png" />
          </p>
        </div>

        <div v-if="this.getIsActiveProgramKit()" class="active">
          <!-- <PopupTypeActive :activeProgramKit="activeProgramKit"/> -->
          <PopupTypeActive :actives = "actives" />  
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
    isBasic: false,
    isFoam: false,
    isBrush: false,
    isWasher: false,
    isAir: false,
    isStop: false,
    isOperator: false,
    isTurbo: false,
    messages: [
      `КНОПКА СТОП ОСТАНАВЛИВАЕТ ДВИГАТЕЛЬ`, 
      `ВЫЗОВ ОТПРАВЛЕН, ОЖИДАЙТЕ`,
      ''
    ],
    messageIndex: -1,
    delay: 0

    // activeKit: ''
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
      getWetStopFreeCount: 'getWetStopFreeCount'
    })
  },
  watch: {
    getWetStopFreeCount(flag) {
      try {
        if (parseInt(flag) === 0) this.$router.push('/program')
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
      // console.log('this.activeProgram-->', this.activeProgram)
      this.activeProgramKit = this.getActiveProgramKit()
      // console.log('this.activeProgramKit-->', this.activeProgramKit)

      if (!this.getIsActiveProgramKit()) {
        this.setIsActiveProgramKit(false)
        this.delay = 1000
        // 1 blue
        if (
          this.activeProgram === 'disk' ||
          this.activeProgram === 'disk_x2' ||
          this.activeProgram === 'mosquito' ||
          this.activeProgram === 'mosquito_x2' ||
          this.activeProgram === 'shampoo' ||
          this.activeProgram === 'shampoo_x2' ||
          this.activeProgram === 'waterShampoo' ||
          this.activeProgram === 'waterShampoo_turbo' ||
          this.activeProgram === 'warmWater' ||
          this.activeProgram === 'warmWater_turbo' ||
          this.activeProgram === 'coldWater' ||
          this.activeProgram === 'coldWater_turbo' ||
          this.activeProgram === 'waxProtection' ||
          this.activeProgram === 'waxProtection_turbo' ||
          this.activeProgram === 'dryShine' ||
          this.activeProgram === 'dryShine_turbo'
        )
          this.isBasic = true
        // 2 red
        if (
          this.activeProgram === 'foam' ||
          this.activeProgram === 'foam_color' ||
          this.activeProgram === 'foam_x2'
        )
          this.isFoam = true
        // 3 dark green
        if (
          this.activeProgram === 'brushFoam' ||
          this.activeProgram === 'brushFoam_color' ||
          this.activeProgram === 'brushFoam_x2'
        )
          this.isBrush = true
        // 4 marin
        if (
          this.activeProgram === 'washer' ||
          this.activeProgram === 'vacuum' ||
          this.activeProgram === 'turboDryer' ||
          this.activeProgram === 'air' ||
          this.activeProgram === 'blacking' ||
          this.activeProgram === 'disinfection'
        )
          this.isWasher = true
        // 5 green
        /* if (
        this.activeProgram === 'air'
      ) this.isAir = true */

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
        this.setIsActiveProgramKit(true)
        this.delay = 10000000

      }
    },

    gotoProgramMenu(seconds) {
      try {
        this.intervalPopupMenu = setInterval(() => {
          if (--seconds <= 0) {
            this.$router.push('/program')
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
    /* dev */
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
  z-index: 1;
}
.popup {
  margin-top: 10em;
}
</style>
