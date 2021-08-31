<template>
  <!--  -->
  <!-- 
    .dropdown-content li>span {
    font-size: 34px;
    color: #0c0c0c;
    display: block;
    line-height: 22px;
    padding: 14px 16px;
}
   -->
  <div class="col s6">
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
        <span class="card-title">Тип панели:</span>
        <div class="input-field">
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(t, index) in types" :key="index" :value="t.id">
              <div class="dropdown-setting">
                {{ t.title }}
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
  name: 'setting-panel-type',
  data: () => ({
    select: null,
    current: null,
    title: '',

    types: [
      { id: 1, title: 'МОЙКА' },
      { id: 2, title: 'ПЫЛЕСОС' },
      { id: 3, title: 'ПОСТ ОПЛАТЫ' }
    ]
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true
    })
    M.updateTextFields()
  },
  methods: {
    /* ...mapGetters({
      getPanelType: 'getPanelType'
    }), */
    ...mapMutations({
      setPanelType: 'setPanelType'
    })
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType'
    })
  },
  watch: {
    current(typeId) {
      const { id, title } = this.types.find(t => t.id === typeId)
      this.current = id
      this.select = title
      /* dev */
      if (typeId === 1) this.setPanelType('wash')
      else if (typeId === 2) this.setPanelType('vaccum')
      else if (typeId === 3) this.setPanelType('payment')

      //console.log('panelType watch-->', this.getPanelType)
    }
  },

  created() {
    const panelType = this.getPanelType 
    let index
    if (panelType === 'wash') index = 0
    else if (panelType === 'vacuum') index = 1
    else if (panelType === 'payment') index = 2
    
    // crutch :(
    if (typeof index  === 'undefined') index = 0

    const { id, title } = this.types[index]
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
/* .dropdown {
    font-size: 24px; 
    color: #000000;
} */
</style>
