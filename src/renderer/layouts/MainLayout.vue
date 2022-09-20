<template>
  <div class="app-main-layout">
    <Navbar @click="isOpen = !isOpen" />
    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <!-- !getIsPingUrl && -->
    <div
      v-if="this.$route.name != 'language' && this.$route.name != 'setting'"
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
import { response } from 'express'

export default Vue.extend({
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    intervalPing: null,
    // dev
    client: 'fetch',
    url: 'https://192.168.1.3/',
    urlController: 'https://192.168.1.2:4840',
    storage: null,
    options: {},
    intervalCheckQueue: null,
    delay: 10000,
    
    queue: null,
    queueType: '',
    localClient: 'local',
    localStorage: null,
  }),

  computed: {
    ...mapGetters({
      getDefaultPanelNumber: 'getDefaultPanelNumber',
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

    checkQueue() {
      console.log('$$ ++ checkQueue')
      if (this.getIsPing) {
        this.queueType = 'getQueue'
        
      
      }
    },

    async ping() {
      const method = methods[3]
      const type = types[4]

      this.options = this.getPingOptions()
      // console.log('ping this.options-->', this.options)

      const response = await this.storage.getClient(method, this.options, type)

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
      const method = methods[12]
      const type = types[5]

      this.options = this.getPingOptions()
      const response = await this.storage.getClient(method, this.options, type)
      if (response < 1000) {
        this.setIsPingUrl(true)
        // this.$message(`ping ${this.urlController} выполнен успешно`)
      } else {
        this.setIsPingUrl(false)
        // this.$message(`ping ${this.urlController} недоступен`)
      }
    },

    ...mapMutations({
      setIsPing: 'setIsPing',
      setIsPingUrl: 'setIsPingUrl',
    }),
  },
  created() {
    //console.log('!!++this.getPanelType-->', this.getPanelType)
    this.getIsPingUrl = true
  },

  async mounted() {
    this.storage = new Storage(this.client, this.url)

    this.intervalPing = setInterval(() => {
      /* dev hidden */
      this.ping()
    }, 2000)

    this.intervalCheckQueue = setInterval(() => {
      this.checkQueue()
    }, this.delay)

  },
  beforeDestroy() {
    clearInterval(this.intervalPing)
    clearInterval(this.intervalCheckQueue)
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
