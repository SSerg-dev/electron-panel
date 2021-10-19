<template>
  <div>
    <div class="page-title">
      <div v-if="this.getPanelType === 'wash'">
        {{ `${ getWetBalance }` }}
      </div>
      <div v-if="this.getPanelType === 'vaccum'">
        {{ `${ getDryBalance }` }}
      </div>
      
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
      //updateStartProgram: 'updateStartProgram'
    })
  },
  computed: {
    ...mapGetters({
      //getCurrentMessage: 'getCurrentMessage',
      getWetBalance: 'getWetBalance',
      getDryBalance: 'getDryBalance',
      getPanelType: 'getPanelType',
      //getDefaultPanelNumber: 'getDefaultPanelNumber',
      //getActiveProgram: 'getActiveProgram',
      //getActiveProgramNumber: 'getActiveProgramNumber',
      //getWetBusyPanel: 'getWetBusyPanel'
    })
  },

  mounted() {}
})
</script>

<style scoped>
.page-title {
  padding-top: 0.02em;
  width: 530px;

  color: white;
  font-size: 23em;
  font-weight: normal;

  /* dev */
  display: flex;
	align-items: center;
	justify-content: center;
}
</style>
