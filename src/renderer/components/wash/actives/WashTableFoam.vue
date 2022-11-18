<template>
  <div>
    <!--  foam -->
    <!-- ЩЕТКА + ПЕНА -->

    <td @click="setProgram('foam')">
      <div
        class="waves-effect button-style"
        :class="[
          { 'card white': !this.isDown.foam },
          { 'card deep-orange accent-3': this.isDown.foam }
        ]"
      >
        <div
          class="button-content-style"
          :class="[
            { 'card-content black-text': !this.isDown.foam },
            { 'card-content white-text': this.isDown.foam }
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
import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'


export default Vue.extend({
  data: () => ({
    activeNumber: 5,
    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,

    activeProgramKit: {},

    isDown: {
      foam: false,
      foam_color: false
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
        }, 1000)
      } else this.$message(localizeFilter(`${messages.Not_enough_money}`))
    },
    setDown(program) {
      this.clearDown()
      switch (program) {
        case 'foam':
          this.isDown.foam = true
          break
        // case 'foam_color':
        //   this.isDown.foam_color = true
        //   break

        default:
          break
      }
      this.timeoutSetUp = setTimeout(() => {
        try {
          this.clearDown()
        } catch (err) {}
      }, 500)
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
  width: 945px;
  height: 100px;
  border: solid 6px rgb(255, 61, 0);
  border-radius: 4em;
  box-shadow: 0px 6px 10px rgb(255, 61, 0);
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
