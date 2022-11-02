<template>
  <div>
    <!--  degrease -->
    <!-- ОБЕЗЖИРИВАНИЕ -->

    <td>
      <div
      @click="setProgram('degrease')"
        class="waves-effect button-style"
        :class="[
          { 'card white': !this.isDown.degrease },
          { 'card light-blue accent-2': this.isDown.degrease },
        ]"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.degrease },
            { 'card-content white-text': this.isDown.degrease },
          ]"
        >
          {{ `${actives[this.activeNumber - 1].title}` | localize }}
        </div>
      </div>
    </td>
  </div>
</template>

<script>
import { forEach } from 'lodash'
import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  data: () => ({
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
      /* dev */
      /* else if (parseInt(flag) > 0){
        this.isDown.degrease = true
      } */ 
    },
    getActiveProgram(flag) {
      if (flag !== this.actives[this.activeNumber].name) this.clearDown()
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
      /* dev todo */
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
        }, 1000)
      } else this.$message(`Недостаточно средств`)
    },
    setDown(program) {
      this.clearDown()
      switch (program) {
        case 'degrease':          
          this.isDown.degrease = true
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
      /* dev todo */

    },
    getKits() {
      const result = []

      Object.entries(this.actives[this.activeNumber - 1]).map(([key, value]) => {
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
  }, // end methods

  beforeDestroy() {
    clearTimeout(this.timeoutPopup)
    clearTimeout(this.timeoutSetUp)
  },

  created() {
    this.getKits()
    
    // this.actives.forEach((act, index) => {
    //   console.log('$$ ----------------------', index, act.title)
    // })

  },
})
</script>

<style scoped>
td {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
  padding-left: 0px;

  /* height: 105px;
  width: 474px; */
}

.button-style {
  margin-left: 0em;
  padding-top: 0em;
  width: 67em;
  height: 7em;
  border: solid 6px #40c4ff;
  border-radius: 4em;
  box-shadow: 0px 6px 10px #40c4ff;
}
.button-content-style {
  font-size: 3.5em;
  margin-left: 0.7em;
  padding-top: 0.15em;
  padding-right: 0em;
  display: flex;
  align-items: center;
  justify-content: left;
}
</style>
