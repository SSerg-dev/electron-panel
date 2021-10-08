<template>
  <div class="col s6">
    <!-- acceptor -->
    <!-- style="height: 190px; border: solid 3px #00B9E3;" -->
    <div
      class="card grey lighten-3"
      style="
      height: 150px; 
      border: solid 3px #00B9E3; 
      border-top-right-radius: 2rem;
      border-bottom-right-radius: 2rem;
      border-left-style: hidden;      
      "
    >
      <div class="card-content black-text">
        <span class="card-title">Принимать монеты:</span>
        <div class="input-field">
          <select
            multiple
            class="page-title white-text"
            ref="select"
            v-model="current"
          >
            <option v-for="(c, index) in coins" :key="index" :value="c.id">
              <div class="dropdown-setting">
                {{ c.title }}
              </div>
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'setting-payment-coin',
  data: () => ({
    select: null,
    current: [],
    title: [],

    coins: [
      { id: 1, title: '1', value: 1, selected: false },
      { id: 2, title: '2', value: 2, selected: false },
      { id: 3, title: '5', value: 5, selected: false },
      { id: 4, title: '10', value: 10, selected: false },
      { id: 5, title: '25', value: 25, selected: false }
    ]
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true
    })
    M.updateTextFields()
  },
  methods: {
    ...mapGetters({
      getDefaultCoinBiils: 'getDefaultCoinBiils'
    }),
    ...mapMutations({
      setDefaultCoinBiils: 'setDefaultCoinBiils'
    })
  },
  watch: {
    current(coinIds) {
      /* coinIds.forEach(b => {
        this.select = b.title
      }) */
      const selected = coinIds.map( id => {
        const result = this.coins.find(item => item.id === id)
        return +result.title
      }) 
      // console.log('++selected-->', selected)
      this.setDefaultCoinBiils(selected)
      
    }
  },
  created() {
    const defaultBiils = this.getDefaultCoinBiils()
    //console.log("++defaultBiils-->", JSON.stringify(defaultBiils));

    for (let i = 0; i < defaultBiils.length; i++) {
      const value = defaultBiils[i]
      const index = this.coins.findIndex(c => c.value === value)
      this.coins[index].selected = true
    }
    for (let i = 0; i < this.coins.length; i++) {
      if (this.coins[i].selected === true) {
        this.current[i] = this.coins[i].id
        this.select = this.coins[i].title
      }
    }
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
})
</script>

<style scoped>
/* span {
  color: red;
} */
</style>
