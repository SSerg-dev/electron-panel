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
        <span class="card-title">Язык:</span>
        <div class="input-field">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import store from '../../store'

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
      getAllLanguageNatives: 'getAllLanguageNatives'
    }),

    selected() {
      return store.state.countries.countries
    }
  },
  methods: {

    setup() {
      /* dev */
      this.languages = this.getLanguageNatives
      this.allLanguages = this.getAllLanguageNatives

      for (let i = 0; i < this.languages.length; i++) {
        const title = this.allLanguages[i].title
        const index = this.allLanguages.findIndex(l => l.title === title)
        this.allLanguages[index].selected = true
      }

      for (let i = 0; i < this.allLanguages.length; i++) {
        if (this.allLanguages[i].selected === true) {
          this.current[i] = this.allLanguages[i].id
          this.select = this.allLanguages[i].title
        }
      }
    },
    onchange() {
      this.current = []
      this.select = []

      this.current = [2, 3, 4, 5]
      this.select['UA', 'BY', 'LT', 'LV' ]

    }

  },
  watch: {
    /* current(languageIds) {
      languageIds.forEach(l => {
        this.select = l
      })
    }, */
    selected(value) {
      console.log('!!!!++value-->', value)
      
      
      //console.log('++this.current-->', this.current) 
      this.onchange()  
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
