<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="height: 150px; border: solid 3px #00B9E3; border-radius: 2rem;"
    >
      <div class="card-content black-text">
        <span class="card-title">Номер пылесоса:</span>
        <div class="input-field">

          <!-- v-if="this.getPanelType === 'vaccum'" -->
          <div >
            <!-- <div>{{ `${this.getPanelType}` }}</div> -->
            <select
              class="page-title white-text"
              ref="select"
              v-model="current"
            >
              <option v-for="(v, index) in vaccums" :key="index" :value="v.id">
                <div class="dropdown-setting">
                  {{ v.title }}
                </div>
              </option>
            </select>
          </div>

          <!-- dev -->

          
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'setting-panel-vaccum',
  data: () => ({
    select: null,
    current: null,
    title: '',
    vaccums: [
      { id: 1, title: 'ПЫЛЕСОС №1' },
      { id: 2, title: 'ПЫЛЕСОС №2' },
      { id: 3, title: 'ПЫЛЕСОС №3' }
    ]
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true
    })
    M.updateTextFields()
  },
  methods: {
    ...mapGetters({
      // getDefaultPanelNumber: 'getDefaultPanelNumber'
    }),
    ...mapMutations({
      // setDefaultPanelNumber: 'setDefaultPanelNumber'
      setVaccumNumber: 'setVaccumNumber'
    })
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType'
    })
  },
  watch: {
    current(vaccumId) {
      console.log('vaccumId-->', vaccumId)
      const { id, title } = this.vaccums.find(v => v.id === vaccumId)
      this.select = title

      this.setVaccumNumber(id)
    },
  },
  created() {
      const defaultPanelVaccum = 1
      const { id, title } = this.vaccums[defaultPanelVaccum - 1]
      this.current = id
      this.select = title
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }

  }
})
</script>
