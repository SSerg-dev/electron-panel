<template>
  <div class="locate">
    <router-link to="/program">
      <div class="back">
        <img src="@/assets/imgs/key/back.png" />
      </div>
    </router-link>
    <div class="message" style="background: none;">
      <div><Message /></div>
    </div>

    <form @submit.prevent="">
      <div class="form">
        <table style="margin-left: 1em; margin-top: 0em;">
          <tbody>
            <!-- turbo -->

            <!-- row 01 -->
            <tr class="info-title">
              <td colspan="2">
                <p align="center">
                  {{ `${this.messages[this.messageIndex]}` }}
                </p>
              </td>
            </tr>

            <!-- row 02 -->
            <tr class="button-group">
              <!-- standard -->
              <!-- this.activeProgramKit.name  -->

              <td style="padding-left: 4.8em; padding-top: 2em; padding-bottom: 1em;">
                <div
                  @click="setProgram('standard')"
                  class="waves-effect"
                  id="button-left"
                >
                  <div
                    :class="[
                      { 'button-black-title': !this.isDownButtonLeft.standard },
                      { 'button-white-title': this.isDownButtonLeft.standard }
                    ]"
                  >
                    {{ `${this.buttonTitle[this.buttonStandardTitleIndex]}` }}
                  </div>
                </div>
              </td>

              <!-- turbo -->

              <td style="padding-right: 2em; padding-top: 2em; padding-bottom: 1em;">
                <div
                  @click="setProgram('advanced')"
                  class="waves-effect"
                  id="button-right"
                >
                  <div
                    :class="[
                      {
                        'button-black-title': !this.isDownButtonRight.advanced
                      },
                      { 'button-white-title': this.isDownButtonRight.advanced }
                    ]"
                  >
                    {{ `${this.buttonTitle[this.buttonTitleIndex]}` }}
                  </div>
                </div>
              </td>
            </tr>

            <!-- row 03 -->
            <tr class="image">
              <td colspan="2">
                <div id="green-image" class="active">
                  <img src="@/assets/imgs/actives/green-active-m.svg" />
                </div>
                <div id="blue-image" class="active">
                  <img src="@/assets/imgs/actives/blue-active-m.svg" />
                </div>
                <div id="red-image" class="active">
                  <img src="@/assets/imgs/actives/red-active-m.svg" />
                </div>
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

import Message from '@/components/app/Message'
/* dev */
import { Component, Box, Circle, Button } from '@/shapes/index.js'

export default {
  data: () => ({
    // actives: [],

    /* StandardOptions */
    upStandardOptions: {
      type: 'left',
      background: 'rgb(255, 255, 255)',
      border: '0.4em solid rgb(64, 196, 255)',
      boxShadow: 'rgb(64, 196, 255) 0px 10px 20px',
      fontSize: '1em'
    },
    downStandardOptions: {
      type: 'left',
      background: 'rgb(64, 196, 255)',
      border: '0.4em solid rgb(64, 196, 255)',
      boxShadow: 'rgb(64, 196, 255) 0px 10px 20px',
      fontSize: '1em'
    },
    /* X2Options */
    upX2Options: {
      type: 'right',
      background: 'rgb(255, 255, 255)',
      border: '0.4em solid rgb(191,0,229)',
      boxShadow: 'rgb(191,0,229) 0px 10px 20px',
      fontSize: '1em'
    },
    downX2Options: {
      type: 'right',
      background: 'rgb(191,0,229)',
      border: '0.4em solid rgb(191,0,229)',
      boxShadow: 'rgb(191,0,229) 0px 10px 20px',
      fontSize: '1em'
    },
    /* TurboOptions */
    upTurboOptions: {
      type: 'right',
      background: 'rgb(255, 255, 255)',
      border: '0.4em solid rgb(255,3,3)',
      boxShadow: 'rgb(255,3,3) 0px 10px 20px',
      fontSize: '1em'
    },
    downTurboOptions: {
      type: 'right',
      background: 'rgb(255,3,3)',
      border: '0.4em solid rgb(255,3,3)',
      boxShadow: 'rgb(255,3,3) 0px 10px 20px',
      fontSize: '1em'
    },
    /* ColorOptions */
    upStandardColorOptions: {
      type: 'left',
      background: 'rgb(255, 255, 255)',
      border: '0.4em solid rgb(215, 215, 215)',
      boxShadow: 'rgb(215, 215, 215) 0px 10px 20px',
      fontSize: '1em'
    },
    downStandardColorOptions: {
      type: 'left',
      background: 'rgb(215, 215, 215)',
      border: '0.4em solid rgb(215, 215, 215)',
      boxShadow: 'rgb(215, 215, 215) 0px 10px 20px',
      fontSize: '1em'
    },

    upColorOptions: {
      type: 'right',
      background: 'rgb(255, 255, 255)',
      border: '0.4em solid rgb(255,63,155)',
      boxShadow: 'rgb(255,63,155) 0px 10px 20px',
      fontSize: '1em'
    },
    downColorOptions: {
      type: 'right',
      background: 'rgb(255,63,155)',
      border: '0.4em solid rgb(255,63,155)',
      boxShadow: 'rgb(255,63,155) 0px 10px 20px',
      fontSize: '1em'
    },

    /* end Options */

    // classes
    buttonMain: null,
    buttonLeft: null,
    buttonRight: null,

    greenImage: null,
    blueImage: null,
    redImage: null,

    active: '',
    timeoutDelay: null,
    delay: 2000,
    timeoutPopup: null,

    isDownButtonLeft: {
      // disk: false,
      standard: false
    },
    isDownButtonRight: {
      // disk_x2: false
      advanced: false
    },

    messages: [
      `Выберите давление:`,
      `Выберите цвет пены:`,
      `Выберите дозацию химии:`,
      `ПЫЛЕСОС`,
      `ВОЗДУХ`,
      `ОМЫВАТЕЛЬ`,
      `ТУРБОСУШКА`
    ],
    messageIndex: -1,

    buttonTitle: [
      `СТАНДАРТ`,
      `ТУРБО`,
      `БЕЛАЯ`,
      `ЦВЕТНАЯ`,
      `СТАНДАРТ`,
      `ДВОЙНАЯ`
    ],
    buttonTitleIndex: -1,
    buttonStandardTitleIndex: -1,

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
      getPanelNumber: 'getPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getWetBalance: 'getWetBalance',
      /* dev */
      getParamsChange: 'getParamsChange',
      getWetProgShow: 'getWetProgShow'
    })
  },

  watch: {
    getWetBalance(flag) {
      if (parseInt(flag) === 0) {
        this.clearDownButtonLeft()
        this.clearDownButtonRight()

        this.buttonLeft.background = 'white'
        this.buttonRight.background = 'white'

        this.timeoutPopup = setTimeout(() => {
          try {
            if (this.$route.name !== 'home') this.$router.push('/')
          } catch (err) {}
        }, this.delay)
      }
    },

    getWetProgShow(flag) {
      this.showAdvanced()
    }
  },

  methods: {
    ...mapGetters({
      getActiveProgramKit: 'getActiveProgramKit',
      /* dev */
      getPrograms: 'getPrograms'
    }),
    ...mapActions({
      updateStartProgram: 'updateStartProgram'
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram'
    }),

    showAdvanced() {
      switch (this.activeProgramKit.name) {
        case 'disk':
          this.actives[24].display === 'none'
            ? this.buttonRight.hide()
            : this.restore()
          break

        case 'mosquito':
          this.actives[25].display === 'none'
            ? this.buttonRight.hide()
            : this.restore()
          break

        case 'shampoo':
          this.actives[21].display === 'none'
            ? this.buttonRight.hide()
            : this.restore()
          break

        case 'waterShampoo':
          this.actives[7].display === 'none'
            ? this.buttonRight.hide()
            : this.restore()
          break

        case 'warmWater':
          this.actives[12].display === 'none'
            ? this.buttonRight.hide()
            : this.restore()
          break

        case 'coldWater':
          this.actives[8].display === 'none'
            ? this.buttonRight.hide()
            : this.restore()
          break
        case 'waxProtection':
          this.actives[9].display === 'none'
            ? this.buttonRight.hide()
            : this.restore()
          break
        case 'dryShine':
          this.actives[10].display === 'none'
            ? this.buttonRight.hide()
            : this.restore()
          break
        case 'brushFoam':
          this.actives[20].display === 'none'
            ? this.buttonRight.hide()
            : this.restore()
          break
        case 'foam':
          this.actives[19].display === 'none'
            ? this.buttonRight.hide()
            : this.restore()
          break
        // ------------------------------
        default:
          break
      }
    },
    restore() {
      this.buttonRight.show()
      this.flex()
    },
    flex() {
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

        this.buttonRight.background = 'rgb(255, 255, 255)'
      }

      if (options.type === 'right') {
        this.buttonRight.background = options.background
        this.buttonRight.border = options.border
        this.buttonRight.boxShadow = options.boxShadow
        this.buttonRight.fontSize = options.fontSize

        this.buttonLeft.background = 'rgb(255, 255, 255)'
      }
    },
    setProgram(program) {
      // console.log('setProgram-->',program)
      if (program === 'standard') {
        this.active = this.activeProgramKit.name
      }
      if (program === 'advanced') {
        if (this.activeProgramKit.x2)
          this.active = this.activeProgramKit.name + '_x2'
        if (this.activeProgramKit.color)
          this.active = this.activeProgramKit.name + '_color'
        if (this.activeProgramKit.turbo)
          this.active = this.activeProgramKit.name + '_turbo'
      }

      this.setActiveProgram(this.active)
      this.setDown(this.active)

      /* dev */
      this.updateStartProgram([
        this.getPanelType,
        this.getPanelNumber,
        this.getActiveProgram,
        this.getWetBalance
      ])
      if (this.$route.name !== 'popup') {
        this.timeoutPopup = setTimeout(() => {
          try {
            this.$router.push('/popup')
          } catch (err) {}
        }, this.delay)
      }
    },
    setDown(program) {
      // this.clearDown()
      // console.log('setDown(program)-->', program)
      switch (program) {
        /* dev */
        // standard =====================
        case 'disk':
        case 'mosquito':
        case 'shampoo':
        case 'waterShampoo':
        case 'warmWater':
        case 'coldWater':
        case 'waxProtection':
        case 'dryShine':
        case 'brushFoam':
        case 'foam':
          this.clearDownButtonRight()

          /* dev */
          if (this.activeProgramKit.color) {
            this.isDownButtonLeft.standard
              ? this.setButtonStyle(this.upStandardColorOptions)
              : this.setButtonStyle(this.downStandardColorOptions)
          } else {
            /*     */
            this.isDownButtonLeft.standard
              ? this.setButtonStyle(this.upStandardOptions)
              : this.setButtonStyle(this.downStandardOptions)
          }

          /*     */

          this.isDownButtonLeft.standard = !this.isDownButtonLeft.standard
          break

        // advanced =====================
        // x2 ---------------------------
        case 'disk_x2':
        case 'mosquito_x2':
        case 'shampoo_x2':
          this.clearDownButtonLeft()

          this.isDownButtonRight.advanced
            ? this.setButtonStyle(this.upX2Options)
            : this.setButtonStyle(this.downX2Options)

          this.isDownButtonRight.advanced = !this.isDownButtonRight.advanced
          break
        // turbo ------------------------
        case 'waterShampoo_turbo':
        case 'warmWater_turbo':
        case 'coldWater_turbo':
        case 'waxProtection_turbo':
        case 'dryShine_turbo':
          this.clearDownButtonLeft()

          this.isDownButtonRight.advanced
            ? this.setButtonStyle(this.upTurboOptions)
            : this.setButtonStyle(this.downTurboOptions)

          this.isDownButtonRight.advanced = !this.isDownButtonRight.advanced
          break
        // color ------------------------
        case 'brushFoam_color':
        case 'foam_color':
          // console.log('++brushFoam_color')

          this.clearDownButtonLeft()

          this.isDownButtonRight.advanced
            ? this.setButtonStyle(this.upColorOptions)
            : this.setButtonStyle(this.downColorOptions)

          this.isDownButtonRight.advanced = !this.isDownButtonRight.advanced
          break

        // dry group
        case 'vacuum':
          console.log('++dry group')
          break

        // end --------------------------
        default:
          break
      }
    },
    clearDownButtonLeft() {
      this.isDownButtonLeft = Object.fromEntries(
        Object.entries(this.isDownButtonLeft).map(([key, value]) => [
          key,
          false
        ])
      )
    },
    clearDownButtonRight() {
      this.isDownButtonRight = Object.fromEntries(
        Object.entries(this.isDownButtonRight).map(([key, value]) => [
          key,
          false
        ])
      )
    },
    setup() {
      this.initial()
    },
    initial() {
      // classes instances
      /* left button */
      this.buttonLeft = new Button({
        selector: '#button-left',

        width: 25, // 28
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

        width: 25, //28
        height: 23,
        background: 'rgb(255, 255, 255)',
        borderRadius: 3,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })

      // image classes
      this.greenImage = new Box({
        selector: '#green-image'
      })

      this.blueImage = new Box({
        selector: '#blue-image'
      })

      this.redImage = new Box({
        selector: '#red-image'
      })
      // end classes

      this.activeProgramKit = this.getActiveProgramKit()

      // initial wet group
      if (
        this.activeProgramKit.name !== 'vacuum' &&
        this.activeProgramKit.name !== 'air' &&
        this.activeProgramKit.name !== 'washer' &&
        this.activeProgramKit.name !== 'turboDryer'
      ) {
        // standardOptions
        if (this.activeProgramKit.color) {
          this.setButtonStyle(this.upStandardColorOptions)
        } else this.setButtonStyle(this.upStandardOptions)

        if (this.activeProgramKit.x2) {
          this.setButtonStyle(this.upX2Options)

          this.messageIndex = 2
          this.buttonStandardTitleIndex = 0
          this.buttonTitleIndex = 5

          this.greenImage.show()
          this.blueImage.hide()
          this.redImage.hide()
        }

        if (this.activeProgramKit.color) {
          this.setButtonStyle(this.upColorOptions)
          this.messageIndex = 1
          this.buttonStandardTitleIndex = 2
          this.buttonTitleIndex = 3

          this.greenImage.hide()
          this.blueImage.hide()
          this.redImage.show()
        }
        if (this.activeProgramKit.turbo) {
          // console.log('++this.activeProgramKit.turbo-->', this.upTurboOptions)
          this.setButtonStyle(this.upTurboOptions)

          this.messageIndex = 0
          this.buttonStandardTitleIndex = 0
          this.buttonTitleIndex = 1

          this.greenImage.hide()
          this.blueImage.show()
          this.redImage.hide()
        }
      } // end wet group

      // initial dry group
      else {
        console.log('!!!initial dry group')

        switch (this.activeProgramKit.name) {
          case 'vacuum':
            this.messageIndex = 3
            break
          case 'air':
            this.messageIndex = 4
            break
          case 'washer':
            this.messageIndex = 5
            break
          case 'turboDryer':
            this.messageIndex = 6
            break

          default:
            break
        }

        this.greenImage.show()
        this.blueImage.hide()
        this.redImage.hide()

        this.buttonLeft.hide()
        this.buttonRight.hide()

        this.setProgram('standard')
      }
    }
  }, // end methods

  created() {},
  mounted() {
    this.setup()
    this.showAdvanced()
  },

  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
    clearTimeout(this.timeoutPopup)
  },

  components: {
    Message
  }
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

.info-title {
  
  height: 1.5em;
  font-size: 4.2em; /* 4.75em; */
  color: white;
   
}
table,
tr,
td {
  
  border: none;
  border-color: white;
}
.button-group {
  padding-left: 0em;
}

.message {
  position: absolute;
  margin-top: -36em;
  margin-left: 15em;

  font-family: 'Plumb-Medium';
  font-weight: normal; /* bold; */
  text-align: justify;
  z-index: 1;
}
.image {
  height: 54em;
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
.back {
  position: absolute;
  margin-top: -22em;
  margin-left: -2em;
  z-index: 1;
}
.active {
  padding-left: 4.5rem; 
  padding-bottom: 6rem;
}

</style>
