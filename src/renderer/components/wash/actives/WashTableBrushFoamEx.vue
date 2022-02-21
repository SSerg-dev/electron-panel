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
          {{ `${actives[this.activeNumber].title}` }}
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

import { Component, Box, Circle, Button } from '@/shapes/index.js'
import {
  upStandardOptions,
  downStandardOptions,
  upX2Options,
  downX2Options,
  upColorOptions,
  downColorOptions,
  upGreenOptions,
  downGreenOptions
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

    // classes
    buttonLeft: null,
    buttonRight: null,
    buttonCenter: null,

    activeNumber: 13,
    activeNumber_x2: 21,
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
        case 'brushFoam':
          this.setButtonStyle(this.downGreenOptions)
          this.isDown.brushFoam = true
          break
        case 'brushFoam_x2':
          this.setButtonStyle(this.downX2Options)
          this.isDown.brushFoam_x2 = true
          break
        case 'brushFoam_color':
          this.setButtonStyle(this.downColorOptions)
          this.isDown.brushFoam_color = true
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
      this.setButtonStyle(this.upGreenOptions)
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
        selector: '#button-left-brush',

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
        selector: '#button-center-brush',

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
        selector: '#button-right-brush',

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
      // if (this.actives[this.activeNumber_x2].display === 'none') {
      //   this.buttonRight.hide()
      //   this.upStandardOptions.width = '58em'//'65em'
      // }
      // console.log('this.actives[this.activeNumber_x2].display', this.actives[this.activeNumber_x2].display)
      
      // if (this.actives[this.activeNumber_x2].display === 'block') {
      //   this.restore('right')
      // }

      this.setButtonStyle(this.upGreenOptions)
      this.setButtonStyle(this.upColorOptions)
      this.setButtonStyle(this.upX2Options)

    },

    restore(type) {
      if (type === 'right') {
        this.buttonRight.show()
        this.upStandardOptions.width = '51em'
      }
      if (type === 'left') {
      }
      this.flex()
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
        this.buttonLeft.width =  options.width//'51em'
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
      // this.buttonRight.hide()
      // this.buttonRight.show()
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
