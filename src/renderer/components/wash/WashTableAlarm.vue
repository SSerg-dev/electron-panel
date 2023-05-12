<template>
  <div class="locate">
    <div class="form">
      <div class="info-alarm">
        <div style="padding-left: 0em; padding-bottom: 0em">
          <p style="width: 94%" align="center">{{ `⚠️` }}</p>
        </div>
      </div>

      <table>
        <tbody>
          <!-- row 01 -->
          <tr
            v-if="this.messages.isFirst"
            class="info-title"
            style="height: 4em"
          >
            <td>
              <p style="width: 90%" align="left">
                {{ `✔️ ❗` }}
                {{ `${getAlarmsMessages[0]}` | localize }}
              </p>
            </td>
          </tr>
          <!-- row 02 -->
          <tr
            v-if="this.messages.isSecond"
            class="info-title"
            style="height: 4em"
          >
            <td>
              <p style="width: 90%" align="left">
                {{ `✔️ 📷 ` }}
                {{ `${getAlarmsMessages[1]}` | localize }}
              </p>
            </td>
          </tr>
          <!-- row 03 -->
          <tr
            v-if="this.messages.isThird"
            class="info-title"
            style="height: 3em"
          >
            <td>
              <p style="width: 90%" align="left">
                {{ `✔️ 🧑‍✈️ ` }}
                {{ `${getAlarmsMessages[2]}` | localize }}
              </p>
            </td>
          </tr>
          <!-- row 04 -->
          <tr
            v-if="this.messages.isFourth"
            class="info-title"
            style="height: 4em"
          >
            <td>
              <p style="width: 90%; margin-bottom: 0.4em" align="left">
                {{ `✔️ 📱 ` }}
                {{ `${getAlarmsMessages[3]}` | localize }}
                {{ `&nbsp;&nbsp;` }}
              </p>
              <p class="phone-title" align="center">
                <!-- {{ `${getAlarmsPhone}` }} -->
                {{ `${this.phone}` }}
              </p>
            </td>
          </tr>

          <!-- row 02 -->
          <tr class="button-group">
            <td style="padding-top: 8em">
              <div
                @click="setProgram('yes')"
                class="waves-effect"
                id="button-right"
              >
                <div
                  :class="[
                    {
                      'button-black-title': !this.isDown.yes,
                    },
                    { 'button-white-title': this.isDown.yes },
                  ]"
                >
                  {{ `${this.buttonTitle[this.buttonTitleIndex]}` | localize }}
                </div>
              </div>
            </td>
          </tr>

          <!-- end turbo -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'

import { Component, Box, Circle, Button } from '@/shapes/index.js'
import { upRedOptions, downRedOptions } from '@/shapes/index.js'

export default {
  data: () => ({
    config: {},
    alarms: {},
    phone: '',
    messages: {
      isFirst: true,
      isSecond: true,
      isThird: false,
      isFourth: false,
    },

    // options
    upRedOptions: upRedOptions,
    downRedOptions: downRedOptions,

    // clone
    _upRedOptions: null,
    _downRedOptions: null,

    // classes
    buttonLeft: null,
    buttonRight: null,

    active: '',
    delay: 1000,
    timeoutDelay: null,

    isDown: {
      yes: false,
    },

    buttonTitle: [`OK`, `Cancel`],
    buttonTitleIndex: -1,

    programName: '',
  }),

  props: {
    actives: {
      required: true,
      type: Array,
    },
  },

  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
      getPanelNumber: 'getPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getWetBalance: 'getWetBalance',
      getAlarmsMessages: 'getAlarmsMessages',
      getAlarmsPhone: 'getAlarmsPhone',
    }),
  },

  watch: {
    getWetBalance(flag) {
      if (parseInt(flag) === 0) {
        this.clearDown()
      }
    },
  },

  methods: {
    ...mapGetters({
      getConfig: 'getConfig',
    }),
    ...mapActions({
      updateStartProgram: 'updateStartProgram',
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',
      setAlarmsMessagesIndex: 'setAlarmsMessagesIndex',
      setAlarmsPhone: 'setAlarmsPhone',
    }),
    setProgram(program) {
      this.active = program

      this.setActiveProgram(this.active)
      this.setDown(this.active)
    },

    setDown(program) {
      this.clearDown()

      switch (program) {
        case 'yes':
          this.setButtonStyle(this._downRedOptions)
          this.isDown.yes = true

          this.timeoutDelay = setTimeout(() => {
            try {
              if (this.$route.name !== 'home') this.$router.push('/')
            } catch (err) {}
          }, this.delay)

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
      this.setButtonStyle(this._upRedOptions)
    },
    setup() {
      this.initial()
    },

    initial() {
      // classes instances

      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right',

        width: 16,
        height: 10,
        background: 'rgb(255, 255, 255)',
        borderRadius: 2,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })
      // end classes

      // clone
      this._upRedOptions = { ...upRedOptions }
      this._downRedOptions = { ...downRedOptions }

      this._upRedOptions.type = 'right'
      this._upRedOptions.width = 16
      this._upRedOptions.height = 16

      this._downRedOptions.type = 'right'
      this._downRedOptions.width = 16
      this._downRedOptions.height = 16

      this.restore('right')
    }, // end initial

    restore(type) {
      switch (type) {
        case 'right':
          this.buttonTitleIndex = 0
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
      this.buttonRight.display = 'flex'
      this.buttonRight.alignItems = 'center'
      this.buttonRight.justifyContent = 'center'
    },

    setButtonStyle(options) {
      if (options.type === 'right') {
        this.buttonRight.background = options.background
        this.buttonRight.border = options.border
        this.buttonRight.boxShadow = options.boxShadow
        this.buttonRight.fontSize = options.fontSize
        this.buttonRight.width = options.width
      }
    },

    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
      this.setButtonStyle(this._upRedOptions)
    },

    show() {
      this.config = this.getConfig()

      this.messages.isFirst = this.config.alarms.messages.includes(1)
      this.messages.isSecond = this.config.alarms.messages.includes(2)
      this.messages.isThird = this.config.alarms.messages.includes(3)
      this.messages.isFourth = this.config.alarms.messages.includes(4)
      this.phone = this.config.alarms.phone
    },
  }, // end methods

  created() {
    this.show()
  },
  mounted() {
    this.setup()
  },

  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
  },

  components: {},
}
</script>

<style scoped>
.locate {
  position: relative;
  text-align: center;
}
.form {
  width: 67em;
  height: 82em;
  margin-left: 0em;
  margin-top: 11em;
  padding-left: 0em;
  padding-top: 2em;
  padding-bottom: 0em;

  background: rgb(255, 255, 255);
  border: solid 3px red;
  border-radius: 2em;
  box-shadow: 0px 0px 10px 10px red;
}
table {
  margin-left: 1em;
  margin-top: 14em;
}

table,
tr,
td {
  padding-left: 2em;
  border: none;
  text-align: center;
}

.info-alarm {
  position: absolute;
  top: 0.4em;
  left: 3.5em;
  font-size: 8em;
  color: black;
}
.info-title {
  /* position: absolute; */
  font-size: 3em;
  color: black;
}
.phone-title {
  /* 
  style="    " 
  */
  margin-left: 3.7em;
  width: 10em;
  border: solid 1px lightGrey;
  background: #fff;
  border-radius: 0.2em;
}

.button-group {
  position: fixed;
  left: 46em;
  bottom: 20em;
}

.button-black-title {
  font-size: 4em;
  color: black;

  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.button-white-title {
  font-size: 4em;
  color: white;
}
</style>
