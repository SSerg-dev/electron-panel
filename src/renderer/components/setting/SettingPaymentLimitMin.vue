<template>
  <div>
    <div class="card grey lighten-3 payment-card">
      <div class="card-content black-text">
        <div class="row" style="margin-top: -0.8em">
          <div class="col s5" style="padding-top: 0.5em">
            <div style="margin-left: -1em" class="display">
              {{ `Minimum` | localize }}
            </div>
          </div>

          <div class="col s2">
            <button
              class="
                btn
                waves-effect waves-light
                lighten-3
                white-text
                button-setting
              "
              type="submit"
              @click="setNumber('-1')"
            >
              <i class="large material-icons">arrow_downward</i>
            </button>
          </div>

          <div class="col s2" style="padding-top: 0.5em">
            <div align="center" class="display number">
              {{ display }}
            </div>
          </div>

          <div class="col s2">
            <button
              class="
                btn
                waves-effect waves-light
                lighten-3
                white-text
                button-setting
              "
              type="submit"
              @click="setNumber('+1')"
            >
              <i class="large material-icons">arrow_upward</i>
            </button>
          </div>
        </div>

        <!-- <div class="col s12" style="margin-left: -0.5em; margin-top: -0.5em;">
          <p class="range-field">
            <input
              id="slider"
              name="slider"
              type="range"
              min="10"
              max="50"
              step="10"
              ref="slider"
              v-model="current"
            />
          </p>
        </div> -->
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
    min: 50,
    max: 500,
    step: 10,
  }),
  mounted() {
    this.setNumber(this.amount.toString())
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
      setPaymentLimitMin: 'setPaymentLimitMin',
      setPaymentLimitMax: 'setPaymentLimitMax',
    }),
  },
  computed: {
    ...mapGetters({
      getPaymentLimitMin: 'getPaymentLimitMin',
      getPaymentLimitMax: 'getPaymentLimitMax',
    }),
  },
  watch: {
    current(num) {
      // console.log('min-->', this.min, this.max, num)
      this.amount = parseInt(num)

      if (this.amount < this.min) this.amount = this.min
      if (this.amount > this.max) this.amount = this.max
      this.amountString = this.amount.toString()
      this.display = this.amountString
      this.current = this.amount

      this.setPaymentLimitMin(this.amount)
    },
  },
  created() {
    const paymentLimitMin = this.getPaymentLimitMin
    this.min = paymentLimitMin - 1
    if (this.min < 0) this.min = 0

    const paymentLimitMax = this.getPaymentLimitMax / 10
    this.max = paymentLimitMax

    this.amount = paymentLimitMin
    this.display = this.amount.toString()
  },
})
</script>

<style scoped>
.payment-card {
  border: none;
  width: 410px;
  height: 90px;
  margin-left: 1em;
  margin-top: -0.4em;
  padding-left: 1em;
}
.display {
  font-size: 1.6em;
  padding-left: 0em;
  padding-top: 0.2em;
}
.number {
  padding-left: 1.8em;
  padding-top: 0.2em;
}

td {
  width: 128px;
}
.button-setting {
  border: solid 1px white;
  font-size: 1.5em;
  border-radius: 50%;
  background-color: #00b9e3;
  height: 2.5em;
  width: 2.5em;
  padding-bottom: 0em;
  margin-left: 1em;
}
</style>
