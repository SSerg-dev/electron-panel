<template>
  <div>
    <!--  degrease -->
    <!-- ОБЕЗЖИРИВАНИЕ -->
    <td>
      <div
        @click="setProgram('degrease')"
        class="waves-effect"
        id="button-degrease"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.degrease },
            { 'card-content white-text': this.isDown.degrease },
          ]"
          
        >
          {{ `${actives[this.activeNumber - 1].title}` | localize}}
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

  upDryOptions,
  downDryOptions,

  buttonSizeOptions,

} from '@/shapes/index.js'

import { log } from '../../../../main/utils'

export default Vue.extend({
  data: () => ({
    // options
    // upStandardOptions: upStandardOptions,
    // downStandardOptions: downStandardOptions,

    upDryOptions: upDryOptions,
    downDryOptions: downDryOptions,

    buttonSizeOptions: buttonSizeOptions,

    // clone
    // _upStandardOptions: null,
    // _downStandardOptions: null,

    _upDryOptions: null,
    _downDryOptions: null,

    // classes
    buttonDegrease: null,

    // native
    visible: '',
    activeNumber: 28,

  
    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      degrease: false,
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
        flag !== this.actives[this.activeNumber - 1].name
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

      // console.log('cold water this.updateStartProgram')
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
          // this.$router.push('/popup')
        }, 2000)
      } else this.$message(localizeFilter(`${messages.Not_enough_money}`))
    },
    setDown(program) {
      this.clearDown()

      switch (program) {
        case 'degrease':
          this.setButtonStyle(this._downDryOptions)
          this.isDown.degrease = true
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

      /* degrease button */
      this.buttonDegrease = new Button({
        selector: '#button-degrease',

        width: this.buttonSizeOptions.large,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius + this.buttonSizeOptions.oneMore,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
      })
      
      // end classes

      // clone
      this._upStandardOptions = { ...upStandardOptions }
      this._downStandardOptions = { ...downStandardOptions }

      this._upDryOptions = { ...upDryOptions }
      this._downDryOptions = { ...downDryOptions }
      // upDryOptions

      // end clone

      this.restore('left')

    }, // end initial()

    restore(type) {
      switch (type) {
        case 'left':
          this._upDryOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix 
          this._downDryOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix 
          break
        
        default:
          break
      }

      this.setButtonStyle(this._upDryOptions)
      
      return
    },

    flex() {
      this.buttonDegrease.display = 'flex'
      this.buttonDegrease.alignItems = 'center'
      this.buttonDegrease.justifyContent = 'left'
      
    },

    setButtonStyle(options) {
      if (options.type === 'left') {
        this.buttonDegrease.background = options.background
        this.buttonDegrease.border = options.border
        this.buttonDegrease.boxShadow = options.boxShadow
        this.buttonDegrease.fontSize = options.fontSize
        this.buttonDegrease.width = options.width

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
  position: relative;
}

.button-content-style {
  font-size: 3.5em;
  /* margin-left: 1.2em; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

</style>
