<template>
  <div class="col s6">
    <!-- currency currencies -->
    <div
      class="card grey lighten-3"
      style="height: 150px; border: solid 3px #00B9E3; border-radius: 2rem;"
    >
      <div class="card-content black-text">
        <span class="card-title">Валюта:</span>
        <div class="input-field">
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(с, index) in currencies" :key="index" :value="с.id">
              <div class="dropdown-setting">
                {{ с.title }}
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
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'setting-payment-currency',
  data: () => ({
    select: null,
    current: null,
    title: '',

    currencies: [
      { id: 1, title: 'Российский рубль' },
      { id: 2, title: 'Английский фунт' },
      { id: 3, title: 'Белорусский рубль' },
      { id: 4, title: 'Евро' }
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
      getDefaultCurrency: 'getDefaultCurrency'
    })
  },
  watch: {
    current(currencyId) {
      //console.log('currencyId-->', currencyId)
      const { id, title } = this.currencies.find(c => c.id === currencyId)
      this.select = title
    }
  },
  created() {
    const defaultCurrency = this.getDefaultCurrency()
    /* dev */
    if(defaultCurrency.title === 'Российский рубль') {
      this.current = 1
      this.select = 'Российский рубль'  
    }
    /* const { id, title } = this.currencies[defaultCurrency]
    this.current = id
    this.select = title */
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
})
</script>
