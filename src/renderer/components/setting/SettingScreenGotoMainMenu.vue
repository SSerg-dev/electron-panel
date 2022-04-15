<template>
  <div>
    <!-- style="height: 150px; border: solid 3px #00B9E3; border-radius: 2rem;" -->
    <div
      class="card grey lighten-3"
      style="
      border: solid 3px #00B9E3; 
      width: 1040px; height: 130px; 
      margin-left: 0px;
      margin-top: -3.5em; 
      border-radius: 2rem;"
    >
      <div class="card-content black-text">
        <div class="row">
          <div class="col s5">
            <span class="card-title">Время перехода к основному окну:</span>
          </div>

          <div class="col s1">
            <button
              class="btn waves-effect waves-light lighten-3 white-text button-setting"
              type="submit"
              @click="setNumber('-1')"
            >
              <i class="large material-icons">arrow_downward</i>
            </button>
          </div>

          <div class="col s3">
            <div style="margin-left: 1.5em" class="display">
              {{ display + ` сек.` }}
            </div>
          </div>

          <div class="col s1">
            <button
              class="btn waves-effect waves-light lighten-3 white-text button-setting"
              type="submit"
              @click="setNumber('+1')"
            >
              <i class="large material-icons">arrow_upward</i>
            </button>
          </div>
        </div>
        <div class="row" style="margin-top: -0.8em;">
          <div class="col s1" style="font-size: 2em; padding-left: 2.0em">{{ min }}</div>

          <div class="col s10">
            <p class="range-field">
              <input
                id="slider"
                name="slider"
                type="range"
                min="5"
                max="600"
                step="5"
                ref="slider"
                v-model="current"
              />
            </p>
          </div>

          <div class="col s1" style="font-size: 2em; padding-left: 0.5em">{{max}}</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'setting-screen-tooltip',
  data: () => ({
    slider: null,
    current: 0,

    amount: 0,
    amountString: '',
    display: 0,
    min: 0,
    max: 600,
    step: 5
  }),
  mounted() {
    this.setNumber(this.min.toString())
  },
  methods: {
    setNumber(num) {
      if (num >= 0 || num == -1) {
        if (this.amount + parseInt(num) <= this.max)
          this.amount += parseInt(num) * parseInt(this.step)
      }

      if (this.amount < this.min) this.amount = this.min
      if (this.amount > this.max) this.amount = this.max
      this.amountString = this.amount.toString()
      this.display = this.amountString
      this.current = this.amount
    },
    ...mapMutations({
      setSecondsGotoMainMenu: 'setSecondsGotoMainMenu'
    })
  },
  computed: {
    ...mapGetters({
      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu'
    })
  },
  watch: {
    current(num) {
      this.amount = parseInt(num)
      if (this.amount < this.min) this.amount = this.min
      if (this.amount > this.max) this.amount = this.max
      this.amountString = this.amount.toString()
      this.display = this.amountString
      this.current = this.amount

      this.setSecondsGotoMainMenu(this.amount)
    }
  },
  created() {
    const secondsGotoMainMenu = this.getSecondsGotoMainMenu
    this.amount = secondsGotoMainMenu
  }
})
</script>

<style scoped>
.display {
  font-size: 2em; /* 24px; */ 
  padding-left: 1.8em;
}
.btn {
  font-size: 1em;
  border: solid 1px black;
  background-color: #26a69a;
}
.button-setting {
  border: solid 1px white;
  font-size: 1.5em;
  border-radius: 2em;
  background-color: #00b9e3;
  height: 2em;
  width: 6em;
}
.material-icons {
  z-index: 1000;
}
</style>
