<template>
  <div>
    <!-- dev -->

    <!--     -->
    <!-- <div style="background: white; margin-left: 10%; margin-top: 28em; width: 80%; border-radius: 2%" -->
    <section>
      <div class="invoice-style">
        <InvoiceBill />
      </div>
      <div class="collection-item " @click="payUp('cash')">
          <div class="card white waves-effect button-style">
            <div class="card-content black-text button-content-style">
              {{ `ПРОДОЛЖИТЬ`}}
            </div>
          </div>
       </div>

    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import InvoiceBill from '@/components/InvoiceBill'

export default Vue.extend({
  data: () => ({
    name: 'invoice',
  }),
  computed: {},
  methods: {},
  mounted() {
    // console.log('$$ Invoice')
  },
  components: {
    InvoiceBill,
  },
})
</script>

<style scoped>

  .invoice-style {
  background: white; 
  margin-left: 10%; 
  margin-top: 28em; 
  width: 80%; 
  
  border: solid 6px #00b9e3;
  border-radius: 2em;
  box-shadow: 0px 10px 20px #00b9e3;

}
.collection-item {
  margin-top: 3.5em;
  margin-left: 20em;
  background-color: #121212;
  border-color: #121212;
}
.button-style {
  padding-left: 2.5em;
  width: 420px;
  height: 100px;
  border: solid 6px #00b9e3;
  border-radius: 4em;
  box-shadow: 0px 10px 20px #00b9e3;
}
.button-content-style {
  font-size: 3em;
  padding-top: 0.3em;
  display: flex;
  align-items: center;
  justify-content: left;
}
</style>

