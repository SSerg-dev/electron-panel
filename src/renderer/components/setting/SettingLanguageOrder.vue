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
        <!-- <span class="card-title">{{ `Language` | localize }} {{ `:` }}</span> -->

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
              <!-- {{ item.id }} -->
              {{ item.emoji }}
              {{ item.title }}
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

    languages: [],

    items: [],
    over: {},
    startLoc: 0,
    dragging: false,
    dragFrom: {},

    heightCard: 0,

    // itemSelectedLanguage: {
    //   id: 0,
    //   country: '',
    //   locale: '',
    //   order: -1,
    //   isSelected: true,
    // },
    itemsOrderLanguage: [],

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

      this.setOrder(item, pos)
    },

    setup() {
      this.initLanguage()

      this.initSelectedLanguage()
      // this.heightCard = 30;
    },
    submitHandler(options) {},

    initLanguage() {
      const defaultLanguage = this.getDefaultLanguage().toUpperCase()
      this.languages = this.getLanguageNatives()
      this.items = this.languages

      const index = this.languages.findIndex((l) => l.key === defaultLanguage)

      const { id, title, key, emoji, currency, symbol } = this.languages[index]
      this.current = id || 0
      this.select = title
      this.emoji = emoji
      this.currency = currency
      this.symbol = symbol
    },

    initSelectedLanguage() {
      this.config = this.getConfig()
      this.itemsOrderLanguage = this.config.languages.panel

      // console.log('$$ SettingLanguageOrder.vue: 146', JSON.stringify(this.itemsOrderLanguage))
    },

    setOrder(item, order) {
      console.log('$$ SettingLanguageOrder.vue: 151', item.key, +order)
      if (this.itemsOrderLanguage) {
        const index = this.itemsOrderLanguage.findIndex(
          (l) => l.country === item.key
        )

        // const prevIndex = this.itemsOrderLanguage.findIndex(
        //   (o) => o.order === order
        // )

        this.itemsOrderLanguage[index].order = order

        this.config.languages.panel = this.itemsOrderLanguage

        this.setConfig(this.config)

        const orderLang = this.getConfig().languages.panel[index]
        console.log(
          '$$ SettingLanguageOrder.vue: 161',
          orderLang.country,
          orderLang.order
        )
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
  height: 3.2em;
  padding: 0.8em;
  font-size: 2em;
  margin: 10px auto 10px 10px;
  margin-left: 0px;
  /* background: #b3e5fc; */
  background: #edf5f8;
  color: black;

  /* box-shadow: 6px 6px 6px #00b9e3, -1px 1px 1px #fff; */
  box-shadow: 6px 6px 6px #757575, -1px 1px 1px #fff;

  border: solid 1px;
  border-radius: 5px;
  border-color: #757575; /* #00b9e3; */
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
