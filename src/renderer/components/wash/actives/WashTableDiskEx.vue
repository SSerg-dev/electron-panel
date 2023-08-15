<template>
  <div>
    <!-- 1 -->
    <!-- ДИСКИ -->
    <td>
      <div
        @click="setProgram('disk')"
        class="waves-effect-"
        id="button-left-disk"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.disk },
            { 'card-content white-text': this.isDown.disk },
          ]"
        >
          <div v-if="this.getIsChangeProgramSecond()">
            {{ `${this.items[this.index].title}` | localize }}
          </div>
          <div v-else>
            {{ `${actives[this.activeNumber].title}` | localize }}
          </div>
        </div>
      </div>
    </td>

    <!-- ДИСКИ X2-->
    <td>
      <div
        @click="setProgram('disk_x2')"
        class="waves-effect-"
        id="button-right"
      >
        <div
          class="button-content-style-x2"
          :class="[
            { 'card-content black-text': !this.isDown.disk_x2 },
            { 'card-content white-text': this.isDown.disk_x2 },
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
import sleep from '@/utils/sleep'

export default Vue.extend({
  data: () => ({
    title: '',
    index: -1,
    items: [],

    // options
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
    activeNumber: 14,
    activeNumber_x2: 24,

    // neighbor mosquito
    visibleMosquito: '',
    visibleMosquito_x2: '',
    activeMosquitoNumber: 15,
    activeMosquitoNumber_x2: 25,

    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      disk: false,
      disk_x2: false,
    },
  }),
  props: {
    /* dev */
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
        flag !== this.actives[this.activeNumber].name &&
        flag !== this.actives[this.activeNumber_x2].name
      )
        this.clearDown()
    },
  },
  methods: {
    ...mapGetters({
      getPrograms: 'getPrograms',

      getAssignProgramTo2: 'getAssignProgramTo2',
      getIsChangeProgramSecond: 'getIsChangeProgramSecond',
      getAssignItems: 'getAssignItems',
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
        this.getPanelNumber,
        this.getActiveProgram,
        this.getWetBalance,
      ])

      this.setIsActiveProgramKit(true)
      this.setActiveProgramKit(this.activeProgramKit)

      if (parseInt(this.getWetBalance) > 0) {
        this.timeoutPopup = setTimeout(() => {}, 1000)
      } else this.$message(localizeFilter(`${messages.Not_enough_money}`))
    },
    setDown(program) {
      this.clearDown()

      switch (program) {
        case 'disk':
          this.setButtonStyle(this._downStandardOptions)
          this.isDown.disk = true
          break
        case 'disk_x2':
          this.setButtonStyle(this._downX2Options)
          this.isDown.disk_x2 = true

          this.setButtonStyle(this._downStandardOptions)
          this.isDown.disk = true
          break

        default:
          break
      }
      this.timeoutSetUp = setTimeout(() => {
        try {
          if (this.getWetBalance === '0') this.clearDown()
        } catch (err) {
          console.log('$$ WashTableDiskEx.vue: 205 err', err)
        }
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
        return result
      })

      this.activeProgramKit = Object.fromEntries(result)
    },
    getIndex() {
      if (this.getIsChangeProgramSecond()) {
        this.index = this.getAssignProgramTo2() - 1
        return true
      }
      return false
    },
    setup() {
      this.initial()
      // sleep(0).then(() => {
      //   this.initial()
      // })
    },
    initial() {
      // classes instances

      /* left button */
      this.buttonLeft = new Button({
        selector: '#button-left-disk',

        width: this.buttonSizeOptions.small, // 25.5,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius, //4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
      })
      /* right button */
      this.buttonRight = new Button({
        selector: '#button-right',

        width: this.buttonSizeOptions.extraSmall,
        height: this.buttonSizeOptions.height,
        background: 'rgb(255, 255, 255)',
        borderRadius: this.buttonSizeOptions.borderRadius, //4,

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

      if (this.visibleMosquito === 'block') {
        if (this.visible_x2 === 'none') {
          this.restore('left')
        } else if (this.visible_x2 === 'block') {
          this.restore('right')
        }
      } else if (this.visibleMosquito === 'none') {
        if (this.visible_x2 === 'none') {
          this.restore('leftMosquito')
        } else if (this.visible_x2 === 'block') {
          this.restore('rightMosquito')
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
          this._downStandardOptions.width = // '25.5em'
            this.buttonSizeOptions.small + this.buttonSizeOptions.suffix
          this.buttonRight.show()
          this.flex()
          break
        case 'leftMosquito':
          this._upStandardOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix
          this._downStandardOptions.width = //'67em'
            this.buttonSizeOptions.extraLarge + this.buttonSizeOptions.suffix

          this.buttonRight.hide()
          break
        case 'rightMosquito':
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

        if (!this.isDown.disk_x2)
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
    this.items = this.getAssignItems()
    this.getIndex()

    // console.log('$$ WashTableDisk.vue: 375', this.items[this.index] )

    this.getKits()
  },
  mounted() {
    // native
    this.visible = this.actives[this.activeNumber].display
    this.visible_x2 = this.actives[this.activeNumber_x2].display

    // neighbor mosquito
    this.visibleMosquito = this.actives[this.activeMosquitoNumber].display
    this.visibleMosquito_x2 = this.actives[this.activeMosquitoNumber_x2].display

    this.setup()
  },
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
