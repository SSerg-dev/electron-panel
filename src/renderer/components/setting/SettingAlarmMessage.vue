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
        <div
          class="card-title"
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          "
        >
          <!-- <div>{{ `Показать cообщения при аварии` }} {{ `:` }}</div> -->
          <div>{{ `Show_alert_message` | localize }} {{ `:` }}</div>
        </div>

        <div class="input-field">
          <select
            multiple
            class="page-title white-text"
            ref="select"
            v-model="current"
          >
            <option v-for="(m, index) in messages" :key="index" :value="m.id">
              <div class="dropdown-setting">
                <!-- {{ m.title | localize }} -->
                {{ m.id }}
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
  name: 'wash-table-alarm-message',
  data: () => ({
    select: null,
    current: [],
    title: [],

    config: {},
    alarms: {},
    phone: '',

    messages: [],
    numbers: [],
    messagesMask: [],
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
      getAlarmsMessages: 'getAlarmsMessages',
      getAlarmsPhone: 'getAlarmsPhone',
    }),
    ...mapMutations({
      setAlarmsMessages: 'setAlarmsMessages',
      setConfig: 'setConfig'
    }),
    show() {
      this.config = this.getConfig()
      this.messagesMask = this.config.alarms.messages
      const allMessages = this.getAlarmsMessages()

      this.messages = allMessages.map((message, index) => {
        return {
          id: index + 1,
          title: message,
          value: '',
          selected: this.messagesMask.includes(index + 1) ? true : false,
        }
      })
      
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i].selected === true) {
          this.current[i] = this.messages[i].id
          this.select = this.messages[i].title
        }
      }

    },
  }, // end methods
  watch: {
    current(ids) {
      this.config = this.getConfig()
      this.config.alarms.messages = ids
      this.setConfig(this.config)
    },
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
}

</style>
