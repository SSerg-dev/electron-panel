<template>
  <div>
    <!-- 1 -->
    <!-- ДИСКИ -->
    <tr>
      <td
        v-if="this.actives[24].display === 'block'"
        @click="setProgram('disk')"
      >
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
    active: '',
    timeoutPopup: null,
    prefix: 'simple_',

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

  methods: {
    ...mapMutations({
      setActiveProgram: 'setActiveProgram'
    }),
    setProgram(program) {
      this.setDown(program) 

      this.active = program
      /* dev */
      this.setActiveProgram(this.prefix + this.active + '_x2')
      // this.setActiveProgram(this.active)

      // this.updateDryStartProgram([
      //   this.getPanelType,
      //   this.getVacuumNumber,
      //   this.getActiveProgram,
      //   this.getDryBalance
      // ])

      this.timeoutPopup = setTimeout(() => {
        this.$router.push('/popup')
      }, 2000)
    },
    setDown(program) {
    this.clearDown()
    switch (program) {
      /* dev */
      case 'disk':
        this.isDown.disk = true
        break
      case 'disk_x2':
        console.log('disk_x2-->', program)
        this.isDown.disk_x2 = true
        break

      default:
        break
    }
  },
  clearDown() {
    this.isDown = Object.fromEntries(
      Object.entries(this.isDown).map(([key, value]) => [key, false])
    )
  },
  beforeDestroy() {
    clearTimeout(this.timeoutPopup)
  },

  },
  
  created() {
    // console.log('actives-->', JSON.stringify(this.actives))
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
