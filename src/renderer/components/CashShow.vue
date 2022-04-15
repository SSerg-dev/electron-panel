<template>
  <div>
      
      <div class="cash-show">
        <div class="row">
          <!-- <CashBill /> -->
          <h2>
           <div class="col"> 
             <CashShowBanknoteList />
           </div>
           
           <div class="col" style="padding-left: 3em;">
             <CashShowCoinList />
           </div>
          </h2>

        </div>
      </div>
      

    </div>
  
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
/* dev */
import CashShowBanknoteList from '@/components/CashShowBanknoteList'
import CashShowCoinList from '@/components/CashShowCoinList'

export default Vue.extend({
  data: () => ({
  }),
  methods: {
    
  },
  mounted() {
  },
  components: {
    CashShowBanknoteList,
    CashShowCoinList
  }
})
</script>

<style scoped>

.cash-show {
  color:white;
  margin-bottom: -32em;
  margin-left: 6em;
}

</style>
