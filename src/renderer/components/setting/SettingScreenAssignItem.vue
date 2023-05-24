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

  // props: ['assignItemIds', 'degreasingProgram'],
  props: ['changeProgramId'],

  data: () => ({
    select: null,
    current: null,
    title: '',

    index: -1,
    items: [],
  }),
  mounted() {
    // console.log('$$ SettingScreenAssignItem.vue: 49', this.changeProgramId)
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    })
    M.updateTextFields()
  },
  methods: {
    ...mapGetters({
      getAssignProgramTo: 'getAssignProgramTo',
      getAssignProgramTo2: 'getAssignProgramTo2',

      getAssignItems: 'getAssignItems',
    }),
    ...mapMutations({
      setAssignProgramTo: 'setAssignProgramTo',
      setAssignProgramTo2: 'setAssignProgramTo2',
    }),
  },
  computed: {
    ...mapGetters({}),
  },
  watch: {
    current(itemId) {
      const { id, title } = this.items.find((n) => n.id === itemId)
      this.select = title

      switch (this.changeProgramId) {
        case 1:
          this.setAssignProgramTo(id)
          break
        case 2:
          this.setAssignProgramTo2(id)
          break
        default:
          break
      }
    },
  },
  created() {
    this.items = this.getAssignItems()

    switch (this.changeProgramId) {
      case 1:
        this.index = this.getAssignProgramTo() - 1
        break
      case 2:
        this.index = this.getAssignProgramTo2() - 1
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
