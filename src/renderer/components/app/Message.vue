<template>
  <div>
    <div class="page-title">

      <p style="width: 540px; text-align: center;">
        {{ `${ getWetBalance }` }}
      </p>
      <!-- <p style="width: 800px; text-align: justify;">
        {{ `999` }}
      </p> -->
      <!-- <p v-if-else="getWetBusyPanel === 'false'" style="font-size: 3.5rem; width: 800px; margin-top: 10rem;"  >  
        {{ `ПОСТ № ${getDefaultPanelNumber} баланс 0 ` }}
      </p> -->
      
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  data: () => ({
    message: {
      id: 0,
      title: '',
      type: '',
      value: 0
    }
  }),

  props: {
    messages: {
      type: Object,
      required: false
    }
  },
  methods: {
    ...mapActions({
      updateStartProgram: 'updateStartProgram'
    })
  },
  computed: {
    ...mapGetters({
      //getCurrentMessage: 'getCurrentMessage',
      getWetBalance: 'getWetBalance',
      getPanelType: 'getPanelType',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getActiveProgramNumber: 'getActiveProgramNumber',
      getWetBusyPanel: 'getWetBusyPanel'
    })
  },

  mounted() {
  }
})
</script>

<style scoped>
.page-title {
  padding-top: 1rem;
  padding-left: 12rem;
  color: white;
  margin-left: 0rem;
  margin-right: 0rem;
  padding-right: 8rem;
  width: 100%; /* 42rem; */ /* 32rem; */
  font-size: 22rem; /* 24rem; */
  /* text-align: left; */
}
</style>
