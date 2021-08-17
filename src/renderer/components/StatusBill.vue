<template>
  <div>
    <section>
      <div align="center" class="page-title">
        <div class="info-title" style="margin-bottom: 4em;">
          <!-- this.getStatusBill -->
          <p v-if="this.getStatusBill > -1" align="center">
            {{ `${this.getStatusBillMessages()}` }}
          </p>
        </div>

        <div v-if="this.seconds" class="timer-title">
          {{ `${this.seconds}` }}
        </div>

        <div>
          <img src="/imgs/arrow/arrow.png" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import EventBus from '@/bus/EventBus'

export default Vue.extend({
  name: 'setting-panel-type',
  data: () => ({
    intervalMainMenu: null,
    seconds: 0
  }),
  computed: {
    ...mapGetters({
      //getWetBusyPanel: 'getWetBusyPanel',
      getSecondsGotoProgramMenu: 'getSecondsGotoProgramMenu',
      getStatusBill: 'getStatusBill'
    }),
    timer: function() {
      return this.seconds
    }
  },
  watch: {
    /* timer(value) {
      console.log('watch value -->', value)
    } */
  },
  methods: {
    gotoProgramMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        //this.setSecondsStatusTimer(seconds)
        this.seconds = seconds
        seconds--
        if (seconds < 0) {
          this.$router.push('/program')
        }
      }, 1000)
    },
    ...mapActions({
      fetchStatus: 'fetchStatus'
    }),
    ...mapMutations({
      //setSecondsStatusTimer: 'setSecondsStatusTimer'
      setStatusBillMessagesIndex: 'setStatusBillMessagesIndex'
    }),
    ...mapGetters({
      getStatusBillMessages: 'getStatusBillMessages'
    })
    /* submitHandler(program) {
      console.log(`StatusBill--> clicked --> ${program}`)
      if (program === 'confirm') {
        this.messageIndex = 1
      }
    } */
  },
  mounted() {
    //EventBus.$on('submit', this.submitHandler)

    // get status bill operation from outside device
    // and set status in store setStatusBill()
    this.fetchStatus()

    // calc messageIndex for each message
    // todo switch case ... 
    const index = this.getStatusBill - 1

    // set messageIndex
    this.setStatusBillMessagesIndex(index)

    this.gotoProgramMenu(this.getSecondsGotoProgramMenu)
    //this.gotoMainMenu(4)
  },
  beforeDestroy() {
    clearInterval(this.intervalMainMenu)
  },

  components: {}
})
</script>

<style scoped>
.locate {
  position: relative;
}
.page-title {
  position: absolute;
  margin-top: -10em;
  margin-left: 5em;

  top: 0%;
  left: 0%;
  color: white;
  text-align: right;

  font-family: 'Plumb-Medium';
  font-weight: bold;
  z-index: 1;
}
.info-title {
  width: 800px;
  padding-top: 0.5em;
  margin-top: 0em;
  margin-left: 0em;
  font-size: 3em;
}
.timer-title {
  width: 800px;
  padding-top: 0em;
  margin-top: 0em;
  margin-left: -6em;
  font-size: 4em;
}

/* [v-cloak] {
  display: none;
} */
</style>
