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
            { 'card-content white-text': this.isDown.washer }
          ]"
        >
          {{ `${actives[this.activeNumber].title}` }}
        </div>
      </div>
    </td>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

import { Component, Box, Circle, Button } from '@/shapes/index.js'
import { upDryOptions, downDryOptions } from '@/shapes/index.js'

export default Vue.extend({
  data: () => ({
    upDryOptions: upDryOptions,
    downDryOptions: downDryOptions,

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
    //Air
    visibleAir: '',
    activeAirNumber: 17,
    // Vacuum
    visibleVacuum: '',
    activeVacuumNumber: 16,

    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      washer: false,
      washer_color: false
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
      // getActiveProgram: 'getActiveProgram',
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
      }, 1000)
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

        width: 32,
        height: 7,
        background: 'rgb(255, 255, 255)',
        borderRadius: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left'
      })
      // clone
      this._upDryOptions = { ...upDryOptions }
      this._downDryOptions = { ...downDryOptions }
      // end clone

      if (this.visibleAir === 'block') {
        this.restore('left')
      } else if (
        (this.visibleAir === 'none' && this.visibleVacuum !== 'none') ||
        this.visibleAir === 0
      ) {
        this.restore('right')
      } else if (this.visibleAir === 'none' && this.visibleVacuum === 'none') {
        this.restore('combo')
      } /* else if (
        this.visibleVacuum === 'block' &&
        this.visibleAir === 'block' &&
        this.visibleWasher === 'block'
      ) {
        this.restore('last')
      } */

    }, // end initial()
    restore(type) {
      switch (type) {
        case 'left':
        case 'combo':
        /* case 'last': */  
          this._upDryOptions.width = this.upDryOptions.width // '32em'
          this._downDryOptions.width = this.downDryOptions.width // '32em'
          this.buttonLeft.show()
          this.flex()
          break
        case 'right':
          this._upDryOptions.width = '65em'
          this._downDryOptions.width = '65em'
          this.buttonLeft.show()
          this.flex()
          break

        default:
          break
      }
      this.setButtonStyle(this._upDryOptions)

      return
    },
    flex() {
      this.buttonLeft.display = 'flex'
      this.buttonLeft.alignItems = 'center'
      this.buttonLeft.justifyContent = 'left'
    },
    setButtonStyle(options) {
      if (options.type === 'left') {
        this.buttonLeft.background = options.background
        this.buttonLeft.border = options.border
        this.buttonLeft.boxShadow = options.boxShadow
        this.buttonLeft.fontSize = options.fontSize
        this.buttonLeft.width = options.width
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
    // native
    this.visible = this.actives[this.activeNumber].display
    // neighbors
    // Air
    this.visibleAir = this.actives[this.activeAirNumber].display
    // Vacuum
    this.visibleVacuum = this.actives[this.activeVacuumNumber].display

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
}
</style>
