<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="
      height: 150px; 
      border: solid 3px #00B9E3; 
      border-top-right-radius: 2rem;
      border-bottom-right-radius: 2rem;
      border-top-left-radius: 2rem;
      border-bottom-left-radius: 2rem;
      <!-- border-left-style: hidden; -->

      "
    >
      <div class="card-content black-text">
        <span class="card-title">Язык:</span>

        <!-- <div class="input-field">
          <select
            multiple
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
        </div> -->

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
import store from '../../store'
import EventBus from '@/bus/EventBus'

export default Vue.extend({
  name: 'setting-payment-bill',
  data: () => ({
    select: null,
    current: [],
    title: [],

    emoji: '',
    currency: '',
    symbol: '',

    languages: [],
    allLanguages: []
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true
    })
    M.updateTextFields()
  },
  computed: {
    ...mapGetters({
      getLanguageNatives: 'getLanguageNatives',
      getAllLanguageNatives: 'getAllLanguageNatives',
      getLanguageIds: 'getLanguageIds',
      getSelectLanguageNatives: 'getSelectLanguageNatives'
    }),
    selected() {
      return store.state.countries.countries
    }
  },
  methods: {
    ...mapMutations({
      setLanguageNatives: 'setLanguageNatives',
      setLanguageIds: 'setLanguageIds',
      setSelectCountries: 'setSelectCountries'
    }),
    ...mapGetters({
      getSelectCountries: 'getSelectCountries'
    }),
    /* dev */
    emitSelect(selected, current) {
      const options = { selected: selected, current: current }
      EventBus.$emit('submitSelect', options)
    },

    setup() {

      /* dev */
      
      
      /* console.log(
      'setup this.getSelectCountries().length-->',
      this.getSelectCountries().length
      )

      if (this.getSelectCountries().length === 0) {
        this.languages = this.getLanguageNatives
        console.log('++if-->')
      } else if (this.getSelectCountries().length > 0) {
        
        this.languages = this.getSelectLanguageNatives
        console.log('++else if-->')

        for (let i = 0; i < this.allLanguages.length; i++) {
          this.allLanguages[i].selected = false
        }
      } */
      /*     */

      this.languages = this.getLanguageNatives
      this.allLanguages = this.getAllLanguageNatives

      /* dev */
      /* for (let i = 0; i < this.allLanguages.length; i++) {
        if(this.allLanguages[i].selected === true)
          console.log('this.allLanguages[i].selected-->', this.allLanguages[i].selected)  
      } */

      for (let i = 0; i < this.languages.length; i++) {
        const key = this.languages[i].key
        const index = this.allLanguages.findIndex(l => l.key === key)
        this.allLanguages[index].selected = true
        /* console.log(
            '++this.languages-->',
            JSON.stringify(this.languages[i])
          ) */
      }
      //console.log('--this.languages-->', JSON.stringify(this.languages) )

      /* dev */
      /* console.log('----------------')
      for (let i = 0; i < this.allLanguages.length; i++) {
        if(this.allLanguages[i].selected === true)
          console.log('this.allLanguages[i].selected-->', this.allLanguages[i].selected)  
      } */

      for (let i = 0; i < this.allLanguages.length; i++) {
        if (this.allLanguages[i].selected === true) {
          this.current[i] = this.allLanguages[i].id
          this.select = this.allLanguages[i].title
          /* console.log(
            '++this.allLanguages-->',
            JSON.stringify(this.allLanguages[i])
          ) */
        }
      }

    }
  },
  watch: {
    current(languageIds) {
      const selected = languageIds.map(i => {
        const result = this.allLanguages.find(l => l.id === i).key
        return result
      })
      console.log('++ current-->selected-->', selected)
      this.setSelectCountries(selected)
      this.emitSelect(selected, this.current)
      this.select = selected
    },

    selected(value) {
      this.current = this.getLanguageIds
      this.select = value
    }
  },
  created() {
    this.setup()
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
