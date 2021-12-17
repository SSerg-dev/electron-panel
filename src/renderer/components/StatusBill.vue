<template>
  <div>
    <section>
      <div align="center" class="page-title">
        <div class="info-title" style="margin-bottom: 4em;">
          <h3>
            <div align="center">
              {{ ` ${this.getStatusBillMessages} ` }}
            </div>

            <div
              v-if="this.seconds"
              align="center"
              style="font-size: 2em; padding-top: 2em;"
            >
              {{ `${this.seconds}` }}
            </div>
          </h3>
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
    seconds: 42,
    cardMessageIndex: 5,
    card: 0
  }),
  computed: {
    ...mapGetters({
      getSecondsGotoProgramMenu: 'getSecondsGotoProgramMenu',

      getStatusBill: 'getStatusBill',
      getStatusBillMessages: 'getStatusBillMessages'
    }),
    timer: function() {
      return this.seconds
    }
  },

  methods: {
    submitCardHandler(card) {
      this.card = card
      /* dev */
      console.log('++this.card-->', this.card)
    },

    gotoMainMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        this.seconds = seconds
        if (--seconds < 0 && this.$route.name !== 'program') {
          this.$router.push('/program')
        }
      }, 1000)
    },

    ...mapActions({
      fetchStatus: 'fetchStatus'
    }),
    ...mapMutations({
      setStatusBill: 'setStatusBill',
      setStatusBillMessagesIndex: 'setStatusBillMessagesIndex'
    })
  },
  mounted() {
    // EventBus.$on('submitBonusMoney', this.submitBonusHandler)
    EventBus.$on('submitCardMoney', this.submitCardHandler)


    // todo this.setStatusBill from ...
    this.setStatusBill('card')

    const type = this.getStatusBill

    switch (type) {
      case 'card':
        this.setStatusBillMessagesIndex(this.cardMessageIndex)
        break
      case 'bonus':
        break

      default:
        break
    }

    this.gotoMainMenu(this.seconds) // this.getSecondsGotoMainMenu
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
}
/* [v-cloak] {
  display: none;
} */
</style>
