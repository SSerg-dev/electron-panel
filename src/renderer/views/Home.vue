<template>

    <section>
      
      <div v-if="this.getPanelType === 'wash'">
        <Wash />
      </div>
      
       <div v-if="this.getPanelType === 'vaccum'">
         <Vaccum />
       </div>

    </section>

</template>

<script >
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import Wash from '@/components/wash/Wash'
import Vaccum from '@/components/vaccum/Vaccum'

//import Loader from '@/components/app/Loader'

//import messages from '@/utils/messages'

export default Vue.extend({
  name: 'home',
  data: () => ({
    loading: true
  }),

  components: {
    Wash,
    Vaccum
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
  },
})
</script>

<style scoped>
</style>


