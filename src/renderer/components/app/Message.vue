<template>
  <div>
    <div class="page-title">
      <div
        v-if="
          this.getPanelType === 'wash' &&
            !(getIsMoneyToBonus && getMoneyToBonus > 0)
        "
      >
        {{
          `${parseFloat(getWetBalance / Math.pow(10, digits)).toFixed(digits)}`
        }}
      </div>

      <div v-if="this.getPanelType === 'vacuum' && !getIsMoneyToBonus">
        {{
          `${parseFloat(getDryBalance / Math.pow(10, digits)).toFixed(digits)}`
        }}
      </div>

      <!-- dev -->
      <ul v-if="getIsMoneyToBonus && getMoneyToBonus > 0">
        <li class="counter">
          <!-- {{ '44' }} -->
          <!-- {{
            `${parseFloat(getWetStopFreeCount / Math.pow(10, digits)).toFixed(
              digits
            )}`
          }} -->
          {{ `${this.getSecondsBonusTimer}` }}
        </li>
        <li class="bonus">
          <!-- {{'999'}} -->
          {{
            `${parseFloat(this.getMoneyToBonus / Math.pow(10, digits)).toFixed(
              digits
            )}`
          }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  data: () => ({
    message: {
      id: 0,
      title: '',
      type: '',
      value: 0
    },
    digits: 0
  }),

  props: {
    messages: {
      type: Object,
      required: false
    }
  },
  methods: {
    ...mapActions({})
  },
  computed: {
    ...mapGetters({
      getWetBalance: 'getWetBalance',
      getDryBalance: 'getDryBalance',
      getPanelType: 'getPanelType',
      getFixedCurrency: 'getFixedCurrency',
      getIsMoneyToBonus: 'getIsMoneyToBonus',
      getMoneyToBonus: 'getMoneyToBonus',
      getWetStopFreeCount: 'getWetStopFreeCount',
      getSecondsBonusTimer: 'getSecondsBonusTimer'
    }),
    ...mapMutations({
      setWetBalance: 'setWetBalance',
      setDryBalance: 'setDryBalance'
    })
  },
  watch: {
    /* dev */
    getWetBalance(flag) {
      // if(flag === '0')
      //   this.setWetBalance(0)
      console.log('Message getWetBalance-->', this.getWetBalance)
    },
    getDryBalance(flag) {
      // if(flag === '0')
      //   this.setDryBalance(0)
      // console.log('Message getDryBalance-->', this.getDryBalance)
    },
    getFixedCurrency(flag) {
      this.digits = flag
    },
    getMoneyToBonus(flag) {
      console.log('getMoneyToBonus', flag)
    }
  },

  mounted() {
    // console.log('getPanelType-->', this.getPanelType)
  },
  created() {
    // console.log('Message-->getFixedCurrency-->', this.getFixedCurrency)
    // console.log('typeof  this.getFixedCurrency-->', typeof this.getFixedCurrency)

    if (parseInt(this.getFixedCurrency) > 0) this.digits = this.getFixedCurrency
  }
})
</script>

<style scoped>
.page-title {
  padding-top: 0.02em;
  width: 530px;

  color: white;
  font-size: 23em;
  font-weight: normal;

  /* dev */
  display: flex;
  align-items: center;
  justify-content: center;
}
ul {
  width: 4em;
  height: 1.6em;
  /* background: greenyellow; */
  list-style: none;
  margin: 0;
  padding-left: 0em;
  padding-top: 0.08em /* 0.3em */;
  font-size: 1em /* 0.8em */;
  display: flex;
}
.counter {
  width: 1.2em;
  color: red;
}
.bonus {
  padding-top: 0.25em;
  color: yellow;
  font-size: 0.6em;
}
</style>
