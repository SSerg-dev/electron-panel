<template>
  <div v-if="getIsFooter">
    <div class="footer-panel white-text">
      <!-- stop -->
      <div
        v-if="
          this.$route.name === 'program' &&
          getWetProgramName.length > 0 &&
          this.isVisible
        "
        class="stop-position"
      >
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

        <!-- <div v-if="getWetStopFreeCount">
          <div class="button-title-stop">
            {{ getWetStopFreeCount }}
          </div>
        </div> -->

      </div>

      <!-- operator -->
      <div v-if="getWetIsShowOperatorCall && getPanelType === 'wash'">
        <div class="operator-position">
          <div
            v-if="this.isDown.operator === false"
            class="button-operator-up-style"
            @click="setProgram('operator')"
          >
            <div class="button-title">
              {{ `CONSULTANT` | localize }}
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

      <!-- <div>
        <div class="input-position">
          <div
            v-if="this.isDown.input === false"
            class="button-input-up-style"
            @click="setProgram('input')"
          >
            <div class="button-title">
              <div style="margin-top: -0.3em;">🚘 &nbsp;</div>
              {{ `INPUT` | localize }}
            </div>
          </div>

          <div
            v-if="this.isDown.input === true"
            class="button-input-down-style"
          >
            <div class="button-title">
              <div style="margin-top: -0.3em;">🚘 &nbsp;</div>
              {{ `INPUT` | localize }}
            </div>
          </div>
        </div>
      </div> -->

      <!-- exit -->

      <!-- <div>
        <div class="exit-position">
          <div
            v-if="this.isDown.exit === false"
            class="button-exit-up-style"
            @click="setProgram('exit')"
          >
            <div class="button-title">
              <div>🏁 &nbsp;</div>
              {{ `EXIT` | localize }}
            </div>
          </div>

          <div v-if="this.isDown.exit === true" class="button-exit-down-style">
            <div class="button-title">
              <div>🏁 &nbsp;</div>
              {{ `EXIT` | localize }}
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

import { Queue } from '@/queue/index.js'
import { log } from '../../../main/utils'
import sleep from '@/utils/sleep'

export default {
  data: () => ({
    active: '',
    timeoutPopup: null,
    timeoutDelay: null,
    delay: 1000,
    isVisible: false,
    isDown: {
      stop: false,
      operator: false,
      home: false,
      input: false,
      exit: false,
    },
  }),
  computed: {
    ...mapGetters({
      getVacuumNumber: 'getVacuumNumber',
      getWetBalance: 'getWetBalance',

      getPanelType: 'getPanelType',
      getPanelNumber: 'getPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getWetBalance: 'getWetBalance',

      getIsFooter: 'getIsFooter',
      getWetStopFreeCount: 'getWetStopFreeCount',
      getIsMoneyToBonus: 'getIsMoneyToBonus',

      getIsMoneyToBonusNo: 'getIsMoneyToBonusNo',
      getMoneyToBonus: 'getMoneyToBonus',
      getSecondsBonusTimer: 'getSecondsBonusTimer',
      getIsFirstTimer: 'getIsFirstTimer',

      getWetProgramName: 'getWetProgramName',
      getRouter: 'getRouter',
      getPrevRouter: 'getPrevRouter',
      getWetIsShowOperatorCall: 'getWetIsShowOperatorCall',
    }),
  },
  watch: {
    getWetProgramName(flag) {
      // console.log('$$ Footer.vue: 157', flag)
    },

    getRouter(flag) {
      if (flag === '/program') {
        sleep(200).then(() => {
          this.isVisible = true
        })
      } else {
        this.isVisible = false
      }
    },

    getWetStopFreeCount(flag) {
      try {
        
        // if (
        //   parseInt(flag) > 0 &&
        //   +this.getMoneyToBonus === 0 &&
        //   this.getIsFirstTimer
        // ) {
        //   this.setMoneyToBonus(this.getWetBalance)
        //   this.setIsMoneyToBonus(true)
        // }

        if (parseInt(flag) > 0) {
          this.isDown.stop = true
        } else {
          this.isDown.stop = false
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
    this.timeoutPopup = setTimeout(() => {
      this.isVisible = true
    }, this.delay)

    // this.setIsMoneyToBonus(false)
    // this.setMoneyToBonus(0)
  },

  methods: {
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',
      setIsMoneyToBonus: 'setIsMoneyToBonus',
      setMoneyToBonus: 'setMoneyToBonus',
      setRouter: 'setRouter',
      setPrevRouter: 'setPrevRouter',
    }),
    ...mapGetters({}),
    ...mapActions({
      updateStartProgram: 'updateStartProgram',
      updateDryStartProgram: 'updateDryStartProgram',
    }),
    setup() {
      this.setPrevRouter('/')
    },

    // goHome(program) {
    //   this.isDown.home = true
    //   this.timeoutDelay = setTimeout(() => {
    //     this.isDown.home = false
    //     try {
    //       if (this.$route.name !== 'home') this.$router.push('/')
    //     } catch (err) {}
    //   }, this.delay)
    // },

    setProgram(program) {
      this.active = program
      this.setActiveProgram(this.active)
      this.setDown(program)
      const type = this.getPanelType

      switch (type) {
        case 'wash':
          this.updateStartProgram([
            this.getPanelType,
            this.getPanelNumber,
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
        
        // console.log('$$ Footer.vue: 280 -->', program , this.selectRouter())
        this.setPrevRouter(this.selectRouter())
        
        this.timeoutPopup = setTimeout(() => {
          try {
            this.$router.push('/popup')
          } catch (err) {}
        }, (this.delay = 400))
      }
    },
    selectRouter() {
      let route
      switch (this.$route.name) {
        case 'home':
          route = '/'
          break
        case 'cost':
          route = '/cost'
          break
        case 'cash':
          route = '/cash'
          break
        case 'card':
          route = '/card'
          break
        case 'bonus':
          route = '/bonus'
          break
        case 'program':
          route = '/program'
          break

        default:
          route = '/'
          break
      }

      return route
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
  height: 8em;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0.5em;
  opacity: 1;
  background: linear-gradient(180deg, #323232, #131313 100%);
  box-shadow: 0px -15px 10px #393758;
}

/* common footer */
.button-title {
  padding-top: 0.3em;
  padding-left: 0;
  font-size: 2.8em;
  text-shadow: 2px 2px 2px silver, -2px 2px 2px silver;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* operator */
.operator-position {
  position: fixed;
  bottom: 2em;
  right: 16em; /* 25.25em; */
}
.button-operator-up-style {
  padding-left: 0em;
  width: 42em; /* 24em; */
  height: 6em;
  color: #000;
  background: linear-gradient(45deg, #00e5ff, #bfe5f5, #18ffff);
  border: 0.2em solid #fff;
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}
.button-operator-down-style {
  padding-left: 0em;
  width: 42em; /* 24em; */
  height: 6.2em;
  color: #18ffff;
  background: rgb(255, 255, 255);
  border: 0.2em solid #18ffff;
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}

/* input */
.input-position {
  position: fixed;
  bottom: 2em;
  left: 0.5em;
}
.button-input-up-style {
  padding-left: 0em;
  width: 23.5em;
  height: 6em;
  color: #000;

  background: linear-gradient(45deg, #0066ff, #bfe5f5, #0066ff);

  border: 0.2em solid #fff;
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}
.button-input-down-style {
  padding-left: 0em;
  width: 24em;
  height: 6.2em;
  color: #18ffff;
  background: rgb(255, 255, 255);
  border: 0.2em solid #18ffff; /* #00b9e3; */
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}

/* exit */
.exit-position {
  position: fixed;
  bottom: 2em;
  /* left: 0; */
  right: 0.5em;
}
.button-exit-up-style {
  padding-left: 0em;
  width: 23.5em;
  height: 6em;
  color: #000;
  background: linear-gradient(45deg, #0066ff, #bfe5f5, #0066ff);
  border: 0.2em solid #fff;
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}
.button-exit-down-style {
  padding-left: 0em;
  width: 24em;
  height: 6.2em;
  color: #18ffff;
  background: rgb(255, 255, 255);
  border: 0.2em solid #18ffff; /* #00b9e3; */
  border-radius: 1em;
  box-shadow: #18ffff 5px 5px 10px;
}

/* stop */
.stop-position {
  position: fixed;
  top: 29em;
  /* bottom: 0; */
  left: 16em;
  z-index: 999;
}
.button-title-stop {
  padding-top: 0.02em;
  font-size: 4em;
  text-shadow: 1px 1px 1px red, -1px 1px 1px red;

  display: flex;
  align-items: center;
  justify-content: center;
}

.button-down-style {
  padding-left: 0em;
  width: 40em;
  height: 6.8em;
  color: #fff;

  background: linear-gradient(
    45deg,
    rgb(255, 3, 3),
    rgb(255, 154, 118),
    rgb(255, 3, 3)
  );
  border: 0.4em solid rgb(255, 3, 3);
  border-radius: 4em;
  box-shadow: rgb(255, 3, 3) 0px 10px 20px;
}
.button-up-style {
  padding-left: 0em;
  width: 40em;
  height: 7em;
  color: rgb(0, 0, 0);
  background: rgb(255, 255, 255);
  border: 0.4em solid rgb(255, 3, 3);
  border-radius: 4em;
  box-shadow: rgb(255, 3, 3) 0px 10px 20px;
}
</style>
