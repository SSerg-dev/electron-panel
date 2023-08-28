<template>
  <div class="row">
    <div
      class="card grey lighten-3"
      style="height: 80px; border: solid 3px #00b9e3; border-radius: 2rem"
    >
      <div class="row card-content black-text section-card">
        <span class="card-title" style="margin-left: 0.4em"
          >{{ `Model` | localize }} {{ `:` }}</span
        >

        <div class="input-field section-model">
          <select class="white-text" ref="select" v-model="current">
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

        <!-- <input type="checkbox" v-model="isTerminalInstalled" /> -->
        <div v-if="this.current === 2" class="col s4">
          <ul
            class="btn black-text inline"
            style="margin-left: 2em; margin-top: -0.2em"
          >
            <li class="switch">
              <label>
                <input type="checkbox" v-model="isSbp" />
                <span class="lever"></span>
              </label>
            </li>

            <li>
              {{ `Оплата через СБП` }}
            </li>
          </ul>
        </div>

        <!--  -->

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
    isSbp: false,

    types: [
      // { id: 1, title: 'ЯРУС К2100' },
      { id: 2, title: 'VENDOTEK' },
      // { id: 3, title: 'INGENICO' },
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
      getIsSbp: 'getIsSbp',
    }),
    ...mapMutations({
      setDefaultTerminalType: 'setDefaultTerminalType',
      setIsSbp: 'setIsSbp',
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
      this.setDefaultTerminalType(this.select)
    },
    isSbp(flag) {
      this.setIsSbp(flag) 
    },
  },

  created() {
    const defaultTerminalType = this.getDefaultTerminalType().toUpperCase()
    const index = this.types.findIndex((t) => t.title === defaultTerminalType)

    const { id, title } = this.types[index]
    this.current = id
    this.select = title

    this.isSbp = this.getIsSbp()
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
})
</script>

<style scoped>
.section-card {
  position: relative;
}
.section-model {
  position: absolute;
  top: 0;
  left: 12em;
  width: 28.4em;
}
.button-setting {
  position: absolute;
  padding-top: 4px;
  top: 1.2rem;
  left: 40.5rem;
  border: solid 1px white;
  font-size: 1.6em;
  border-radius: 0.5em;
  background-color: #00b9e3;
  width: 410px;
  height: 46px;
}

.inline {
  position: absolute;
  padding-top: 4px;
  top: 1.4rem;
  left: 38.8rem;
  border: solid 1px eee;
  font-size: 1.6em;
  font-weight: normal;
  border-radius: 0em;
  background-color: #eee;
  width: 410px;
  height: 42px;
}
.inline li {
  display: inline;
}

.switch label .lever {
  /* margin-right: 60px; */
  margin-bottom: 12px;
}
</style>
