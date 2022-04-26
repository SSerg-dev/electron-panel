<template>
  <div>
    <div>
      <div class="qr-title">
        <h3>
          <p align="center">
            Авторизация
          </p>
          <p align="center">
            через QR
          </p>
        </h3>
      </div>
      <div class="qr-code">
        <vue-qrcode :value="qr" :scale="9" :margin="2" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import VueQrcode from 'vue-qrcode'

import { Database } from '@/storage/database.js'
import { Fetch, FetchClient, methods, types } from '@/storage/fetch.js'
import { Storage } from '@/storage/index.js'
import EventBus from '@/bus/EventBus'
import { log } from '../../main/utils'

export default {
  name: 'bonus-bill-qr',

  data: () => ({
    
    qr: '',
    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {},
    intervalCheckBonusQr: null,

    /* dev */
    profile: {
      isQrAuthorization: false,
      isPhoneAuthorization: false,
      balance: 0,
      firstname: '',
      lastname: ''
    }
  }),
  computed: {
    ...mapGetters({
      getDefaultPanelNumber: 'getDefaultPanelNumber'
      
    })

  },
  methods: {
    ...mapGetters({
      getQrOptions: 'getQrOptions',
      getCheckBonusQr: 'getCheckBonusQr',
      getProfile: 'getProfile'
    }),
    ...mapMutations({
      setProfile: 'setProfile'
    }),

    async getQr() {
      const method = methods[9]
      const type = types[4]
      this.options = this.getQrOptions()

      const response = await this.storage.getClient(method, this.options, type)
      this.qr = response.qr
      if (+response.result === 0) {
        this.intervalCheckBonusQr = setInterval(() => {
          this.checkBonusQr()
        }, 2000)
      }
    },
    /* dev */
    async checkBonusQr() {
      const method = methods[14]
      const type = types[7]
      this.options = this.getCheckBonusQr()
      this.options.params.qr = this.qr

      const response = await this.storage.getClient(method, this.options, type)

      if (+response.result === 0) {
        if (+response.profile?.b_balance > 0 && response.profile.firstname !== null) {

          this.profile.isQrAuthorization = true,
          this.profile.isPhoneAuthorization = false,

          this.profile.balance = response.profile.b_balance
          this.profile.firstname = response.profile.firstname
          this.profile.lastname = response.profile.lastname
          this.setProfile(this.profile)
          
          clearInterval(this.intervalCheckBonusQr)
          if (this.$route.name !== 'card') this.$router.push('/card')


        }
      }
    },
  },

  mounted() {
    this.storage = new Storage(this.client, this.url)
    this.getQr()
  },
  beforeDestroy() {
    clearInterval(this.intervalCheckBonusQr)
  },
  components: {
    VueQrcode
  }
}
</script>

<style scoped>
.qr-title {
  position: absolute;
  margin-top: 10em;
  margin-left: 45.5em;
  color: white;
  font-family: 'Plumb-Medium';
}
.qr-code {
  position: absolute;
  margin-top: 20em;
  margin-left: 44em;
}
</style>
