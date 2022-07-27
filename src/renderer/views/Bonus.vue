<template>
  <div>
    <div class="locate">
      <router-link to="/">
        <div class="back">
          <img src="imgs/key/back.png" />
        </div>
      </router-link>

      <div align="justify" class="message">
        <div><Message /></div>
      </div>

      <section>
        <div class="row">
          <div><BonusBill /></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import Message from '@/components/app/Message'
import BonusBill from '@/components/BonusBill'
import EventBus from '@/bus/EventBus'

export default Vue.extend({
  data: () => ({
    intervalMainMenu: null
  }),
  computed: {
    ...mapGetters({
      getWetBusyPanel: 'getWetBusyPanel',
      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu',
    })
  },
  methods: {
    ...mapMutations({
      setRouter: 'setRouter',
      setIsBonusMoney: 'setIsBonusMoney'
    }),

    gotoMainMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        if (--seconds < 0 && this.$route.name !== 'home') {
          this.$router.push('/')
        }
      }, 1000)
    }
  },

  mounted() {
    this.setRouter('/bonus')
    this.setIsBonusMoney(true)
    this.gotoMainMenu(this.getSecondsGotoMainMenu)
  },
  beforeDestroy() {
    /* dev */
    this.setIsBonusMoney(false)
    clearInterval(this.intervalMainMenu)
  },

  components: {
    BonusBill,
    Message
  }
})
</script>

<style scoped>
.locate {
  position: relative;
}
.back {
  position: absolute;
  margin-top: -18em;
  margin-left: 1.5em;
  z-index: 1;
}
.message {
  position: absolute;
  margin-top: -32em;
  margin-left: 19em;

  font-family: 'Plumb-Medium';
  font-weight: normal;
  text-align: justify;
  z-index: 1;
}
.row {
  color: white;
  margin-top: 25rem;
  margin-bottom: 0rem;
}
.page-title {
  padding-top: 10em;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 68em;
}
h3 {
  margin-left: 6em;
}
</style>
