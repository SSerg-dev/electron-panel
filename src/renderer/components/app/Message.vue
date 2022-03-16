<template>
  <div>
    <div class="page-title">
      <!-- <div v-if="this.getPanelType === 'wash' && !getIsMoneyToBonus"> -->
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

      <ul v-if="getIsMoneyToBonus && getMoneyToBonus > 0">
        <li style="color: red">
          {{
            `${parseFloat(getWetStopFreeCount / Math.pow(10, digits)).toFixed(
              digits
            )}  `
          }}
        </li>
        <li style="color: red;">{{ ` : ` }}</li>
        <li style="color: yellow">
          {{
            `${parseFloat(getMoneyToBonus / Math.pow(10, digits)).toFixed(
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
      getWetStopFreeCount: 'getWetStopFreeCount'
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
  list-style: none;
  margin: 0;
  padding-left: 0;
  padding-top: 0.3em;
  font-size: 0.8em;
  display: flex;
}
</style>
