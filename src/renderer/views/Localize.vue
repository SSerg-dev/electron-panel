<template>
  <div>
    <div class="page-title">
      <h3>
        <p align="center">{{ 'LanguageTitle' | localize }}</p>
      </h3>
    </div>

    <div class="back">
      <router-link to="/">
        <div class="card white small-button waves-effect">
          <div class="card-content- black-text small-button-title">
            <img style="width: 65%" src="@/assets/imgs/native/undo.png" />
          </div>
        </div>
      </router-link>
    </div>

    <div class="list">
      <div :key="page">
        <LocalizeList :localizes="items" />
      </div>
    </div>

    <div
      v-if="getPanelType !== 'vacuum'"
      class="paginate"
      style="padding-left: 8em"
    >
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import paginationMixin from '@/mixins/pagination.mixin'
import { mapGetters, mapActions, mapMutations } from 'vuex'

import LocalizeList from '@/components/LocalizeList'

export default Vue.extend({
  name: 'localize',
  mixins: [paginationMixin],
  data: () => ({
    locale: '',

    // ------------------------------------
    localizes: [],

    languages: [],
    orderLanguageItems: [],
    selectedLanguages: [],
    selectedItems: [],
  }),
  // ------------------------------------
  created() {
    this.setup()
    this.setupPagination(this.localizes)
  },
  mounted() {},
  computed: {
    ...mapGetters({
      getRouter: 'getRouter',
      getPanelType: 'getPanelType',
    }),
  },
  watch: {
    items(value) {
      // console.log('$$ Localize.vue: 80', JSON.stringify(value) )
    },
    page(value) {
      // console.log('$$ Localize.vue: 83', value )
    },
  },

  methods: {
    ...mapGetters({
      getLanguageNatives: 'getLanguageNatives',
      getConfig: 'getConfig',
    }),
    ...mapMutations({}),

    pushRouter() {
      this.$router.push(this.getRouter)
    },
    // ----------------------------------
    setup() {
      // data from countries.js
      this.languages = this.initLanguage()

      // data from settings-current.json
      this.selectedLanguages = this.getSelectedLanguages()

      // add emoje and title to data
      this.selectedItems = this.getSelectedItems()

      // sort by order
      this.localizes = this.sortByOrder(this.selectedItems)

      // console.log('$$ Localize.vue: 113', JSON.stringify(this.items))
    },
    // ----------------------------------
    initLanguage() {
      return this.getLanguageNatives()
    },
    // ----------------------------------
    getSelectedLanguages() {
      this.config = this.getConfig()
      this.orderLanguageItems = this.config.languages.panel
      const countries = this.config.countries

      let result = []

      countries.forEach((country) => {
        const language = this.orderLanguageItems.filter(
          (l) => country === l.country
        )
        if (language) {
          result.push(language[0])
        }
      })
      return result
    },
    // ----------------------------------
    getSelectedItems() {
      const result = this.selectedLanguages.map((s, index) => {
        Object.values(this.languages[index]).forEach((l) => {
          const { emoji, title } = this.languages.find(
            (l) => l.key === s.country
          )
          this.selectedLanguages[index].emoji = emoji
          this.selectedLanguages[index].title = title
        })

        return this.selectedLanguages[index]
      })
      return result
    },
    // ----------------------------------
    sortByOrder(array) {
      return array.sort(
        (a, b) => (a.order > b.order ? 1 : b.order > a.order ? -1 : 0) // lower to upper
      )
    },
    // ----------------------------------
  },
  components: {
    LocalizeList,
  },
})
</script>

<style scoped>
.page-title {
  padding-top: 6em;
  color: white;
  margin-right: 2em;
}
.back {
  position: fixed;
  top: 11em;
  left: 2.5em;
  z-index: 99;
}

.small-button {
  width: 125px;
  height: 120px;
  border: solid 6px #00b9e3;
  border-radius: 2.5em;
  box-shadow: 0px 6px 10px #00b9e3;
}
.small-button-title {
  padding-top: 1em;

  display: flex;
  align-items: center;
  justify-content: center;
}

.paginate {
  font-size: 1em;
  width: 100%;

  position: absolute; /*  absolute; relative;*/
  /* left: 16em; */
  left: calc(1 * 18em);
  bottom: 10em;

  background: #121212;

  font-family: 'Roboto-Medium';
  font-weight: bold;
}
.list {
  position: fixed;
  top: 20em;
  left: -1em;
  width: 100%;
  /* height: 60%; */

  color: white;
}
</style>
