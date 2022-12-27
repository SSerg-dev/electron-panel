<template>
  <div>
    <div
      class="card grey lighten-3"
      style="
        height: 80px;
        width: 72%;
        border: solid 3px #00b9e3;
        border-top-right-radius: 2em;
        border-bottom-right-radius: 2em;
        margin-left: 7.5em;
        border-left-style: hidden;
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
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'setting-panel-item',

  props: ['assignItemIds', 'degreasingProgram'],

  data: () => ({
    select: null,
    current: null,
    title: '',

    index: -1,
    items: [],
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    })
    M.updateTextFields()
  },
  methods: {
    ...mapGetters({
      getAssignProgramTo: 'getAssignProgramTo',
      getAssignItems: 'getAssignItems'
    }),
    ...mapMutations({
      setAssignProgramTo: 'setAssignProgramTo',
    }),
  },
  computed: {
    ...mapGetters({}),
  },
  watch: {
    current(itemId) {
      const { id, title } = this.items.find((n) => n.id === itemId)
      this.select = title
      this.setAssignProgramTo(id)
    },
  },
  created() {
    this.items = this.getAssignItems()

    this.index = this.getAssignProgramTo() - 1

    if (this.items[this.index]) {
      const { id, title } = this.items[this.index]
      this.current = id
      this.select = title
    }

    /* let selected = []

    if (this.assignItemIds !== undefined) {
      selected = this.assignItemIds.map(id => {
        const result = this.items.filter(item => item.id === id)
        return result[0]
      })
    }

    this.items = selected

    if (this.items[0]) {
      const { id, title } = this.items[0]
      this.current = id
      this.select = title
    } */
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
