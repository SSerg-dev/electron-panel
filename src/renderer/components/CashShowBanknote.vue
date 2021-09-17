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
        <span class="card-title">Принимать:</span>
        <div class="input-field">
          <select
            multiple
            class="page-title white-text"
            ref="select"
            v-model="current"
          >
            <option v-for="(b, index) in bills" :key="index" :value="b.id">
              <div class="dropdown-setting">
                {{ b.title }}
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
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "setting-payment-bill",
  data: () => ({
    select: null,
    current: [],
    title: [],

    bills: [
      { id: 1, title: "10 ₽", value: 10, selected: false },
      { id: 2, title: "50 ₽", value: 50, selected: false },
      { id: 3, title: "100 ₽", value: 100, selected: false },
      { id: 4, title: "200 ₽", value: 200, selected: false },
      { id: 5, title: "500 ₽", value: 500, selected: false },
    ],
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    });
    M.updateTextFields();
  },
  methods: {
    ...mapGetters({
      getDefaultBiils: "getDefaultBiils",
    }),
  },
  watch: {
    current(billIds) {
      billIds.forEach((b) => {
        this.select = b.title;
      });
    },
  },
  created() {
    const defaultBiils = this.getDefaultBiils();
    // console.log("++defaultBiils-->", JSON.stringify(defaultBiils));

    for (let i = 0; i < defaultBiils.length; i++) {
      const value = defaultBiils[i];
      const index = this.bills.findIndex((c) => c.value === value);
      this.bills[index].selected = true;
    }
    for (let i = 0; i < this.bills.length; i++) {
      if (this.bills[i].selected === true) {
        this.current[i] = this.bills[i].id;
        this.select = this.bills[i].title;
      }
    }
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
});
</script>

<style scoped>
/* span {
  color: red;
} */
</style>
