<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="height: 150px; border: solid 3px #00B9E3; border-radius: 2rem;"
    >
      <div class="card-content black-text">
        <span class="card-title">Номер панели:</span>
        <div class="input-field">
          <!-- <div>{{ `${this.getPanelType}` }}</div> -->
          <select class="page-title white-text" ref="select" v-model="current">
            <option v-for="(n, index) in numbers" :key="index" :value="n.id">
              <div class="dropdown-setting">
                {{ n.title }}
              </div>
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: "setting-panel-number",
  data: () => ({
    select: null,
    current: null,
    title: "",

    numbers: [
      { id: 1, title: "ПАНЕЛЬ №1" },
      { id: 2, title: "ПАНЕЛЬ №2" },
      { id: 3, title: "ПАНЕЛЬ №3" },
      { id: 4, title: "ПАНЕЛЬ №4" },
      { id: 5, title: "ПАНЕЛЬ №5" },
      { id: 6, title: "ПАНЕЛЬ №6" },
      { id: 7, title: "ПАНЕЛЬ №7" },
      { id: 8, title: "ПАНЕЛЬ №8" },
      { id: 9, title: "ПАНЕЛЬ №9" },
    ],
    /* payments: [
      { id: 1, title: 'ПОСТ ОПЛАТЫ №1' },
      { id: 2, title: 'ПОСТ ОПЛАТЫ №2' }
    ] */
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    });
    M.updateTextFields();
    // console.log('++this.select-->', this.select)
  },
  methods: {
    ...mapGetters({
      getDefaultPanelNumber: "getDefaultPanelNumber",
    }),
    ...mapMutations({
      setDefaultPanelNumber: "setDefaultPanelNumber",
    }),
  },
  computed: {
    ...mapGetters({
      getPanelType: "getPanelType",
    }),
  },
  watch: {
    current(numberId) {
      //console.log('numberId-->', numberId)
      const { id, title } = this.numbers.find((n) => n.id === numberId);
      this.select = title;
      this.setDefaultPanelNumber(id);
    },
  },
  created() {
    const defaultPanelNumber = this.getDefaultPanelNumber();
    const { id, title } = this.numbers[defaultPanelNumber - 1];
    this.current = id;
    this.select = title;
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
});
</script>
