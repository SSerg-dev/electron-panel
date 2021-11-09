<template>
  <div>
    <td>
      <button
        style="background-image:url('./imgs/blue/blue_long_turbo.png'); width: 832px; height: 105px"
        class="btn black"
      ></button>
    </td>

    <!-- <tr>
      <td
        v-if="this.actives[2].display === 'block'"
        @click="setProgram('washer')"
      >
        <div
          class="waves-effect button-style"
          :class="[
            { 'card white': !this.isDown.washer },
            { 'card teal accent-3': this.isDown.washer }
          ]"
        >
          <div
            class="button-content-style"
            :class="[
              { 'card-content black-text': !this.isDown.washer },
              { 'card-content white-text': this.isDown.washer }
            ]"
          >
            {{ `${actives[2].title}` }}
          </div>
        </div>
      </td>
    </tr> -->

  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data: () => ({}),
  methods: {
    setProgram(program) {
      // this.setDown(program)

      // this.active = program
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
    }
  }
})
</script>

<style scoped>
td {
  padding-top: 0px;
  padding-bottom: 10px;
  padding-right: 0px;
  padding-left: 0px;

  height: 105px;
  width: 474px;
}

/* .price {
  position: absolute;
  margin-top: 4em;
  margin-left: 1.5em;
} */
.button-style {
  padding-top: 0em;
  width: 945px;
  height: 105px;
  border: solid 6px #1de9b6;
  border-radius: 4em;
  box-shadow: 0px 10px 20px #1de9b6;
}
.button-content-style {
  font-size: 3.5em;
  padding-top: 0.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
