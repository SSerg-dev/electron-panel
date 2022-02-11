<template>
  <div>
    <div
      class="card grey lighten-3"
      style="
      border: none; 
      width: 280px; height: 80px; 
      margin-left: 0em;
      margin-top: -0.4em;
      padding-left: 1em; 
      "
    >
      <div class="card-content black-text">
        <div class="row" style="margin-top: -0.8em;">

          <div class="col s1" style="padding-top: 0.5em;">
            <div style="margin-left: -1em" class="display">
              {{ tokenLabel }} 
            </div>
          </div>

          <div class="col s3" >
            <button
              class="btn waves-effect waves-light lighten-3 white-text button-setting"
              type="submit"
              @click="setNumber('-1')"
            >
              <i class="large material-icons">arrow_downward</i>
            </button>
          </div>

          <div class="col s3" style="padding-top: 0.5em;">
            <div style="margin-left: 0.85em" class="display">
              {{ display }}
            </div>
          </div>

          <div class="col s2">
            <button
              class="btn waves-effect waves-light lighten-3 white-text button-setting"
              type="submit"
              @click="setNumber('+1')"
            >
              <i class="large material-icons">arrow_upward</i>
            </button>
          </div>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'setting-screen-tooltip',
  props: ['token'],
  data: () => ({
    tokens: [ 'I' , 'II', 'III'],
    tokenLabel: '',
    
    amount: 0,
    amountString: '',
    display: 0,
    min: 0,
    max: 10,
    step: 1
  }),
  mounted() {

  },
  methods: {
    setNumber(num) {
      if (num >= 0 || num == -1) {
        if (this.amount + parseInt(num) <= this.max)
          this.amount += parseInt(num) * parseInt(this.step)
      }

      if (this.amount < this.min) this.amount = this.min
      if (this.amount > this.max) this.amount = this.max
      this.amountString = this.amount.toString()
      this.display = this.amountString

      const payload = { index: this.token, value: this.amount}
      this.setCoinTokens(payload)

      //const coinTokens = this.getCoinTokens
      //console.log('???????coinTokens-->', coinTokens[0], coinTokens[1], coinTokens[2])
      
    },
    ...mapMutations({
      setCoinTokens: 'setCoinTokens'
    })
  },
  computed: {
    ...mapGetters({
      getCoinTokens: 'getCoinTokens'
    })
  },
  created() {
    const coinTokens = this.getCoinTokens
    //console.log('coinTokens-->', coinTokens)
    /* dev */
    /* switch (this.token) {
        case 1:
          this.tokenLabel = this.tokens[0]
          this.amount = coinTokens[0]
          break
        case 2:
          this.tokenLabel = this.tokens[1]
          this.amount = coinTokens[1]
          break
        case 3:
          this.tokenLabel = this.tokens[2]
          this.amount = coinTokens[2]
          break  
        default:
          break
      } */
      this.tokenLabel = this.tokens[this.token - 1]
      this.amount = coinTokens[this.token - 1]
      this.display = this.amount.toString()

    /*     */


  },

})

</script>


<style scoped>
.display {
  font-size: 1.6em;
}
/* .btn {
  font-size: 1em;
  border: solid 1px black;
  background-color: #26a69a;
  
} */
td {
  width: 128px;
  /* border: solid 1px black; */
}
.button-setting {
  border: solid 1px white;
  font-size: 1.5em;
  border-radius: 50%;
  background-color: #00b9e3;
  height: 2.5em;
  width: 2.5em;
  padding-bottom: 0em;
  
}
/* .material-icons {
  
} */
</style>
