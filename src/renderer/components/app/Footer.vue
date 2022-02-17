<template>
  <div v-if="getIsFooter">
    <div class="footer-panel white-text ">
      <div class="row">
        <div class="col s4">
          <div class="home">
            <div
              v-if="this.isDown.home === false"
              style="background-image:url('./imgs/operator/home-down.png'); width: 401px; height: 106px"
              @click="gotoHome('home')"
            >
              <div
                class="button-title-long button-title-operator"
                style="padding-left: 8rem;"
              >
                {{ `ДОМОЙ` }}
              </div>
            </div>
            <div
              v-if="this.isDown.home === true"
              style="background-image:url('./imgs/operator/home-up.png'); width: 401px; height: 106px"
              @click="gotoHome('home')"
            >
              <div
                class="button-title-long button-title-operator"
                style="padding-left: 8rem;"
              >
                {{ `ДОМОЙ` }}
              </div>
            </div>
          </div>
        </div>

        <div class="col s4">
          <div class="stop" style="z-index: 0;">
            <div
              v-if="this.isDown.stop === false"
              style="background-image:url('./imgs/stop/stop-down.png'); width: 460px; height: 120px;"
              @click="setProgram('stop')"
            >
              <div class="button-title-long button-title-stop">
                {{ `СТОП` }}
              </div>
            </div>
            <div
              v-if="this.isDown.stop === true"
              style="background-image:url('./imgs/stop/stop-up.png'); width: 460px; height: 120px"
              @click="setProgram('stop')"
            >
              <div class="button-title-long button-title-stop">
                {{ `СТОП` }}
              </div>
            </div>
          </div>
        </div>

        <div class="col s4">
          <div class="operator">
            <div
              v-if="this.isDown.operator === false"
              style="background-image:url('./imgs/operator/operator-down.png'); width: 401px; height: 106px"
              @click="setProgram('operator')"
            >
              <div class="button-title-long button-title-operator">
                {{ `КОНСУЛЬТАНТ` }}
              </div>
            </div>
            <div
              v-if="this.isDown.operator === true"
              style="background-image:url('./imgs/operator/operator-up.png'); width: 401px; height: 106px"
              @click="setProgram('operator')"
            >
              <div class="button-title-long button-title-operator">
                {{ `КОНСУЛЬТАНТ` }}
              </div>
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

export default {
  data: () => ({
    active: '',
    timeoutPopup: null,
    timeoutDelay: null,
    delay: 500,
    isDown: {
      stop: false,
      operator: false,
      home: false
    }
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
      getWetStopFreeCount: 'getWetStopFreeCount'
    })
  },
  watch: {
    getWetStopFreeCount(flag) {
      try {
        if (parseInt(flag) > 0 && this.$route.name !== 'popup')
          this.$router.push('/popup')
      } catch (err) {}
    }
  },

  methods: {
    ...mapMutations({
      setActiveProgram: 'setActiveProgram'
    }),
    ...mapGetters({}),
    ...mapActions({
      updateStartProgram: 'updateStartProgram',
      updateDryStartProgram: 'updateDryStartProgram'
    }),

    gotoHome(program) {
      this.isDown.home = true
      this.timeoutDelay = setTimeout(() => {
        this.isDown.home = false
        try {
          if (this.$route.name !== 'home') {
            this.$router.push('/')
          }
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
            this.getWetBalance
          ])
          break
        case 'vacuum':
          this.updateDryStartProgram([
            this.getPanelType,
            this.getVacuumNumber,
            this.getActiveProgram,
            this.getDryBalance
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
        }, this.delay)
      }
    },
    setDown(program) {
      this.clearDown()
      switch (program) {
        case 'stop':
          this.isDown.stop = true
          this.timeoutDelay = setTimeout(() => {
            this.isDown.stop = false
          }, this.delay)
          break
        case 'operator':
          this.isDown.operator = true
          this.timeoutDelay = setTimeout(() => {
            this.isDown.operator = false
          }, this.delay)
        default:
          break
      }
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
    clearTimeout(this.timeoutPopup)
  }
}
</script>

<style scoped>
.footer-panel {
  height: 106px;
  width: 100%;
  position: fixed;
  left: 0em;
  bottom: -0.2em;
  opacity: 1; /* 0.5 */
  background: #121212;
}

.button-title-long {
  position: relative;
  top: 0%;
  left: 0%;
  color: white;
  text-transform: uppercase;
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Plumb-Medium';
}
.stop {
  width: 460px;
  height: 120px;
  position: absolute;
  background-color: none;
  top: 0%;
  left: 0%;
  padding-left: 300px;
  padding-top: 0px;
  z-index: 1;
}
.button-title-stop {
  padding-top: 24px;
  padding-left: 180px;
}
.operator {
  width: 401px;
  height: 106px;
  position: absolute;
  background-color: none;
  opacity: 1;
  top: 4%;
  left: 0%;
  margin-left: 46rem;
  z-index: 1;
}
.button-title-operator {
  padding-top: 16px;
  padding-left: 72px;
}
/* Plumb-Medium */
.description {
  font-size: 20px;
  font-family: 'Plumb-Medium';
  font-weight: bold;
}
.home {
  width: 401px;
  height: 106px;
  position: absolute;
  background-color: none;
  opacity: 1;
  top: 4%;
  left: 0%;
  margin-left: -0.6rem;
  z-index: 1;
}
</style>
