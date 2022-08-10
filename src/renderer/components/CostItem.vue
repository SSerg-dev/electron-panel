<template>
  <li>
    <div class="row description">
      <div class="col s7 title">

        
        <!-- { 'green-color': cost.color }, -->
        <div
          :class="[
            
            { 'color-color': cost.color },
            { 'card-content white-text': !cost.color }
          ]"
        >
          {{ `${cost.title}` | localize }}
          <!-- {{ `${cost.title}`}} -->
        </div>


      </div>

      <div
        v-if="cost.priceTurbo === +0"
        class="col s2"
        style="padding-left: 1.3em"
      >
        {{ `${cost.price}` }}
      </div>
      <div v-if="cost.priceTurbo > +0" class="col s3 price">
        {{ `${cost.price + '  /  ' + cost.priceTurbo}` }}
      </div>

      <div class="col s1" v-if="this.cost.mode === 'turbo'">
        <div class="turbo">
          Turbo
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    cost: {
      type: Object,
      required: true
    }
  },
  mounted() {
    // console.log('++one item this.cost mounted-->', this.cost)
  }
})
</script>

<style scoped>
li {
  width: 92%;
  padding-left: 0.4em;
  background-color: rgb(21, 21, 21);
  color: white;
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
.turbo {
  color: red;
  font-weight: bold;
  font-style: italic;
  font-size: 0.8em;
  padding-top: 0.2em;
}
.green-color {
  color: rgb(118, 255, 3);
  font-weight: bold;
  font-size: 1em;
}
.red-color {
  color: rgb(255,3,3);
  font-weight: bold;
  font-size: 1em;
}
.x2-color {
  color: rgb(191,0,229);
  font-weight: bold;
  font-size: 1em;
}
.color-color {
  color: rgb(255,63,155);
  font-weight: bold;
  font-size: 1em;
}


.description {
  font-family: 'Plumb-Medium';
  font-size: 3.8em;
  font-weight: bold;
}
</style>
