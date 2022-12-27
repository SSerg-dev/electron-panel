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
              <div class="dropdown-setting">
                {{ `${n.title}` | localize }}
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

  props: ['changeItemIds', 'degreasingProgram'],

  data: () => ({
    select: null,
    current: null,
    title: '',

    index: -1,

    items: [
      // { id: 1, title: `DISK` },
      // { id: 2, title: `MOSQUITO` },
      // { id: 3, title: `SHAMPOO` },
      // { id: 4, title: `GLASS_WASHING_LIQUID` },
      { id: 1, title: `GLASS_WASHING_LIQUID` },
    ],
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    })
    M.updateTextFields()
  },
  methods: {
    ...mapGetters({
      getChangeProgram: 'getChangeProgram',
    }),
    ...mapMutations({
      setChangeProgram: 'setChangeProgram',
    }),
  },
  computed: {
    ...mapGetters({
    }),
  },
  watch: {
    current(itemId) {
      const { id, title } = this.items.find((n) => n.id === itemId)
      this.select = title
      this.setChangeProgram(id)
    },
  },
  created() {
    this.index = this.getChangeProgram() - 1

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
