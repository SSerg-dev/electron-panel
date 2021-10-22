<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="height: 150px; 
      border: solid 3px #00B9E3; 
      border-top-right-radius: 2rem;
      border-bottom-right-radius: 2rem;
      border-left-style: hidden;
      "
    >
      <div class="card-content black-text">
        <span class="card-title">ПОСТ ОПЛАТЫ:</span>
        <div class="input-field">
          <!-- v-if="this.getPanelType === ''" -->
          <div>
            <!-- <div>{{ `${this.getPanelType}` }}</div> -->
            <select
              class="page-title white-text"
              ref="select"
              v-model="current"
            >
              <option v-for="(p, index) in payments" :key="index" :value="p.id">
                <div class="dropdown-setting">
                  {{ p.title }}
                </div>
              </option>
            </select>
          </div>

          <!-- dev -->

          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'setting-panel-payment',
  data: () => ({
    select: null,
    current: null,
    title: '',
    payments: [
      { id: 1, title: 'ПОСТ ОПЛАТЫ №1' },
      { id: 2, title: 'ПОСТ ОПЛАТЫ №2' }
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
      // getDefaultPanelNumber: 'getDefaultPanelNumber'
    }),
    ...mapMutations({
      // setDefaultPanelNumber: 'setDefaultPanelNumber'
      setVacuumPayment: 'setVacuumPayment'
    })
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType'
    })
  },
  watch: {
    current(paymentId) {
      console.log('paymentId-->', paymentId)
      const { id, title } = this.payments.find(p => p.id === paymentId)
      this.select = title

      this.setVacuumPayment(id)
    }
  },
  created() {
    const defaultPanelPayment = 1
    const { id, title } = this.payments[defaultPanelPayment - 1]
    this.current = id
    this.select = title
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
})
</script>
