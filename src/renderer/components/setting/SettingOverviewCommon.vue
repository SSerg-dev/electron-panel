<template>
  <div>
    <!-- style="border: solid 3px #00B9E3;" -->
    <div
      class="card grey lighten-3"
      style="height: 220px; width: 48%; border: solid 3px #00b9e3; border-radius: 2rem"
    >
      <div class="card-content black-text">
        <span class="card-title"
          >{{ `Software_version` | localize }} {{ `: ${this.software}` }}</span
        >
        <span class="card-title"
          >{{ `Temperature` | localize }} {{ `: ${getTemperature} C` }}</span
        >

        <!-- <span class="card-title">Влажность: {{ `${getHumidity} %` }}</span> -->
        <span class="card-title"
          >{{ `Humidity` | localize }} {{ ` : ${getHumidity} %` }}</span
        >
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
    software: 'XX.XX.XX',
    temperature: null,
    humidity: null
  }),
  mounted() {
    this.software = this.getSwVersion,
    this.temperature = this.getTemperature
    this.humidity = this.getHumidity
    //  console.log('$$ setting-overview-common', this.temperature, this.humidity)
  },
  computed: {
    ...mapGetters({
      // getsoftware: 'software',
      getTemperature: 'getTemperature',
      getHumidity: 'getHumidity',
      getSwVersion: 'getSwVersion'

    })
  }
})
</script>
