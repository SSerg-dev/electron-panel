<template>
  <div class="col s6">
    <!-- style="border: solid 3px #00B9E3;" -->
    <div class="card grey lighten-3" style="height: 200px; border: solid 3px #00B9E3; border-radius: 2rem;">
      <div class="card-content black-text">

        <span class="card-title">Версия ПО: {{ `${this.software}` }}</span> 

        <span class="card-title">Температура: {{ `${getTemperature} C` }}</span>
        
        <span class="card-title">Влажность: {{ `${getHumidity} %` }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'setting-overview-common',
  data: () => ({
    software: '2.0.0.1',
    //temperature: null,
    //humidity: null,

  }),
  mounted() {
    //this.temperature = this.getTemperature   
    //this.humidity = this.getHumidity
    //console.log('this.humidity-->', this.humidity)

  },
  computed: {
    ...mapGetters({
      getsoftware: 'software',
      getTemperature: 'getTemperature',
      getHumidity: 'getHumidity',
    })
  },


})
</script>

