<template>
  <div>
    <!-- <div class="page-title">
      <h3>
        <p>
          PopupType<br />
        </p>
      </h3>
    </div> -->
    <div v-if="this.messageIndex > -1" class="popup-message">
      {{ `${this.messages[this.messageIndex]}` }}
    </div>
    <div class="locate">
      <section>
        <div class="row">
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
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters } from 'vuex'

export default Vue.extend({
  data: () => ({
    activeProgram: '',
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
      'КНОПКА СТОП ОСТАНАВЛИВАЕТ ДВИГАТЕЛЬ',
      'ВЫЗОВ ОТПРАВЛЕН, ОЖИДАЙТЕ',
      ''
    ],
    messageIndex: -1
  }),
  computed: {
    ...mapGetters({
      getSecondsGotoPopupMenu: 'getSecondsGotoPopupMenu'
    })
  },
  methods: {
    ...mapMutations({
      setActiveProgram: 'setActiveProgram'
    }),
    ...mapGetters({
      getActiveProgram: 'getActiveProgram'
    }),

    setup() {
      this.activeProgram = this.getActiveProgram()

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
        this.activeProgram === 'air'
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

    },

    gotoPopupMenu(seconds) {
      this.intervalPopupMenu = setInterval(() => {
        if (--seconds < 0 && this.$route.name !== 'program') {
          this.$router.push('/program')
        }
      }, 1000)
    }
  },
  mounted() {
    this.setup()
    this.gotoPopupMenu(this.getSecondsGotoPopupMenu)
  },
  beforeDestroy() {
    clearInterval(this.intervalPopupMenu)
  },
  components: {}
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
.popup-message {
  position: absolute;
  width: 32rem;
  top: 60%;
  left: 30%;
  color: white;
  text-align: center;
  font-size: 3.5rem;
  font-weight: bold;
  z-index: 1;
}
</style>
