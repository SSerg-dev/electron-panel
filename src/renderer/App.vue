<template>
  <div id="app" class="noselect">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

import { ipcRenderer } from 'electron'

export default Vue.extend({
  name: 'app',
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    ...mapGetters({
      getConfig: 'getConfig'
    })
  },
  components: {
    EmptyLayout,
    MainLayout
  },
  methods: {
    ...mapMutations({
      setConfig: 'setConfig'
    }),

    setup() {
      /*
       * Get global setings from settings.json in main (electron) process
       *
       */
      ipcRenderer.on('settings', (evt, data) => {
        try {
          data = JSON.parse(data)
          /* dev */
          //console.log('++data-->', JSON.stringify(data))
          this.setConfig(data)
        } catch (err) {
          console.warn('Error? while parse settings -', err)
        }
      })

      ipcRenderer.on('OPCUA', (evt, payload) => {
        try {
          const tag = JSON.parse(payload)
          const parameter = {
            id: Date.now(),
            title: tag.param,
            value: tag.value
          }

          /* dev 4prod */
          //if (parameter.title !== `::AsGlobalPV:DateTime.Time`) {
          const type = this.getPanelType()
          switch (type) {
            case 'wash':
              this.setParameters(parameter)
              break
            case 'vacuum':
              this.setDryParameters(parameter)
              break
            default:
              break
          }
          //}
        } catch (err) {
          console.warn('App.vue setup() error:', err)
        }
      })

      const self = this
      ipcRenderer.on('coin', (event, args) => {
        self.updateCoinBalance(args)
      })

      ipcRenderer.on('banknot', (event, args) => {
        self.updateBanknoteBalance(args)
      })

      ipcRenderer.on('humidity', (event, args) => {
        this.setHumidity(args)
      })

      ipcRenderer.on('temperature', (event, args) => {
        this.setTemperature(args)
      })
    },

    ...mapMutations({
      setParameters: 'setParameters',
      setHumidity: 'setHumidity',
      setTemperature: 'setTemperature',
      setDryParameters: 'setDryParameters'
    }),
    ...mapGetters({
      getPanelType: 'getPanelType'
    }),
    ...mapActions({
      updateCoinBalance: 'updateCoinBalance',
      updateBanknoteBalance: 'updateBanknoteBalance'
    })
  },

  mounted() {
    //this.setup()
  },
  created() {
    this.setup()
    // this.setLanguageNatives(this.getConfig.countries)
  }
})
</script>

<style>
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/css/index.css';

@font-face {
  font-family: 'Plumb-Medium';
  src: local('Plumb-Medium'),
    url(./assets/fonts/Plumb-Medium.ttf) format('truetype');
}
</style>
