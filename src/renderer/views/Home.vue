<template>
  <section>
    <div v-if="this.getPanelType === 'wash'">
      <Wash />
    </div>

    <div v-if="this.getPanelType === 'vacuum'">
      <Vacuum />
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
      setRouter: 'setRouter'
    })
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType'
    })
  },
  mounted() {
    this.setRouter('/')
  }
})
</script>

<style scoped></style>
