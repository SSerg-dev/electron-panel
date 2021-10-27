<template>
  <div>
    <div class="page-title">
      <div v-if="this.getPanelType === 'wash'">
        {{ `${ getWetBalance }` }}
      </div>
      <div v-if="this.getPanelType === 'vacuum'">
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
    })
  },
  computed: {
    ...mapGetters({  
      getWetBalance: 'getWetBalance',
      getDryBalance: 'getDryBalance',
      getPanelType: 'getPanelType',
    })
  },
  watch: {
    getWetBalance(flag) {
      console.log('getWetBalance-->', this.getWetBalance)
    },
    getDryBalance(flag) {
      console.log('getDryBalance-->', this.getDryBalance)
    }

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
