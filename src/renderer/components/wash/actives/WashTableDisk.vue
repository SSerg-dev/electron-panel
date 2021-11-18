<template>
  <div>
    <!-- 1 -->
    <!-- ДИСКИ -->
    <tr>
      <td @click="setProgram('disk')">
        <div
          class="waves-effect button-style"
          :class="[
            { 'card white': !this.isDown.disk },
            { 'card light-blue accent-2': this.isDown.disk }
          ]"
        >
          <div
            class="button-content-style"
            :class="[
              { 'card-content black-text': !this.isDown.disk },
              { 'card-content white-text': this.isDown.disk }
            ]"
          >
            {{ `${actives[14].title}` }}
          </div>
        </div>
      </td>
    </tr>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  data: () => ({
    activeNumber: 14,
    active: '',
    timeoutPopup: null,
    /* prefix: 'simple_', */
    prefix: 'kit_',

    /* activeProgramKit: {
      title: '',
      isX2: true,
      isTurbo: false,
      isColor: false
    }, */
    activeProgramKit: {},

    isDown: {
      disk: false,
      disk_x2: false
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
      // console.log('this.getIsActiveProgramKit()-->', this.getIsActiveProgramKit())

      this.setActiveProgramKit(this.activeProgramKit)
      // console.log('+!getActiveProgramKit-->', this.getActiveProgramKit())

      if (parseInt(this.getWetBalance) > 0) {
        this.timeoutPopup = setTimeout(() => {
          this.$router.push('/popup')
        }, 2000)
      } else this.$message(`Недостаточно средств`)
    },
    setDown(program) {
      this.clearDown()
      switch (program) {
        /* dev */
        case 'disk':
          this.isDown.disk = true
          break
        // case 'disk_x2':
        //   this.isDown.disk_x2 = true
        //   break

        default:
          break
      }
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
    },
    getKits() {
      // console.log('actives-->', JSON.stringify(this.actives[14]))
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
      // console.log('this.activeProgramKit-->', this.activeProgramKit)
    }
  }, // end methods

  beforeDestroy() {
    clearTimeout(this.timeoutPopup)
  },

  created() {
    this.getKits()
  }
})
</script>

<style scoped>
tr {
  padding-bottom: 0px;
}
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
