<template>
  <div class="col s6">
    <!-- acceptor -->
    <div class="card grey lighten-3" style="height: 160px; border: solid 3px #00B9E3; border-radius: 2rem;">
      <div class="card-content black-text">
        <!--  -->
        <div class="switch">
          <label>
            <input type="checkbox" v-model="IsAcceptorInstalled" />
            <span class="lever"></span>
          </label>
        </div>
        <!--  -->
        <span class="card-title" style="margin-top: -20px">Купюроприемник установлен:</span>  
        <div class="input-field" style="margin-top: -16px">
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(a, index) in acceptors" :key="index" :value="a.id">
              <div class="dropdown-setting">
              {{ a.title }}
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
  name: 'setting-payment-acceptor',
  data: () => ({
    select: null,
    current: null,
    title: '',
    IsAcceptorInstalled: false,

    acceptors: [
      { id: 1, title: 'DEFAULT' },
      { id: 2, title: 'ICT XBA' }
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
      getAcceptorInstalled: 'getAcceptorInstalled'
    })
  },
  watch: {
    current(acceptorId) {
      //console.log('acceptorId-->', acceptorId)
      const { id, title } = this.acceptors.find(a => a.id === acceptorId)
      this.select = title
    }
  },
  created() {
    this.IsAcceptorInstalled = this.getAcceptorInstalled()

    let index
    this.IsAcceptorInstalled === true
    ? index = 0
    : index = 1

    const { id, title } = this.acceptors[0] // index?
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

<style scoped>

.switch {
  padding-bottom: 1.5rem;
}
</style>
