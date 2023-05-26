<template>
  <div>
    <div
      class="card grey lighten-3"
      style="
        height: 80px;

        border: solid 3px #00b9e3;
        border-radius: 0em;
        margin-left: 7.5em;
        border-left-style: hidden;
        border-right-style: hidden;
      "
    >
      <div :key="this.keys.keyProgram" class="card-content black-text">
        <div class="input-field" style="margin-top: -0.5em">
          
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(n, index) in items" :key="index" :value="n.id">
              <div
                v-if="index === changeProgramId - 1"
                class="dropdown-setting"
              >
                {{ `${items[changeProgramId - 1].title}` | localize }}
              </div>
            </option>
          </select>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { stringify } from 'querystring'
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import sleep from '@/utils/sleep'

export default Vue.extend({
  name: 'setting-panel-item',
  props: ['changeProgramId'],

  data: () => ({
    select: null,
    current: null,
    titles: [],
    sleepMs: 200,

    index: -1,

    keys: {
      keyProgram: 1,
    },

    items: [
      { id: 1, title: `GLASS_WASHING_LIQUID` },
      { id: 2, title: `DISK` },
      { id: 3, title: `MOSQUITO` },
      { id: 4, title: `SHAMPOO` },
    ],
    selectedItems: [],
  }),

  methods: {
    ...mapGetters({
      getChangeProgram: 'getChangeProgram',
      getChangeProgram2: 'getChangeProgram2',
    }),

    ...mapMutations({
      setChangeProgram: 'setChangeProgram',
      setChangeProgram2: 'setChangeProgram2',
    }),

    setup() {
      switch (this.changeProgramId) {
        case 1:
          this.index = this.getChangeProgram() - 1
          this.current = this.changeProgramId
          break
        case 2:
          this.index = this.getChangeProgram2() - 1
          this.current = this.changeProgramId
          break
        default:
          break
      }

      if (this.items[this.index]) {
        const { id, title } = this.items[this.index]
        // this.current = id
        // this.titles[id - 1] = title
      }
      // console.log('$$ title:92', this.titles)
    },

    init() {
      this.select = M.FormSelect.init(this.$refs.select, {
        constrainWidth: true,
      })
      M.updateTextFields()
    },
    setKeys() {
      this.keys = Object.fromEntries(
        Object.entries(this.keys).map(([key, value], index) => [
          key,
          (index + 1) * 10,
        ])
      )
    },
  },
  computed: {
    ...mapGetters({}),
  },
  watch: {
    current(itemId) {
      const { id, title } = this.items.find((n) => n.id === itemId)
      this.select = title

      // TODO change source program
      /* 
      switch (this.changeProgramId) {
        case 1:
          this.setChangeProgram(id)
          break
        case 2:
          this.setChangeProgram2(id)
          break
        default:
          break
      } 
      */
    },
  },

  created() {
    this.setup()
  },
  mounted() {
    this.selectedItems = [...this.items]

    sleep(this.sleepMs).then(() => {
      this.init()
    })
    this.setKeys()
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
})
</script>

<style scoped>
.input-field {
  margin-left: 0em;
  margin-top: 0em;
}
</style>
