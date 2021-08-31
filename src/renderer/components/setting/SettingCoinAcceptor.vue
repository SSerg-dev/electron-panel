<template>
  <div class="col s6">
    <!-- coin acceptor -->
    <div
      class="card grey lighten-3"
      style="
      height: 150px; 
      border: solid 3px #00B9E3; 
      border-top-left-radius: 2rem;
      border-bottom-left-radius: 2rem;
      border-right-style: hidden;

      "
    >
      <div class="card-content black-text">
        <span class="card-title" style="margin-top: 0.5em;">Тип:</span>

        <div class="input-field" style="margin-top: 0em">
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(a, index) in acceptors" :key="index" :value="a.id">
              <div class="dropdown-setting">
                {{ a.title }}
              </div>
            </option>
          </select>
        </div>

        <!--    -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'setting-coin-acceptor',
  data: () => ({
    select: null,
    current: null,
    title: '',
    //isAcceptorInstalled: false,
    isCoinAcceptorInstalled: false,

    acceptors: [
      { id: 1, title: 'CCTALK1' },
      { id: 2, title: 'NRI G-13 USB' }
    ]
  }),
  mounted() {
    /* dev */
    //const type = this.getCoinAcceptorType //.toUpperCase()
    //console.log('++type-->', this.type)

    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true
    })
    M.updateTextFields()
  },
  computed: {
    ...mapGetters({
      // getAcceptorInstalled: 'getAcceptorInstalled',
      getCoinAcceptorInstalled: 'getCoinAcceptorInstalled',
      getCoinAcceptorType: 'getCoinAcceptorType'
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
    this.isCoinAcceptorInstalled = this.getCoinAcceptorInstalled

    const type = this.getCoinAcceptorType.toUpperCase()
    // console.log('++type-->', type)

    if (type) {
      let index
      type === 'CCTALK1' 
        ? index = 0 
        : index = 1

      const { id, title } = this.acceptors[index]
      this.current = id
      this.select = title
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
.switch {
  padding-bottom: 1.5rem;
}
</style>
