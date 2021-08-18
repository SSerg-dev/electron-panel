<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="height: 150px; border: solid 3px #00B9E3; border-radius: 2rem;"
    >
      <div class="card-content black-text">
        <span class="card-title">В течение:</span>

        <p class="range-field">
          <input type="range" min="0" max="20" step="4" />
        </p>

      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: "setting-screen-tooltip",
  data: () => ({
    slider: null,
  }),
  mounted() {
    // this.slider = M.Range.init(this.$refs.slider, {});
    //this.slider = document.querySelectorAll("input[type=range]")
    //M.Range.init(this.slider, {})

    // console.log("this.slide-->", typeof this.slide);
  },
  methods: {
    ...mapGetters({
      /* getDefaultPanelNumber: "getDefaultPanelNumber", */
    }),
    ...mapMutations({
      /* setDefaultPanelNumber: "setDefaultPanelNumber", */
    }),
  },
  computed: {
    ...mapGetters({
      /* getPanelType: "getPanelType", */
    }),
  },
  watch: {
    current(numberId) {
      /* const { id, title } = this.numbers.find((n) => n.id === numberId);
      this.select = title;
      this.setDefaultPanelNumber(id); */
    },
  },
  created() {
    /* const defaultPanelNumber = this.getDefaultPanelNumber();
    const { id, title } = this.numbers[defaultPanelNumber - 1];
    this.current = id;
    this.select = title; */
  },
  beforeDestroy() {
    if (this.slider && this.slider.destroy) {
      this.slider.destroy();
    }
  },
});
</script>
