<template>
  <div v-if="isMainMenu">
    <keep-alive>
      <MainMenu :type="type" />
    </keep-alive>
    
  </div>

</template>
<script>
/*   */
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import MainMenu from '@/components/MainMenu'

export default Vue.extend({
  name: 'wash',
  
  data: () => ({
    isMainMenu: true,
    type: 'wash' 
  }),
  created() {
    this.isMainMenu = true
  },
  components: {
    MainMenu
  } 
})
</script>

<style scoped></style>
