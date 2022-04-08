<template>
  <div>

    <!-- <p align="center">{{ `${this.messages[3]}` }}</p> -->
    <div class="cost-title">
       <p align="center">{{ `Цена за одну минуту` }}</p>
    </div>
    <div class="row list-title">
      <div class="col s7">{{ `Программа` }}</div>
      <!-- <div class="col ">цена за 1 мин</div> -->
      
      <div class="col s3" align="center">
      {{ this.currency }}
      </div>
      <div class="col s2" align="center">
        {{ this.emoji }}
      </div>

    </div>

    <!-- <div class="list-title">
      <div class="row">
        <div class="col s9">Программа</div>
        <div class="col s1">
          {{ this.emoji }}
        </div>
        <div class="col s2">
          {{ this.currency }}
        </div>
      </div>
    </div> -->

    <!-- <p align="center">{{ `${this.messages[0]}` }}</p> -->
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
  mounted() {},
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
    }
  }
})
</script>

<style scoped>
.cost-title {
  position: absolute;
  left: 30%;
  top:15%;
  color: white;
  font-size: 3.5em;
  z-index: 1000;
}
.list-title {
  width: 92%;
  height: 80%;
  margin-left: -0.5em;
  margin-bottom: 0em;
  padding-left: 0.6em;
  padding-top: 0.1em;
  font-size: 3.5em;
  color: white;
  border: 2px solid;
  border-radius: 0.4em;
  border-color: #00b9e3;
  /* background: yellow; */
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
  color: white; /* #00b9e3; */
  background: #212121;
}

/*  */
</style>
