<template>
  <div>
    <div class="locate">
      <router-link to="/">
        <div class="back">
          <img src="imgs/key/back.png" />
        </div>
      </router-link>

      <!-- <button
        class="btn #121212 back"
        @click="back"
        style="border: none; background: #121212;"      >
        <img src="imgs/key/back.png" />
        </button> -->

      <div class="page-title">
        <h3>
          <p>
            Введите сумму пополнеия<br />
            Минимальная сумма 10 руб
          </p>
        </h3>
      </div>

      <section>
        <div class="row">
          <!-- <div><Calculator /></div> -->
          <div><CardBill /></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import CardBill from '@/components/CardBill'

export default Vue.extend({
  data: () => ({
    intervalMainMenu: null
  }),
  computed: {
    ...mapGetters({
      getWetBusyPanel: 'getWetBusyPanel',
      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu'
    })
  },
  methods: {
    ...mapMutations({
      setRouter: 'setRouter'
    }),
    gotoMainMenu(seconds) {
      //console.log('gotoMainMenu')
      this.intervalMainMenu = setInterval(() => {
        if (
          --seconds < 0 &&
          this.getWetBusyPanel === 'false' &&
          this.$route.name !== 'home'
        ) {
          console.log('seconds-->', seconds)
          this.$router.push('/')
        }
      }, 1000)
    }
  },
  mounted() {
    this.setRouter('/card')

    this.gotoMainMenu(this.getSecondsGotoMainMenu)
  },
  beforeDestroy() {
    clearInterval(this.intervalMainMenu)
  },
  components: {
    CardBill
  }
})
</script>

<style scoped>
.locate {
  position: relative;
}
.back {
  position: absolute;
  margin-top: 8em;
  margin-left: 2em;
  z-index: 1;
}
.row {
  padding-top: 15rem;
  padding-left: 4rem;
}
.page-title {
  padding-top: 30px;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 50em;
  align-items: center;
}
.page-subtitle {
  margin-left: auto;
  margin-right: auto;
  width: 30em;
}
</style>
