<template>
  <div>
    <!--  dryShine -->
    <!-- СУШКА И БЛЕСК -->
    <td>
      <div
        @click="setProgram('dryShine')"
        class="waves-effect "
        id="button-left-shine"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.dryShine },
            { 'card-content white-text': this.isDown.dryShine }
          ]"
        >
          {{ `${actives[this.activeNumber].title}` }}
        </div>
      </div>
    </td>

    <!-- ШАМПУНЬ X2-->
    <!--  style="background: yellow" -->
    <td>
      <div
        @click="setProgram('dryShine_turbo')"
        class="waves-effect"
        id="button-right-shine"
      >
        <div
          class="button-content-style-turbo"
          :class="[
            { 'card-content black-text': !this.isDown.dryShine_turbo },
            { 'card-content white-text': this.isDown.dryShine_turbo }
          ]"
        >
          <div style="font-style: italic;">
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
  upX2Options,
  downX2Options,
  upTurboOptions,
  downTurboOptions
} from '@/shapes/index.js'

import { log } from '../../../../main/utils'

export default Vue.extend({
  data: () => ({
    upStandardOptions: upStandardOptions,
    downStandardOptions: downStandardOptions,
    upX2Options: upX2Options,
    downX2Options: downX2Options,
    upTurboOptions: upTurboOptions,
    downTurboOptions: downTurboOptions,
    // classes
    buttonLeft: null,
    buttonRight: null,

    /*     */

    activeNumber: 4,
    activeNumber_turbo: 10,
    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      dryShine: false,
      dryShine_turbo: false 
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
        this.buttonLeft.background = 'white'
        this.buttonRight.background = 'white'
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

      /* dev */
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
        case 'dryShine':
          /* dev */
          this.setButtonStyle(this.downStandardOptions)
          this.isDown.dryShine = true
          break
        case 'dryShine_turbo':
          // this.setButtonStyle(this.downStandardOptions)
          // this.isDown.dryShine = true

          this.setButtonStyle(this.downTurboOptions)
          this.isDown.dryShine_turbo = true

          break

        default:
          break
      }
      this.timeoutSetUp = setTimeout(() => {
        try {
          // console.log('this.getWetBalance',typeof this.getWetBalance)

          if (this.getWetBalance === '0') this.clearDown()
        } catch (err) {}
      }, 2000)
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
      this.setButtonStyle(this.upStandardOptions)
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
        selector: '#button-left-shine',

        width: 25.5,
        height: 7,
        background: 'rgb(255, 255, 255)',
        borderRadius: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left'
      })
      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right-shine',

        width: 7,
        height: 7,
        background: 'rgb(255, 255, 255)',
        borderRadius: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })
      // end classes

      if (this.actives[this.activeNumber_turbo].display === 'none') {
        this.buttonRight.hide()
        this.upStandardOptions.width = '32em'
      }
      if (this.actives[this.activeNumber_turbo].display === 'block') {
        this.restore('right')
      }
      this.setButtonStyle(this.upStandardOptions)
      this.setButtonStyle(this.upTurboOptions)
    },
    restore(type) {
      if (type === 'right') {
        this.buttonRight.show()
        this.upStandardOptions.width = '25.5em'
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
      // console.log('options-->', options)

      if (options.type === 'left') {
        this.buttonLeft.background = options.background
        this.buttonLeft.border = options.border
        this.buttonLeft.boxShadow = options.boxShadow
        this.buttonLeft.fontSize = options.fontSize
        this.buttonLeft.width = options.width

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
.button-content-style-turbo {
  font-size: 2.4em;
  margin-left: -0.15em;
  padding-top: 0em;
  padding-right: 0em;
}
</style>
