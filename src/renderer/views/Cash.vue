<template>
  <div>
    <div class="locate">
      <router-link to="/">
        <div class="back">
          <img src="imgs/key/back.png" />
        </div>
      </router-link>

      <section>
        <div align="center" class="message">
          <div><Message /></div>
        </div>

        <div align="center" class="page-title">
          <!-- <h3> -->
          <p>
            <img src="@/assets/images/pay-cash-image.png" />
          </p>

          <div style="width: 800px; margin-top: 40px;" class="info-title">
            <p align="center">
              Внесите купюры или монеты,
            </p>
            <p align="center">
              по завершению нажмите кнопку ниже
            </p>
          </div>
          <!-- </h3> -->
        </div>

        <div align="center" class="cash">
          <CashBill />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CashBill from '@/components/CashBill'
import Message from '@/components/app/Message'

export default Vue.extend({
  date: () => ({
    intervalMainMenu: null
  }),
  computed: {
    ...mapGetters({
      getWetBusyPanel: 'getWetBusyPanel',
      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu',
      getWetBalance: 'getWetBalance'
    })
  },
  // dev
  watch: {},
  methods: {
    ...mapActions({
      updateClearBalance: 'updateClearBalance'
    }),
    ...mapMutations({
      setRouter: 'setRouter'
    }),

    gotoMainMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        if (
          --seconds < 0 &&
          this.getWetBusyPanel === 'false' &&
          this.$route.name !== 'home'
        ) {
          //console.log('seconds-->', seconds)
          this.$router.push('/')
        }
      }, 1000)
    }
  },
  mounted() {
    this.setRouter('/cash')

    if (this.$store.state.params.length === 0)
      this.$error('$store.state.params no data $error')

    this.gotoMainMenu(this.getSecondsGotoMainMenu)
  },
  beforeDestroy() {
    clearInterval(this.intervalMainMenu)
  },

  components: {
    CashBill,
    Message
  }
})
</script>

<style scoped>
.info-title {
  width: 800px;
  padding-top: 0.5em;
  margin-top: 0em;
  margin-left: 0em;
  font-size: 2.5em;
}
.locate {
  position: relative;
}

.message {
  position: absolute;
  margin-top: -6em;
  margin-left: 9em; /* 19em; */

  font-family: 'Plumb-Medium';
  font-weight: normal;
  z-index: 1;
}
.page-title {
  position: absolute;
  margin-top: 40em;
  margin-left: 10em;

  top: 0%;
  left: 0%;
  color: white;
  text-align: right;

  font-family: 'Plumb-Medium';
  font-weight: bold;
  z-index: 1;
}
.cash {
  position: absolute;
  margin-top: 60em;
  margin-left: 3em;
}
.col {
  margin-left: 0em;
  /* border-radius: 2rem; */
}
.background-top {
  margin-left: -4.5em;
}
.pay-cash-image {
  margin-top: 10rem;
  margin-left: 0rem;
}
.pay-finish {
  margin-left: -2.5em;
}
.back {
  position: absolute;
  margin-top: 8em;
  margin-left: 2em;
  z-index: 1;
}

/* Plumb-Medium */
.description {
  font-family: 'Plumb-Medium';
  font-size: 20px;
  font-weight: bold;
}
</style>
