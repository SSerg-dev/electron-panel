<template>
  <div>
    <!-- style="height: 150px; border: solid 3px #00b9e3; border-radius: 2rem" -->
    <div
      class="card grey lighten-3"
      style="
      height: 168px; 
      border: solid 3px #00b9e3; 
      border-radius: 2em;
      "
    >
      <div class="card-content black-text">
        <!-- row 01 -->
        <div class="row" style="height: 1em; ">
          <!-- dev -->
          <div class="col s1">
            <div class="switch" style="padding-top: 6px;">
              <label>
                <input type="checkbox" v-model="isTooltipInstalled" />
                <span class="lever"></span>
              </label>
            </div>
          </div>
          <!--     -->
          <div class="col s11">
            <span class="card-title"
              >Показывать всплывающие подсказки при переключении программ</span 
            >
          </div>
        </div>
        <!-- end row 01 -->

        <!-- row 02 -->
        <div v-if="isTooltipInstalled" class="row">
          

          <div class="col s5">
            <span class="card-title" style="padding-top: 6px; padding-left: 11.3em;">в течение:</span>
          </div>

          <div class="col s1">
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
            <div style="margin-left: 2.5em" class="display">
              {{ display + ` сек.` }}
            </div>
          </div>

          <div class="col s1">
            <button
              class="
                btn
                waves-effect waves-light
                lighten-3
                white-text
                button-setting
              "
              style="margin-left: 0em"
              type="submit"
              @click="setNumber('+1')"
            >
              <i class="large material-icons">arrow_upward</i>
            </button>
          </div>
        </div>
        
        <!-- end row 02 -->
        
        <!-- row 03 -->


        <div v-if="isTooltipInstalled" class="row" style="margin-top: -1em;">
          <div class="col s1" style="font-size: 2em; padding-left: 2.0em; " >{{ min }}</div>

          <div class="col s10">
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

          <div class="col s1" style="font-size: 2em; padding-left: 0.5em">{{max}}</div>

        </div>
        <!-- end row 03 -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'setting-screen-tooltip',
  data: () => ({
    isTooltipInstalled: false,
    slider: null,
    current: 0,

    amount: 0,
    amountString: '',
    display: 0,
    min: 0,
    max: 10,
    step: 1
  }),
  mounted() {
    this.setNumber(this.min.toString())
  },
  methods: {
    setNumber(num) {
      if (num >= 0 || num == -1) {
        if (this.amount + parseInt(num) <= this.max)
          this.amount += parseInt(num) * parseInt(this.step)
      }

      if (this.amount < this.min) this.amount = this.min
      if (this.amount > this.max) this.amount = this.max
      this.amountString = this.amount.toString()
      this.display = this.amountString
      this.current = this.amount
    },
    ...mapMutations({
      setSecondsGotoPopupMenu: 'setSecondsGotoPopupMenu'
    }),
    ...mapGetters({
      getTooltipInstalled: 'getTooltipInstalled',
    })
  },

  computed: {
    ...mapGetters({
      getSecondsGotoPopupMenu: 'getSecondsGotoPopupMenu'
    })
  },
  watch: {
    current(num) {
      this.amount = parseInt(num)
      if (this.amount < this.min) this.amount = this.min
      if (this.amount > this.max) this.amount = this.max
      this.amountString = this.amount.toString()
      this.display = this.amountString
      this.current = this.amount

      this.setSecondsGotoPopupMenu(this.amount)
      //console.log('++this.getSecondsGotoPopupMenu-->', this.getSecondsGotoPopupMenu)
    }
  },
  created() {
    this.isTooltipInstalled = this.getTooltipInstalled()

    const secondsGotoPopupMenu = this.getSecondsGotoPopupMenu
    this.amount = secondsGotoPopupMenu
    // console.log('this.amount-->', this.amount)

  }
})
</script>

<style scoped>
.display {
  font-size: 2em; /* 24px; */
  padding-left: 1.2em;
}
.btn {
  font-size: 1em;
  border: solid 1px black;
  background-color: #26a69a;
}
.button-setting {
  border: solid 3px #00b9e3;
  font-size: 1.5em;
  border-radius: 2em;
  height: 2em;
  width: 6em;
}
.material-icons {
  z-index: 1000;
}
</style>
