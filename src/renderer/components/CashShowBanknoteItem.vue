<template>
  <li>
    <div>{{ bill }}</div>
  </li>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: ['bill'],
  mounted() {
    //console.log('one item this.cost mounted-->', JSON.stringify(this.bill))
  }
})
</script>

<style scoped>
li {
  font-size: 1em;
  font-weight: bold; 
  color: white; /*  #00B9E3; */
  margin-bottom: 0em;
}
</style>
