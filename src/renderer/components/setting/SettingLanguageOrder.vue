<template>
  <!-- <div class="col s6"> -->
  <div>
    <div
      class="card grey lighten-3"
      style="
        height: calc(76em);
        border: solid 3px #00b9e3;
        border-top-left-radius: 2em;
        border-bottom-left-radius: 2em;
        border-top-right-radius: 2em;
        border-bottom-right-radius: 2em;
      "
    >
      <div class="row card-content black-text list">
        <!--  -->
        <div class="col s1 default">
          <transition-group name="flip-list" tag="div">
            <div
              @click="(e) => onClickDefault(item)"
              v-for="(item, index) in items"
              class="default-item"
              :key="item.id"
              :index="index"
              :locale="item.locale"
            >
              <div align="center">
                <label>
                  <div>
                    <input
                      type="radio"
                      name="locale"
                      value="index"
                      id="input"
                    />
                    <span></span>
                  </div>
                </label>
              </div>
            </div>
          </transition-group>
        </div>

        <div class="col s11 order">
          <transition-group name="flip-list" tag="div">
            <option
              @dragover="(e) => onDragOver(item, i, e)"
              @dragend="(e) => finishDrag(item, i, e)"
              @dragstart="(e) => startDrag(item, i, e)"
              @click="(e) => onClickOrder(item, i, e)"
              v-for="(item, i) in items"
              class="order-item"
              :class="{
                over: item === over.item && item !== dragFrom,
                [over.dir]: item === over.item && item !== dragFrom,
              }"
              draggable="true"
              :key="item.id"
              :index="i"
            >
              <!-- {{ item.order }} -->
              <div style="float: left" class="emoji">{{ item.emoji }}</div>
              <div style="float: left">&nbsp;{{ item.title }}</div>
            </option>
          </transition-group>
        </div>
      </div>
    </div>
    <!--  -->
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
    <!--  -->
  </div>
</template>

<script>
import Vue from 'vue'
import paginationMixin from '@/mixins/pagination.mixin'

import { mapGetters, mapMutations } from 'vuex'
import EventBus from '@/bus/EventBus'
import { title } from 'process'

export default Vue.extend({
  name: 'setting-language-order',
  mixins: [paginationMixin],
  data: () => ({
    select: null,
    current: null,
    title: '',
    selectIndex: -1,
    prevSelectIndex: -1,
    radioButtons: null,

    emoji: '',
    currency: '',
    symbol: '',
    currencies: [],

    items: [],
    over: {},
    startLoc: 0,
    dragging: false,
    dragFrom: {},

    heightCard: 0,

    languages: [],
    orderLanguageItems: [],
    selectedLanguages: [],
    selectedItems: [],
    locale: '',

    config: {},
  }),

  methods: {
    ...mapMutations({
      setConfig: 'setConfig',
    }),
    startDrag(item, i, e) {
      this.startLoc = e.clientY
      this.dragging = true
      this.dragFrom = item
    },
    finishDrag(item, pos) {
      this.items.splice(pos, 1)
      this.items.splice(this.over.pos, 0, item)
      this.over = {}
    },

    onDragOver(item, pos, e) {
      const dir = this.startLoc < e.clientY ? 'down' : 'up'
      setTimeout(() => {
        this.over = { item, pos, dir }
      }, 50)
    },
    onClickOrder(item, pos, e) {
      let prevPos

      pos > 0 ? (prevPos = pos - 1) : (prevPos = 0)

      this.items.splice(pos, 1)
      this.items.splice(prevPos, 0, item)
      this.over = {}

      this.setOrderItems(item, pos)
    },
    onClickDefault(item) {
      this.setDefaultLanguage(item.locale)
    },

    setup() {
      // data from countries.js
      this.languages = this.initLanguage()

      // data from settings-current.json
      this.selectedLanguages = this.getSelectedLanguages()

      // add emoje and title to data
      this.selectedItems = this.getSelectedItems()

      // sort by order
      this.items = this.sortByOrder(this.selectedItems)
    },

    initLanguage() {
      return this.getLanguageNatives()
    },

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

    sortByOrder(array) {
      return array.sort(
        (a, b) => (a.order > b.order ? 1 : b.order > a.order ? -1 : 0) // lower to upper
        // (a, b) => (b.order > a.order ? 1 : a.order > b.order ? -1 : 0) // upper to lower
      )
    },

    setOrderItems(item, order) {
      let index
      if (this.orderLanguageItems) {
        index = this.orderLanguageItems.findIndex(
          (l) => l.country === item.country
        )

        // 01 arrayBefore
        let arrayBefore
        if (order !== 0) {
          arrayBefore = this.items.slice(0, order - 1)
        } else {
          arrayBefore = []
        }
        // 02 arrayCurrent
        const arrayCurrent = this.items[order - 1] || this.items[0]

        // 03 arrayAfter
        let arrayAfter
        if (order === 0) {
          arrayAfter = this.items.slice(order + 1)
        } else {
          arrayAfter = this.items.slice(order)
        }

        this.calcOrder(arrayBefore, arrayCurrent, arrayAfter)

        this.config.languages.panel = this.orderLanguageItems
        this.setConfig(this.config)
      }
    },

    calcOrder(arrayBefore, arrayCurrent, arrayAfter) {
      let newOrder
      newOrder = 100
      this.setOrderItem(arrayCurrent, newOrder)

      newOrder = 100
      for (const item of arrayBefore.reverse()) {
        newOrder--
        this.setOrderItem(item, newOrder)
      }
      newOrder = 100
      for (const item of arrayAfter) {
        newOrder++
        this.setOrderItem(item, newOrder)
      }
    },
    setOrderItem(item, newOrder = 100) {
      if (this.orderLanguageItems) {
        this.orderLanguageItems.forEach((languageItem, index) => {
          Object.values(languageItem).forEach((value) => {
            if (value === item.country) {
              this.orderLanguageItems[index].order = newOrder
            }
          })
        })
      }
    },

    ...mapGetters({
      getDefaultLanguage: 'getDefaultLanguage',
      getSysPanelLanguage: 'getSysPanelLanguage',
      getSelectedCountries: 'getSelectedCountries',

      getLanguageNatives: 'getLanguageNatives',
      getAllLanguageNatives: 'getAllLanguageNatives',

      getConfig: 'getConfig',
    }),
    ...mapMutations({
      setLanguageItem: 'setLanguageItem',
      setSysPanelLanguage: 'setSysPanelLanguage',
      setDefaultLanguage: 'setDefaultLanguage',
    }),
    changeDefaultLocale() {
      this.locale = this.getDefaultLanguage()
      this.selectIndex = this.items.findIndex(
        (item) => item.locale === this.locale
      )
      this.radioButtons = document.querySelectorAll('input[name="locale"]')

      if (this.selectIndex > -1) {
        this.radioButtons[this.selectIndex].checked = true
      }
    },
    changeOnPagination(value) {
      this.selectIndex = this.prevSelectIndex
      this.radioButtons = document.querySelectorAll('input[name="locale"]')

      if (this.selectIndex > -1) {
        this.radioButtons[this.selectIndex].checked = true

        console.log(
          '$$ SettingLanguageOrder.vue: 317',
          value,
          this.radioButtons[this.selectIndex].checked
        )
      }
    },
  }, // end methods

  watch: {
    page(value) {
      this.changeOnPagination(value)
    },
  },
  created() {
    this.setup()
    this.setupPagination(this.items)
  },
  mounted() {
    this.changeDefaultLocale()
    this.prevSelectIndex = this.selectIndex
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
    }),
  },
  beforeDestroy() {},
})
</script>

<style scoped>
.order {
  /* background: yellowgreen; */
  width: 80%;
}
.default {
  /* background: sandybrown; */
  width: 20%;
}

.list > div {
  display: flex;
  flex-direction: column;
}

.order-item {
  font-family: 'RobotoMono-Medium';

  /* width: 34em; */
  width: 31em;
  height: 2.6em;
  padding-top: 0.5em;
  padding-left: 1em;
  font-size: 2em;
  margin: 2px auto 10px 10px;
  margin-left: 0.2em;
  background: #edf5f8;
  color: black;

  box-shadow: 6px 6px 6px #757575, -1px 1px 1px #fff;
  border: solid 1px;
  border-radius: 5px;
  border-color: #757575;
  display: inline-block;
}

.default-item {
  font-family: 'RobotoMono-Medium';

  /* width: 34em; */
  width: 2.6em;
  height: 2.6em;
  padding-top: 0.5em;
  /* padding-left: 0em; */
  font-size: 2em;
  margin: 2px auto 10px 10px;
  margin-left: -0.2em;
  background: #edf5f8;
  /* background: blue; */
  color: black;

  box-shadow: 6px 6px 6px #757575, -1px 1px 1px #fff;
  border: solid 1px;
  border-radius: 5px;
  border-color: #757575;
  display: inline-block;
}
/* label {
  -webkit-transform: scale(1.5); 
  transform: scale(1.5);
} */

.flip-list-move {
  transition: transform 0.2s;
}

.over {
  opacity: 0.6;
}

.down {
}

.up {
}

[type='radio'] + span:before,
[type='radio'] + span:after {
  border: solid 1px #00b9e3;
  content: '';
  position: absolute;
  left: 0.5em;
  top: 0.6em;
  margin: 4px;
  width: 16px;
  height: 16px;
  z-index: 0;
  transition: 0.28s ease;

  -webkit-transform: scale(2.5);
  transform: scale(2.5);
}

/* ---- */

[type='radio']:checked + span[data-v-51e9a26a]:after,
[type='radio'].with-gap:checked + span[data-v-51e9a26a]:after {
  background-color: #00b9e3;
}

/* [type='radio']:checked + span[data-v-51e9a26a]:after,
[type='radio'].with-gap:checked + span[data-v-51e9a26a]:after {
  background-color: #edf5f8;
} */
/* ---- */

/*  */
.paginate {
  font-size: 1em;
  width: 100%;

  position: absolute; /*  absolute; relative;*/
  left: calc(1 * 18em);
  bottom: 14em;

  background: #121212;

  font-family: 'Roboto-Medium';
  font-weight: bold;
}
</style>
