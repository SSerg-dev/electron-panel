<template>
  <div>
    <!--  waterShampoo -->
    <!-- ВОДА + ШАМПУНЬ -->
    <td>
      <div
        @click="setProgram('waterShampoo')"
        class="waves-effect"
        id="button-left-water"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.waterShampoo },
            { 'card-content white-text': this.isDown.waterShampoo },
          ]"
        >
          {{ `${actives[this.activeNumber].title}` | localize }}
        </div>
      </div>
    </td>

    <!-- ШАМПУНЬ X2-->
    <td>
      <div
        @click="setProgram('waterShampoo_turbo')"
        class="waves-effect"
        id="button-right-water"
      >
        <div
          class="button-content-style-turbo"
          :class="[
            { 'card-content black-text': !this.isDown.waterShampoo_turbo },
            { 'card-content white-text': this.isDown.waterShampoo_turbo },
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

import { Component, Box, Circle, Button } from '@/shapes/index.js'
import {
  upStandardOptions,
  downStandardOptions,
  upTurboOptions,
  downTurboOptions,
} from '@/shapes/index.js'

import { log } from '../../../../main/utils'

export default Vue.extend({
  data: () => ({
    upStandardOptions: upStandardOptions,
    downStandardOptions: downStandardOptions,
    upTurboOptions: upTurboOptions,
    downTurboOptions: downTurboOptions,

    // clone
    _upStandardOptions: null,
    _downStandardOptions: null,
    _upTurboOptions: null,
    _downTurboOptions: null,

    // classes
    buttonLeft: null,
    buttonRight: null,

    visible: '',
    activeNumber: 1,
    activeNumber_turbo: 7,
    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      waterShampoo: false,
      waterShampoo_turbo: false,
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
      getDefaultPanelNumber: 'getDefaultPanelNumber',
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
        this.getDefaultPanelNumber,
        this.getActiveProgram,
        this.getWetBalance,
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
        case 'waterShampoo':
          this.setButtonStyle(this._downStandardOptions)
          this.isDown.waterShampoo = true
          break
        case 'waterShampoo_turbo':
          this.setButtonStyle(this._downTurboOptions)
          this.isDown.waterShampoo_turbo = true

          this.setButtonStyle(this._downStandardOptions)
          this.isDown.waterShampoo = true
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
        selector: '#button-left-water',

        width: 58,
        height: 7,
        background: 'rgb(255, 255, 255)',
        borderRadius: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
      })
      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right-water',

        width: 7,
        height: 7,
        background: 'rgb(255, 255, 255)',
        borderRadius: 4,

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

      if (this.visible === 'none') {
        this.restore('left')
      }
      if (this.visible === 'block') {
        this.restore('right')
      }
      if (this.visible === 0) {
        this.restore('init')
      }
    },
    restore(type) {
      if (type === 'left') {
        // console.log('left')
        this._upStandardOptions.width = '67em'
        this._downStandardOptions.width = '67em'
        this.buttonRight.hide()
      }
      if (type === 'right') {
        // console.log('right')
        this._upStandardOptions.width = '59.5em'
        this._downStandardOptions.width = '59.5em'
        this.buttonRight.show()
        this.flex()
      }
      if (type === 'init') {
        // console.log('init')
        this._upStandardOptions.width = '59.5em'
        this._downStandardOptions.width = '59.5em'
        this.buttonRight.show()
        this.flex()
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
        this.buttonLeft.width = options.width // '58em'

        if (!this.isDown.waterShampoo_turbo)
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
    // this.visible = this.actives[this.activeNumber_turbo].display
    // console.log('--this.visible', this.visible)
    this.getKits()
  },
  mounted() {
    this.visible = this.actives[this.activeNumber_turbo].display
    // console.log('++this.visible', this.visible)
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
