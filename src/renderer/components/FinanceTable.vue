<template>
  <div>
    <div class="page-title">
      <h1>
        <p>Статистика поста №{{ getDefaultPanelNumber }}</p>
      </h1>
    </div>

    <table style="border: solid 3px #00b9e3">
      <thead>
        <tr>
          <th>
            {{ this.emoji }}
            {{ this.currency }}
            {{ this.symbol }}
          </th>
          <th>{{ `` }}</th>
        </tr>
      </thead>

      <tbody>
        <tr style="border: solid 3px #00b9e3">
          <td style="text-align: left; padding-left: 1em">
            {{ `${this.getCashTitle[0].title}` }}
          </td>
          <td>{{ getSumCash }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">
            {{ `${this.getCashTitle[1].title}` }}
          </td>
          <td>{{ getSumBills }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">
            {{ `${this.getCashTitle[2].title}` }}
          </td>
          <td>{{ getBillsCount }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">{{ `10` }}</td>
          <td>{{ getBills10 }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">{{ `50` }}</td>
          <td>{{ getBills50 }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">{{ `100` }}</td>
          <td>{{ getBills100 }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">{{ `200` }}</td>
          <td>{{ getBills200 }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">{{ `500` }}</td>
          <td>{{ getBills500 }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">{{ `1000` }}</td>
          <td>{{ getBills1000 }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">{{ `2000` }}</td>
          <td>{{ getBills2000 }}</td>
        </tr>

        <tr>
          <td
            style="
              text-align: left;
              padding-left: 1em;
              border-top: solid 3px #00b9e3;
            "
          >
            {{ `${this.getCashTitle[3].title}` }}
          </td>
          <td style="border-top: solid 3px #00b9e3">{{ getSumCoins }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">
            {{ `${this.getCashTitle[4].title}` }}
          </td>
          <td>{{ getCoinsCount }}</td>
        </tr>

        <tr>
          <td style="text-align: left; padding-left: 1em">{{ `1` }}</td>
          <td>{{ getCoins1 }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">{{ `2` }}</td>
          <td>{{ getCoins2 }}</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 1em">{{ `10` }}</td>
          <td>{{ getCoins10 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'finance-table',
  // props: ['cash'],
  props: ['coins', 'bills'],

  data: () => ({
    emoji: '',
    currency: '',
    symbol: '',
    currencies: [],
  }), // end data

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
  },

  computed: {
    ...mapGetters({
      getInitCurrency: 'getInitCurrency',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getDefaultCurrency: 'getDefaultCurrency',
      getLanguageNatives: 'getLanguageNatives',

      // getCashTitle
      getCashTitle: 'getCashTitle',

      // getBills
      getBills10: 'getBills10',
      getBills100: 'getBills100',
      getBills1000: 'getBills1000',
      getBills200: 'getBills200',
      getBills2000: 'getBills2000',
      getBills50: 'getBills50',
      getBills500: 'getBills500',
      getBills5000: 'getBills5000',
      getBillsCount: 'getBillsCount',
      // getCoins
      getCoins0: 'getCoins0',
      getCoins1: 'getCoins1',
      getCoins10: 'getCoins10',
      getCoins2: 'getCoins2',
      getCoinsCount: 'getCoinsCount',
      // getSum
      getSumBills: 'getSumBills',
      getSumCash: 'getSumCash',
      getSumCoins: 'getSumCoins',
    }),
  },

  created() {
    this.initCurrency()
    
  },
  mounted() {
    console.log('$$ FinanceTable.vue ', this.coins, this.bills)
  }
})
</script>

<style scoped>
.page-title {
  margin-top: 16em;
  margin-bottom: 2em;
  margin-left: 16.5em; /* 16em; */
  padding-top: em;
  color: white;
}
table {
  margin-top: 0em; /* 20em; */
  margin-left: 3.8em;
  color: white;
  border: 1px solid;
  border-color: white;
  width: 90%;
}
th {
  border: 1px solid;
  border-color: white;
  font-size: 2em;
  text-align: center;
}
td {
  border: 1px solid;
  border-color: white;
  font-size: 2em;
  text-align: center;
  /* border-left-color: aqua; */
}
</style>
