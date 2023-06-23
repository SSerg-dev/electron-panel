<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="
        height: calc(0);
        border: solid 3px #00b9e3;
        border-top-left-radius: 2em;
        border-bottom-left-radius: 2em;
        border-top-right-radius: 2em;
        border-bottom-right-radius: 2em;
      "
    >
      <div class="card-content black-text list">
        <div>
          <transition-group name="flip-list" tag="div">
            <option
              @dragover="(e) => onDragOver(item, i, e)"
              @dragend="(e) => finishDrag(item, i, e)"
              @dragstart="(e) => startDrag(item, i, e)"
              @click="(e) => onClick(item, i, e)"
              v-for="(item, i) in items"
              class="item"
              :class="{
                over: item === over.item && item !== dragFrom,
                [over.dir]: item === over.item && item !== dragFrom,
              }"
              draggable="true"
              :key="item.id"
            >
              <!-- {{ item.order }}
              &nbsp; -->

            <div style="float: left" class="emoji">{{ item.emoji }}</div>  
            <div style="float: left">&nbsp;{{ item.title }}</div>
            <!-- <div style="float: left">&nbsp;{{ item.country }}</div>   -->
              
            </option>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import EventBus from '@/bus/EventBus'
import { title } from 'process'

export default Vue.extend({
  name: 'setting-language-order',
  data: () => ({
    select: null,
    current: null,
    title: '',

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

    config: {},
  }),
  mounted() {
    EventBus.$on('submitSelect', this.submitHandler)

    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    })
    M.updateTextFields()
  },
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
    onClick(item, pos, e) {
      let prevPos

      pos > 0 ? (prevPos = pos - 1) : (prevPos = 0)

      this.items.splice(pos, 1)
      this.items.splice(prevPos, 0, item)
      this.over = {}

      this.setOrderItems(item, pos)
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

    submitHandler(options) {},

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
  },
  watch: {
    current(languageId) {
      const { id, title, key, emoji, currency, symbol } = this.languages.find(
        (l) => l.id === languageId
      )
      this.select = title

      this.setSysPanelLanguage(key)
      this.setDefaultLanguage(key)
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
.list > div {
  display: flex;
  flex-direction: column;
}

.item {
  width: 34em;
  height: 2.6em;
  padding: 0.8em;
  font-size: 2em;
  margin: 10px auto 10px 10px;
  margin-left: 0px;
  background: #edf5f8;
  color: black;

  box-shadow: 6px 6px 6px #757575, -1px 1px 1px #fff;
  border: solid 1px;
  border-radius: 5px;
  border-color: #757575;
  display: inline-block;
}

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
</style>
