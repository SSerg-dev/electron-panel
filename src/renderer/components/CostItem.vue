<template>
    <!-- <li v-if="this.cost.display === '1' && this.cost.mode !== 'hide' "> -->
    <li>  
    <div class="row description" >
      <div class="col s7 title">{{cost.title}}</div>
      <div v-if="cost.priceTurbo === +0 " class="col s2" style="padding-left: 1.05em"  >{{ `${cost.price}` }}</div>
      <div v-if="cost.priceTurbo > +0 " class="col s3 price"  >{{ `${cost.price + '  /  ' + cost.priceTurbo}` }}</div>

      <!-- <div class="col s1" v-if="this.cost.mode === 'x2' "><img src="@/assets/svg/x2.svg" /></div>
      <div class="col s1" v-if="this.cost.mode === 'turbo' "><img src="@/assets/svg/turbo.svg" /></div> -->
      <div class="col s1" v-if="this.cost.mode === 'turbo' ">
        <div style="color: red; font-weight: bold; font-style: italic;">
          Turbo
        </div>
        
      </div>

    </div>
  </li>
</template>

<script  >

import Vue from 'vue'
export default Vue.extend({
  props: {
    cost: {
      type: Object,
      required: true,
    },
  },
  mounted() {
     // console.log('one item this.cost mounted-->', this.cost)
  },
})
</script>

<style scoped>

/* 
li {
  font-size: 1em;
  font-weight: bold; 
  color:  #00B9E3;
  margin-bottom: 0em;
}
*/
li {
  width: 92%;
  padding-left: 0.4em;
  background-color:rgb(21, 21, 21);
  color:white;
  
}

.row {
  width: 100%;
}
.title {
   text-align: left;
}
.price {
   text-align: right;
}

/* Plumb-Medium */
.description {
     font-family: "Plumb-Medium";
     font-size: 4.0em;
     font-weight: bold;
}


</style>
