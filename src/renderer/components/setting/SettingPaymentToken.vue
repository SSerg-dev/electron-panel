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
        <div class="row">
          <div class="col s2">
            <span class="card-title">Жетоны (RUB):</span>
          </div>
          <div class="col s3" style="margin-left: -4em;">
            <div>
              <SettingPaymentTokenItem :token="firstToken" />
            </div>
          </div>
          <div class="col s3" style="margin-left: 3em;">
            <div>
              <SettingPaymentTokenItem  :token="secondToken" />
            </div>
          </div>
          <div class="col s3" style="margin-left: 3em;">
            <div>
              <SettingPaymentTokenItem  :token="thirdToken"/>
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
    thirdToken: 3
  }),

  components: {
    SettingPaymentTokenItem
  }
})
</script>

<style scoped></style>
