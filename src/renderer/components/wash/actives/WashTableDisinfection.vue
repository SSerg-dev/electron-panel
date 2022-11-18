<template>
  <div>
    <!--  disinfection -->
    <!-- ДЕЗИНФЕКЦИЯ -->
    <td>
      <div
        @click="setProgram('disinfection')"
        class="waves-effect"
        id="button-disinfection"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.disinfection },
            { 'card-content white-text': this.isDown.disinfection },
          ]"
        >
          {{ `${actives[this.activeNumber].title}` | localize}}
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
  buttonSizeOptions,

} from '@/shapes/index.js'

import { log } from '../../../../main/utils'

export default Vue.extend({
  data: () => ({
    // options
    upStandardOptions: upStandardOptions,
    downStandardOptions: downStandardOptions,
    buttonSizeOptions: buttonSizeOptions,

    // clone
    _upStandardOptions: null,
    _downStandardOptions: null,

    // classes
    buttonDisinfection: null,

    // native
    visible: '',
    activeNumber: 28, // 29

  
    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      disinfection: false,
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
        /* dev */
        // flag !== this.actives[this.activeNumber - 1].name
        flag !== this.actives[this.activeNumber].name
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
        this.getDefaultPanelNumber,
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
        case 'disinfection':
          this.setButtonStyle(this._downStandardOptions)
          this.isDown.disinfection = true
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

      /* disinfection button */
      this.buttonDisinfection = new Button({
        selector: '#button-disinfection',

        width: this.buttonSizeOptions.large,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
      })
      
      // end classes

      // clone
      this._upStandardOptions = { ...upStandardOptions }
      this._downStandardOptions = { ...downStandardOptions }
      // end clone

      this.restore('left')

    }, // end initial()

    restore(type) {
      switch (type) {
        case 'left':
          this._upStandardOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix 
          this._downStandardOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix 
          break
        
        default:
          break
      }

      this.setButtonStyle(this._upStandardOptions)
      
      return
    },

    flex() {
      this.buttonDisinfection.display = 'flex'
      this.buttonDisinfection.alignItems = 'center'
      this.buttonDisinfection.justifyContent = 'left'

    },

    setButtonStyle(options) {
      if (options.type === 'left') {
        this.buttonDisinfection.background = options.background
        this.buttonDisinfection.border = options.border
        this.buttonDisinfection.boxShadow = options.boxShadow
        this.buttonDisinfection.fontSize = options.fontSize
        this.buttonDisinfection.width = options.width

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
}

.button-content-style {
  font-size: 3.5em;
  margin-left: 1.2em;
  padding-top: 0em;
  padding-right: 0em;
}

</style>

