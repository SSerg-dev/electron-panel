<template>
  <div>
    <!-- shampoo -->
    <!-- ШАМПУНЬ -->
    <td>
      <div
        @click="setProgram('shampoo')"
        class="waves-effect "
        id="button-left-shampoo"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.shampoo },
            { 'card-content white-text': this.isDown.shampoo }
          ]"
        >
          {{ `${actives[this.activeNumber].title}` | localize }}
        </div>
      </div>
    </td>

    <!-- ШАМПУНЬ X2-->
    <td>
      <div
        @click="setProgram('shampoo_x2')"
        class="waves-effect"
        id="button-right-shampoo"
      >
        <div
          class="button-content-style-x2"
          :class="[
            { 'card-content black-text': !this.isDown.shampoo_x2 },
            { 'card-content white-text': this.isDown.shampoo_x2 }
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
    buttonSizeOptions: buttonSizeOptions,

    // clone
    _upStandardOptions: null,
    _downStandardOptions: null,
    _upX2Options: null,
    _downX2Options: null,

    // classes
    buttonLeft: null,
    buttonRight: null,

    visible: '',
    activeNumber: 0,
    activeNumber_x2: 21,
    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      shampoo: false,
      shampoo_x2: false
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
      getPanelNumber: 'getPanelNumber',
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
        this.getPanelNumber,
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
        case 'shampoo':
          this.setButtonStyle(this._downStandardOptions)
          this.isDown.shampoo = true
          break
        case 'shampoo_x2':
          this.setButtonStyle(this._downX2Options)
          this.isDown.shampoo_x2 = true

          this.setButtonStyle(this._downStandardOptions)
          this.isDown.shampoo = true
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
    },
    setup() {
      this.initial()
    },
    initial() {
      // classes instances
      
      /* left button */
      this.buttonLeft = new Button({
        selector: '#button-left-shampoo',

        width: this.buttonSizeOptions.large,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left'
      })
      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right-shampoo',

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
        this._upStandardOptions.width = //'67em'
          this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix 
        this._downStandardOptions.width = //'67em'
          this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix 
        this.buttonRight.hide()
      }
      if (type === 'right') {
        // console.log('right')
        this._upStandardOptions.width = //'59.5em'
          this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
        this._downStandardOptions.width = //'59.5em'
          this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
        this.buttonRight.show()
        this.flex()
      }
      if (type === 'init') {
        // console.log('init')
        this._upStandardOptions.width = //'59.5em'
          this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
        this._downStandardOptions.width = //'59.5em'
          this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
        this.buttonRight.show()
        this.flex()
      }
      this.setButtonStyle(this._upStandardOptions)
      this.setButtonStyle(this._upX2Options)

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

        // if (!this.isDown.shampoo_x2)
        // this.buttonRight.background = 'rgb(255, 255, 255)'
      }

      if (options.type === 'right') {
        this.buttonRight.background = options.background
        this.buttonRight.border = options.border
        this.buttonRight.boxShadow = options.boxShadow
        this.buttonRight.fontSize = options.fontSize
        this.buttonRight.width = options.width

        // this.buttonLeft.background = 'rgb(255, 255, 255)'
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
    this.visible = this.actives[this.activeNumber_x2].display
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
  padding-right: 10px;
}

.button-content-style {
  font-size: 3.5em;
  margin-left: 1.2em;
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
