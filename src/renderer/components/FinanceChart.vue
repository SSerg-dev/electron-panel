<template>
  <div>
    <div class="page-title">
      <h1>
        <p>Диаграмма поста №{{ getDefaultPanelNumber }}</p>
      </h1>

      <div align="justify" style="margin-left: 14em; margin-bottom: 4em;">
        <h4>
          {{ this.emoji }}
          {{ this.currency }}
          {{ this.symbol }}
        </h4>
      </div>

      <!-- <div align="justify">
        <h4>
          {{ cashTitle }}
        </h4>
      </div> -->
    </div>

    <div class="finance-chart">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import { Pie } from 'vue-chartjs'

export default Vue.extend({
  name: 'finance-chart',
  /* dev */
  extends: Pie,

  props: ['cash', 'cashTitle'],

  data: () => ({
    emoji: '',
    currency: '',
    symbol: '',
    currencies: [],

    chartData: []
  }), // end data

  created() {
    this.initCurrency()
  },
  mounted() {
    this.initData()
    this.initChart()
  },
  methods: {
    initData() {
            const all = this.cash         // {}
            const titles = this.cashTitle // []

            titles.map(t => {
             Object.keys(all).forEach(keyAll => {
               if (t.key === keyAll) {
                 this.chartData.push(all[keyAll])
               }
             })
            })


            /* 
            getters: {
            getLanguageItem: state => keySel => {
            const all = state.languages
            const selected = Object.keys(all).map(key => ({
            key: key,
            intl: all[key][0],
            native: all[key][1]
            }))
            let result = selected.find(language => language.key === keySel)

            return result.native
            }
            }
            */
           /* const selected =  titles.map(t => {
             // ??
             let tt = Object.keys(all).map(key => ({
               key: key,
               
             })
             ) // end map

             let result = 42
             return 42
            
            })
            console.log('++selected-->', selected)
 */

    },
    initChart() {
      this.renderChart(
        {
          labels: this.cashTitle.map(t => t.title),
          datasets: [
            {
              label: 'diagramm label',
              data: this.chartData,
              
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        { // options
            legend: {
              display: true,
              labels: {
                fontColor: '#fff',
                fontSize: 16
              }
            }
        } // end options
      )
    },
    initCurrency() {
      this.currencies = this.getLanguageNatives.filter(
        c => c.currency !== 'EUR'
      )
      if (this.getLanguageNatives.filter(c => c.currency === 'EUR').length > 0)
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
    }
  },

  computed: {
    ...mapGetters({
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getDefaultCurrency: 'getDefaultCurrency',
      getLanguageNatives: 'getLanguageNatives',

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
      getSumCoins: 'getSumCoins'
    })
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
</style>
