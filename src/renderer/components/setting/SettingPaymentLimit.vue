<template>
  <!-- old component -->
  <!-- <div>
    <div class="col s6">
      <div class="card grey lighten-3" style="height: 160px; border: solid 3px #00B9E3; border-radius: 2rem;">
        <div class="card-content black-text">
          <span class="card-title">Лимиты платежей:</span>

          <tbody>
            <tr>
              <td>
                <button
                  class="btn waves-effect waves-light lighten-3 white-text button-setting"
                  type="submit"
                  @click="setNumber('-10')"
                >
                  {{ "-10" }}
                  <i class="material-icons right"></i>
                </button>
              </td>

              <td>
                <div style="margin-left: 10px" class="display">{{ display + `  руб.` }}</div>
              </td>

              <td>
                <button
                  class="btn waves-effect waves-light lighten-3 white-text button-setting"
                  type="submit"
                  @click="setNumber('+10')"
                >
                  {{ "+10" }}
                  <i class="material-icons right"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  </div> -->
  <!-- end -->
  <!-- new component -->
  <div>
    <!-- style="height: 150px; border: solid 3px #00B9E3; border-radius: 2rem;" -->
    <div
      class="card grey lighten-3"
      style="
      border: solid 3px #00B9E3; 
      width: 1040px; height: 160px; 
      margin-left: 0px;
      margin-top: -3.5em; 
      border-radius: 2rem;"
    >
      <div class="card-content black-text">
        

        <!-- row 01 -->

        <!-- <div class="row">
          
          <div class="col s3">
            <span class="card-title">Лимиты платежей:</span>
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

          <div class="col s1">
            <div style="margin-left: 1.5em" class="display">
              {{ min }}
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

        </div> -->
        <!-- end row -->

        <!-- row 02 -->
        <!-- <div class="row" style="margin-top: -0.8em;">
          <div class="col s1" style="font-size: 2em; padding-left: 1.5em">
            {{ min }}
          </div>

          <div class="col s10">
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

          <div class="col s1" style="font-size: 2em; padding-left: 0.5em">
            {{ max }}
          </div>
        </div> -->
        <!-- end row -->
        
        <!-- new component -->
       <!-- row 01 -->

        <div class="row">
          
          <div class="col s2">
            <span class="card-title">Лимиты платежей:</span>
          </div>
          <div class="col s5" style="margin-left: -3em;">
            <div>
              <SettingPaymentLimitMin />
            </div>
          </div>
          <div class="col s5" style="margin-left: 1em;">
            <div>
              <SettingPaymentLimitMax />
            </div>
          </div>

        </div>
        <!-- end row -->
        <!--               -->

      </div>
    </div>
  </div>
  <!-- end -->
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import SettingPaymentLimitMin from '@/components/setting/SettingPaymentLimitMin' 
import SettingPaymentLimitMax from '@/components/setting/SettingPaymentLimitMax'


/* export default {
  data: () => ({
    amount: 0,
    amountString: "",
    display: 0,
    length: 0,
    title: "",
    body: "",
  }),

  methods: {
    ...mapMutations({}),

    setNumber(num) {
      if (num >= 10 || num == -10) {
        if (this.amount + parseInt(num) < 1000) this.amount += parseInt(num);
      }

      if (this.amount < 0) this.amount = 0;
      this.amountString = this.amount.toString();
      this.display = this.amountString;
    },
  },
}; */

/* dev */
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
      setSecondsGotoMainMenu: 'setSecondsGotoMainMenu',
      setPaymentLimitMin: 'setPaymentLimitMin',
      setPaymentLimitMax: 'setPaymentLimitMax'
    })
  },
  computed: {
    ...mapGetters({
      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu',
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

      this.setSecondsGotoMainMenu(this.amount)
      this.setPaymentLimitMin(this.min)
      this.setPaymentLimitMax(this.max)
    }
  },
  created() {
    const secondsGotoMainMenu = this.getSecondsGotoMainMenu
    this.amount = secondsGotoMainMenu

    this.min = this.getPaymentLimitMin
    this.max = this.getPaymentLimitMax
  },
  components: {
    SettingPaymentLimitMin, 
    SettingPaymentLimitMax
  }
})
/*     */
</script> 

<style scoped>
.display {
  /* style="font-size: 1.2em;" */
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
