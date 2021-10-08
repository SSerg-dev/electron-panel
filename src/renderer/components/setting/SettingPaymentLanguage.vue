<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="
      height: 150px; 
      border: solid 3px #00B9E3; 
      border-top-left-radius: 2rem;
      border-bottom-left-radius: 2rem;
      border-right-style: hidden;
      "
    >
      <div class="card-content black-text">
        <span class="card-title">Язык:</span>
        <div class="input-field">
          <select 
          class="page-title white-text" 
          ref="select" 
          v-model="current"
          >
            <option v-for="(l, index) in languages" :key="index" :value="l.id">
              <div class="dropdown-setting">
                {{ l.emoji }}
                {{ l.title }}
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
  name: 'setting-payment-language',
  data: () => ({
    select: null,
    current: null,
    title: '',

    emoji: '',
    currency: '',
    symbol: '',
    currencies: [],

    languages: []
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true
    })
    M.updateTextFields()
  },
  methods: {
    ...mapGetters({
      getDefaultLanguage: 'getDefaultLanguage',
      getLanguageNatives: 'getLanguageNatives'
    }),
    /*  */
    ...mapMutations({
      setLanguageItem: 'setLanguageItem'
    })
  },
  watch: {
    current(languageId) {

      const { id, title, key, emoji, currency, symbol } = this.languages.find(
        l => l.id === languageId
      )
      this.select = title

      /* dev */
      console.log('this.select-->', key, this.select)
      
      this.setLanguageItem(key)
    }
  },
  created() {
    const defaultLanguage = this.getDefaultLanguage().toUpperCase() 
    this.languages = this.getLanguageNatives()
  
    const index = this.languages.findIndex(l =>l.key === defaultLanguage) 
    const { id, title, key, emoji, currency, symbol } = this.languages[index]
    this.current = id
    this.select = title
    this.emoji = emoji
    this.currency = currency
    this.symbol = symbol

  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
})
</script>
