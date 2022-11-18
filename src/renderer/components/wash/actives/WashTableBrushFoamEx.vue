<template>
  <div>
    <!-- brushFoam -->
    <!-- ЩЕТКА -->
    <td>
      <div
        @click="setProgram('brushFoam')"
        class="waves-effect "
        id="button-left-brush"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.brushFoam },
            { 'card-content white-text': this.isDown.brushFoam }
          ]"
        >
          {{ `${actives[this.activeNumber].title}` | localize }}
        </div>
      </div>
    </td>

    <!-- ЩЕТКА center-->
    <td>
      <div
        @click="setProgram('brushFoam_color')"
        class="waves-effect"
        id="button-center-brush"
      >
        <div
          class="button-content-style-color"
          :class="[
            { 'card-content white-text': this.isDown.brushFoam_color },
            { 'card-content white-text': !this.isDown.brushFoam_color }
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
        @click="setProgram('brushFoam_x2')"
        class="waves-effect"
        id="button-right-brush"
      >
        <div
          class="button-content-style-x2"
          :class="[
            { 'card-content black-text': !this.isDown.brushFoam_x2 },
            { 'card-content white-text': this.isDown.brushFoam_x2 }
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
import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'


import { Component, Box, Circle, Button } from '@/shapes/index.js'
import {
  upStandardOptions,
  downStandardOptions,
  upX2Options,
  downX2Options,
  upColorOptions,
  downColorOptions,
  upGreenOptions,
  downGreenOptions,
  buttonSizeOptions,
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
    upGreenOptions: upGreenOptions,
    downGreenOptions: downGreenOptions,
    buttonSizeOptions: buttonSizeOptions,

    // clone
    _upStandardOptions: null,
    _downStandardOptions: null,
    _upX2Options: null,
    _downX2Options: null,
    _upColorOptions: null,
    _downColorOptions: null,
    _upGreenOptions: null,
    _downGreenOptions: null,

    // classes
    buttonLeft: null,
    buttonRight: null,
    buttonCenter: null,

    visible: '',
    visible_x2: '',
    visible_color: '',

    activeNumber: 13,
    activeNumber_x2: 23,
    activeNumber_color: 20,

    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      brushFoam: false,
      brushFoam_x2: false,
      brushFoam_color: false
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
    },
    getActiveProgram(flag) {
      if (
        flag !== this.actives[this.activeNumber].name &&
        flag !== this.actives[this.activeNumber_color].name &&
        flag !== this.actives[this.activeNumber_x2].name
      )
        this.clearDown()
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
      } else this.$message(localizeFilter(`${messages.Not_enough_money}`))
    },
    setDown(program) {
      this.clearDown()

      switch (program) {
        case 'brushFoam':
          this.setButtonStyle(this._downGreenOptions)
          this.isDown.brushFoam = true

          this.setButtonStyle(this._upX2Options)
          this.isDown.brushFoam_x2 = false

          this.setButtonStyle(this._upColorOptions)
          this.isDown.brushFoam_color = false

          break
        case 'brushFoam_x2':
          this.setButtonStyle(this._downX2Options)
          this.isDown.brushFoam_x2 = true

          this.setButtonStyle(this._downGreenOptions)
          this.isDown.brushFoam = true

          this.setButtonStyle(this._upColorOptions)
          this.isDown.brushFoam_color = false
          break
        case 'brushFoam_color':
          this.setButtonStyle(this._downColorOptions)
          this.isDown.brushFoam_color = true

          this.setButtonStyle(this._downGreenOptions)
          this.isDown.brushFoam = true

          this.setButtonStyle(this._upX2Options)
          this.isDown.brushFoam_x2 = false


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
      this.setButtonStyle(this._upGreenOptions)
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
        selector: '#button-left-brush',

        width: this.buttonSizeOptions.extraMedium,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left'
      })

      /* center button */
      this.buttonCenter = new Button({
        selector: '#button-center-brush',

        width: this.buttonSizeOptions.extraSmall,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })

      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right-brush',

        width: this.buttonSizeOptions.extraSmall,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius,

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
      this._upGreenOptions = { ...upGreenOptions }
      this._downGreenOptions = { ...downGreenOptions }
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
          this._upGreenOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix
          this._downGreenOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix 
          this.buttonLeft.show()
          this.flex()
          this.buttonCenter.hide()
          this.buttonRight.hide()
          break

        case 'right_color':
          this._upGreenOptions.width = //'59.5em'
            this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
          this._downGreenOptions.width = //'59.5em'
            this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
          this.buttonLeft.show()
          this.buttonCenter.show()
          this.flex()
          this.buttonRight.hide()
          break

        case 'right_x2':
          this._upGreenOptions.width = //'59.5em'
            this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
          this._downGreenOptions.width = //'59.5em'
            this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
          this.buttonLeft.show()
          this.buttonRight.show()
          this.flex()
          this.buttonCenter.hide()
          break

        case 'right_color_x2':
          this._upGreenOptions.width = //'52em'
            this.buttonSizeOptions.extraMedium + this.buttonSizeOptions.suffix 
          this._downGreenOptions.width = //'52em'
            this.buttonSizeOptions.extraMedium + this.buttonSizeOptions.suffix 
          this.buttonLeft.show()
          this.buttonCenter.show()
          this.buttonRight.show()
          this.flex()
          break

        default:
          break
      }

      this.setButtonStyle(this._upGreenOptions)
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
  padding-right: 6px;
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
