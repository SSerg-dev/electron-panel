<template>
    <!-- <li v-if="this.cost.display === '1' && this.cost.mode !== 'hide' "> -->
    <li class="waves-effect">  
    <div class="row item description" >
      <div class="col s6 title">{{cost.title}}</div>
      <div v-if="cost.priceTurbo === +0 " class="col s4 price"  >{{ `${cost.price}` }}</div>
      <div v-if="cost.priceTurbo > +0 " class="col s4 price"  >{{ `${cost.price + '  /  ' + cost.priceTurbo}` }}</div>

      <div class="col s1" v-if="this.cost.mode === 'x2' "><img src="@/assets/svg/x2.svg" /></div>
      <div class="col s1" v-if="this.cost.mode === 'turbo' "><img src="@/assets/svg/turbo.svg" /></div>
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

/* li:nth-child(odd) {
  background-color:rgb(21, 21, 21);
  color:white;
  width: 88%;
} */
li {
  background-color:rgb(21, 21, 21);
  color:white;
  width: 88%;
}

.row {
  width: 100%;
  font-size: 3rem;
  padding-bottom: 0rem;
  padding-top: 0rem;
  padding-left: 2rem;
  margin-top: 0rem;
  margin-bottom: 0rem;
  border-radius:  2px;

}
.title {
   text-align: left;
}
.price {
   text-align: right;
}
.item {
  width: 100%;
}
/* Plumb-Medium */
.description {
     font-family: "Plumb-Medium";
     font-size: 3rem;
     font-weight: bold;
}


</style>
