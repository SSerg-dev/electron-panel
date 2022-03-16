<template>
  <div class="locate">
    <form @submit.prevent="">
      <div class="form">
        <table style="margin-left: 1em; margin-top: 8em;">
          <tbody>
            <!-- row 01 -->
            <tr class="info-title">
              <td colspan="2">
                <p align="center">{{ `${this.messages[0]}` }}</p>
                <p align="center">{{ `${this.messages[1]}` }}</p>
                <p align="center">{{ `${this.messages[2]}` }}</p>
              </td>
            </tr>

            <!-- row 02 -->
            <tr class="button-group">
              <!-- left -->
              <td
                style="padding-left: 4.8em; padding-top: 2em; padding-bottom: 1em;"
              >
                <div
                  @click="setProgram('yes')"
                  class="waves-effect"
                  id="button-left"
                >
                  <div
                    :class="[
                      { 'button-black-title': !this.isDown.yes },
                      { 'button-white-title': this.isDown.yes }
                    ]"
                  >
                    {{ `${this.buttonTitle[this.buttonTitleIndex]}` }}
                  </div>
                </div>
              </td>

              <!-- right -->

              <td
                style="padding-right: 2em; padding-top: 2em; padding-bottom: 1em;"
              >
                <div
                  @click="setProgram('no')"
                  class="waves-effect"
                  id="button-right"
                >
                  <div
                    :class="[
                      {
                        'button-black-title': !this.isDown.no
                      },
                      { 'button-white-title': this.isDown.no }
                    ]"
                  >
                    {{ `${this.buttonTitle[this.buttonTitleIndex + 1]}` }}
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="2" class="legal-title">
                <p align="center">{{ `${this.messages[3]}` }}</p>
                <p align="center">{{ `${this.messages[4]}` }}</p>
                <p align="center">{{ `${this.messages[5]}` }}</p>
                <p align="center">{{ `${this.messages[6]}` }}</p>
              </td>
            </tr>

            <!-- end turbo -->
          </tbody>
        </table>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

import { Component, Box, Circle, Button } from '@/shapes/index.js'
import {
  upGreenOptions,
  downGreenOptions,
  upRedOptions,
  downRedOptions
} from '@/shapes/index.js'

export default {
  data: () => ({
    // options
    upGreenOptions: upGreenOptions,
    downGreenOptions: downGreenOptions,
    upRedOptions: upRedOptions,
    downRedOptions: downRedOptions,

    // clone
    _upGreenOptions: null,
    _downGreenOptions: null,
    _upRedOptions: null,
    _downRedOptions: null,

    // classes
    buttonLeft: null,
    buttonRight: null,

    active: '',
    delay: 2000,
    timeoutDelay: null,
    timeoutPopup: null,

    isDown: {
      yes: false,
      no: false
    },

    messages: [
      'Вы хотите завершить',
      'мойку и вернуть остаток',
      'бонусами на счет?',

      'Нажимая кнопку "Да", Вы даете свое согласие на',
      'отправку Вам СМС-сообщения и обработку',
      'персональных данных согласно условиям,',
      'размещенным на сайте: www.alles-bonus.com'
    ],
    messageIndex: -1,

    buttonTitle: [`ДА`, `НЕТ`],
    buttonTitleIndex: -1,

    programName: '',
    activeProgramKit: ''
  }),

  props: {
    actives: {
      required: true,
      type: Array
    }
  },

  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getWetBalance: 'getWetBalance',
      getWetStopFreeCount: 'getWetStopFreeCount'
    })
  },

  watch: {
    getWetBalance(flag) {
      if (parseInt(flag) === 0) {
        this.clearDown()
      }
    }
  },

  methods: {
    ...mapGetters({
      getActiveProgramKit: 'getActiveProgramKit',
      getIsActiveProgramKit: 'getIsActiveProgramKit'
    }),
    ...mapActions({
      updateStartProgram: 'updateStartProgram',
      updateWetZeroMoney: 'updateWetZeroMoney'
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',
      setActiveProgramKit: 'setActiveProgramKit',
      setIsActiveProgramKit: 'setIsActiveProgramKit',

      setIsMoneyToBonus: 'setIsMoneyToBonus',
      setMoneyToBonus: 'setMoneyToBonus'
    }),
    setProgram(program) {
      this.active = program

      this.setActiveProgram(this.active)
      this.setDown(this.active)

      /* this.updateStartProgram([
        this.getPanelType,
        this.getDefaultPanelNumber,
        this.getActiveProgram,
        this.getWetBalance
      ]) */

      if (parseInt(this.getWetBalance) > 0) {
        this.timeoutPopup = setTimeout(() => {
          // this.$router.push('/popup')
        }, this.delay)
      } else this.$message(`Недостаточно средств`)
    },

    saveMoney() {
      if (this.getWetStopFreeCount >= 0) {
        // this.isVisibleWashTableBonus = true  

        this.setIsMoneyToBonus(true)
        this.setMoneyToBonus(this.getWetBalance)
        
      }
    },
    setDown(program) {
      this.clearDown()

      switch (program) {

        case 'yes':
          console.log('++yes')
          // this.updateWetZeroMoney(true)
          this.saveMoney()

          this.setButtonStyle(this._downGreenOptions)
          this.isDown.yes = true
          this.timeoutDelay = setTimeout(() => {
            try {
              this.$router.push('/bonus')
            } catch (err) {}
          }, this.delay = 500)
          
          break

        case 'no':
          console.log('++no')  

          this.setMoneyToBonus(0)
          this.setIsMoneyToBonus(false)

          this.setButtonStyle(this._downRedOptions)
          this.isDown.no = true
          this.timeoutDelay = setTimeout(() => {
            try {
              // this.$router.push('/program')
            } catch (err) {}
          }, this.delay = 500)
          
          break

        default:
          break
      }
      this.timeoutSetUp = setTimeout(() => {
        try {
          if (this.getWetBalance !== '0') this.clearDown()
        } catch (err) {}
      }, 1000)
    },

    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
      this.setButtonStyle(this._upGreenOptions)
      this.setButtonStyle(this._upRedOptions)
    },
    setup() {
      this.initial()
    },

    initial() {
      // classes instances

      /* left button */
      this.buttonLeft = new Button({
        selector: '#button-left',

        width: 25,
        height: 23,
        background: 'rgb(255, 255, 255)',
        borderRadius: 3,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })

      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right',

        width: 25,
        height: 23,
        background: 'rgb(255, 255, 255)',
        borderRadius: 3,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })
      // end classes

      // clone
      this._upGreenOptions = { ...upGreenOptions }
      this._downGreenOptions = { ...downGreenOptions }
      this._upRedOptions = { ...upRedOptions }
      this._downRedOptions = { ...downRedOptions }

      this._upGreenOptions.type = 'left'
      this._upGreenOptions.width = 25
      this._upGreenOptions.height = 23
      this._downGreenOptions.type = 'left'
      this._downGreenOptions.width = 25
      this._downGreenOptions.height = 23

      this._upRedOptions.type = 'right'
      this._upRedOptions.width = 25
      this._upRedOptions.height = 23
      this._downRedOptions.type = 'right'
      this._downRedOptions.width = 25
      this._downRedOptions.height = 23

      this.restore('left')
      this.restore('right')
    }, // end initial

    restore(type) {
      switch (type) {
        case 'left':
          this.buttonTitleIndex = 0
          this.setButtonStyle(this._upGreenOptions)
          this.buttonLeft.show()
          this.flex()
          break
        case 'right':
          this.setButtonStyle(this._upRedOptions)
          this.buttonRight.show()
          this.flex()
          break

        default:
          break
      }
      return
    },
    flex() {
      this.buttonLeft.display = 'flex'
      this.buttonLeft.alignItems = 'center'
      this.buttonLeft.justifyContent = 'center'

      this.buttonRight.display = 'flex'
      this.buttonRight.alignItems = 'center'
      this.buttonRight.justifyContent = 'center'
    },

    setButtonStyle(options) {
      if (options.type === 'left') {
        this.buttonLeft.background = options.background
        this.buttonLeft.border = options.border
        this.buttonLeft.boxShadow = options.boxShadow
        this.buttonLeft.fontSize = options.fontSize
        this.buttonLeft.width = options.width

        this.buttonRight.background = 'rgb(255, 255, 255)'
      }

      if (options.type === 'right') {
        this.buttonRight.background = options.background
        this.buttonRight.border = options.border
        this.buttonRight.boxShadow = options.boxShadow
        this.buttonRight.fontSize = options.fontSize
        this.buttonRight.width = options.width

        this.buttonLeft.background = 'rgb(255, 255, 255)'
      }
    },

    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
      this.setButtonStyle(this._upGreenOptions)
      this.setButtonStyle(this._upRedOptions)
    }
  }, // end methods

  created() {},
  mounted() {
    this.setup()
  },

  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
    clearTimeout(this.timeoutPopup)
  },

  components: {}
}
</script>

<style scoped>
.form {
  width: 67em;
  height: 82em;
  margin-left: 0em;
  margin-top: 11em;
  padding-left: 0em;
  padding-top: 2em;
  padding-bottom: 0em;

  /* dev */
  border: solid 3px #00b9e3;
  border-radius: 2em;
  box-shadow: 0px 0px 10px 10px #00b9e3;
}

table,
tr,
td {
  border: none;
  border-color: white;
}
.info-title {
  height: 1em;
  padding-bottom: 0em;
  font-size: 3.5em;
  color: white;
}
.legal-title {
  /* position: fixed; */
  padding-top: 2em;
  height: 2em;
  padding-bottom: 0em;
  font-size: 2.5em;
  color: white;
}
.button-group {
  padding-left: 0em;
  height: 4em;
}

.button-black-title {
  font-size: 4em;
  color: black;
}
.button-white-title {
  font-size: 4em;
  color: white;
}
.locate {
  position: relative;
  text-align: center;
}
</style>
