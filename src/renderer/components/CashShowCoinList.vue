<template>
  <div class="row">

    <div class="col">
      <p>
        <img src="@/assets/images/cash_coins.png" />
      </p>
    </div>

    <div class="col">
      <ul>
        <CashShowCoinItem
          v-for="(coin, index) in coins"
          :coin="coin"
          :key="index"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import CashShowCoinItem from '@/components/CashShowCoinItem'

export default Vue.extend({
  name: 'cash-show-coin-list',
  data: () => ({
    coins: []// [1,2,3,4,5,6,7,8,11] 
  }),
  mounted() {
    this.coins = this.getDefaultCoinBiils()

  },
  methods: {
    ...mapGetters({
      getDefaultCoinBiils: "getDefaultCoinBiils",
    })
  },
  components: {
    CashShowCoinItem
  }
})
</script>

<style scoped></style>
