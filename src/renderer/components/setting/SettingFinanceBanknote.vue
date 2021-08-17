
<template>
  <div class="col s8" >
    <!-- acceptor -->
    <!-- style="border: solid 3px #00B9E3;" -->
    <div class="card grey lighten-3" style="height: 200px; border: solid 3px #00B9E3;">
      <div class="card-content black-text">
        <span class="card-title">Купюры:</span>
        <div class="input-field">
          <select
            multiple
            class="page-title white-text"
            ref="select"
            v-model="current"
          >
            <option v-for="(b, index) in bills" :key="index" :value="b.id">
              {{ b.title }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'setting-finance-banknote',
  data: () => ({
    select: null,
    current: [],
    title: [],
    bills: [],

  }),
  // defaultBiils
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true
    })
    M.updateTextFields()
  },
  methods: {
    ...mapGetters({
      getFinanceEnableBanknotes: 'getFinanceEnableBanknotes',
      getFinanceFullBanknotes: 'getFinanceFullBanknotes'
    })
  },
  watch: {
    current(billIds) {
      billIds.forEach(b => {
        this.select = b.title
      })
    }
  },
  created() {
    const defaultBiils = this.getFinanceEnableBanknotes()
    this.bills = this.getFinanceFullBanknotes()
    // console.log('banknote defaultBiils-->', JSON.stringify(defaultBiils) )
    // console.log('banknote this.bills-->', JSON.stringify(this.bills) )

    for (let i = 0; i < defaultBiils.length; i++) {
      const value = defaultBiils[i]
      const index = this.bills.findIndex(c => c.value === value)
      this.bills[index].selected = true
    }
    for (let i = 0; i < this.bills.length; i++) {
      if (this.bills[i].selected === true) {
        this.current[i] = this.bills[i].id
        this.select = this.bills[i].title
      }
    }

  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy() 
    }
  }
})
</script>

<style scoped>
/* span {
  color: red;
} */
</style>
