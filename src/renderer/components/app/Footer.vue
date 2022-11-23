<template>
  <div v-if="getIsFooter">
    <div class="footer-panel white-text">
      
      <!-- stop -->
      <div v-if="this.$route.name === 'program'" class="stop-position">
        <div
          v-if="this.isDown.stop === false"
          class="button-up-style"
          @click="setProgram('stop')"
        >
          <div class="button-title-stop">
            {{ `STOP` | localize }}
          </div>
        </div>

        <div v-if="this.isDown.stop === true" class="button-down-style">
          <div class="button-title-stop">
            {{ `STOP` | localize }}
          </div>
        </div>
      </div>

      <!-- operator -->
      <div>
        <div class="operator-position">
          <div
            v-if="this.isDown.operator === false"
            class="button-operator-up-style"
            @click="setProgram('operator')"
          >
            <div class="button-title">
              {{`CONSULTANT` | localize }}
            </div>
          </div>

          <div
            v-if="this.isDown.operator === true"
            class="button-operator-down-style"
            @click="setProgram('operator')"
          >
            <div class="button-title">
              {{ `CONSULTANT` | localize }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- input -->
      <div>
        <div class="input-position">
          <div
            v-if="this.isDown.input === false"
            class="button-input-up-style"
            @click="setProgram('input')"
          >
            <div class="button-title">
              <!-- {{`CONSULTANT` | localize }} -->
              {{`🚘 INPUT`}}
            </div>
          </div>

          <div
            v-if="this.isDown.input === true"
            class="button-input-down-style"
          >
            <div class="button-title">
              {{`🚘 INPUT`}}
            </div>
          </div>
        </div>
      </div>

      <!-- exit -->
      <div>
        <div class="exit-position">
          <div
            v-if="this.isDown.exit === false"
            class="button-exit-up-style"
            @click="setProgram('exit')"
          >
            <div class="button-title">
              {{`🏁 EXIT`}}
            </div>
          </div>

          <div
            v-if="this.isDown.exit === true"
            class="button-exit-down-style"
          >
            <div class="button-title">
              {{`🏁 EXIT`}}
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
      input: false,
      exit: false
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
          }, (this.delay = 4000))
          break
        case 'input':
          this.isDown.input = true
          this.timeoutDelay = setTimeout(() => {
            this.isDown.input = false
          }, (this.delay = 400))  
          break
        case 'exit':
          this.isDown.exit = true
          this.timeoutDelay = setTimeout(() => {
            this.isDown.exit = false
          }, (this.delay = 400))
          break

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
  height: 9em;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: -0.2em;
  opacity: 1;
  /* #121212 */
  background: linear-gradient(180deg, #505cad 1.62%, #5b68bb 100%);
}

/* .button-title-long {
  color: white;
  text-transform: uppercase;
  font-size: 3em;
  font-weight: bold;
  font-family: 'Plumb-Medium';
} */


/* common footer */
.button-title {
  padding-top: 0.5em;
  padding-left: 0;
  font-size: 3em;
  text-shadow:
    2px 2px 2px silver,
    -2px 2px 2px silver;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* operator */
.operator-position {
  position: fixed;
  bottom: 1em;
  /* left: 0; */
  right: 25.25em;
}
.button-operator-up-style {
  padding-left: 0em;
  width: 24em;
  height: 7.2em;
  color: #fff;
  background: linear-gradient(45deg, #00e5ff,#bfe5f5, #18ffff);
  border: 0.2em solid #fff;
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}
.button-operator-down-style {
  padding-left: 0em;
  width: 24em;
  height: 7.2em;
  color: #18ffff;
  background: rgb(255, 255, 255);
  border: 0.2em solid  #18ffff; 
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}

/* input */
.input-position {
  position: fixed;
  bottom: 1em;
  left: 0.5em;
  /* right: 23em; */
}
.button-input-up-style {
  padding-left: 0em;
  width: 24em;
  height: 7.2em;
  color: #fff;

  background: linear-gradient(45deg, #00e5ff,#bfe5f5, #18ffff);
  /* background: #18ffff ; */

  border: 0.2em solid #fff;
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}
.button-input-down-style {
  padding-left: 0em;
  width: 24em;
  height: 7.2em;
  color: #18ffff;
  background: rgb(255, 255, 255);
  border: 0.2em solid  #18ffff; /* #00b9e3; */
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}

/* exit */
.exit-position {
  position: fixed;
  bottom: 1em;
  /* left: 0; */
  right: 0.5em;
}
.button-exit-up-style {
  padding-left: 0em;
  width: 24em;
  height: 7.2em;
  color: #fff;
  background: linear-gradient(45deg, #00e5ff,#bfe5f5, #18ffff);
  border: 0.2em solid #fff;
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}
.button-exit-down-style {
  padding-left: 0em;
  width: 24em;
  height: 7.2em;
  color: #18ffff;
  background: rgb(255, 255, 255);
  border: 0.2em solid  #18ffff; /* #00b9e3; */
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}

/* stop */
.stop-position {
  position: fixed;
  top: 30.5em;
  /* bottom: 0; */
  left: 16em;
  z-index: 999;
}
.button-title-stop {
  padding-top: 0.1em;
  font-size: 4em;
  text-shadow:
    1px 1px 1px red,
    -1px 1px 1px red;


  display: flex;
  align-items: center;
  justify-content: center;
}
.button-up-style {
  padding-left: 0em;
  width: 40em;
  height: 7.5em;
  color: #fff;

  background: linear-gradient(45deg, rgb(255, 3, 3), coral, rgb(255, 3, 3));
  border: 0.4em solid rgb(255, 3, 3);
  border-radius: 4em;
  box-shadow: rgb(255, 3, 3) 0px 10px 20px;
}
.button-down-style {
  padding-left: 0em;
  width: 40em;
  height: 8em;
  color: rgb(255, 3, 3);
  background: rgb(255, 255, 255);
  border: 0.4em solid rgb(255, 3, 3);
  border-radius: 4em;
  box-shadow: rgb(255, 3, 3) 0px 10px 20px;
}
</style>
