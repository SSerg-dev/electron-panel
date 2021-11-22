<template>
  <section>
    <div class="message" style="background: none;">
      <div><Message /></div>
    </div>

    <!-- <div class="message" style="background: yellow;">
      <span class="white-text">{{ this.getDefaultPanelNumber }}</span>
    </div> -->

    <form @submit.prevent="">
      <div class="form">
        <table style="margin-left: 0.9em;">
          <tbody>
            <!-- turbo -->

            <!-- row 01 -->
            <tr class="info-title">
              <td colspan="2">
                <p align="center">
                  {{ `${this.messages[0]}` }}
                  <!-- {{ this.getDefaultPanelNumber }} -->
                </p>
              </td>
            </tr>

            <!-- row 02 -->
            <tr class="button-group">
              <!-- standard -->
              <td align="center">
                <div
                  @click="setProgram('disk')"
                  class="waves-effect"
                  id="button-left"
                >
                  <div
                    :class="[
                      { 'button-black-title': !this.isDownButtonLeft.disk },
                      { 'button-white-title': this.isDownButtonLeft.disk }
                    ]"
                  >
                    {{ `${this.buttonTitle[0]}` }}
                  </div>
                </div>
              </td>

              <!-- turbo -->

              <td>
                <div
                  @click="setProgram('disk_x2')"
                  class="waves-effect"
                  id="button-right"
                >
                  <div
                    :class="[
                      { 'button-black-title': !this.isDownButtonRight.disk_x2 },
                      { 'button-white-title': this.isDownButtonRight.disk_x2 }
                    ]"
                  >
                    {{ `${this.buttonTitle[1]}` }}
                  </div>
                </div>
              </td>
            </tr>

            <!-- row 03 -->
            <tr class="image">
              <td colspan="2">
                <div>
                  <img src="imgs/actives/blue-active.svg" />
                </div>
              </td>
            </tr>

            <!-- end turbo -->
          </tbody>
        </table>
      </div>
    </form>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

import Message from '@/components/app/Message'
/* dev */
import { Component, Box, Circle, Button } from '@/shapes/index.js'

export default {
  data: () => ({
    /* disk */
    upDiskOptions: {
      type: 'left',
      background: 'rgb(255, 255, 255)',
      border: '0.4em solid rgb(64, 196, 255)',
      boxShadow: 'rgb(64, 196, 255) 0px 10px 20px',
      fontSize: '1em'
    },
    downDiskOptions: {
      type: 'left',
      background: 'rgb(64, 196, 255)',
      border: '0.4em solid rgb(64, 196, 255)',
      boxShadow: 'rgb(64, 196, 255) 0px 10px 20px',
      fontSize: '1em'
    },
    /* disk_x2 */
    upDiskX2Options: {
      type: 'right',
      background: 'rgb(255, 255, 255)',
      border: '0.4em solid rgb(244,67,54)',
      boxShadow: 'rgb(244,67,54) 0px 10px 20px',
      fontSize: '1em'
    },
    downDiskX2Options: {
      type: 'right',
      background: 'rgb(244,67,54)',
      border: '0.4em solid rgb(244,67,54)',
      boxShadow: 'rgb(244,67,54) 0px 10px 20px',
      fontSize: '1em'
    },
    /* end disk */
    // programName: '',

    buttonMain: null,
    buttonLeft: null,
    buttonRight: null,
    active: '',
    timeoutDelay: null,
    delay: 2000,
    timeoutPopup: null,
    /* isDown: {
      disk: false,
      disk_x2: false
    }, */
    isDownButtonLeft: {
      disk: false
    },
    isDownButtonRight: {
      disk_x2: false
    },

    messages: [
      `Выберите давление:`,
      `Выберите цвет пены:`,
      `Выберите дозацию химии:`
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
    buttonTitleIndex: -1
  }),
  /* console.log('this.activeProgramKit-->', this.activeProgramKit) */
  props: {
    activeProgramKit: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getWetBalance: 'getWetBalance'
    })
  },

  watch: {
    getWetBalance(flag) {
      if (parseInt(flag) === 0) {
        this.clearDownButtonLeft()
        this.clearDownButtonRight()

        this.timeoutPopup = setTimeout(() => {
          try {
            this.$router.push('/program')
          } catch (err) {}
        }, this.delay)
      }
    }
  },

  methods: {
    ...mapActions({
      updateStartProgram: 'updateStartProgram'
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram'
    }),

    setButtonStyle(options) {
      console.log('options-->', options.type, options.background)

      // console.log('options.background-->',typeof options.background )

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
      /* dev */
      // console.log('new disk-->', program)

      this.active = program
      this.setActiveProgram(this.active)
      this.setDown(program)

      /* dev */
      /* this.updateStartProgram([
        this.getPanelType,
        this.getDefaultPanelNumber,
        this.getActiveProgram,
        this.getWetBalance
      ])
      if (this.$route.name !== 'popup') {
        this.timeoutPopup = setTimeout(() => {
          try {
            this.$router.push('/popup')
          } catch (err) {}
        }, this.delay)
      } */
    },
    setDown(program) {
      // this.clearDown()
      switch (program) {
        /* dev */
        case 'disk':
          console.log('program-->', program)

          this.clearDownButtonRight()

          this.isDownButtonLeft.disk
            ? this.setButtonStyle(this.upDiskOptions)
            : this.setButtonStyle(this.downDiskOptions)

          this.isDownButtonLeft.disk = !this.isDownButtonLeft.disk
          break

        case 'disk_x2':
          this.clearDownButtonLeft()

          this.isDownButtonRight.disk_x2
            ? this.setButtonStyle(this.upDiskX2Options)
            : this.setButtonStyle(this.downDiskX2Options)

          this.isDownButtonRight.disk_x2 = !this.isDownButtonRight.disk_x2
          break

        default:
          break
      }
    },
    /* clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
    }, */
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
    }
  }, // end methods
  created() {
    
  },
  mounted() {
    /* left button */
    this.buttonLeft = new Button({
      selector: '#button-left',

      width: 28,
      height: 25,

      background: 'rgb(255, 255, 255)',
      borderTopRightRadius: 3,
      borderTopLeftRadius: 3,
      borderBottomRightRadius: 3,
      borderBottomLeftRadius: 3

      // border: 'solid 0.4em #40c4ff',
      // boxShadow: '0px 10px 20px #40c4ff'
    })

    /* right button */
    this.buttonRight = new Button({
      selector: '#button-right',

      width: 28,
      height: 25,

      background: 'rgb(255, 255, 255)',
      borderTopRightRadius: 3,
      borderTopLeftRadius: 3,
      borderBottomRightRadius: 3,
      borderBottomLeftRadius: 3

      // border: 'solid 0.4em rgb(244,67,54)',
      // boxShadow: '0px 10px 20px rgb(244,67,54)'
    })

    /* dev */
    // this.programName = this.activeProgramKit.name

    if (this.activeProgramKit.name === 'disk') {
      // console.log('!!++this.activeProgramKit.name-->', this.activeProgramKit.title)
      // left
      this.buttonLeft.border = 'solid 0.4em #40c4ff'
      this.buttonLeft.boxShadow = '0px 10px 20px #40c4ff'

      // right
      this.buttonRight.border = 'solid 0.4em rgb(244,67,54)'
      this.buttonRight.boxShadow = '0px 10px 20px rgb(244,67,54)'
    }
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
  height: 88em;
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
  height: 1em;
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
.button-content-standard-style {
  font-size: 4em;
  margin-left: 0em;
  padding-top: 0em;
  padding-right: 0.5em;
}

.button-turbo-style {
  display: flex;
  align-items: center;
  justify-content: center;

  padding-left: 0em;
  margin-left: -0.6em; /* -0.6em; */
  padding-top: 0em;
  width: 400px; /* 460px; */
  height: 360px; /* 360px; */
  border: solid 6px #f44336;
  border-radius: 40px;
  box-shadow: 0px 6px 10px #f44336;
}
.button-content-turbo-style {
  font-size: 4em;
  margin-left: 0em;
  padding-top: 0em;
  padding-right: 0.5em;
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
  height: 54em; /* 800px; */

  /* background: yellow; */
}
.button-black-title {
  font-size: 4em;
  color: black;
}
.button-white-title {
  font-size: 4em;
  color: white;
}

/* .number {
  position: absolute;
  margin-top: -32em;
  margin-left: 17em;
  color: #fff;

  font-size: 5em;

  font-family: 'Plumb-Medium';
  font-weight: normal;
  text-align: justify;
  z-index: 1;
} */
</style>
