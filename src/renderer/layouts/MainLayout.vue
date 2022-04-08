<template>
  <div class="app-main-layout">
    <Navbar @click="isOpen = !isOpen" />
    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

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

import Snowf from 'vue-snowf'

export default Vue.extend({
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    intervalPing: null,
    // dev
    client: 'fetch',
    url: 'https://192.168.1.3/',
    urlBD: 'https://192.168.1.2/',
    storage: null,
    options: {}
  }),

  computed: {
    ...mapGetters({
      //getDefaultPanelNumber: 'getDefaultPanelNumber',
      //getWetBusyPanel: 'getWetBusyPanel',
      getPanelType: 'getPanelType'
    })
  },

  methods: {
    ...mapGetters({
      getPingOptions: 'getPingOptions',
      getCompleteWash: 'getCompleteWash',

      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getIsPing: 'getIsPing'
    }),

    async ping() {
      const method = methods[3]
      const type = types[4]

      this.options = this.getPingOptions()
      // console.log('!!this.options-->', this.options)

      const response = await this.storage.getClient(method, this.options, type)

      // console.log('+response.result-->', typeof response)
      if (response === undefined) {
        this.setIsPing(false)
        // this.$message(`ping ${this.url} недоступен`)
        return
      }
      if (+response.result === 0) {
        this.setIsPing(true)
        // this.$message(`ping ${this.url} выполнен успешно`)
      }
      //this.$message(`ping ${this.getIsPing()}`)
    },
    async pingUrl() {
      const method = methods[12]
      const type = types[5]

      // this.options = this.getPingOptions()
      // const response = await this.storage.getClient(method, this.options, type)

      // console.log('++response',typeof response)

      // if (+response.status === 200) {
      //   this.setIsPing(true)
      //   this.$message(`ping ${this.url} ++выполнен успешно`)
      // } else {
      //   this.setIsPing(false)
      //   this.$message(`ping ${this.url} недоступен`)
      // }
    },

    async completeWash() {
      const method = methods[11]
      const type = types[4]

      this.options = this.getCompleteWash()

      const response = await this.storage.getClient(method, this.options, type)
      if (+response.result === 0)
        this.$message(
          `Мойка на посту № ${this.getDefaultPanelNumber()} завершена успешно`
        )
      else
        this.$message(
          `Мойка на посту № ${this.getDefaultPanelNumber()} завершена с ошибкой ${
            response.result
          }`
        )
    },
    ...mapMutations({
      setIsPing: 'setIsPing'
    })
  },
  created() {
    //console.log('!!++this.getPanelType-->', this.getPanelType)
  },

  async mounted() {
    this.storage = new Storage(this.client, this.url)

    this.intervalPing = setInterval(() => {
      this.ping()
      this.pingUrl()
      // this.completeWash()
    }, 1000)
    //},
  },
  beforeDestroy() {
    clearInterval(this.intervalPing)
  },
  components: {
    Navbar,
    Footer,
    Snowf
  },
  computed: {
    locale() {
      return this.$store.getters.info.locale
    }
  }
})
</script>

<style>
.app-main-layout {
  background-color: #121212;
  /* background-color: yellow */
  /* background-color: black */
}
</style>
