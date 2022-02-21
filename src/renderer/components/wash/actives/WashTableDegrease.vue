<template>
  <div>
    <!--  degrease -->
    <!-- ОБЕЗЖИРИВАНИЕ -->

    <td @click="setProgram('degrease')">
      <div
        class="waves-effect button-style"
        :class="[
          { 'card white': !this.isDown.degrease },
          { 'card light-blue accent-2': this.isDown.degrease }
        ]"

      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.degrease },
            { 'card-content white-text': this.isDown.degrease }
          ]"
          style="justify-content: left;"
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

export default Vue.extend({
  data: () => ({
    activeNumber: 27,
    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      degrease: false,
      shampoo_x2: false
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
        case 'degrease':
          this.isDown.degrease = true
          break
        // case 'shampoo_x2':
        //   this.isDown.shampoo_x2 = true
        //   break

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
  width: 474px;
}

.button-style {
  margin-left: 0em;
  padding-top: 0em;
  width: 64em;
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
  align-items: left;
  justify-content: left;
}
</style>
