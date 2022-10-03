<template>
  <div class="row">

    <div class="col">
      <p>
        <img src="@/assets/imgs/cash/cash_bills.png" />
      </p>
    </div>

    <div class="col">
      <ul>
        <CashShowBanknoteItem
          v-for="(bill, index) in bills"
          :bill="bill"
          :key="index"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import CashShowBanknoteItem from '@/components/CashShowBanknoteItem'

export default Vue.extend({
  name: 'cash-show-banknote-list',
  data: () => ({
    bills: []//[1,2,3,4,5,6,7,8] 
  }),
  mounted() {
    this.bills = this.getDefaultBiils()
  },
  methods: {
    ...mapGetters({
      getDefaultBiils: 'getDefaultBiils'
    })
  },
  components: {
    CashShowBanknoteItem
  }
})
</script>

<style scoped></style>
