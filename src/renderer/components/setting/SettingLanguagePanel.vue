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
      <!-- class="browser-default" disabled -->
      <div class="card-content black-text">
        <span class="card-title">Панель:</span>
        <div class="input-field">
          <select

            multiple
            class="page-title white-text"
            ref="select"
            v-model="current"
          >
            <option value="" disabled selected>Выбрать языки:</option>
            <option
              v-for="(l, index) in allLanguages"
              :key="index"
              :value="l.id"
            >
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
  name: 'setting-payment-bill',
  data: () => ({
    select: null,
    current: [],
    title: [],

    emoji: '',
    currency: '',
    symbol: '',
    currencies: [],

    languages: [],
    allLanguages: []
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
      getLanguageNatives: 'getLanguageNatives',
      getAllLanguageNatives: 'getAllLanguageNatives',
      getLanguageIds: 'getLanguageIds'
    }),
    ...mapMutations({
      setLanguageNatives: 'setLanguageNatives',
      setLanguageIds: 'setLanguageIds'
    }),
  },
  watch: {
    current(languageIds) {
      const selected = languageIds.map(i => {
        this.allLanguages.find(l => l.id === i).key
        return this.allLanguages.find(l => l.id === i).key
      })
      this.setLanguageNatives(selected)
      //console.log('--this.current-->', this.current)
      this.setLanguageIds(this.current)
      //this.getLanguageIds()

    }
  },
  created() {
    /* dev */
    //this.languages = this.getLanguageNatives()
    this.allLanguages = this.getAllLanguageNatives()

    /* for (let i = 0; i < this.languages.length; i++) {
      const title = this.allLanguages[i].title
      const index = this.allLanguages.findIndex(l => l.title === title)
      this.allLanguages[index].selected = true

      if (this.allLanguages[index].selected) {
        //console.log('this.allLanguages[index].selected-->', this.allLanguages[index].title)
      }
    }

    for (let i = 0; i < this.allLanguages.length; i++) {
      if (this.allLanguages[i].selected === true) {
        this.current[i] = this.allLanguages[i].id
        this.select = this.allLanguages[i].title
      }
    } */
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
})
</script>

<style scoped>
/* span {
  color:darkcyan;
} */
</style>
