<template>
  <div>
    <!-- 1 mosquito -->
    <!-- МОСКИТ -->
    <td>
      <div
        @click="setProgram('mosquito')"
        class="waves-effect"
        id="button-left-mosquito"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.mosquito },
            { 'card-content white-text': this.isDown.mosquito },
          ]"
        >
          {{ `${actives[this.activeNumber].title}` | localize }}
        </div>
      </div>
    </td>

    <!-- МОСКИТ X2-->
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
            { 'card-content white-text': this.isDown.mosquito_x2 },
          ]"
        >
          <div style="font-style: italic">
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
import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'


import { Component, Box, Circle, Button } from '@/shapes/index.js'
import {
  upStandardOptions,
  downStandardOptions,
  upX2Options,
  downX2Options,
  buttonSizeOptions,
} from '@/shapes/index.js'
import { log } from '../../../../main/utils'

export default Vue.extend({
  data: () => ({
    upStandardOptions: upStandardOptions,
    downStandardOptions: downStandardOptions,
    upX2Options: upX2Options,
    downX2Options: downX2Options,
    buttonSizeOptions: buttonSizeOptions,

    // clone
    _upStandardOptions: null,
    _downStandardOptions: null,
    _upX2Options: null,
    _downX2Options: null,

    // classes
    buttonLeft: null,
    buttonRight: null,

    // native
    visible: '',
    visible_x2: '',
    activeNumber: 15,
    activeNumber_x2: 25,

    // neighbor mosquito
    visibleDisk: '',
    visibleDisk_x2: '',
    activeDiskNumber: 14,
    activeDiskNumber_x2: 24,

    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      mosquito: false,
      mosquito_x2: false,
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
        flag !== this.actives[this.activeNumber].name &&
        flag !== this.actives[this.activeNumber_x2].name
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

      switch (program) {
        case 'mosquito':
          this.setButtonStyle(this._downStandardOptions)
          this.isDown.mosquito = true
          break
        case 'mosquito_x2':
          this.setButtonStyle(this._downX2Options)
          this.isDown.mosquito_x2 = true

          this.setButtonStyle(this._downStandardOptions)
          this.isDown.mosquito = true
          break

        default:
          break
      }
      this.timeoutSetUp = setTimeout(() => {
        try {
          if (this.getWetBalance === '0') this.clearDown()
        } catch (err) {}
      }, 1000)
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

        width: this.buttonSizeOptions.small,//25.5,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius,//4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
      })
      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right-mosquito',

        width: this.buttonSizeOptions.extraSmall,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })
      // end classes

      // clone
      this._upStandardOptions = { ...upStandardOptions }
      this._downStandardOptions = { ...downStandardOptions }
      this._upX2Options = { ...upX2Options }
      this._downX2Options = { ...downX2Options }
      // end clone

      if (this.visibleDisk === 'block') {
        if (this.visible_x2 === 'none') {
          this.restore('left')
        } else if (this.visible_x2 === 'block') {
          this.restore('right')
        }
      } else if (this.visibleDisk === 'none') {
        if (this.visible_x2 === 'none') {
          this.restore('leftDisk')
        } else if (this.visible_x2 === 'block') {
          this.restore('rightDisk')
        }
      }
    }, // end initial()

    restore(type) {
      switch (type) {
        case 'left':
          this._upStandardOptions.width = //'32.5em'
            this.buttonSizeOptions.medium + this.buttonSizeOptions.suffix 
          this._downStandardOptions.width = //'32.5em'
            this.buttonSizeOptions.medium + this.buttonSizeOptions.suffix 
          this.buttonRight.hide()
          break
        case 'right':
          this._upStandardOptions.width = //'25.5em'
            this.buttonSizeOptions.small + this.buttonSizeOptions.suffix 
          this._downStandardOptions.width = //'25.5em'
            this.buttonSizeOptions.small + this.buttonSizeOptions.suffix 
          this.buttonRight.show()
          this.flex()
          break
        case 'leftDisk':
          this._upStandardOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix 
          this._downStandardOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix 
          this.buttonRight.hide()
          break
        case 'rightDisk':
          this._upStandardOptions.width = //'59.5em'
            this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
          this._downStandardOptions.width = //'59.5em'
            this.buttonSizeOptions.large + this.buttonSizeOptions.suffix 
          this.buttonRight.show()
          this.flex()
          break

        default:
          break
      }

      this.setButtonStyle(this._upStandardOptions)
      this.setButtonStyle(this._upX2Options)

      return
    },

    flex() {
      this.buttonLeft.display = 'flex'
      this.buttonLeft.alignItems = 'center'
      this.buttonLeft.justifyContent = 'left'

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

        if (!this.isDown.mosquito_x2)
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
    this.visible_x2 = this.actives[this.activeNumber_x2].display

    // neighbor mosquito
    this.visibleDisk = this.actives[this.activeDiskNumber].display
    this.visibleDisk_x2 = this.actives[this.activeDiskNumber_x2].display

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
.button-content-style-x2 {
  font-size: 3em;
  margin-left: -0.1em;
  padding-top: 0em;
  padding-right: 0em;
}
</style>
