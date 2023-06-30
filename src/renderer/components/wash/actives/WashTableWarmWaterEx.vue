<template>
  <div>
    <!--  warmWater -->
    <!-- ТЕПЛАЯ ВОДА -->
    <td>
      <div
        @click="setProgram('warmWater')"
        class="waves-effect"
        id="button-left-warm-water"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.warmWater },
            { 'card-content white-text': this.isDown.warmWater },
          ]"
        >
          {{ `${actives[this.activeNumber].title}` | localize }}
        </div>
      </div>
    </td>

    <!-- ТЕПЛАЯ ВОДА X2-->
    <td>
      <div
        @click="setProgram('warmWater_turbo')"
        class="waves-effect-"
        id="button-right-warm-water"
      >
        <div
          class="button-content-style-turbo"
          :class="[
            { 'card-content black-text': !this.isDown.warmWater_turbo },
            { 'card-content white-text': this.isDown.warmWater_turbo },
          ]"
        >
          <div style="font-style: italic">
            {{ `${actives[this.activeNumber_turbo].name.slice(-5)}` }}
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
  upTurboOptions,
  downTurboOptions,
  buttonSizeOptions,
} from '@/shapes/index.js'

import { log } from '../../../../main/utils'

export default Vue.extend({
  data: () => ({
    upStandardOptions: upStandardOptions,
    downStandardOptions: downStandardOptions,
    upTurboOptions: upTurboOptions,
    downTurboOptions: downTurboOptions,
    buttonSizeOptions: buttonSizeOptions,

    // clone
    _upStandardOptions: null,
    _downStandardOptions: null,
    _upTurboOptions: null,
    _downTurboOptions: null,

    // classes
    buttonLeft: null,
    buttonRight: null,

    // native
    visible: '',
    visible_turbo: '',
    activeNumber: 11,
    activeNumber_turbo: 12,

    // neighbor Cold
    visibleCold: '',
    visibleCold_turbo: '',
    activeColdNumber: 2,
    activeColdNumber_turbo: 8,

    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      warmWater: false,
      warmWater_turbo: false,
    },
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
    }),
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
        flag !== this.actives[this.activeNumber_turbo].name
      )
        this.clearDown()
    },
  },
  methods: {
    ...mapGetters({
      getActiveProgramKit: 'getActiveProgramKit',
      getIsActiveProgramKit: 'getIsActiveProgramKit',
    }),
    ...mapActions({
      updateStartProgram: 'updateStartProgram',
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',
      setActiveProgramKit: 'setActiveProgramKit',
      setIsActiveProgramKit: 'setIsActiveProgramKit',
    }),

    setProgram(program) {
      this.active = program

      this.setActiveProgram(this.active)
      this.setDown(this.active)

      this.updateStartProgram([
        this.getPanelType,
        this.getPanelNumber,
        this.getActiveProgram,
        this.getWetBalance,
      ])

      this.setIsActiveProgramKit(true)
      this.setActiveProgramKit(this.activeProgramKit)

      if (parseInt(this.getWetBalance) > 0) {
        this.timeoutPopup = setTimeout(() => {
        }, 2000)
      } else this.$message(localizeFilter(`${messages.Not_enough_money}`))
    },
    setDown(program) {
      this.clearDown()

      switch (program) {
        case 'warmWater':
          this.setButtonStyle(this._downStandardOptions)
          this.isDown.warmWater = true
          break
        case 'warmWater_turbo':
          this.setButtonStyle(this._downTurboOptions)
          this.isDown.warmWater_turbo = true

          this.setButtonStyle(this._downStandardOptions)
          this.isDown.warmWater = true
          break

        default:
          break
      }
      this.timeoutSetUp = setTimeout(() => {
        try {
          if (this.getWetBalance === '0') this.clearDown()
        } catch (err) {}
      }, 2000)
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
      this.setButtonStyle(this._upStandardOptions)
      this.setButtonStyle(this._upTurboOptions)
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
        selector: '#button-left-warm-water',

        width: this.buttonSizeOptions.small,//25.5,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius,//4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
      })
      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right-warm-water',

        width: this.buttonSizeOptions.extraSmall,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius,//4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })
      // end classes

      // clone
      this._upStandardOptions = { ...upStandardOptions }
      this._downStandardOptions = { ...downStandardOptions }
      this._upTurboOptions = { ...upTurboOptions }
      this._downTurboOptions = { ...downTurboOptions }
      // end clone

      if (this.visibleCold === 'block') {
        if (this.visible_turbo === 'none') {
          this.restore('left')
        } else if (this.visible_turbo === 'block') {
          this.restore('right')
        }
      } else if (this.visibleCold === 'none') {
        if (this.visible_turbo === 'none') {
          this.restore('leftCold')
        } else if (this.visible_turbo === 'block') {
          this.restore('rightCold')
        }
      }
    }, // end initial()

    restore(type) {
      switch (type) {
        case 'left':
          this._upStandardOptions.width = //'32.5em'
            this.buttonSizeOptions.medium + this.buttonSizeOptions.suffix 
          this._downStandardOptions.width = //'32.5em'
            this.buttonSizeOptions.medium + this.buttonSizeOptions.suffix 
          this.buttonRight.hide()
          break
        case 'right':
          this._upStandardOptions.width = //'25.5em'
            this.buttonSizeOptions.small + this.buttonSizeOptions.suffix 
          this._downStandardOptions.width = //'25.5em'
            this.buttonSizeOptions.small + this.buttonSizeOptions.suffix 
          this.buttonRight.show()
          this.flex()
          break
        case 'leftCold':
          this._upStandardOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix 
          this._downStandardOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix 
          this.buttonRight.hide()
          break
        case 'rightCold':
          this._upStandardOptions.width = //'59.5em'
            this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
          this._downStandardOptions.width = //'59.5em'
            this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
          this.buttonRight.show()
          this.flex()
          break

        default:
          break
      }

      this.setButtonStyle(this._upStandardOptions)
      this.setButtonStyle(this._upTurboOptions)

      return
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
        this.buttonLeft.width = options.width

        if (!this.isDown.warmWater_turbo)
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
  }, // end methods

  beforeDestroy() {
    clearTimeout(this.timeoutPopup)
    clearTimeout(this.timeoutSetUp)
  },
  created() {
    this.getKits()
  },
  mounted() {
    // native
    this.visible = this.actives[this.activeNumber].display
    this.visible_turbo = this.actives[this.activeNumber_turbo].display

    // neighbor Cold
    this.visibleCold = this.actives[this.activeColdNumber].display
    this.visibleCold_turbo = this.actives[this.activeColdNumber_turbo].display

    this.setup()
  },
})
</script>

<style scoped>
table,
tr,
td {
  border: none;
  padding-top: 0.5em;
  padding-right: 10px;
}

.button-content-style {
  font-size: 3.5em;
  margin-left: 1.2em;
  padding-top: 0em;
  padding-right: 0em;
}
.button-content-style-turbo {
  font-size: 2.4em;
  margin-left: -0.15em;
  padding-top: 0em;
  padding-right: 0em;
}
</style>
