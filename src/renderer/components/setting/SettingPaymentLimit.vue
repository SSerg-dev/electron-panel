<template>
  <!-- new component -->
  <div>
    <div class="card grey lighten-3 payment">
      <div class="card-content black-text">
        <!-- row -->
        <div class="row">
          <div class="col s2">
            <span class="card-title"
              >{{ `Payment_limits` | localize }} {{ `:` }}</span
            >
          </div>
          <div class="col s5" style="margin-left: -3em">
            <div>
              <SettingPaymentLimitMin />
            </div>
          </div>
          <div class="col s5" style="margin-left: 1em">
            <div>
              <SettingPaymentLimitMax />
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

import SettingPaymentLimitMin from '@/components/setting/SettingPaymentLimitMin'
import SettingPaymentLimitMax from '@/components/setting/SettingPaymentLimitMax'

export default Vue.extend({
  name: 'setting-payment-limit',

  components: {
    SettingPaymentLimitMin,
    SettingPaymentLimitMax,
  },
})
</script> 

<style scoped>
.payment {
  border: solid 3px #00b9e3;
  width: 1040px;
  height: 130px;
  margin-left: 0px;
  margin-top: -3.5em;
  border-radius: 2rem;
}
</style>
