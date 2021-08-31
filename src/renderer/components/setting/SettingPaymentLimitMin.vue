<template>
  <div>
    <div
      class="card grey lighten-3"
      style="
      border: none; 
      width: 420px; height: 120px; 
      margin-left: 0em;
      margin-top: -0.4em;
      padding-left: 1em; 
      "
    >
      <div class="card-content black-text">
        <div class="row">
          <div class="col s5">
            <div style="margin-left: -0.8em" class="display">
              {{ `Минимальный` }}
            </div>
          </div>

          <div class="col s2">
            <button
              class="btn waves-effect waves-light lighten-3 white-text button-setting"
              type="submit"
              @click="setNumber('-1')"
            >
              <i class="large material-icons">arrow_downward</i>
            </button>
          </div>

          <div class="col s2">
            <div style="margin-left: 0.4em" class="display">
              {{ display }}
            </div>
          </div>

          <div class="col s2">
            <button
              class="btn waves-effect waves-light lighten-3 white-text button-setting"
              type="submit"
              @click="setNumber('+1')"
            >
              <i class="large material-icons">arrow_upward</i>
            </button>
          </div>
        </div>

        <div class="col s12" style="margin-left: -0.5em;">
          <p class="range-field">
            <input
              id="slider"
              name="slider"
              type="range"
              min="20"
              max="500"
              step="5"
              ref="slider"
              v-model="current"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import SettingPaymentLimitMin from '@/components/setting/SettingPaymentLimitMin' 
import SettingPaymentLimitMax from '@/components/setting/SettingPaymentLimitMax'



/* dev */
export default Vue.extend({
  name: 'setting-screen-tooltip',
  data: () => ({
    slider: null,
    current: 0,

    amount: 0,
    amountString: '',
    display: 0,
    min: 20,
    max: 500,
    step: 10
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
      setPaymentLimitMin: 'setPaymentLimitMin',
      setPaymentLimitMax: 'setPaymentLimitMax'
    })
  },
  computed: {
    ...mapGetters({
      getPaymentLimitMin: 'getPaymentLimitMin',
      getPaymentLimitMax: 'getPaymentLimitMax'
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

      this.setPaymentLimitMin(this.amount)
      //this.setPaymentLimitpaymentLimitMinMax(this.max)
    }
  },
  created() {
    // 
    //const secondsGotoMainMenu = this.getSecondsGotoMainMenu
    //this.amount = secondsGotoMainMenu

    //this.min = this.getPaymentLimitMin
    //this.max = this.getPaymentLimitMax
    const paymentLimitMin = this.getPaymentLimitMin
    console.log('++paymentLimitMin-->', paymentLimitMin)
    this.min = paymentLimitMin 
    this.amount = paymentLimitMin


  },
  /* components: {
    SettingPaymentLimitMin, 
    SettingPaymentLimitMax
  } */
})
/*     */
</script>


<style scoped>
.display {
  font-size: 24px;
}
.btn {
  font-size: 15px;
  border: solid 1px black;
  background-color: #26a69a;
}
td {
  width: 128px;
  /* border: solid 1px black; */
}
.button-setting {
  border: solid 3px #00b9e3;
  font-size: 24px;
  border-radius: 2rem;
}
</style>
