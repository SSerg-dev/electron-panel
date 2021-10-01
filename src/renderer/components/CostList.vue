<template>
  <div>
    <div class="row item" style="margin-left: 2em;">
      <div class="col s5 programm">Программа</div>
      <div class="col s3">цена за 1 мин</div>
      <div class="col s3">
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
      getLanguageNatives: 'getLanguageNatives'

    })
  },
  mounted() {
    //console.log('++this.costs mounted!!!-->', this.costs[4])
  },
  created() {
    //console.log('++this.costs created!!!-->', this.costs[4])
    this.initCurrency()

  },
  methods: {
    initCurrency() {
      this.currencies = this.getLanguageNatives.filter(
        c => c.currency !== 'EUR'
      )
      if (
        this.getLanguageNatives.filter(c => c.currency === 'EUR').length > 0
      )
        this.currencies.push({
          id: 999,
          title: 'EUR',
          key: 'EUR',
          emoji: '🇪🇺',
          currency: 'EUR',
          symbol: '€'
        })

      let index
      const defaultCurrency = this.getDefaultCurrency
      if (defaultCurrency.title.toUpperCase() === 'RUB') index = 0

      const { id, title, key, emoji, currency, symbol } = this.currencies[index]
      this.current = id
      this.select = title
      this.emoji = emoji
      this.currency = currency
      this.symbol = symbol
      //console.log('this.currency-->', this.emoji, this.currency, this.symbol)
    },
  }
})
</script>

<style scoped>
.row {
  font-size: 2rem;
  color: white;
}
.programm {
  text-align: left;
}
.item {
  /*  */
  width: 92%;
}

ul {
  padding-top: 0rem;
}
ul li {
  list-style: none;
  padding: 30px; /* 13px; */
  background: #121212;
}
ul li:nth-child(even) {
  color: #00b9e3; /* #fff; */
  background: #212121;
}
/*  */
.footer-panel {
  height: 106px;
  width: 100%;
  position: fixed;
  left: 0em;
  bottom: -0.2em; /* -1.5em; */ /* 0px; */
  opacity: 0.5;

  /* background: linear-gradient(180deg, #2d2a47, #212045); */
  background: #121212;
}
/*  */
</style>
