<template>
  <div>
    <div class="page-title">
      <!-- /////////////////// -->
      <div>
        <h3>
          <p align="center">
            Авторизация
          </p>
          <p align="center">
            через QR
          </p>
        </h3>
      </div>
      <!-- 
        <HomeBill :rates="currency.rates"/>
       -->
      <div class="qr-code">
        <vue-qrcode 
        :value="qr" 
        :scale=9 
        :margin=2 />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import VueQrcode from 'vue-qrcode'

// dev methods
import { Database } from '@/storage/database.js'
import { Fetch, FetchClient, methods, types } from '@/storage/fetch.js'
import { Storage } from '@/storage/index.js'

export default {
  name: 'bonus-bill-qr',

  data: () => ({
    qr: '',
    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {}
  }),
  computed: {
    ...mapGetters({
      getDefaultPanelNumber: 'getDefaultPanelNumber'
    })
  },
  methods: {
    ...mapGetters({
      getQrOptions: 'getQrOptions'
    }),
    async getQr() {
      const method = methods[9]
      const type = types[4]
      this.options = this.getQrOptions()

      const response = await this.storage.getClient(method, this.options, type)
      this.qr = response.qr
      // console.log('this.qr-->', this.qr)

      /* if (+response.result === 0)
        this.$message(
          `Получен Qr code ${this.qr} на панели ${this.getDefaultPanelNumber}`
        ) */
    }
  },

  mounted() {
    this.storage = new Storage(this.client, this.url)
    this.getQr()
  },
  components: {
    VueQrcode
  }
}
</script>

<style scoped>
.page-title {
  margin-top: 8em;
  margin-bottom: 2em;
  margin-left: 28em; /* 16em; */
  padding-top: 0em;
  color: white;
  /* background: blue; */

  font-family: 'Plumb-Medium';
}
.qr-code {
  padding-top: 4em;
  padding-left: 18em;
}
</style>
