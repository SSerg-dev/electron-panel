<template>
  <div>
    <div class="list-title">
      <div class="col s4">Программа</div>
      <div class="col ">цена за 1 мин</div>
      <div class="col ">
      {{ this.emoji }}
      {{ this.currency }}
      {{ this.symbol }}
      </div>
    </div>

    <ul>
      <CostItem v-for="(cost, index) in costs" :cost="cost" :key="index" />
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import CostItem from '@/components/CostItem'

export default Vue.extend({
  name: 'cost-list',
  //mixins: [paginationMixin],
  props: ['costs'],
  data: () => ({
    emoji: '',
    currency: '',
    symbol: '',
    currencies: []
  }),    

  components: {
    CostItem
  },
  computed: {
    ...mapGetters({
      getDefaultCurrency: 'getDefaultCurrency',
      getLanguageNatives: 'getLanguageNatives',
      getInitCurrency: 'getInitCurrency'

    })
  },
  mounted() {
  },
  created() {
    this.initCurrency()
  },
  methods: {
    initCurrency() {

      const { id, title, key, emoji, currency, symbol } = this.getInitCurrency
      this.current = id
      this.select = title

      this.emoji = emoji
      this.currency = currency
      this.symbol = symbol
      /*     */
    },
  }
})
</script>

<style scoped>

.list-title {
  width: 92%;
  margin-left: -0.4em;
  margin-bottom: 1.8em;
  padding-left: 0.8em;
  font-size: 3.5em;
  color: white;
  border: solid 1px #00b9e3;
  
}

ul {
  margin-left: -1.2em;
  padding-top: 0rem;
}
ul li {
  list-style: none;
  padding-top: 0.5em; /* 30px */
  background: #121212;
}
ul li:nth-child(even) {
  color:  white;/* #00b9e3; */
  background: #212121;
}

/*  */
</style>
