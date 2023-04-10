<template>
  <div>
    <div class="wet-balance">
      <!-- wash type -->
      <div v-if="this.getPanelType === 'wash'">
        <!-- show Wet Balance-->

        <!-- show wet balance -->

        <!-- <div
          v-if="
            (getWetBalance >= 0 &&
              !getIsMoneyToBonus &&
              !getIsMoneyToBonusYes) ||
            this.$route.name === 'cash' ||
            (this.$route.name === 'program' && !getIsMoneyToBonus)
          "
        > -->
        <!-- instead show wet balance -->
        
          <div
          v-if="
            (
               (+getWetBalance >= 0 && +this.getWetStopFreeCount === 0) 
               || (+getWetBalance >= 0 && this.getIsStandbyFreeEnable && this.$route.name === 'cash')
            ) 
            && (this.$route.name === 'cash' || this.$route.name === 'program')
          ">
          <!-- end instead show wet balance  -->

          {{
            `${parseFloat(getWetBalance / Math.pow(10, digits)).toFixed(
              digits
            )}`
          }}
        </div>

        <!-- -->
        <div v-else-if="getIsMoneyToBonusYes" style="color: yellow">
          {{
            `${parseFloat(getMoneyToBonus / Math.pow(10, digits)).toFixed(
              digits
            )}`
          }}
        </div>

        <!-- bonus timer -->
        <!-- dev hidden -->
        <!-- <div
          v-else-if="
            getIsMoneyToBonus &&
              this.$route.name !== 'bonus' &&
              this.$route.name !== 'cash' &&
              this.timerSeconds > 0
          "
        >
          <ul>
            <li class="counter">
              {{ `${this.timerSeconds}` }}
              
            </li>
            <li class="separator">:</li>
            <li class="bonus">
              {{
                `${parseFloat(
                  this.getMoneyToBonus / Math.pow(10, digits)
                ).toFixed(digits)}`
              }}
              
            </li>
          </ul>
        </div> -->

        <!-- instead bonus timer for simple-->
        <div
          v-if="
            this.$route.name !== 'bonus' &&
              this.$route.name !== 'cash' &&
              this.getWetStopFreeCount > 0
          "
        >
          <ul>
            <li class="counter">
              {{ `${this.getWetStopFreeCount}` }}
            </li>
            <li class="separator">:</li>
            <li class="bonus">
              {{
                `${parseFloat(
                  this.getWetBalance / Math.pow(10, digits)
                ).toFixed(digits)}`
              }}
            </li>
          </ul>
        </div>

        <!-- end instead bonus timer for simple -->
      </div>
    </div>

    <!-- end wash -->

    <!-- vacuum type -->
    <div class="dry-balance">
      <div v-if="this.getPanelType === 'vacuum'">
        <div v-if="!getIsMoneyToBonus">
          {{
            `${parseFloat(getDryBalance / Math.pow(10, digits)).toFixed(
              digits
            )}`
          }}
        </div>
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
      getIsMoneyToBonusNo: 'getIsMoneyToBonusNo',
      getIsMoneyToBonusYes: 'getIsMoneyToBonusYes',
      getMoneyToBonus: 'getMoneyToBonus',
      getIsStandbyFreeEnable: 'getIsStandbyFreeEnable'
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
      if (+flag <= 1 && !this.getIsMoneyToBonusYes) this.$router.push('/')
    },
    getDryBalance(flag) {
      console.log('Message getDryBalance-->', this.getDryBalance)
    },
    getFixedCurrency(flag) {
      this.digits = flag
    },
    getMoneyToBonus(flag) {
      console.log('Message-->getMoneyToBonus-->', flag)
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
.wet-balance,
.dry-balance {
  padding-top: 0.02em;
  padding-right: 2.5em;
  width: 4em;

  color: white;
  font-size: 23em;
  font-weight: normal;
  font-family: 'Roboto-Regular';

  display: flex;
  align-items: center;
  justify-content: center;
}
/* .dry-balance {
  padding-top: 0.02em;
  padding-right: 2.5em;
  width: 4em;

  color: white;
  font-size: 23em;
  font-weight: normal;

  display: flex;
  align-items: center;
  justify-content: center;
} */
ul {
  width: 4em;
  height: 1.6em;
  list-style: none;
  margin: 0;
  padding-left: 0.95em;
  padding-top: 0.02em;
  font-size: 1em;
  display: flex;
}
.counter {
  width: 1.2em;
  color: red;
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
  display: flex;
  /* align-items: center; */
  justify-content: center;
}
</style>
