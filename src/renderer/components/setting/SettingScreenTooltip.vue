<template>
  <div class="col s6">
    <div
      class="card grey lighten-3"
      style="height: 150px; border: solid 3px #00b9e3; border-radius: 2rem"
    >
      <div class="card-content black-text">
        <div class="row">
          <div class="col s4">
            <span class="card-title">В течение:</span>
          </div>

          <div class="col s2">
            <button
              class="
                btn
                waves-effect waves-light
                lighten-3
                white-text
                button-setting
              "
              type="submit"
              @click="setNumber('-1')"
            >
              <i class="large material-icons">arrow_downward</i>
            </button>
          </div>

          <div class="col s3">
            <div style="margin-left: 10px" class="display">
              {{ display + ` сек.` }}
            </div>
          </div>

          <div class="col s2">
            <button
              class="
                btn
                waves-effect waves-light
                lighten-3
                white-text
                button-setting
              "
              type="submit"
              @click="setNumber('+1')"
            >
              <i class="large material-icons">arrow_upward</i>
            </button>
          </div>
        </div>
        <p class="range-field">
          <input
            id="slider"
            name="slider"
            type="range"
            min="0"
            max="10"
            step="1"
            ref="slider"
            v-model="current"
          />
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
    current: 0,

    amount: 0,
    amountString: "",
    display: 0,
    min: 0,
    max: 10,
    step: 1,
  }),
  mounted() {
    this.setNumber(this.min.toString());
  },
  methods: {
    setNumber(num) {
      if (num >= 0 || num == -1) {
        if (this.amount + parseInt(num) <= this.max)
          this.amount += parseInt(num) * parseInt(this.step);
      }

      if (this.amount < this.min) this.amount = this.min;
      if (this.amount > this.max) this.amount = this.max;
      this.amountString = this.amount.toString();
      this.display = this.amountString;
      this.current = this.amount;

    },
    ...mapMutations({
      setSecondsGotoPopupMenu: "setSecondsGotoPopupMenu",
    }),
  },

  computed: {
    ...mapGetters({
      getSecondsGotoPopupMenu: "getSecondsGotoPopupMenu",
    }),
  },
  watch: {
    current(num) {
      this.amount = parseInt(num);
      if (this.amount < this.min) this.amount = this.min;
      if (this.amount > this.max) this.amount = this.max;
      this.amountString = this.amount.toString();
      this.display = this.amountString;
      this.current = this.amount;

      this.setSecondsGotoPopupMenu(this.amount)
      //console.log('++this.getSecondsGotoPopupMenu-->', this.getSecondsGotoPopupMenu)
    },
  },
  created() {
    const secondsGotoPopupMenu = this.getSecondsGotoPopupMenu;
    this.amount = secondsGotoPopupMenu;
    // console.log('this.amount-->', this.amount)
  },
});
</script>

<style scoped>
.display {
  font-size: 1.5em; /* 24px; */
  padding-left: 0.5em;
}
.btn {
  font-size: 15px;
  border: solid 1px black;
  background-color: #26a69a;
}
.button-setting {
  border: solid 3px #00b9e3;
  font-size: 24px;
  border-radius: 2rem;
}
.material-icons {
  z-index: 1000;
}
</style>
