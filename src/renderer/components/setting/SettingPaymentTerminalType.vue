<template>
  <div class="row">
    <div
      class="card grey lighten-3"
      style="height: 80px; border: solid 3px #00b9e3; border-radius: 2rem"
    >
      <div class="card-content black-text">
        <span class="card-title col s2" style="margin-top: -0em">{{`Model` | localize}} {{`:`}}</span>

        <div class="input-field col s5" style="margin-top: -0.5em">
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(t, index) in types" :key="index" :value="t.id">
              <div class="dropdown-setting">
                {{ t.title }}
              </div>
            </option>
          </select>
        </div>

        <div v-if="this.current === 1" class="col s4">
          <button
            class="btn waves-effect waves-light white-text button-setting"
            type="submit"
            @click="setService('menu')"
            style="margin-left: 1em; margin-top: -0.2em"
          >
            <div style="margin-top: -0.1em">
              {{ `Открыть меню Ярус К2100` }}
            </div>
          </button>
        </div>
        <div v-if="this.current === 4" class="col s4">
          <button
            class="btn waves-effect waves-light white-text button-setting"
            type="submit"
            @click="setService('pax')"
            style="margin-left: 1em; margin-top: -0.2em"
          >
            <div style="margin-top: -0.1em">
              {{ `Reconciliation_Pax` | localize }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
const EventEmitter = require('events')
const { ipcRenderer } = require('electron')

export default Vue.extend({
  name: 'setting-terminal-type',
  data: () => ({
    select: null,
    current: null,
    title: '',

    types: [
      /* { id: 1, title: 'ЯРУС К2100' }, */
      { id: 2, title: 'VENDOTEK' },
      /* { id: 3, title: 'INGENICO' }, */
      { id: 4, title: 'PAX' },
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
      getDefaultTerminalType: 'getDefaultTerminalType',
    }),
    ...mapMutations({
      setDefaultTerminalType: 'setDefaultTerminalType',
    }),
    setService(service) {
      switch (service) {
        case 'menu':
          // console.log('Открыть меню Ярус К2100')
          break
        case 'pax':
          const message = 'pax reconciliation'
          ipcRenderer.send('async-reconciliation-message', message)

          break
        default:
          break
      }
    },
  },
  watch: {
    current(typeId) {
      const { id, title } = this.types.find((t) => t.id === typeId)
      this.select = title
      // console.log('++current-->', this.current, this.select)
      this.setDefaultTerminalType(this.select)
    },
  },

  created() {
    const defaultTerminalType = this.getDefaultTerminalType().toUpperCase()
    const index = this.types.findIndex((t) => t.title === defaultTerminalType)

    const { id, title } = this.types[index]
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

<style scoped>
.button-setting {
  border: solid 1px white;
  font-size: 1.4em;
  border-radius: 2em;
  background-color: #00b9e3;
  width: 380px;
}
</style>
