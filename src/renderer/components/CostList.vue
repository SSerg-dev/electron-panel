<template>
  <div>
    <div class="row item">
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
    //console.log('++this.costs mounted!!!-->', this.costs[4])
  },
  created() {
    //console.log('++this.costs created!!!-->', this.costs[4])
    this.initCurrency()

  },
  methods: {
    initCurrency() {

      /* dev */
      const { id, title, key, emoji, currency, symbol } = this.getInitCurrency
      this.current = id
      this.select = title

      this.emoji = emoji
      this.currency = currency
      this.symbol = symbol
      /*     */
    },
    /* ...mapGetters({
      getDefaultCurrency: 'getDefaultCurrency',
      getLanguageNatives: 'getLanguageNatives',


    }) */
  }
})
</script>

<style scoped>
.row {
  font-size: 2rem;
  color: white;
}
/* .programm {
  text-align: left;
} */
.item {
  /*  */
  width: 92%;
  margin-left: 2em;
  padding-left: 0.8em;
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
