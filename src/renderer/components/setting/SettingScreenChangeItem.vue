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
      <div class="card-content black-text">
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

export default Vue.extend({
  name: 'setting-panel-item',

  // props: ['changeItemIds', 'degreasingProgram'],
  props: ['changeProgramId'],

  data: () => ({
    select: null,
    current: null,
    title: '',

    index: -1,

    items: [
      { id: 1, title: `GLASS_WASHING_LIQUID` },
      { id: 2, title: `DISK` },
      { id: 3, title: `MOSQUITO` },
      { id: 4, title: `SHAMPOO` },
    ],
    selectedItems: [],
  }),
  mounted() {
    this.selectedItems = [...this.items]
    // console.log('$$ SettingScreenCangeItem.vue: 58', this.changeProgramId)
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    })
    M.updateTextFields()
  },
  methods: {
    ...mapGetters({
      getChangeProgram: 'getChangeProgram',
      getChangeProgram2: 'getChangeProgram2',
    }),
    ...mapMutations({
      setChangeProgram: 'setChangeProgram',
      setChangeProgram2: 'setChangeProgram2',
    }),
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
    switch (this.changeProgramId) {
      case 1:
        this.index = this.getChangeProgram() - 1
        break
      case 2:
        this.index = this.getChangeProgram2() - 1
        break
      default:
        break
    }
    if (this.items[this.index]) {
      const { id, title } = this.items[this.index]
      this.current = id
      this.select = title
    }
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
