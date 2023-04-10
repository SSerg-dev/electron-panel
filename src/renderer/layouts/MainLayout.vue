<template>
  <div class="app-main-layout">

    <!-- <Snowf
      :amount="50"
      :size="5"
      :speed="1.5"
      :wind="0"
      :opacity="0.8"
      :swing="1"
      :image="null"
      :zIndex="null"
      :resize="true"
      color="#fff"
    /> -->

    <Navbar @click="isOpen = !isOpen" />
    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <!-- !getIsPingUrl && -->
    <div
      v-if="
        this.$route.name != 'language' &&
        this.$route.name != 'setting' &&
        this.$route.name != 'cost'
      "
      class="footer"
    >
      <Footer />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Navbar from '@/components/app/Navbar'
import Footer from '@/components/app/Footer'

import { mapGetters, mapMutations } from 'vuex'
import { setInterval, clearInterval } from 'timers'

import { Database } from '@/storage/database.js'
import { Fetch, FetchClient, methods, types } from '@/storage/fetch.js'
import { Storage } from '@/storage/index.js'
import sleep from '@/utils/sleep'

import Snowf from 'vue-snowf'
// import createLog from 'localstorage-logger'

import { response } from 'express'
import { forEach } from 'lodash'

export default Vue.extend({
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    intervalPing: null,
    // dev
    client: 'fetch',
    url: '', 
    urlController: '',
    urlLocal:'',

    storage: null,
    options: {},
    intervalRestorePayment: null,
    delay: 8000,

    queueType: '',
    localClient: 'local',
    localStorage: null,
  }),

  computed: {
    ...mapGetters({
      getPanelNumber: 'getPanelNumber',
      //getWetBusyPanel: 'getWetBusyPanel',
      getPanelType: 'getPanelType',
      getIsPingUrl: 'getIsPingUrl',
      getIsPing: 'getIsPing',
    }),
  },

  methods: {
    ...mapGetters({
      getPingOptions: 'getPingOptions',
      getCompleteWash: 'getCompleteWash',
    }),

    async restorePayment() {
      const queues = await this.getQueue()

      if (this.getIsPing && queues.length > 0) {
        queues.forEach((queue, index) => {
          sleep(this.delay).then(() => {
            this.options[index] = queue
            this.payCashMoney(index)
          })
        })
      }
    },
    // ----------------------------------
    async payCashMoney(index) {
      const method = methods[0]
      const type = types[0]
      const options = this.options[index]

      const response = await this.storage.getClient(method, options, type)
      
      if (response) {
        if (response.result === 0) {
          this.removeQueue(index)
        } else {
          console.log('$$ error restorePayment', response)
        }
        return response
      }
      return
    },
    // ----------------------------------
    async getQueue() {
      const method = ''
      const options = ''
      this.queueType = 'getQueue'

      const response = await this.localStorage.getClient(
        method,
        options,
        this.queueType
      )
      // console.log('$$ response', response)

      return response
    },
    // ----------------------------------
    async removeQueue(index) {
      const method = ''
      const options = { index }
      this.queueType = 'removeQueue'

      const response = await this.localStorage.getClient(
        method,
        options,
        this.queueType
      )
      return response
    },
    // ----------------------------------

    async ping() {
      // console.log('ping')
      const method = methods[3]
      const type = types[4]

      this.options = this.getPingOptions()

      const response = await this.storage.getClient(method, this.options, type)
      // console.log('ping this.options-->', this.options)

      if (response === undefined) {
        this.setIsPing(false)
        // this.$message(`ping ${this.url} недоступен`)
        return
      }
      if (+response.result === 0) {
        this.setIsPing(true)
        // this.$message(`ping ${this.url} выполнен успешно`)
      }
    },
    async pingUrl() {
      console.log('pingUrl')
      const method = methods[12]
      const type = types[5]

      this.urlController = this.urlLocal = process.env.VUE_APP_URL_CONTROLLER

      this.options = this.getPingOptions()
      const response = await this.storage.getClient(method, this.options, type)
      if (response < 1000) {
        this.setIsPingUrl(true)
        this.$message(`ping ${this.urlController} выполнен успешно`)
      } else {
        this.setIsPingUrl(false)
        this.$message(`ping ${this.urlController} недоступен`)
      }
    },

    ...mapMutations({
      setIsPing: 'setIsPing',
      setIsPingUrl: 'setIsPingUrl',
    }),
  },
  created() {
    //console.log('!!++this.getPanelType-->', this.getPanelType)
    this.getIsPing = true
    this.getIsPingUrl = true
  },

  async mounted() {
    // localstorage-logger --------------
    /* 
    const log = createLog({
      logName: 'electron-panel-log',
      maxLogSizeInBytes: 500 * 1024, // 500KB
    })

    // Log something
    // debug | info | warn | error
    log.info(
      'MainLayout.vue',
      {
        start: 'start',
      },
      42
    )
    // Export the log entries
    const logEntries = log.exportToArray()
    */
    // end localstorage-logger

    this.url = process.env.VUE_APP_URL_CONNECT
    this.storage = new Storage(this.client, this.url)

    this.urlLocal = process.env.VUE_APP_URL_LOCAL
    this.localStorage = new Storage(this.localClient, this.urlLocal)

    this.intervalPing = setInterval(() => {
      /* dev hidden */
      this.ping()
    }, (this.delay = 2000))

    this.intervalRestorePayment = setInterval(() => {
      if (this.getIsPing) {
        this.restorePayment()
      }
    }, (this.delay = 4000))
  },
  beforeDestroy() {
    clearInterval(this.intervalPing)
    clearInterval(this.intervalRestorePayment)
  },
  components: {
    Navbar,
    Footer,
    Snowf,
  },
  computed: {
    locale() {
      return this.$store.getters.info.locale
    },
  },
})
</script>

<style>
.app-main-layout {
  background-color: #121212;
}
</style>
