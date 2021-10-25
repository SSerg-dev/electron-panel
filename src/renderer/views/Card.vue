<template>
  <div>
    <div class="locate">
      
      <router-link to="/">
        <div class="back">
          <img src="imgs/key/back.png" />
        </div>
      </router-link>

      <!-- dev -->
      <div v-if="this.balance < 1" class="message">
        <h3>
          <p align="center">
            {{ `${this.messages[0]}` }}
          </p>
          <!-- <p align="center">
            {{ `${this.messages[1]}` }}
          </p> -->
        </h3>
      </div>

    </div>

    <section>

      <div class="row">
        <div><CardBill /></div>
      </div>
      
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import CardBill from '@/components/CardBill'
import EventBus from '@/bus/EventBus'

 export default Vue.extend({
  /* new component */
  name: 'card',
  data: () => ({ 
    intervalMainMenu: null,
    messages: [`Введите сумму пополнеия`, `Минимальная сумма 10 руб`],
    messageIndex: -1,
    balance: 0
  }),
  computed: {
    ...mapGetters({
      getWetBusyPanel: 'getWetBusyPanel',
      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu',

    })
  },
  methods: {
    submitHandler(balance) {
      this.balance = balance 
    },

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
    EventBus.$on('submitBonusMoney', this.submitHandler)

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
  margin-left: 3.5em;
  z-index: 1;
}
.message {
  width: 800px;
  position: absolute;
  margin-top: 8.5em;
  margin-left: 3.5em;
  color: white;
  font-size: 2.5em;
  z-index: 1;
}
.row {
  padding-top: 25em;
  padding-left: 4em;
}
.page-title {
  padding-top: 30px;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 50em;
  align-items: center;
  z-index: 1;
}
.page-subtitle {
  margin-left: auto;
  margin-right: auto;
  width: 30em;
}
.info-title {
  width: 800px;
  padding-top: 2em;
  margin-top: 0em;
  margin-left: 0em;
  font-size: 2.5em;
}
</style>
