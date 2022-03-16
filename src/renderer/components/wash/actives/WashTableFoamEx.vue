<template>
  <div>
    <!--  foam -->
    <!-- ЩЕТКА + ПЕНА -->
    <td>
      <div
        @click="setProgram('foam')"
        class="waves-effect "
        id="button-left-foam"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.foam },
            { 'card-content white-text': this.isDown.foam }
          ]"
        >
          {{ `${actives[this.activeNumber].title}` }}
        </div>
      </div>
    </td>

    <!-- ЩЕТКА center-->
    <td>
      <div
        @click="setProgram('foam_color')"
        class="waves-effect"
        id="button-center-foam"
      >
        <div
          class="button-content-style-color"
          :class="[
            { 'card-content white-text': this.isDown.foam_color },
            { 'card-content white-text': !this.isDown.foam_color }
          ]"
        >
          <div style="font-style: italic;">
            {{ `${actives[this.activeNumber_color].name.slice(-5)}` }}
          </div>
        </div>
      </div>
    </td>

    <!-- ЩЕТКА X2-->
    <td>
      <div
        @click="setProgram('foam_x2')"
        class="waves-effect"
        id="button-right-foam"
      >
        <div
          class="button-content-style-x2"
          :class="[
            { 'card-content black-text': !this.isDown.foam_x2 },
            { 'card-content white-text': this.isDown.foam_x2 }
          ]"
        >
          <div style="font-style: italic;">
            {{ `${actives[this.activeNumber_x2].name.slice(-2)}` }}
          </div>
        </div>
      </div>
    </td>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

import { Component, Box, Circle, Button } from '@/shapes/index.js'
import {
  upStandardOptions,
  downStandardOptions,
  upX2Options,
  downX2Options,
  upColorOptions,
  downColorOptions,
  upRedOptions,
  downRedOptions
} from '@/shapes/index.js'

import { log } from '../../../../main/utils'

export default Vue.extend({
  data: () => ({
    // options
    upStandardOptions: upStandardOptions,
    downStandardOptions: downStandardOptions,
    upX2Options: upX2Options,
    downX2Options: downX2Options,
    upColorOptions: upColorOptions,
    downColorOptions: downColorOptions,
    upRedOptions: upRedOptions,
    downRedOptions: downRedOptions,

    // clone
    _upStandardOptions: null,
    _downStandardOptions: null,
    _upX2Options: null,
    _downX2Options: null,
    _upColorOptions: null,
    _downColorOptions: null,
    _upRedOptions: null,
    _downRedOptions: null,

    // classes
    buttonLeft: null,
    buttonRight: null,
    buttonCenter: null,

    visible: '',
    visible_x2: '',
    visible_color: '',

    activeNumber: 5,
    activeNumber_x2: 22,
    activeNumber_color: 19,

    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      foam: false,
      foam_x2: false,
      foam_color: false
    }
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
      getWetBalance: 'getWetBalance'
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
      updateStartProgram: 'updateStartProgram'
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',
      setActiveProgramKit: 'setActiveProgramKit',
      setIsActiveProgramKit: 'setIsActiveProgramKit'
    }),

    setProgram(program) {
      this.active = program

      this.setActiveProgram(this.active)
      this.setDown(this.active)

      this.updateStartProgram([
        this.getPanelType,
        this.getDefaultPanelNumber,
        this.getActiveProgram,
        this.getWetBalance
      ])

      this.setIsActiveProgramKit(true)
      this.setActiveProgramKit(this.activeProgramKit)

      if (parseInt(this.getWetBalance) > 0) {
        this.timeoutPopup = setTimeout(() => {
          // this.$router.push('/popup')
        }, 1000)
      } else this.$message(`Недостаточно средств`)
    },
    setDown(program) {
      this.clearDown()

      switch (program) {
        case 'foam':
          this.setButtonStyle(this._downRedOptions)
          this.isDown.foam = true
          break
        case 'foam_x2':
          this.setButtonStyle(this._downX2Options)
          this.isDown.foam_x2 = true
          break
        case 'foam_color':
          this.setButtonStyle(this._downColorOptions)
          this.isDown.foam_color = true
          break

        default:
          break
      }
      this.timeoutSetUp = setTimeout(() => {
        try {
          if (this.getWetBalance === '0') this.clearDown()
        } catch (err) {}
      }, 1000)
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
      this.setButtonStyle(this._upStandardOptions)
      this.setButtonStyle(this._upX2Options)
      this.setButtonStyle(this._upColorOptions)
      this.setButtonStyle(this._upRedOptions)
    },
    getKits() {
      const result = []
      Object.entries(this.actives[this.activeNumber]).map(([key, value]) => {
        if (
          key === 'title' ||
          key === 'name' ||
          key === 'x2' ||
          key === 'color' ||
          key === 'turbo'
        ) {
          result.push([key, value])
        }
        return
      })

      this.activeProgramKit = Object.fromEntries(result)
      // console.log('this.activeProgramKit', this.activeProgramKit)
    },
    setup() {
      this.initial()
    },
    initial() {
      // classes instances

      /* left button */
      this.buttonLeft = new Button({
        selector: '#button-left-foam',

        width: 51,
        height: 7,
        background: 'rgb(255, 255, 255)',
        borderRadius: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left'
      })

      /* center button */
      this.buttonCenter = new Button({
        selector: '#button-center-foam',

        width: 7,
        height: 7,
        background: 'rgb(255, 255, 255)',
        borderRadius: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })

      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right-foam',

        width: 7,
        height: 7,
        background: 'rgb(255, 255, 255)',
        borderRadius: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })

      // end classes
      // clone
      this._upStandardOptions = { ...upStandardOptions }
      this._downStandardOptions = { ...downStandardOptions }
      this._upX2Options = { ...upX2Options }
      this._downX2Options = { ...downX2Options }
      this._upColorOptions = { ...upColorOptions }
      this._downColorOptions = { ...downColorOptions }
      this._upRedOptions = { ...upRedOptions }
      this._downRedOptions = { ...downRedOptions }
      // end clone
      if (
        this.visible === 'block' &&
        this.visible_color === 'none' &&
        this.visible_x2 === 'none'
      ) {
        this.restore('left')
      } else if (
        this.visible === 'block' &&
        this.visible_color === 'block' &&
        this.visible_x2 === 'none'
      ) {
        this.restore('right_color')
      } else if (
        this.visible === 'block' &&
        this.visible_color === 'none' &&
        this.visible_x2 === 'block'
      ) {
        this.restore('right_x2')
      } else if (
        this.visible === 'block' &&
        this.visible_color === 'block' &&
        this.visible_x2 === 'block'
      ) {
        this.restore('right_color_x2')
      }
    },
    restore(type) {
      switch (type) {
        case 'left':
          this._upRedOptions.width = '67em'
          this._downRedOptions.width = '67em'
          this.buttonLeft.show()
          this.flex()
          this.buttonCenter.hide()
          this.buttonRight.hide()
          break

        case 'right_color':
          this._upRedOptions.width = '58em'
          this._downRedOptions.width = '58em'
          this.buttonLeft.show()
          this.buttonCenter.show()
          this.flex()
          this.buttonRight.hide()
          break

        case 'right_x2':
          this._upRedOptions.width = '58em'
          this._downRedOptions.width = '58em'
          this.buttonLeft.show()
          this.buttonRight.show()
          this.flex()
          this.buttonCenter.hide()
          break

        case 'right_color_x2':
          this._upRedOptions.width = '51em'
          this._downRedOptions.width = '51em'
          this.buttonLeft.show()
          this.buttonCenter.show()
          this.buttonRight.show()
          this.flex()
          break

        default:
          break
      }

      this.setButtonStyle(this._upRedOptions)
      this.setButtonStyle(this._upColorOptions)
      this.setButtonStyle(this._upX2Options)
    },

    flex() {
      this.buttonLeft.display = 'flex'
      this.buttonLeft.alignItems = 'center'
      this.buttonLeft.justifyContent = 'left'

      this.buttonCenter.display = 'flex'
      this.buttonCenter.alignItems = 'center'
      this.buttonCenter.justifyContent = 'center'

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
      }

      if (options.type === 'center') {
        this.buttonCenter.background = options.background
        this.buttonCenter.border = options.border
        this.buttonCenter.boxShadow = options.boxShadow
        this.buttonCenter.fontSize = options.fontSize
        this.buttonCenter.width = options.width
      }

      if (options.type === 'right') {
        this.buttonRight.background = options.background
        this.buttonRight.border = options.border
        this.buttonRight.boxShadow = options.boxShadow
        this.buttonRight.fontSize = options.fontSize
        this.buttonRight.width = options.width
      }
    }
  }, // end methods

  beforeDestroy() {
    clearTimeout(this.timeoutPopup)
    clearTimeout(this.timeoutSetUp)
  },
  created() {
    this.getKits()
  },
  mounted() {
    this.visible = this.actives[this.activeNumber].display
    this.visible_x2 = this.actives[this.activeNumber_x2].display
    this.visible_color = this.actives[this.activeNumber_color].display

    this.setup()
  }
})
</script>

<style scoped>
table,
tr,
td {
  border: none;
  padding-top: 0.5em;
  padding-right: 15px;
}

.button-content-style {
  font-size: 3.5em;
  margin-left: 1.2em;
  padding-top: 0em;
  padding-right: 0em;
}
.button-content-style-color {
  font-size: 2.5em;
  margin-left: -0.2em;
  padding-top: 0em;
  padding-right: 0em;
}
.button-content-style-x2 {
  font-size: 3em;
  margin-left: -0.1em;
  padding-top: 0em;
  padding-right: 0em;
}
</style>
