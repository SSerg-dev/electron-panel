<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="
        height: 150px;
        border: solid 3px #00b9e3;
        border-top-left-radius: 2rem;
        border-bottom-left-radius: 2rem;
        border-right-style: hidden;
      "
    >
      <div class="card-content black-text">
        <span class="card-title">{{ `Language` | localize }} {{ `:` }}</span>
        <div class="input-field">
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(l, index) in languages" :key="index" :value="l.id">
              <div class="dropdown-setting">
                <div style="float: left" class="emoji">{{ l.emoji }} </div>
                <div style="float: left">&nbsp;{{ l.title }}</div>
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
import EventBus from '@/bus/EventBus'

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

    languages: [] || 'RU',
  }),
  mounted() {
    /* dev */
    EventBus.$on('submitSelect', this.submitHandler)

    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    })
    M.updateTextFields()
  },
  methods: {
    setup() {
      this.initLanguage()
    },
    submitHandler(options) {
      // console.log(
      //   '$$ SettingPaymentLanguage.vue: 64',
      //   JSON.stringify(options.selected)
      // )
    },
    initLanguage() {
      // const defaultLanguage = this.getDefaultLanguage().toUpperCase()
      const defaultCountry = this.getDefaultCountry().toUpperCase()


      this.languages = this.getLanguageNatives()
      // console.log('$$ SettingPaymentLanguage.vue: 73', defaultCountry, JSON.stringify(this.languages))

      const index = this.languages.findIndex((l) => l.key === defaultCountry)
      if (index !== -1) {
        const { id, title, key, emoji, currency, symbol } =
          this.languages[index]
        this.current = id || 0
        this.select = title
        this.emoji = emoji
        this.currency = currency
        this.symbol = symbol
      }
    },
    ...mapGetters({
      getDefaultLanguage: 'getDefaultLanguage',
      getDefaultCountry: 'getDefaultCountry',

      getSysPanelLanguage: 'getSysPanelLanguage',
      getSelectedCountries: 'getSelectedCountries',

      getLanguageNatives: 'getLanguageNatives',
      getAllLanguageNatives: 'getAllLanguageNatives',
    }),
    /*  */
    ...mapMutations({
      setLanguageItem: 'setLanguageItem',
      setSysPanelLanguage: 'setSysPanelLanguage',
      setDefaultLanguage: 'setDefaultLanguage',
      setDefaultCountry: 'setDefaultCountry',
    }),
  },
  watch: {
    current(languageId) {
      const { id, title, key, emoji, currency, symbol } = this.languages.find(
        (l) => l.id === languageId
      )
      this.select = title
      this.setSysPanelLanguage(key)
      this.setDefaultCountry(key)

    },
  },
  created() {
    this.setup()
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
})
</script>

<style scoped>
.language-emoji {
  /* text-shadow: 6px 6px 6px #3a3a37, -1px 1px 1px #5c5710; */
  font-family: 'Emoji-Regular';
}
</style>
