<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="
        height: 150px;
        border: solid 3px #00b9e3;
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
        border-top-left-radius: 2rem;
        border-bottom-left-radius: 2rem;
      "
    >
      <div class="card-content black-text scrollbar">
        <span class="card-title">{{ `Language` | localize }} {{ `:` }}</span>

        <div class="input-field" id="scrollbar-style">
          <select
            multiple
            class="page-title white-text"
            ref="select"
            v-model="current"
          >
            <option value="" disabled selected></option>

            <option
              v-for="(l, index) in allLanguages"
              :key="index"
              :value="l.id"
            >
              <div class="dropdown-setting-language-select">
                <div style="float: left" class="emoji">
                  &nbsp;&nbsp;{{ l.emoji }}
                </div>

                <div style="float: left">&nbsp;&nbsp;{{ l.title }}</div>
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
  name: 'setting-language-select',
  data: () => ({
    //select: null,
    current: [],
    title: [],

    emoji: '',
    currency: '',
    symbol: '',
    currencies: [],

    languages: [],
    allLanguages: [],
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    })
    M.updateTextFields()
  },
  computed: {
    ...mapGetters({
      getLanguageNatives: 'getLanguageNatives',
      getAllLanguageNatives: 'getAllLanguageNatives',
      getLanguageIds: 'getLanguageIds',
      // getSelectLanguageNatives: 'getSelectLanguageNatives'
    }),
    selected() {
      return store.state.countries.countries
    },
  },
  methods: {
    ...mapMutations({
      setLanguageNatives: 'setLanguageNatives',
      setLanguageIds: 'setLanguageIds',
      setSelectedCountries: 'setSelectedCountries',
    }),
    ...mapGetters({}),
    /* dev */
    emitSelect(selected, current) {
      const options = { selected: selected, current: current }
      EventBus.$emit('submitSelect', options)
    },
    selectLanguages() {
      this.languages = this.getLanguageNatives
      this.allLanguages = this.getAllLanguageNatives

      for (let i = 0; i < this.allLanguages.length; i++)
        this.allLanguages[i].selected = false

      for (let i = 0; i < this.languages.length; i++) {
        const key = this.languages[i].key
        const index = this.allLanguages.findIndex((l) => l.key === key)
        this.allLanguages[index].selected = true
      }

      for (let i = 0; i < this.allLanguages.length; i++) {
        if (this.allLanguages[i].selected === true) {
          this.current[i] = this.allLanguages[i].id
          this.select = this.allLanguages[i].title
        }
      }
    },

    setup() {
      this.selectLanguages()
    },
  },
  watch: {
    current(languageIds) {
      console.log('languageIds-->', languageIds)

      const selected = languageIds.map((i) => {
        const result = this.allLanguages.find((l) => l.id === i).key
        return result
      })
      this.setSelectedCountries(selected)
      this.emitSelect(selected, this.current)

      /* dev */
      //this.selectLanguages()

      //this.select = selected
    },

    /* selected(value) {
      this.current = this.getLanguageIds
      this.select = value
    } */
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
#scrollbar-style ::-webkit-scrollbar-track {
  width: 84px;

  border: solid 2px #555;
  border-radius: 0.1em;
  background-color: #dbebee;
}

#scrollbar-style ::-webkit-scrollbar-thumb {
  background-color: #555; /* #68cce2; */
  border: solid 2px #888; /* #00b9e3; */
  border-radius: 0.1em;
  box-shadow: 4px 4px 4px #555;
}

#scrollbar-style ::-webkit-scrollbar {
  width: 84px;
  background-color: #bbb; /* #dbebee; */
}

/* Buttons */
#scrollbar-style ::-webkit-scrollbar-button:single-button {
  background-color: #bbb;
  display: block;
  border-style: solid;
  height: 42px;
  width: 84px;
}
/* Up */
#scrollbar-style ::-webkit-scrollbar-button:single-button:vertical:decrement {
  border-width: 0 42px 42px 42px;
  border-color: transparent transparent #555 transparent;
}

#scrollbar-style
  ::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
  border-color: transparent transparent #777 transparent;
}
/* Down */
#scrollbar-style ::-webkit-scrollbar-button:single-button:vertical:increment {
  border-width: 42px 42px 0 42px;
  border-color: #555 transparent transparent transparent;
}

#scrollbar-style
  ::-webkit-scrollbar-button:vertical:single-button:increment:hover {
  border-color: #777 transparent transparent transparent;
}

/* &nbsp;&nbsp; */
/* font-family: 'RobotoMono-Medium'; */
.dropdown-setting-language-select {
  font-size: 24px;
  color: #000000;
  font-family: 'RobotoMono-Medium';
}

/* -language-select */
</style>
