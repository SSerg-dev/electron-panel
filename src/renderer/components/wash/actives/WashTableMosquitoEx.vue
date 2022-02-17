<template>
  <div>
    <!-- 1 mosquito -->
    <!-- МОСКИТ -->
    <td>
      <div @click="setProgram('mosquito')" class="waves-effect " id="button-left-mosquito">
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.mosquito},
            { 'card-content white-text': this.isDown.mosquito },
          ]"
        >
           {{ `${actives[this.activeNumber].title}` }} 
        </div>
      </div>
    </td>

    <!-- МОСКИТ X2-->
    <!--  style="background: yellow" -->
    <td>
      <div
        @click="setProgram('mosquito_x2')"
        class="waves-effect"
        id="button-right-mosquito"
      >
        <div
          class="button-content-style-x2"
          :class="[
            { 'card-content black-text': !this.isDown.mosquito_x2 },
            { 'card-content white-text': this.isDown.mosquito_x2 }
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
import { upStandardOptions, downStandardOptions, upX2Options, downX2Options } from '@/shapes/index.js'
import { log } from '../../../../main/utils'

export default Vue.extend({
  data: () => ({
    
    upStandardOptions: upStandardOptions,
    downStandardOptions: downStandardOptions,
    upX2Options: upX2Options,
    downX2Options: downX2Options,
    // classes
    buttonLeft: null,
    buttonRight: null,

    /*     */

    activeNumber: 15,
    activeNumber_x2: 25,
    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      mosquito: false,
      mosquito_x2: false
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
        case 'mosquito':
          /* dev */
          this.setButtonStyle(this.downStandardOptions)
          this.isDown.mosquito = true
          break
        case 'mosquito_x2':
          // this.setButtonStyle(this.downStandardOptions)
          // this.isDown.mosquito = true

          this.setButtonStyle(this.downX2Options)
          this.isDown.mosquito_x2 = true
          
          break

        default:
          break
      }
      this.timeoutSetUp = setTimeout(() => {
        try {
          // console.log('this.getWetBalance',typeof this.getWetBalance)
          
          if (this.getWetBalance === '0')
            this.clearDown()
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
    },
    setup() {
      this.initial()
    },
    initial() {
      // classes instances
      /* left button */
      this.buttonLeft = new Button({
        selector: '#button-left-mosquito',

        width: 26,
        height: 7,
        background: 'rgb(255, 255, 255)',
        borderRadius: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left'
      })
      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right-mosquito',

        width: 7,
        height: 7,
        background: 'rgb(255, 255, 255)',
        borderRadius: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

      })
      // end classes

      if (this.activeProgramKit.x2) {
        this.upStandardOptions.width = '25.5em'
        this.setButtonStyle(this.upStandardOptions)
        this.setButtonStyle(this.upX2Options)
      } else {
        this.upStandardOptions.width = '32em'
        this.setButtonStyle(this.upStandardOptions)
        this.buttonRight.hide()
      }
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
        // if (this.activeProgramKit.x2)
        //   this.buttonLeft.width = '26em'
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
.button-content-style-x2 {
  font-size: 3.0em;
  margin-left: -0.1em;
  padding-top: 0em;
  padding-right: 0em;
  
}
</style>
