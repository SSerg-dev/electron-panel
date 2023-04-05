<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="
        height: 150px;
        border: solid 3px #00b9e3;

        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
        border-left-style: hidden;
      "
    >
      <div class="card-content black-text">
        <span class="card-title"
          >{{ `Panel_number` | localize }} {{ `:` }}</span
        >
        <div class="input-field">
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(n, index) in numbers" :key="index" :value="n.id">
              <div class="dropdown-setting">
                {{ `${n.title}` | localize }}
                {{`#` | localize}}
                {{ `${index + 1}` }}
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
  name: 'setting-panel-number',
  data: () => ({
    select: null,
    current: null,
    title: '',

    numbers: [
      { id: 1, title: `PANEL` },
      { id: 2, title: `PANEL` },
      { id: 3, title: `PANEL` },
      { id: 4, title: `PANEL` },
      { id: 5, title: `PANEL` },
      { id: 6, title: `PANEL` },
      { id: 7, title: `PANEL` }
    ],
    /* payments: [
      { id: 1, title: 'ПОСТ ОПЛАТЫ №1' },
      { id: 2, title: 'ПОСТ ОПЛАТЫ №2' }
    ] */
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    })
    M.updateTextFields()
    // console.log('++this.select-->', this.select)
  },
  methods: {
    ...mapGetters({
      getPanelNumber: 'getPanelNumber',
    }),
    ...mapMutations({
      setPanelNumber: 'setPanelNumber',
    }),
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
    }),
  },
  watch: {
    current(numberId) {
      //console.log('numberId-->', numberId)
      const { id, title } = this.numbers.find((n) => n.id === numberId)
      this.select = title
      this.setPanelNumber(id)
    },
  },
  created() {
    const defaultPanelNumber = this.getPanelNumber()
    const { id, title } = this.numbers[defaultPanelNumber - 1]
    this.current = id
    this.select = title
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
})
</script>
