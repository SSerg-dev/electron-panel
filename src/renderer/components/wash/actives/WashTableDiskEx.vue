<template>
  <div>
    <!-- 1 mosquito -->
    <!-- ДИСКИ -->
    <td>
      <div
        @click="setProgram('disk')"
        class="waves-effect "
        id="button-left-disk"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.disk },
            { 'card-content white-text': this.isDown.disk }
          ]"
        >
          {{ `${actives[this.activeNumber].title}` }}
        </div>
      </div>
    </td>

    <!-- ДИСКИ X2-->
    <td>
      <div
        @click="setProgram('disk_x2')"
        class="waves-effect"
        id="button-right"
      >
        <div
          class="button-content-style-x2"
          :class="[
            { 'card-content black-text': !this.isDown.disk_x2 },
            { 'card-content white-text': this.isDown.disk_x2 }
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
  downX2Options
} from '@/shapes/index.js'
import { log } from '../../../../main/utils'

export default Vue.extend({
  data: () => ({
    upStandardOptions: upStandardOptions,
    downStandardOptions: downStandardOptions,
    upX2Options: upX2Options,
    downX2Options: downX2Options,
    
    // clone
    _upStandardOptions: null,
    _downStandardOptions: null,
    _upX2Options: null,
    _downX2Options: null,
    
    // classes
    buttonLeft: null,
    buttonRight: null,

    visible: '',
    activeNumber: 14,
    activeNumber_x2: 24,
    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      disk: false,
      disk_x2: false
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
        case 'disk':
          /* dev */
          this.setButtonStyle(this._downStandardOptions)
          this.isDown.disk = true
          break
        case 'disk_x2':
          this.setButtonStyle(this._downX2Options)
          this.isDown.disk_x2 = true
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
        return result
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
        selector: '#button-left-disk',

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
        selector: '#button-right',

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
        console.log('left')
        this._upStandardOptions.width = '32em'
        this._downStandardOptions.width = '32em'
        this.buttonRight.hide()
      }
      if (type === 'right') {
        console.log('right')
        this._upStandardOptions.width = '25.5em'
        this._downStandardOptions.width = '25.5em'
        this.buttonRight.show()
        this.flex()
      }
      if (type === 'init') {
        console.log('init')
        this._upStandardOptions.width = '25.5em'
        this._downStandardOptions.width = '25.5em'
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
    }
  }, // end methods

  beforeDestroy() {
    clearTimeout(this.timeoutPopup)
    clearTimeout(this.timeoutSetUp)
  },
  created() {
    // console.log('--this.visible', this.visible)
    this.getKits()
  },
  mounted() {
    this.visible = this.actives[this.activeNumber_x2].display
    // console.log('++this.visible', this.visible)
    this.setup()
    
  }
})
</script>

<style scoped>
table,
tr,
td {
  /* box-sizing:border-box; */
  border: none;
  border-color: white;
  padding-top: 0.5em;
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
