<template>
  <div>
    <!-- alarms -->
    <div
      class="card grey lighten-3"
      style="
        height: 150px;
        border: solid 3px #00b9e3;
        border-top-left-radius: 2rem;
        border-bottom-left-radius: 2rem;
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
      "
    >
      <div class="card-content black-text">
        <div class="card-title">
          <div style="margin-bottom: 0.5em">
            {{ `Show_alert_phone` | localize}} {{ `:` }}
          </div>
        </div>

        <input
          class="phone-title"
          align="left"
          contenteditable="true"
          v-model="phone"
          
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'wash-table-alarm-message',
  data: () => ({
    config: {},
    phone: '',
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    })
    M.updateTextFields()
  },
  methods: {
    ...mapGetters({
      getConfig: 'getConfig',
      getAlarmsPhone: 'getAlarmsPhone',
    }),
    ...mapMutations({
      setConfig: 'setConfig',
    }),
    show() {
      this.config = this.getConfig()
      this.phone = this.config.alarms.phone
    },
  }, // end methods
  watch: {
    phone(value) {
      this.config = this.getConfig()
      this.config.alarms.phone = value
      this.setConfig(this.config)
    }
  },
  created() {
    this.show()
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
})
</script>

<style scoped>
.card {
  width: 500px;
  margin-left: 36px;
}
.phone-title {
  position: relative;
  cursor: pointer;
  background-color: #b3e5fc;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  outline: none;
  height: 2rem;
  line-height: 3rem;
  width: 430px;
  font-size: 24px;
  font: 400 24px Arial;
  font-weight: 100;

  margin: 0 0 8px 0;
  padding: 8px;
  display: block;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 1;
}

textarea.materialize-textarea:focus:not([readonly]) {
  border-bottom: 1px solid #00B9E3;
  box-shadow: 0px 2px 4px #00b9e3;
}
</style>
