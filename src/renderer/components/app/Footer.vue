<template>
  <div v-if="getIsFooter">
    <div class="footer-panel white-text">
      
        <!-- {{ `ДОМОЙ` }} -->
        <!-- home keyboard_backspace -->

        <!-- 
        <div>
          <div class="home">
            <div
              v-if="this.isDown.home === false"
              style="
                background-image: url('./imgs/operator/home-down.png');
                width: 401px;
                height: 106px;
              "
              @click="goHome('home')"
            >
              <div class="button-title-long button-title-home">
                <i class="large material-icons">home</i>
              </div>
            </div>
            <div
              v-if="this.isDown.home === true"
              style="
                background-image: url('./imgs/operator/home-up.png');
                width: 401px;
                height: 106px;
              "
            >
              <div class="button-title-long button-title-home">
                <i class="large material-icons">home</i>
              </div>
            </div>
          </div>
        </div> 
        -->

        <!-- background-image: url('./imgs/stop/stop-down.png'); -->
        <div v-if="this.$route.name === 'program'">
          <div
            v-if="this.isDown.stop === false"
            class="stop"
            style="background-image: url('./imgs/stop/stop-down.svg')"
            @click="setProgram('stop')"
          >
            <div class="button-title-long button-title-stop">
              {{ `STOP` | localize }}
            </div>
          </div> 

          <div
            v-if="this.isDown.stop === true"
            class="stop"
            style="background-image: url('./imgs/stop/stop-up.svg')"
          >
            <div class="button-title-long button-title-stop">
              {{ `STOP` | localize }}
            </div>
          </div>
        </div>

        <div>
          <div class="operator">
            <!-- ./../src/renderer/assets/imgs/operator/operator-down.png -->
            <div
              v-if="this.isDown.operator === false"
              style="
                background-image: url('./imgs/operator/operator-down.png');
                width: 401px;
                height: 106px;
              "
              @click="setProgram('operator')"
            >
              <div class="button-title-long button-title-operator">
                {{ `CONSULTANT` | localize }}
              </div>
            </div>

            <div
              v-if="this.isDown.operator === true"
              style="
                background-image: url('./imgs/operator/operator-up.png');
                width: 401px;
                height: 106px;
              "
              @click="setProgram('operator')"
            >
              <div class="button-title-long button-title-operator">
                {{ `CONSULTANT` | localize }}
              </div>
            </div>
          </div>
        </div>
      
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

import { Queue } from '@/queue/index.js'
import { log } from '../../../main/utils'

// import {} from '../../../renderer/assets/imgs/operator/'

export default {
  data: () => ({
    active: '',
    timeoutPopup: null,
    timeoutDelay: null,
    delay: 500,
    isDown: {
      stop: false,
      operator: false,
      home: false,
    },
  }),
  computed: {
    ...mapGetters({
      getVacuumNumber: 'getVacuumNumber',
      getWetBalance: 'getWetBalance',

      getPanelType: 'getPanelType',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getWetBalance: 'getWetBalance',
      getPanelType: 'getPanelType',
      getIsFooter: 'getIsFooter',
      getWetStopFreeCount: 'getWetStopFreeCount',
      getIsMoneyToBonus: 'getIsMoneyToBonus',

      getIsMoneyToBonusNo: 'getIsMoneyToBonusNo',
      getMoneyToBonus: 'getMoneyToBonus',
      getSecondsBonusTimer: 'getSecondsBonusTimer',
      getIsFirstTimer: 'getIsFirstTimer',
    }),
  },
  watch: {
    /* dev */
    getWetStopFreeCount(flag) {
      try {
        if (
          parseInt(flag) > 0 &&
          +this.getMoneyToBonus === 0 &&
          this.getIsFirstTimer
        ) {
          this.setMoneyToBonus(this.getWetBalance)
          this.setIsMoneyToBonus(true)
        }
      } catch (err) {}
    },

    /* dev */
    /* getSecondsBonusTimer(flag) {
      try {
        if (
          parseInt(flag) > 0 &&
          +this.getMoneyToBonus === 0 &&
          this.getIsFirstTimer
        ) {
          this.setMoneyToBonus(this.getWetBalance)
          this.setIsMoneyToBonus(true)
        }
      } catch (err) {}
    } */
  },
  mounted() {
    this.setup()

    // this.setIsMoneyToBonus(false)
    // this.setMoneyToBonus(0)
  },

  methods: {
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',
      setIsMoneyToBonus: 'setIsMoneyToBonus',
      setMoneyToBonus: 'setMoneyToBonus',
    }),
    ...mapGetters({}),
    ...mapActions({
      updateStartProgram: 'updateStartProgram',
      updateDryStartProgram: 'updateDryStartProgram',
    }),
    setup() {
      // onmousemove
      // 300 440 - 760 560
      // onmousedown = (evt) => console.log("mouse location:", evt.x, evt.y)
    },

    goHome(program) {
      this.isDown.home = true
      this.timeoutDelay = setTimeout(() => {
        this.isDown.home = false
        try {
          if (this.$route.name !== 'home') this.$router.push('/')
        } catch (err) {}
      }, this.delay)
    },

    setProgram(program) {
      this.active = program
      this.setActiveProgram(this.active)
      this.setDown(program)
      const type = this.getPanelType

      switch (type) {
        case 'wash':
          console.log(
            '$$ this.updateStartProgram',
            this.getPanelType,
            this.getDefaultPanelNumber,
            this.getActiveProgram,
            this.getWetBalance
          )

          this.updateStartProgram([
            this.getPanelType,
            this.getDefaultPanelNumber,
            this.getActiveProgram,
            this.getWetBalance,
          ])
          break
        case 'vacuum':
          this.updateDryStartProgram([
            this.getPanelType,
            this.getVacuumNumber,
            this.getActiveProgram,
            this.getDryBalance,
          ])
          break

        default:
          console.warn('no panel type')
          break
      }
      if (program === 'operator') {
        this.timeoutPopup = setTimeout(() => {
          try {
            this.$router.push('/popup')
          } catch (err) {}
        }, (this.delay = 400))
      }
    },
    setDown(program) {
      this.clearDown()
      switch (program) {
        case 'stop':
          this.isDown.stop = true
          this.timeoutDelay = setTimeout(() => {
            this.isDown.stop = false
          }, (this.delay = 400))
          break
        case 'operator':
          this.isDown.operator = true
          this.timeoutDelay = setTimeout(() => {
            this.isDown.operator = false
          }, (this.delay = 400))
        default:
          break
      }
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
    },
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
    clearTimeout(this.timeoutPopup)
  },
}
</script>

<style scoped>
.footer-panel {
  height: 108px;
  width: 100%;
  position: fixed;
  left: 0em;
  bottom: -0.2em;
  opacity: 1;
  /* #121212 */
  background: linear-gradient(180deg, #505cad 1.62%, #5b68bb 100%);
}
.row {
  position: fixed;
  left: 0.8em;
}

.button-title-long {
  top: 0;
  left: 0;
  color: white;
  text-transform: uppercase;
  font-size: 3em;
  font-weight: bold;
  font-family: 'Plumb-Medium';
}
.stop {
  /* background-image: url('./../src/renderer/assets/imgs/operator/operator-down.png'); */
  width: 460px;
  height: 120px;

  position: fixed;
  top: 30.5em;
  /* bottom: 0; */
  left: 20.8em;

  z-index: 1000;
  /* background: yellowgreen; */
  cursor: pointer;
}
/* .stop:hover {
  background: blanchedalmond;
} */

.button-title-stop {
  padding-top: 0.5em;

  display: flex;
  align-items: center;
  justify-content: center;

  /* background: blanchedalmond; */
}
.operator {
  position: fixed;
  bottom: 0;
  left: 46.6em;
}
.button-title-home {
  padding-top: 0.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-title-operator {
  padding-top: 0.5em;
  padding-left: 0.8em;

  display: flex;
  align-items: center;
  justify-content: center;
}
.description {
  font-size: 20px;
  font-family: 'Plumb-Medium';
  font-weight: bold;
}
.home {
  position: fixed;
  bottom: 0;
  left: -1em;
}
</style>
