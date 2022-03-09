<template>
  <div>
    <!--  vacuum -->
    <!-- ПЫЛЕСОС -->
    
      <!-- <td @click="setProgram('vacuum')">
        <div
          class="waves-effect button-style"
          :class="[
            { 'card white': !this.isDown.vacuum },
            { 'card card teal accent-3': this.isDown.vacuum }
          ]"
        >
          <div
            class="button-content-style"
            :class="[
              { 'card-content black-text': !this.isDown.vacuum },
              { 'card-content white-text': this.isDown.vacuum }
            ]"
          >
            {{ `${actives[this.activeNumber].title}` }}
          </div>
        </div>
      </td> -->
      <td>
        <div
          @click="setProgram('vacuum')"
          class="waves-effect button-style"
          :class="[
            { 'card white': !this.isDown.vacuum },
            { 'card card teal accent-3': this.isDown.vacuum }
          ]"
        >
          <div
            class="button-content-style"
            :class="[
              { 'card-content black-text': !this.isDown.vacuum },
              { 'card-content white-text': this.isDown.vacuum }
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
import {
  upDryOptions,
  downDryOptions
} from '@/shapes/index.js'



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
    activeNumber: 16,

    // neighbor TurboDryer
    visibleTurboDryer: '',

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
      getWetBalance: 'getWetBalance'
    })
  },
  methods: {
    ...mapGetters({
      getActiveProgram: 'getActiveProgram',
      getActiveProgramKit: 'getActiveProgramKit',
      getIsActiveProgramKit: 'getIsActiveProgramKit' 
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',
      setActiveProgramKit: 'setActiveProgramKit',
      setIsActiveProgramKit: 'setIsActiveProgramKit'
    }),

    setProgram(program) {
      this.active = program

      this.setDown(this.active)

      this.setIsActiveProgramKit(true)
      this.setActiveProgramKit(this.activeProgramKit) 

      if (parseInt(this.getWetBalance) > 0) {
        this.timeoutPopup = setTimeout(() => {
          this.$router.push('/popup')
        }, 2000)
      } else this.$message(`Недостаточно средств`)
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
          this.clearDown()
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
    this.getKits()
  }
})
</script>

<style scoped>

td {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
  padding-left: 0px;

  height: 105px;
  width: 230px; /* 474px; */
}

.button-style {
  margin-left: 0em;
  padding-top: 0em;
  width: 32em; /* 945px; */
  height: 7em;
  border: solid 6px rgb(29,233,182);
  border-radius: 4em;
  box-shadow: 0px 6px 10px rgb(29,233,182);
}
.button-content-style {
  font-size: 3.5em;
  margin-left: 0.7em;
  padding-top: 0.15em;
  padding-right: 0em;
  display: flex;
  align-items: left;
  justify-content: left;
}
</style>

