<template>
  <div>
    <div class="page-title">
      <div v-if="this.getPanelType === 'wash' && !getIsMoneyToBonus">
        {{ `${ parseFloat(getWetBalance / Math.pow(10, digits)).toFixed(digits) }` }}
      </div>
      <div v-if="this.getPanelType === 'vacuum' && !getIsMoneyToBonus">
        {{ `${ parseFloat(getDryBalance / Math.pow(10, digits)).toFixed(digits) }` }}
      </div>
      <div v-if="getIsMoneyToBonus">
        {{ `${ parseFloat(getMoneyToBonus / Math.pow(10, digits)).toFixed(digits) }` }}
      </div>

      
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
    ...mapActions({
    })
  },
  computed: {
    ...mapGetters({  
      getWetBalance: 'getWetBalance',
      getDryBalance: 'getDryBalance',
      getPanelType: 'getPanelType',
      getFixedCurrency: 'getFixedCurrency',
      getIsMoneyToBonus: 'getIsMoneyToBonus',
      getMoneyToBonus: 'getMoneyToBonus'
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
    
    if(parseInt(this.getFixedCurrency)  > 0)
      this.digits = this.getFixedCurrency
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
</style>
