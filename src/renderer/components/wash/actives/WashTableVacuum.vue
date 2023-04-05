<template>
  <div>
    <!--  vacuum -->
    <!-- ПЫЛЕСОС -->

    <td>
      <div
        @click="setProgram('vacuum')"
        class="waves-effect"
        id="button-vacuum"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.vacuum },
            { 'card-content white-text': this.isDown.vacuum }
          ]"
        >
          {{ `${actives[this.activeVacuumNumber].title}` | localize }}
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
import { parseMask } from '@/utils/wash.functions.js'


import { Component, Box, Circle, Button } from '@/shapes/index.js'
import { 
  upDryOptions, 
  downDryOptions,
  buttonSizeOptions 
  } from '@/shapes/index.js'


export default Vue.extend({
  data: () => ({
    upDryOptions: upDryOptions,
    downDryOptions: downDryOptions,

    buttonSizeOptions: buttonSizeOptions,

    extraLargeSizeMasks: ['0001', '', '', ''],

    // clonevisibleVacuum
    _upDryOptions: null,
    _downDryOptions: null,

    // classes
    buttonLeft: null,
    buttonRight: null,

    // native
    visibleVacuum: '',
    activeVacuumNumber: 16,

    // neighbor TurboDryer
    // Air
    visibleAir: '',
    activeAirNumber: 17,
    // TurboDryer
    visibleTurboDryer: '',
    activeTurboDryerNumber: 26,
    // Washer
    visibleWasher: '',
    activeWasherNumber: 18,

    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      vacuum: false,
      vacuum_color: false
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
        flag !== this.actives[this.activeVacuumNumber].name
        // flag !== 'vacuum'
      )
        this.clearDown()
    },
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
        case 'vacuum':
          this.setButtonStyle(this._downDryOptions)
          this.isDown.vacuum = true
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

      this.setButtonStyle(this._upDryOptions)
    },
    getKits() {
      const result = []
      Object.entries(this.actives[this.activeVacuumNumber]).map(([key, value]) => {
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
        selector: '#button-vacuum',

        width: this.buttonSizeOptions.medium,//32,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius + this.buttonSizeOptions.oneMore,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })
      // clone
      this._upDryOptions = { ...upDryOptions }
      this._downDryOptions = { ...downDryOptions }
      // end clone

      /* dev */
      const visibleMask =
        this.visibleWasher +
        this.visibleAir +
        this.visibleTurboDryer +
        this.visibleVacuum
        

      const widthSize = parseMask(visibleMask, this.extraLargeSizeMasks)
      // console.log('$$ Vacuum widthSize', widthSize, visibleMask)
      this.restore(widthSize)

      
    }, // end initial()

    restore(type) {

      switch (type) {
        case 'extraLarge':
          this._upDryOptions.width = this.upDryOptions.width =
            this.buttonSizeOptions.extraLarge +
            this.buttonSizeOptions.suffix
          this._downDryOptions.width = this.downDryOptions.width =
            this.buttonSizeOptions.extraLarge +
            this.buttonSizeOptions.suffix

          this.buttonLeft.show()
          this.flex()
          break

        case 'medium':
          this._upDryOptions.width = this.upDryOptions.width =
            this.buttonSizeOptions.medium +
            this.buttonSizeOptions.suffix
          this._downDryOptions.width = this.downDryOptions.width =
            this.buttonSizeOptions.medium +
            this.buttonSizeOptions.suffix

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
      this.buttonLeft.justifyContent = 'center' //'left'
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
    this.visibleVacuum = this.actives[this.activeVacuumNumber].display
    // neighbor warm
    // Air
    this.visibleAir = this.actives[this.activeAirNumber].display
    // Washer
    this.visibleWasher = this.actives[this.activeWasherNumber].display
    // TurboDryer
    this.visibleTurboDryer = this.actives[this.activeTurboDryerNumber].display

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
  padding-right: 1em;
}

.button-content-style {
  font-size: 3.5em;
  /* margin-left: 1.2em; */
}
</style>
