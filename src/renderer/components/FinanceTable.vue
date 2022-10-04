<template>
  <div>
    <div class="page-title">
      <h1>
        <!-- <p align="center" >Касса поста №{{ getDefaultPanelNumber }}</p> -->
        <p align="center">
          {{ `Cash_post` | localize  }}
          {{ `#` | localize }}
          {{ getDefaultPanelNumber }}
        </p>
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
          <td class="cell-style">
            {{ `${this.getCashTitle[0].title}` | localize }}
          </td>
          <td>{{ getAllCoins.amountCoin + getAllBills.amountBill }}</td>
        </tr>
        <tr>
          <td class="cell-style">
            {{ `${this.getCashTitle[1].title}` | localize }}
          </td>
          <td>{{ getAllBills.amountBill }}</td>
        </tr>
        <tr>
          <td class="cell-style">
            {{ `${this.getCashTitle[2].title}` | localize }}
          </td>
          <td>{{ getAllBills.counterBill }}</td>
        </tr>
        <tr v-if="getAllBills.counterB10">
          <td class="cell-style" style="padding-left: 1.5em">{{ `10` }}</td>
          <td>{{ getAllBills.counterB10 }}</td>
        </tr>
        <tr v-if="getAllBills.counterB50">
          <td class="cell-style" style="padding-left: 1.5em">{{ `50` }}</td>
          <td>{{ getAllBills.counterB50 }}</td>
        </tr>
        <tr v-if="getAllBills.counterB100">
          <td class="cell-style">{{ `100` }}</td>
          <td>{{ getAllBills.counterB100 }}</td>
        </tr>
        <tr v-if="getAllBills.counterB200">
          <td class="cell-style">{{ `200` }}</td>
          <td>{{ getAllBills.counterB200 }}</td>
        </tr>
        <tr v-if="getAllBills.counterB500">
          <td class="cell-style">{{ `500` }}</td>
          <td>{{ getAllBills.counterB500 }}</td>
        </tr>

        <tr>
          <td
            style="
              text-align: left;
              padding-left: 1em;
              border-top: solid 3px #00b9e3;
            "
          >
            {{ `${this.getCashTitle[3].title}` | localize }}
          </td>
          <td style="border-top: solid 3px #00b9e3">
            {{ getAllCoins.amountCoin }}
          </td>
        </tr>

        <tr>
          <td class="cell-style">
            {{ `${this.getCashTitle[4].title}` | localize }}
          </td>
          <td>
            {{ getAllCoins.counterCoin }}
          </td>
        </tr>

        <tr v-if="getAllCoins.counterC5">
          <td class="cell-style" style="padding-left: 2em">{{ `5` }}</td>
          <td>{{ getAllCoins.counterC5 }}</td>
        </tr>

        <tr v-if="getAllCoins.counterC10">
          <td class="cell-style" style="padding-left: 1.5em">{{ `10` }}</td>
          <td>{{ getAllCoins.counterC10 }}</td>
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
  // props: ['coins', 'bills'],

  data: () => ({
    emoji: '',
    currency: '',
    symbol: '',
    currencies: [],
  }), // end data

  methods: {
    initCurrency() {
      const { id, title, key, emoji, currency, symbol } = this.getInitCurrency
      this.current = id
      this.select = title

      this.emoji = emoji
      this.currency = currency
      this.symbol = symbol
    },
  },

  computed: {
    ...mapGetters({
      getInitCurrency: 'getInitCurrency',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getDefaultCurrency: 'getDefaultCurrency',
      getLanguageNatives: 'getLanguageNatives',

      getCashTitle: 'getCashTitle',
      getAllCoins: 'getAllCoins',
      getAllBills: 'getAllBills',
    }),
  },
  created() {
    this.initCurrency()
  },
  mounted() {},
})
</script>

<style scoped>
.page-title {
  margin-top: 16em;
  margin-bottom: 2em;
  /* margin-left: 16.5em; */
  padding-top: 0em;
  color: white;
}
.cell-style {
  text-align: left;
  padding-left: 1em;
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
