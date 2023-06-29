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
import { compareVersions, compare } from 'compare-versions'

import { ipcRenderer } from 'electron'

export default Vue.extend({
  name: 'app',
  data: () => ({
    intervalControllerWork: null,
    isControllerWork: false,
    delay: 6000,
    sleepMs: 6000,
  }),
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    ...mapGetters({
      getConfig: 'getConfig',
      getPanelNumber: 'getPanelNumber',
      getVacuumNumber: 'getVacuumNumber',
      getPanelType: 'getPanelType',
      getControllerTime: 'getControllerTime',
      getControllerDate: 'getControllerDate',
      getIsStandbyFreeEnable: 'getIsStandbyFreeEnable',
      getSwVersion: 'getSwVersion',
      getIsVersion: 'getIsVersion',
    }),
  },
  watch: {
    getPanelNumber(flag) {},
    getVacuumNumber(flag) {},
    getPanelType(flag) {},
    getIsStandbyFreeEnable(flag) {},
  },
  components: {
    EmptyLayout,
    MainLayout,
  },
  methods: {
    ...mapMutations({
      setConfig: 'setConfig',
      setWetBalance: 'setWetBalance',
      setDryBalance: 'setDryBalance',
      setIsPingUrl: 'setIsPingUrl',
      setControllerTime: 'setControllerTime',
      setControllerDate: 'setControllerDate',
      setIsVersion: 'setIsVersion',
    }),
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

    payload(index) {
      const options = { index }
      ipcRenderer.send('async-relaunch-start', options)

      ipcRenderer.on('OPCUA', (evt, payload) => {
        try {
          const tag = JSON.parse(payload)

          const parameter = {
            id: Date.now(),
            title: tag.param,
            value: tag.value,
          }

          if (parameter.title.includes('AsGlobalPV:DateTime.Date')) {
            if (parameter.value) {
              const date = parameter.value.split('-')

              const options = {}
              options.year = +date[0]
              options.month = +date[1]
              options.day = +date[2]

              this.setControllerDate(options)
            }
          }

          if (!parameter.title.includes('AsGlobalPV:DateTime.Time')) {
            const type = this.getPanelType
            switch (type) {
              case 'wash':
                this.setWetParameters(parameter)
                break
              case 'vacuum':
                this.setDryParameters(parameter)
                break
              default:
                break
            }
          } else if (parameter.title.includes('AsGlobalPV:DateTime.Time')) {
            this.isControllerWork = true
            this.setIsPingUrl(true)

            if (parameter.value) {
              const time = parameter.value.split(':')

              const options = {}
              options.hour = +time[0]
              options.minute = +time[1]
              options.second = +time[2]

              this.setControllerTime(options)
            }
          }
        } catch (err) {
          console.warn('App.vue setup() error:', err)
        }
      })
    },
    setup() {
      // --------------------------------
      // Get global setings in main (electron) process

      ipcRenderer.invoke('settings').then((data) => {
        try {
          data = JSON.parse(data)
          this.setConfig(data)
        } catch (err) {
          console.warn('Error? while parse settings -', err)
        }
      })

      // ipcRenderer.on('settings', (evt, data) => {
      //   try {
      //     data = JSON.parse(data)
      //     this.setConfig(data)
      //   } catch (err) {
      //     console.warn('Error? while parse settings -', err)
      //   }
      // })

      const options = {
        isPayload: true,
      }

      ipcRenderer.send('async-payload-start', options)

      ipcRenderer.on('async-payload-reply', (event, params) => {
        if (params.isPayloadReply) {
          this.payload(params.index)
        }
      })
      // --------------------------------

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

      ipcRenderer.on('banknote', (event, args) => {
        console.log('$$ App.vue: 249', args)
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
    },
    version() {
      const swVersion =
        this.getSwVersion || process.env.VUE_APP_ADVANCED_VERSION

      const options = {
        upper: compare(swVersion, process.env.VUE_APP_ADVANCED_VERSION, '>'),
        lower: compare(swVersion, process.env.VUE_APP_ADVANCED_VERSION, '<'),
        equal: compare(swVersion, process.env.VUE_APP_ADVANCED_VERSION, '='),
      }
      this.setIsVersion(options)
      // console.log('$$ App.vue: 308', this.getSwVersion, JSON.stringify(this.getIsVersion))
    },
    // end methods

    ...mapMutations({
      setWetParameters: 'setWetParameters',
      setHumidity: 'setHumidity',
      setTemperature: 'setTemperature',
      setDryParameters: 'setDryParameters',
    }),
    ...mapGetters({}),
    ...mapActions({
      updateClearBalance: 'updateClearBalance',

      updateDryCoinBalance: 'updateDryCoinBalance',
      updateDryBanknoteBalance: 'updateDryBanknoteBalance',

      updateCoinBalance: 'updateCoinBalance',
      updateBanknoteBalance: 'updateBanknoteBalance',
    }),
  },

  mounted() {
    this.checkControllerWork()

    sleep(this.sleepMs).then(() => {
      this.version()
    })
  },

  created() {
    this.setup()
  },

  beforeDestroy() {
    clearInterval(this.intervalControllerWork)
  },
})
</script>

<style>
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/css/index.css';


@font-face {
  font-family: 'Emoji-Regular';
  src: url(./assets/fonts/NotoColorEmoji-Regular.ttf) format('truetype');
}

@font-face {
  font-family: 'Plumb-Medium';
  src: url(./assets/fonts/Plumb-Medium.ttf) format('truetype');
}

@font-face {
  font-family: 'Roboto-Medium';
  src: url(./assets/fonts/Roboto-Medium.ttf) format('truetype');
}

@font-face {
  font-family: 'RobotoMono-Medium';
  src: url(./assets/fonts/RobotoMono-Medium.ttf) format('truetype');
}


</style>
