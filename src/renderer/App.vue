<template>
  <div id="app"
  class="noselect"
  >
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
    }),
  },
  components: {
    EmptyLayout,
    MainLayout
  },
  methods: {
    ...mapMutations({
      setConfig: 'setConfig',
      setLanguageNatives: 'setLanguageNatives',
    }),

    setup() {
      /*
       * Get global setings from settings.json in main (electron) process
       *
       */
      ipcRenderer.on('settings', (evt, data) => {
        try {
          data = JSON.parse(data)
          this.setConfig(data)
        } catch (err) {
          console.warn('Error? while parse settings -', err)
        }
      })
      /* dev */
      /* const countries = this.getConfig.countries 
      if(countries.length > 0)
        this.setLanguageNatives(countries)
      console.log('store.state.countries.countries-->', countries.length, countries) */

      ipcRenderer.on('OPCUA', (evt, payload) => {
        try {
          const tag = JSON.parse(payload)
          const parameter = {
            id: Date.now(),
            title: tag.param,
            value: tag.value
          }
          if (parameter.title !== `::AsGlobalPV:DateTime.Time`)
            this.setParameters(parameter)
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
      setTemperature: 'setTemperature'
    }),
    ...mapGetters({}),
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
