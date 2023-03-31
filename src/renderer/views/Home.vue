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
            getDryActive === 'true'
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
        <p align="center">{{ `Ошибка: нет связи с мойкой` }}</p>
      </div>

      <div
        v-if="getWetActive === 'false' && getIsPingUrl"
        style="color: red; font-size: 5em; margin-top: 10em"
      >
        <p align="center">{{ `ПОСТ ОТКЛЮЧЕН` }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import Wash from '@/components/wash/Wash'
import Vacuum from '@/components/vacuum/Vacuum'

export default Vue.extend({
  name: 'home',
  data: () => ({}),

  components: {
    Wash,
    Vacuum,
    // loader
  },

  methods: {
    ...mapMutations({
      setRouter: 'setRouter',
      setIsPingUrl: 'setIsPingUrl',

      setIsCardMoney: 'setIsCardMoney',
      setIsBonusMoney: 'setIsBonusMoney',
    }),
    setup() {
      this.setIsCardMoney(false)
      this.setIsBonusMoney(false)

      // console.log(
      //   `$$ Home.vue 
      //   getIsCardMoney: ${this.getIsCardMoney}
      //   getIsBonusMoney: ${this.getIsBonusMoney}`
      // )
    },
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
      getIsPingUrl: 'getIsPingUrl',
      getWetActive: 'getWetActive',
      getDryActive: 'getDryActive',

      /* dev */
      getIsCardMoney: 'getIsCardMoney',
      getIsBonusMoney: 'getIsBonusMoney',
    }),
  },
  mounted() {
    this.setRouter('/')
    this.setup()
  },
})
</script>

<style scoped></style>
