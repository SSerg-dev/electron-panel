<template>
  <div>
    <div class="locate">
      <div class="back">
        <router-link to="/">
          <div class="card white small-button waves-effect">
            <div class="card-content- black-text small-button-title">
              <img style="width: 65%" src="@/assets/imgs/native/undo.png" />
            </div>
          </div>
        </router-link>
      </div>

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
    intervalMainMenu: null,
  }),
  computed: {
    ...mapGetters({
      getWetBusyPanel: 'getWetBusyPanel',
      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu',
    }),
  },
  methods: {
    ...mapMutations({
      setRouter: 'setRouter',
      setPayType: 'setPayType',
      setIsBonusMoney: 'setIsBonusMoney',
    }),

    gotoMainMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        if (--seconds < 0 && this.$route.name !== 'home') {
          this.$router.push('/')
        }
      }, 1000)
    },
  },

  mounted() {
    this.setRouter('/bonus')
    this.setIsBonusMoney(true)

    this.gotoMainMenu(this.getSecondsGotoMainMenu)
  },
  beforeDestroy() {
    clearInterval(this.intervalMainMenu)
  },

  components: {
    BonusBill,
    Message,
  },
})
</script>

<style scoped>
.locate {
  position: relative;
}
.back {
  position: fixed;
  top: 11em;
  left: 2.5em;
  z-index: 99;
}
.message {
  position: absolute;
  margin-top: -32em;
  margin-left: 19em;

  font-family: 'Roboto-Medium';
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
.small-button {
  width: 125px;
  height: 120px;
  border: solid 6px #00b9e3;
  border-radius: 2.5em;
  box-shadow: 0px 6px 10px #00b9e3;
}
.small-button-title {
  padding-top: 1em;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
