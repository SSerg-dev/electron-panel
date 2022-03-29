<template>
  <div>
    <div class="page-title">
      <!-- wash type -->
      <div v-if="this.getPanelType === 'wash'">
        <!--  || getIsMoneyToBonusNo -->
        <div v-if="getWetBalance >= 0 && !getIsMoneyToBonus">
          {{
            `${parseFloat(getWetBalance / Math.pow(10, digits)).toFixed(
              digits
            )}`
          }}
        </div>

        <!-- bonus timer -->
        <!-- <div v-if="getIsMoneyToBonus && getMoneyToBonus > 0"> -->
        <!-- <div v-if="getIsMoneyToBonus && !getIsMoneyToBonusNo"> -->
        <div v-if="getIsMoneyToBonus">    
          <ul>
            <li class="counter">
              {{ `${this.timerSeconds}` }}
              <!-- {{ '99' }} -->
            </li>
            <li class="separator">:</li>
            <li class="bonus">
              {{
                `${parseFloat(
                  this.getMoneyToBonus / Math.pow(10, digits)
                ).toFixed(digits)}`
              }}
              <!-- {{ '999' }} -->
            </li>
          </ul>
        </div>
        
      </div>
    </div>
    <!-- end wash -->

    <!-- vacuum type -->
    <div v-if="this.getPanelType === 'vacuum'">
      <div v-if="!getIsMoneyToBonus">
        {{
          `${parseFloat(getDryBalance / Math.pow(10, digits)).toFixed(digits)}`
        }}
      </div>
    </div>
    <!-- end vacuum -->
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
    digits: 0,
    timerSeconds: 0
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
      getSecondsBonusTimer: 'getSecondsBonusTimer',
      getIsFirstTimer: 'getIsFirstTimer',
      getIsMoneyToBonusNo: 'getIsMoneyToBonusNo'
    }),
    ...mapMutations({
      setWetBalance: 'setWetBalance',
      setDryBalance: 'setDryBalance'
    })
  },
  watch: {
    /* dev */
    getWetBalance(flag) {
      console.log('Message getWetBalance-->', this.getWetBalance)
      if (+flag === 0)
        this.$router.push('/')
    },
    getDryBalance(flag) {
      // console.log('Message getDryBalance-->', this.getDryBalance)
    },
    getFixedCurrency(flag) {
      this.digits = flag
    },
    getMoneyToBonus(flag) {
      // console.log('getMoneyToBonus', flag)
    },
    getSecondsBonusTimer(flag) {
      if (flag >= 0) this.timerSeconds = flag
    }
  },

  mounted() {},
  created() {
    if (parseInt(this.getFixedCurrency) > 0) {
      this.digits = this.getFixedCurrency
    }
  }
})
</script>

<style scoped>
.page-title {
  /* background: greenyellow; */
  padding-top: 0.02em;
  padding-right: 2.5em;
  width: 4em /* 530px */;

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
  padding-left: 0.95em;
  padding-top: 0.02em /* 0.3em */;
  font-size: 1em /* 0.8em */;
  display: flex;
}
.counter {
  width: 1.2em;
  color: red;
  /* dev */
  display: flex;
  align-items: center;
  justify-content: center;
}
.separator {
  color: red;
  padding-left: 0em;
  opacity: 0;
}
.bonus {
  padding-top: 0.24em;
  padding-left: 0em;
  color: yellow;
  font-size: 0.6em;
  /* dev */
  display: flex;
  /* align-items: center; */
  justify-content: center;
}
</style>
