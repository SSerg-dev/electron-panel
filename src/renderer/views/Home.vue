<template>

    <div>
      <div v-if="this.getPanelType === 'wash'">
        <MainMenu /> 
      </div>
       <div v-if="this.getPanelType === 'vaccum'">
         <Vaccum />
         <!-- <VaccumMenu /> -->  
       </div>

    </div>
</template>

<script >
/*   */
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import MainMenu from '@/components/MainMenu'
import Vaccum from '@/components/vaccum/Vaccum'
import VaccumMenu from '@/components/vaccum/VaccumMenu'

//import Loader from '@/components/app/Loader'

//import messages from '@/utils/messages'

export default Vue.extend({
  name: 'home',
  data: () => ({
    loading: true
  }),

  components: {
    MainMenu,
    Vaccum,
    VaccumMenu

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


