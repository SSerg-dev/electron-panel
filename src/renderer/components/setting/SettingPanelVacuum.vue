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
          >{{ `Vacuum_number` | localize }} {{ `:` }}</span
        >
        <div class="input-field">
          <div>
            <select
              class="page-title white-text"
              ref="select"
              v-model="current"
            >
              <option v-for="(v, index) in vacuums" :key="index" :value="v.id">
                <div class="dropdown-setting">
                  {{ `${v.title}` | localize }}
                  {{ `#` | localize }}
                  {{ `${index + 1}` }}
                </div>
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'setting-panel-vacuum',
  data: () => ({
    select: null,
    current: null,
    title: '',
    vacuums: [
      /* { id: 1, title: 'ПЫЛЕСОС №1' },
      { id: 2, title: 'ПЫЛЕСОС №2' } */
      { id: 1, title: `VACUUM` },
      { id: 2, title: `VACUUM` },
    ],
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    })
    M.updateTextFields()
  },
  methods: {
    ...mapMutations({
      setVacuum: 'setVacuum',
    }),
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
    }),
  },
  watch: {
    current(vacuumId) {
      // console.log('vacuumId-->', vacuumId)
      const { id, title } = this.vacuums.find((v) => v.id === vacuumId)
      this.select = title

      this.setVacuum(id)
    },
  },
  created() {
    const defaultPanelVacuum = 1
    const { id, title } = this.vacuums[defaultPanelVacuum - 1]
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
