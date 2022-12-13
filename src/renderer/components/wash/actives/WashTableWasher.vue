<template>
  <div>
    <!--  washer -->
    <!-- ОМЫВАТЕЛЬ -->

    <td>
      <div
        @click="setProgram('washer')"
        class="waves-effect"
        id="button-washer"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.washer },
            { 'card-content white-text': this.isDown.washer },
          ]"
        >
          {{ `${actives[this.activeNumber].title}` | localize }}
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
  upDryOptions,
  downDryOptions,
  buttonSizeOptions,
} from '@/shapes/index.js'

export default Vue.extend({
  data: () => ({
    upDryOptions: upDryOptions,
    downDryOptions: downDryOptions,

    buttonSizeOptions: buttonSizeOptions,

    // clone
    _upDryOptions: null,
    _downDryOptions: null,

    // classes
    buttonLeft: null,
    buttonRight: null,

    // native
    visible: '',
    activeNumber: 18,

    // neighbors
    // Air
    visibleAir: '',
    activeAirNumber: 17,
    // Vacuum
    visibleVacuum: '',
    activeVacuumNumber: 16,
    // TurboDryer
    visibleTurboDryer: '',
    activeTurboDryerNumber: 26,

    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      washer: false,
      washer_color: false,
    },
  }),
  props: {
    actives: {
      required: true,
      type: Array,
    },
    // width: ['width']
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
  },
  methods: {
    ...mapGetters({
      // getActiveProgram: 'getActiveProgram',
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
      } else this.$message(localizeFilter(`${messages.Not_enough_money}`))
    },
    setDown(program) {
      this.clearDown()
      this.setButtonStyle(this._downDryOptions)
      switch (program) {
        case 'washer':
          this.isDown.washer = true
          break

        default:
          break
      }
      this.timeoutSetUp = setTimeout(() => {
        try {
          this.clearDown()
        } catch (err) {}
      }, 500)
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )

      this.setButtonStyle(this._upDryOptions)
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
        selector: '#button-washer',

        width: this.buttonSizeOptions.medium,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius:
          this.buttonSizeOptions.borderRadius + this.buttonSizeOptions.oneMore,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })
      // clone
      this._upDryOptions = { ...upDryOptions }
      this._downDryOptions = { ...downDryOptions }
      // end clone

      /* dev */
      const widthSize = this.parseMask()
      console.log('$$ widthSize', widthSize)
      this.restore(widthSize)

      /* if (this.visibleAir === 'block') {
        this.restore('left')
      } else if (
        (this.visibleAir === 'none' && this.visibleVacuum !== 'none') ||
        this.visibleAir === 0
      ) {
        this.restore('right')
      } else if (this.visibleAir === 'none' && this.visibleVacuum === 'none') {
        this.restore('combo')
      } */ 
    }, // end initial()
    restore(type) {
      console.log('$$ this.buttonSizeOptions', this.buttonSizeOptions)

      switch (type) {
        case 'large':
          this.buttonLeft.show()
          this.flex()
          break

        /* case 'combo':
          this._upDryOptions.width = this.upDryOptions.width =
            this.buttonSizeOptions.medium +
            this.buttonSizeOptions.halfMore +
            this.buttonSizeOptions.suffix
          this._downDryOptions.width = this.downDryOptions.width =
            this.buttonSizeOptions.medium +
            this.buttonSizeOptions.halfMore +
            this.buttonSizeOptions.suffix
          this.buttonLeft.show()
          this.flex()
          break */
        /* case 'right':
          this._upDryOptions.width = 
            this.buttonSizeOptions.medium +
            this.buttonSizeOptions.halfMore +
            this.buttonSizeOptions.suffix
          this._downDryOptions.width = 
            this.buttonSizeOptions.medium +
            this.buttonSizeOptions.halfMore +
            this.buttonSizeOptions.suffix
          this.buttonLeft.show()
          this.flex()
          break */

        default:
          break
      }
      this.setButtonStyle(this._upDryOptions)

      return
    },
    flex() {
      this.buttonLeft.display = 'flex'
      this.buttonLeft.alignItems = 'center'
      this.buttonLeft.justifyContent = 'center'
    },
    setButtonStyle(options) {
      if (options.type === 'left') {
        this.buttonLeft.background = options.background
        this.buttonLeft.border = options.border
        this.buttonLeft.boxShadow = options.boxShadow
        this.buttonLeft.fontSize = options.fontSize
        this.buttonLeft.width = options.width
      }
    },
    parseMask() {
      let result
      let visibleMask =
        this.visible +
        this.visibleAir +
        this.visibleVacuum +
        this.visibleTurboDryer

      if (visibleMask.length > 0) {
        visibleMask = visibleMask.replace(/block/g, '1').replace(/none/g, '0')
      }
      switch (visibleMask) {
        case '1000':
        case '1011':
        case '1101':
        case '1110':
          result = 'large'   
          break

        default:
          result = 'small'
          break
      }
      // console.log('$$ result', result)
      return result
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
    // neighbors
    // Air
    this.visibleAir = this.actives[this.activeAirNumber].display
    // Vacuum
    this.visibleVacuum = this.actives[this.activeVacuumNumber].display
    // TurboDryer
    this.visibleTurboDryer = this.actives[this.activeTurboDryerNumber].display

    /* let visibleMask = 
    this.visible +  
    this.visibleAir + 
    this.visibleVacuum + 
    this.visibleTurboDryer

    if (visibleMask.length > 0) {
      visibleMask = visibleMask.replace(/block/g, '1').replace(/none/g, '0')
    }
    switch (visibleMask) {
      case '1000':
      case '1011':
      case '1101':
      case '1110':
        console.log('$$ washer width large')
      break

      default:
        console.log('$$ washer width small')
    } */

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
  padding-right: 1em;
}

.button-content-style {
  font-size: 3.5em;
  /* margin-left: 1.2em; */
}
</style>
