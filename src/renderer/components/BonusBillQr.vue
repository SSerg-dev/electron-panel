<template>
  <div>
    <div>
      <div class="qr-title">
        <h3>
          <p align="center">
            {{ `Authorization_using_a_QR` | localize }}
          </p>
        </h3>
      </div>
      <!-- :color="{ dark: '#00b9e3', light: '#ffffffff' }" -->
      <!-- :errorCorrectionLevel="L" -->
      <div class="qr-code">
        <vue-qrcode
          :value="qr"
          :scale="10"
          :margin="2"
          errorCorrectionLevel="L"
        />
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
    url: '',
    storage: null,
    options: {},
    intervalCheckBonusQr: null,
    isCheckBonusQr: false,

    /* dev */
    profile: {
      isQrAuthorization: false,
      isPhoneAuthorization: false,
      isCashAuthorization: false,
      phone: '',
      balance: 0,
      firstname: '',
      lastname: '',
    },
  }),
  computed: {
    ...mapGetters({
      getPanelNumber: 'getPanelNumber',
      getIsAppendBonusMoney: 'getIsAppendBonusMoney',
      getIsPayBonusMoney: 'getIsPayBonusMoney',
      getWetBalance: 'getWetBalance',
      getWetPaidBonus: 'getWetPaidBonus',
    }),
  },
  methods: {
    ...mapGetters({
      getQrOptions: 'getQrOptions',
      getCheckBonusQr: 'getCheckBonusQr',
      getProfile: 'getProfile',
    }),
    ...mapMutations({
      setProfile: 'setProfile',
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
      // console.log('checkBonusQr() response -->', response )

      if (+response.result === 0) {
        if (
          +response.profile?.b_balance > 0 &&
          response.profile.firstname !== null
        ) {
          this.profile.isQrAuthorization = true
          this.profile.isPhoneAuthorization = false
          this.profile.isCashAuthorization = false

          this.profile.phone = response.profile.phone
          this.profile.balance = response.profile.b_balance
          this.profile.firstname = response.profile.firstname
          this.profile.lastname = response.profile.lastname
          this.setProfile(this.profile)
          // console.log('checkBonusQr() this.getProfile -->', this.getProfile() )

          clearInterval(this.intervalCheckBonusQr)

          // Пополнить бонусы
          if (this.getIsAppendBonusMoney) {
            this.profile.isCashAuthorization = true
            this.setProfile(this.profile)

            if (!this.isCheckBonusQr) {
              this.emitBonusQrMoney(this.profile.isCashAuthorization)
              this.isCheckBonusQr = true
            }

            if (this.$route.name !== 'program') this.$router.push('/program')
          }
          // Заплатить бонусами
          else if (
            this.getIsPayBonusMoney &&
            +this.getWetPaidBonus === 0 &&
            this.$route.name !== 'program'
          ) {
            if (this.$route.name !== 'card') {
              // console.log('$$ BonusBillQr this.$router.push/card')
              this.$router.push('/card')
            }
          }
        }
      }
    },
    /* dev */
    emitBonusQrMoney(isCashAuthorization) {
      EventBus.$emit('submitBonusQrMoney', isCashAuthorization)
    },
  }, // end methods

  mounted() {
    this.url = process.env.VUE_APP_URL_CONNECT
    this.storage = new Storage(this.client, this.url)
    this.getQr()
  },
  beforeDestroy() {
    clearInterval(this.intervalCheckBonusQr)
    // this.isCheckBonusQr = false
  },
  components: {
    VueQrcode,
  },
}
</script>

<style scoped>
.qr-title {
  position: fixed;
  width: 400px;
  top: 64em;
  left: 42em;
  color: white;
  font-family: 'Roboto-Medium';
  margin-bottom: 0em;
}
.qr-code {
  position: fixed;
  top: 75em;
  left: 46em;
}
</style>
