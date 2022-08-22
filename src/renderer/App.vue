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
import sleep from '@/utils/sleep'
import EventBus from '@/bus/EventBus'

import { ipcRenderer } from 'electron'

export default Vue.extend({
  name: 'app',
  data: () => ({
    intervalControllerWork: null,
    isControllerWork: false,
    delay: 5000
  }),
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    ...mapGetters({
      getConfig: 'getConfig',
      /* dev */
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getVacuumNumber: 'getVacuumNumber',
      getPanelType: 'getPanelType'
    })
  },
  watch: {
    getDefaultPanelNumber(flag) {},
    getVacuumNumber(flag) {},
    getPanelType(flag) {}
  },
  components: {
    EmptyLayout,
    MainLayout
  },
  methods: {
    ...mapMutations({
      setConfig: 'setConfig',
      setWetBalance: 'setWetBalance',
      setDryBalance: 'setDryBalance',
      setIsPingUrl: 'setIsPingUrl'
    }),
    /*  */
    checkControllerWork() {
      this.intervalControllerWork = setInterval(() => {
        if (this.isControllerWork === false) this.setIsPingUrl(false)
        this.isControllerWork = false
      }, this.delay)
    },

    clear(flag) {
      this.updateClearBalance()
      switch (flag) {
        case 'wash':
          this.setWetBalance(0)
          break
        case 'vacuum':
          this.setDryBalance(0)
          break
        default:
          break
      }
    },
    /* dev */
    // emitCardMoneyInitial(card = 0) {
    //   EventBus.$emit('CardMoneyInitial', card)
    // },    

    initial() {
      // this.emitCardMoneyInitial()

    },
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

          if (parameter.title !== `::AsGlobalPV:DateTime.Time`) {
            const type = this.getPanelType
            switch (type) {
              case 'wash':
                // console.log('parameter-->', parameter)
                this.setParameters(parameter)
                break
              case 'vacuum':
                this.setDryParameters(parameter)
                break
              default:
                break
            }
          } else {
            this.isControllerWork = true
            this.setIsPingUrl(true)
          }
        } catch (err) {
          console.warn('App.vue setup() error:', err)
        }
      })

      const self = this

      ipcRenderer.on('coin', (event, args) => {
        const type = this.getPanelType
        switch (type) {
          case 'wash':
            self.updateCoinBalance(args)
            break
          case 'vacuum':
            self.updateDryCoinBalance(args)
            break
          default:
            break
        }
      })

      ipcRenderer.on('banknot', (event, args) => {
        const type = this.getPanelType
        switch (type) {
          case 'wash':
            self.updateBanknoteBalance(args)
            break
          case 'vacuum':
            self.updateDryBanknoteBalance(args)
            break
          default:
            break
        }
      })

      ipcRenderer.on('humidity', (event, args) => {
        this.setHumidity(args)
      })

      ipcRenderer.on('temperature', (event, args) => {
        this.setTemperature(args)
      })

      this.initial()

    },

    ...mapMutations({
      setParameters: 'setParameters',
      setHumidity: 'setHumidity',
      setTemperature: 'setTemperature',
      setDryParameters: 'setDryParameters'
    }),
    ...mapGetters({
      // getPanelType: 'getPanelType'
    }),
    ...mapActions({
      /* dev */
      updateClearBalance: 'updateClearBalance',

      updateDryCoinBalance: 'updateDryCoinBalance',
      updateDryBanknoteBalance: 'updateDryBanknoteBalance',

      updateCoinBalance: 'updateCoinBalance',
      updateBanknoteBalance: 'updateBanknoteBalance'
    })
  },

  mounted() {
    /* this.intervalControllerWork = setInterval(() => {
      if (this.isControllerWork === false) this.setIsPingUrl(false)
      this.isControllerWork = false
    }, this.delay) */
    this.checkControllerWork()
  },
  created() {
    this.setup()
    // this.setLanguageNatives(this.getConfig.countries)
  },
  beforeDestroy() {
    clearInterval(this.intervalControllerWork)
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
