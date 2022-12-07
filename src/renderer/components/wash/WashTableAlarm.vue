<template>
  <div v-if="this.isVisible.alarm" class="locate">
    <div class="form">
      <div class="info-alarm">
        <div style="padding-left: 0em; padding-bottom: 0em">
          <p style="width: 94%" align="center">{{ `⚠️` }}</p>
        </div>
      </div>

      <table>
        <tbody>
          <!-- row 01 -->
          <tr class="info-title" style="height: 4em">
            <td>
              <!-- <p style="width: 90%;" align="center">{{ `${this.messages[0]}` | localize }}</p> -->
              <!--   -->
              <p style="width: 90%" align="left">
                {{`✔️ ❗`}}
                {{ `${getAlarmsMessages[0]}` | localize }}
              </p>
            </td>
          </tr>
          <!-- row 02 -->
          <tr class="info-title" style="height: 4em">
            <td>
              <p style="width: 90%" align="left">
                {{`✔️ 📷 `}}
                {{ `${getAlarmsMessages[1]}` | localize }}
              </p>
            </td>
          </tr>
          <!-- row 03 -->
          <tr
            v-if="this.isVisible.operator"
            class="info-title"
            style="height: 3em"
          >
            <td>
              <p style="width: 90%" align="left">
                {{`✔️ 🧑‍✈️ `}}
                {{ `${getAlarmsMessages[2]}` | localize}}
              </p>
            </td>
          </tr>
          <!-- row 04 -->
          <tr
            v-if="this.isVisible.support"
            class="info-title"
            style="height: 4em"
          >
            <td>
              <p style="width: 90%" align="left">
                {{`✔️ 📱 `}}
                {{ `${getAlarmsMessages[3]}` | localize}}
                {{`&nbsp;&nbsp;`}}
                {{`${getAlarmsPhone}`}}
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
                  {{ `${this.buttonTitle[this.buttonTitleIndex]}` }}
                </div>
              </div>
            </td>
          </tr>

          <!-- <tr>
              <td colspan="2" style="padding-left: 2em;" class="legal-title" >
                <p style="width: 85%;"  align="center">{{ `${this.messages[1]}` | localize }}</p>
              </td>
            </tr> -->

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

    isVisible: {
      alarm: true,
      operator: true,
      support: true,
    },

    messages: [
      /* 'Вы хотите завершить мойку и вернуть остаток бонусами на счет?', */
      `You_want_to_complete_the_car_wash`,
      /* 'Нажимая кнопку Да, Вы даете свое согласие на отправку Вам СМС-сообщения 
      и обработку персональных данных согласно условиям, 
      размещенным на сайте: www.alles-bonus.com' */
      `By_clicking_the_Yes_button_you_give_your_consent`,
    ],
    messageIndex: -1,

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
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getWetBalance: 'getWetBalance',
      getAlarmsMessages: 'getAlarmsMessages',
      getAlarmsPhone: 'getAlarmsPhone'
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
    ...mapGetters({}),
    ...mapActions({
      updateStartProgram: 'updateStartProgram',
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',
      setAlarmsMessagesIndex: 'setAlarmsMessagesIndex',
      setAlarmsPhone: 'setAlarmsPhone'
    }),
    setProgram(program) {
      this.active = program

      this.setActiveProgram(this.active)
      this.setDown(this.active)

      // this.$message(localizeFilter(`${messages.Not_enough_money}`))
      this.timeoutDelay = setTimeout(() => {
        this.isVisible.alarm = !this.isVisible.alarm
      }, this.delay)
    },

    setDown(program) {
      this.clearDown()

      switch (program) {
        case 'yes':
          // console.log('++yes')

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
      // this.setAlarmsMessagesIndex(3)
      this.setAlarmsPhone('х ххх ххх хх хх')  
      this.initial()
    },

    initial() {
      // classes instances

      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right',

        width: 16,
        height: 13,
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

        // this.buttonLeft.background = 'rgb(255, 255, 255)'
      }
    },

    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
      this.setButtonStyle(this._upRedOptions)
    },
  }, // end methods

  created() {},
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

/* table,
tr,
td,
p {
  background: yellow;

} */
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

.button-group {
  position: fixed;
  left: 45em;
  bottom: 20.5em;
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
