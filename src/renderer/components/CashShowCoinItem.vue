<template>
  <li>
    <div>{{ coin }}</div>
  </li>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: ['coin'],
  mounted() {
    //console.log('one item this.cost mounted-->', JSON.stringify(this.bill))
  }
})
</script>

<style scoped>
li {
  font-size: 1em;
  font-weight: bold; 
  color:  #00B9E3;
  margin-bottom: 0em;
}
</style>
