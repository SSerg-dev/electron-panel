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
        <table style="margin-left: 1em;">
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
            <tr>
              <!-- standard -->
              <td>
                <div
                  @click="setProgram('disk')"
                  class="waves-effect button-standard-style"
                  :class="[
                    { 'card white': !this.isDown.disk },
                    { 'card light-blue accent-2': this.isDown.disk }
                  ]"
                >
                  <div
                    class="button-content-standard-style"
                    :class="[
                      { 'card-content black-text': !this.isDown.disk },
                      { 'card-content white-text': this.isDown.disk }
                    ]"
                  >
                    {{ `${this.buttonTitle[0]}` }}
                  </div>
                </div>
              </td>

              <!-- turbo -->
              <!-- <td>
                <div
                  @click="setProgram('disk_x2')"
                  class="waves-effect button-turbo-style"
                  :class="[
                    { 'card white': !this.isDown.disk_x2 },
                    { 'card red': this.isDown.disk_x2 }
                  ]"
                >
                  <div
                    class="button-content-turbo-style"
                    :class="[
                      { 'card-content black-text': !this.isDown.disk_x2 },
                      { 'card-content white-text': this.isDown.disk_x2 }
                    ]"
                  >
                    {{ `${this.buttonTitle[1]}` }}
                  </div>
                </div>
              </td> -->

              <!-- setButtonColor() -->
              <div
                @click="setButtonColor()"
                class="waves-effect"
                id="button-right"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  "
              >
                <div style="font-size: 4em; color: black">
                  {{ `${this.buttonTitle[1]}` }}
                </div>
              </div>

               <!-- <div
                @click="setButtonColor()"
                class="waves-effect"
                id="button-main"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: yellow
                  "
              >
                <div style="font-size: 4em; color: yellow">
                  {{ `${this.buttonTitle[1]}` }}
                </div>
              </div> -->
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
    /* x2 */
    upX2Options: {
      background: 'rgb(255, 255, 255)',
      border: '0.4em solid rgb(64, 196, 255)',
      boxShadow: 'rgb(64, 196, 255) 0px 10px 20px',
      fontSize: '1em'
    },
    downX2Options: {
      background: 'rgb(64, 196, 255)',
      border: '0.4em solid rgb(64, 196, 255)',
      boxShadow: 'rgb(64, 196, 255) 0px 10px 20px',
      fontSize: '1em'
    },
    buttonMain: null,
    buttonLeft: null,
    buttonRight: null,
    active: '',
    timeoutDelay: null,
    delay: 2000,
    timeoutPopup: null,
    isDown: {
      /* dev */
      disk: false,
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
  /* props: {
    active: {
      required: true,
      type: String
    }
  }, */
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
        this.clearDown()

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

    setButtonColor(color) {

      /* const background = 'rgb(64, 196, 255)'
      const border = '0.4em solid rgb(64, 196, 255)'
      const boxShadow = 'rgb(64, 196, 255) 0px 10px 20px'
      const fontSize = '1em'

      this.button.background = background
      this.button.border = border
      this.button.boxShadow = boxShadow
      this.button.fontSize = fontSize

      console.log('++this.button.background-->', this.button.background)
      console.log('++this.button.border-->', this.button.border)
      console.log('++this.button.boxShadow-->', this.button.boxShadow)
      console.log('++this.button.fontSize-->', this.button.fontSize) */

    },
    setProgram(program) {
      /* dev */
      console.log('new disk-->', program)

      this.active = program
      this.setActiveProgram(this.active)
      this.setDown(program)

      this.updateStartProgram([
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
      }
    },
    setDown(program) {
      this.clearDown()
      switch (program) {
        /* dev */
        case 'disk':
          this.isDown.disk = true
          break
        case 'disk_x2':
          this.isDown.disk_x2 = true
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
    /* dev */
    setUpX2Options() {
      /* 
      upX2Options: {
      background: 'rgb(255, 255, 255)',
      border: '0.4em solid rgb(64, 196, 255)',
      boxShadow: 'rgb(64, 196, 255) 0px 10px 20px',
      */


    },
    setDownX2Options() {}
  }, // end methods
  mounted() {
    /* button-main */
    /* this.buttonMain = new Button({
      selector: '#button-main',

      width: 28,
      height: 25,

      background: 'rgb(255, 255, 255)',
      borderTopRightRadius: 3,
      borderTopLeftRadius: 3,
      borderBottomRightRadius: 3,
      borderBottomLeftRadius: 3,

      border: 'solid 0.4em #40c4ff',
      boxShadow: '0px 10px 20px #40c4ff'
    }) */
    /* left button */
    /* this.buttonLeft = new Button({
      selector: '#button-left',

      width: 28,
      height: 25,

      background: 'rgb(255, 255, 255)',
      borderTopRightRadius: 3,
      borderTopLeftRadius: 3,
      borderBottomRightRadius: 3,
      borderBottomLeftRadius: 3,

      border: 'solid 0.4em #40c4ff',
      boxShadow: '0px 10px 20px #40c4ff'
    }) */

    /* right button */
    this.buttonRight = new Button({
      selector: '#button-right',

      width: 28,
      height: 25,

      background: 'rgb(255, 255, 255)',
      borderTopRightRadius: 3,
      borderTopLeftRadius: 3,
      borderBottomRightRadius: 3,
      borderBottomLeftRadius: 3,

      border: 'solid 0.4em #40c4ff',
      boxShadow: '0px 10px 20px #40c4ff'
    })

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
  /* position: absolute; */

  /* width: 800px; */
  padding-top: 0em;
  padding-left: 0em;
  padding-right: 0em;
  padding-bottom: 0em;

  margin-top: 0em;
  margin-left: 0em;
  font-size: 4.2em; /* 4.75em; */

  color: #fff;
  text-align: center;
  font-family: 'Plumb-Medium';
}
table,
th,
td {
  /* display: flex;
  align-items: center;
  justify-content: center; */

  border: none;
  border-color: white;
}

.button-standard-style {
  display: flex;
  align-items: center;
  justify-content: center;

  padding-left: 0em;
  margin-left: 2.5em; /* 0em; */
  padding-top: 0em;

  width: 400px; /* 460px; */
  height: 360px; /* 360px; */
  border: solid 6px #40c4ff;
  border-radius: 40px;
  box-shadow: 0px 6px 10px #40c4ff;
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
