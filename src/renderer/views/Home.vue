<template>
  <section>
    <div>
      <div
        v-if="
          this.getPanelType === 'wash' &&
            getIsPingUrl &&
            getWetActive === 'true'
        "
      >
        <Wash />
      </div>

      <!-- <div
        v-if="
          this.getPanelType === 'vacuum' &&
            getIsPingUrl &&
            getWetActive === 'true'
        "
      >
        <Vacuum /> 
      </div> -->

      <div v-if="this.getPanelType === 'vacuum'">
        <Vacuum />
      </div>

      <div
        v-if="!getIsPingUrl"
        style="color: red; font-size: 5em; margin-top: 10em"
      >
        <p align="center">{{ `No_connection_to_car_wash` | localize }}</p>
      </div>

      <div
        v-if="getWetActive === 'false' && getIsPingUrl"
        style="color: red; font-size: 5em; margin-top: 10em"
      >
        <p align="center">{{ `POST_DISABLED` | localize }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import Wash from '@/components/wash/Wash'
import Vacuum from '@/components/vacuum/Vacuum'
import { update } from 'lodash'

import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'
import { type } from 'os'

export default Vue.extend({
  name: 'home',
  data: () => ({}),

  components: {
    Wash,
    Vacuum
    // loader
  },
  watch: {
    getPanelType(value) {
      // string
      // console.log('$$ getPanelType',typeof value)
    },
    getIsPingUrl(value) {
      // boolean
      // console.log('$$ getIsPingUrl',typeof value)
    },
    getWetActive(value) {
      // string
      // console.log('$$ getWetActive',typeof value)
    }
  },

  methods: {
    ...mapMutations({
      setRouter: 'setRouter',
      setIsPingUrl: 'setIsPingUrl',

      setIsCardMoney: 'setIsCardMoney',
      setIsBonusMoney: 'setIsBonusMoney'
    }),
    setup() {
      this.setIsCardMoney(false)
      this.setIsBonusMoney(false)

      // console.log(
      //   `$$ Home.vue
      //   getIsCardMoney: ${this.getIsCardMoney}
      //   getIsBonusMoney: ${this.getIsBonusMoney}`
      // )
    }
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
      getIsPingUrl: 'getIsPingUrl',
      getWetActive: 'getWetActive',
      getDryActive: 'getDryActive',

      /* dev */
      getIsCardMoney: 'getIsCardMoney',
      getIsBonusMoney: 'getIsBonusMoney'
    })
  },
  mounted() {
    this.setRouter('/')
    this.setup()
  }
})
</script>

<style scoped></style>
