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
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(l, index) in languages" :key="index" :value="l.id">
              <!-- Countries country -->
              <!-- Languages language -->
              <div class="dropdown-setting">
                {{ l.emoji }}
                {{ l.title }}
                <!-- {{ l.currency}} -->
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

      this.setLanguageItem(key)
    }
  },
  created() {
    this.languages = this.getLanguageNatives()

    let index
    if (this.getDefaultLanguage().toUpperCase() === 'RU') index = 0
    const { id, title, key, emoji, currency, symbol } = this.languages[index]
    this.current = id
    this.select = title
    this.emoji = emoji
    this.currency = currency
    this.symbol = symbol

    //console.log('!!++currency-->', this.current, this.select, this.emoji, this.currency)
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
})
</script>
