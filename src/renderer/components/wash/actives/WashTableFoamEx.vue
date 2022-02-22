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

    // classes
    buttonLeft: null,
    buttonRight: null,
    buttonCenter: null,

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
        }, 2000)
      } else this.$message(`Недостаточно средств`)
    },
    setDown(program) {
      this.clearDown()

      switch (program) {
        case 'foam':
          this.setButtonStyle(this.downRedOptions)
          this.isDown.foam = true
          break
        case 'foam_x2':
          this.setButtonStyle(this.downX2Options)
          this.isDown.foam_x2 = true
          break
        case 'foam_color':
          this.setButtonStyle(this.downColorOptions)
          this.isDown.foam_color = true
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
      this.setButtonStyle(this.upRedOptions)
      this.setButtonStyle(this.upColorOptions)
      this.setButtonStyle(this.upX2Options)
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

      // set options
      /* dev */
      // this.resize()
      // this.redraw()

      this.setButtonStyle(this.upRedOptions)
      this.setButtonStyle(this.upColorOptions)
      this.setButtonStyle(this.upX2Options)

    },

    resize() {
      if (
        this.actives[this.activeNumber_x2].display === 'none' &&
        this.actives[this.activeNumber_color].display === 'none'
      )
        this.upRedOptions.width = '65em'
      if (
        (this.actives[this.activeNumber_x2].display === 'block' &&
          this.actives[this.activeNumber_color].display === 'none') ||
        (this.actives[this.activeNumber_x2].display === 'none' &&
          this.actives[this.activeNumber_color].display === 'block')
      )
        this.upRedOptions.width = '58em'
      if (
        this.actives[this.activeNumber_x2].display === 'block' &&
        this.actives[this.activeNumber_color].display === 'block'
      )
        this.upRedOptions.width = '51em'

    },
    redraw() {
      this.setButtonStyle(this.upRedOptions)
      this.setButtonStyle(this.upColorOptions)
      this.setButtonStyle(this.upX2Options)

      console.log('this.actives[this.activeNumber_color].display', this.actives[this.activeNumber_color].display)
      console.log('this.actives[this.activeNumber_x2].display', this.actives[this.activeNumber_x2].display)
      console.log('this.upRedOptions.width', this.upRedOptions.width)
      
      if (this.actives[this.activeNumber_color].display === 'none')
         this.buttonCenter.hide()
      if (this.actives[this.activeNumber_x2].display === 'none')
         this.buttonRight.hide()   

    },

    

    flexLeft() {
      this.buttonLeft.display = 'flex'
      this.buttonLeft.alignItems = 'center'
      this.buttonLeft.justifyContent = 'left'
    },
    flexCenter() {
      this.buttonCenter.display = 'flex'
      this.buttonCenter.alignItems = 'center'
      this.buttonCenter.justifyContent = 'center'
    },
    flexRight() {
      this.buttonRight.display = 'flex'
      this.buttonRight.alignItems = 'center'
      this.buttonRight.justifyContent = 'center'
    },

    setButtonStyle(options) {
      // console.log('options-->', options)
      if (options.type === 'left') {
        this.buttonLeft.background = options.background
        this.buttonLeft.border = options.border
        this.buttonLeft.boxShadow = options.boxShadow
        this.buttonLeft.fontSize = options.fontSize
        this.buttonLeft.width = '51em'// options.width
        this.flexLeft()
      }
      if (options.type === 'center') {
        this.buttonCenter.background = options.background
        this.buttonCenter.border = options.border
        this.buttonCenter.boxShadow = options.boxShadow
        this.buttonCenter.fontSize = options.fontSize
        this.buttonCenter.width = options.width
        this.flexCenter()
      }
      if (options.type === 'right') {
        this.buttonRight.background = options.background
        this.buttonRight.border = options.border
        this.buttonRight.boxShadow = options.boxShadow
        this.buttonRight.fontSize = options.fontSize
        this.buttonRight.width = options.width
        this.flexRight
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
