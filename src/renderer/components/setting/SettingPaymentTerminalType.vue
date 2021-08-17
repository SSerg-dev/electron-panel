<template>
  <div class="col s6">
    <div class="card grey lighten-3" style="height: 160px; border: solid 3px #00B9E3; border-radius: 2rem;">
      <div class="card-content black-text">
        <span class="card-title">Тип терминала:</span>
        <div class="input-field">
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(t, index) in types" :key="index" :value="t.id">
              <div class="dropdown-setting">
              {{ t.title }}
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
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'setting-terminal-type',
  data: () => ({
    select: null,
    current: null,
    title: '',

    types: [
      { id: 1, title: 'ЯРУС К2100' },
      { id: 2, title: 'VENDOTEK' },
      { id: 3, title: 'INGENICO' },
      { id: 4, title: 'PAX' },
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
      getDefaultTerminalType: 'getDefaultTerminalType',
    })

  },
  watch: {
    current(typeId) {
      const { id, title } = this.types.find(t => t.id === typeId)
      this.select = title
    }
  },

  created() {
    const defaultTerminalType = this.getDefaultTerminalType().toUpperCase()
    const index = this.types.findIndex(t => t.title === defaultTerminalType)

    const { id, title } = this.types[index]
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
