<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="
      height: 150px; 
      border: solid 3px #00B9E3; 
      border-top-right-radius: 2rem;
      border-bottom-right-radius: 2rem;
      border-left-style: hidden;
      "
    >
      <div class="card-content black-text">
        <span class="card-title">Валюта:</span>
        <div class="input-field">
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(c, index) in currencies" :key="index" :value="c.id">
              <!-- Countries country -->
              <!-- Languages language -->
              <div class="dropdown-setting">
                {{ c.emoji }}
                {{ c.currency }}
                {{ c.symbol }}
              </div>
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'setting-payment-currency',
  data: () => ({
    select: null,
    current: null,
    title: '',

    emoji: '',
    currency: '',
    symbol: '',
    currencies: []
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true
    })
    M.updateTextFields()
  },
  /* computed: {
    ...mapGetters({
      getInitCurrency: 'getInitCurrency'
    })
  }, */
  methods: {
    initCurrency() {
      this.currencies = this.getLanguageNatives().filter(
        c => c.currency !== 'EUR'
      )
      if (
        this.getLanguageNatives().filter(c => c.currency === 'EUR').length > 0
      )
        this.currencies.push({
          id: 999,
          title: 'EUR',
          key: 'EUR',
          emoji: '🇪🇺',
          currency: 'EUR',
          symbol: '€'
        })

      const defaultCurrency = this.getDefaultCurrency()
      const index = this.currencies.findIndex(
        c => c.currency === defaultCurrency
      )

      const { id, title, key, emoji, currency, symbol } = this.currencies[index]

      this.current = id
      this.select = title
      this.emoji = emoji
      this.currency = currency
      this.symbol = symbol
    },
    ...mapGetters({
      getDefaultCurrency: 'getDefaultCurrency',
      getLanguageNatives: 'getLanguageNatives'
    }),
    ...mapMutations({
      setDefaultCurrency: 'setDefaultCurrency'
    })
  },
  watch: {
    current(currencyId) {
      const { id, title, key, emoji, currency, symbol } = this.currencies.find(
        c => c.id === currencyId
      )
      this.select = title
      this.setDefaultCurrency(currency)
    }
  },
  created() {
    this.initCurrency()
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
})
</script>
