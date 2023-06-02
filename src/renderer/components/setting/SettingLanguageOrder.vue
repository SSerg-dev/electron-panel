<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="
        height: 150px;
        border: solid 3px #00b9e3;
        border-top-left-radius: 2rem;
        border-bottom-left-radius: 2rem;
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
      "
    >
      <div class="card-content black-text list">
        <span class="card-title">{{ `Language` | localize }} {{ `:` }}</span>

        <div>
          <transition-group name="flip-list" tag="div">
            <option
              @dragover="(e) => onDragOver(item, i, e)"
              @dragend="(e) => finishDrag(item, i, e)"
              @dragstart="(e) => startDrag(item, i, e)"
              v-for="(item, i) in items"
              class="item"
              :class="{
                over: item === over.item && item !== dragFrom,
                [over.dir]: item === over.item && item !== dragFrom,
              }"
              draggable="true"
              :key="item.id"
            >
              {{ item.id }}
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
  name: 'setting-payment-language',
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
  }),
  mounted() {
    EventBus.$on('submitSelect', this.submitHandler)

    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    })
    M.updateTextFields()
  },
  methods: {
    startDrag(item, i, e) {
      this.startLoc = e.clientY
      this.dragging = true
      this.dragFrom = item
      console.log(this.dragFrom)
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

    setup() {
      this.initLanguage()
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
    ...mapGetters({
      getDefaultLanguage: 'getDefaultLanguage',
      getSysPanelLanguage: 'getSysPanelLanguage',
      getSelectedCountries: 'getSelectedCountries',

      getLanguageNatives: 'getLanguageNatives',
      getAllLanguageNatives: 'getAllLanguageNatives',
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
  width: 985px;
  height: 84px;
  padding: 24px;
  font-size: 2em;
  margin: 10px auto 10px 10px;
  margin-left: 0px;
  background: #b3e5fc;
  color: black;

  box-shadow: 6px 6px 6px #00b9e3, -1px 1px 1px #fff;

  border: solid 3px;
  border-radius: 5px;
  border-color: #00b9e3;
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

