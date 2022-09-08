<template>
  <!-- new component -->
  <div>
    <div
      class="card grey lighten-3"
      style="
      border: solid 3px #00B9E3; 
      width: 1040px; height: 120px; 
      margin-left: 0px;
      margin-top: -3.5em; 
      border-radius: 2rem;"
    >
      <div class="card-content black-text">
        <!-- row -->
        <!-- 

          <div align="justify" style="margin-left: 14em; margin-bottom: 4em;">
        <h4>
          {{ this.emoji }}
          {{ this.currency }}
          {{ this.symbol }}
        </h4>
      </div>
         -->
        <div class="row">
          <div class="col s2">
            <span class="card-title">{{`Tokens` | localize }} {{`:`}}</span>
            <div style="font-size: 1.35em; margin-left: 0em;">
              {{ this.emoji }}
              {{ this.currency }}
              <!-- {{ this.symbol }} -->
            </div>
          </div>
          <div class="col s3" style="margin-left: -4em;">
            <div>
              <SettingPaymentTokenItem :token="firstToken" />
            </div>
          </div>
          <div class="col s3" style="margin-left: 3em;">
            <div>
              <SettingPaymentTokenItem :token="secondToken" />
            </div>
          </div>
          <div class="col s3" style="margin-left: 3em;">
            <div>
              <SettingPaymentTokenItem :token="thirdToken" />
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>
    </div>
  </div>
  <!-- end -->
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import SettingPaymentTokenItem from '@/components/setting/SettingPaymentTokenItem'

export default Vue.extend({
  name: 'setting-payment-token',
  data: () => ({
    firstToken: 1,
    secondToken: 2,
    thirdToken: 3,

    /* dev */
    emoji: '',
    currency: '',
    symbol: '',
    currencies: []
  }),
  computed: {
    ...mapGetters({
      getInitCurrency: 'getInitCurrency'
    })
  },
  methods: {
    initCurrency() {
      
      const { id, title, key, emoji, currency, symbol } = this.getInitCurrency
      if (id) {
        this.current = id
        this.select = title

        this.emoji = emoji
        this.currency = currency
        this.symbol = symbol
      }

      
    }
  },
  created() {
    this.initCurrency()
  },

  components: {
    SettingPaymentTokenItem
  }
})
</script>

<style scoped></style>
