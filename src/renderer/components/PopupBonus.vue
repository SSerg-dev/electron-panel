<template>
  <div>
    <div class="message">
      <div>
        <p align="center">{{ `${this.messages[0]}` }}</p>
        <p align="center">{{ `${this.messages[1]}` }}</p>
        <div style="font-size: 2.2em; color: yellow;">
          <p align="center">{{ `${this.getMoneyToBonus}` }}</p>
        </div>
        <p align="center">{{ `${this.messages[2]}` }}</p>
      </div>
    </div>

    <div class="message-info">
      <p align="center">{{ `${this.messages[3]}` }}</p>
      <p align="center">{{ `${this.messages[4]}` }}</p>
      <p align="center">{{ `${this.messages[5]}` }}</p>
      <p align="center">{{ `${this.messages[6]}` }}</p>
    </div>

    <div class="locate">
      <section>
        <div class="popup">
          <p>
            <img src="/imgs/popup/popup-bonus.svg" />
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters } from 'vuex'
import PopupTypeActive from '@/components/PopupTypeActive'

export default Vue.extend({
  data: () => ({
    activeProgram: '',
    activeProgramKit: {},

    intervalPopupMenu: null,
    isStop: false,
    isOperator: false,
    messages: [
      'На Ваш счет',
      'зачислено',
      'бонуса (ов)',
      'Баланс всегда доступен',
      'в личном кабинете',
      'в мобильном приложении',
      'ALLES BONUS'
    ],
    messageIndex: -1,
    delay: 4000,
    timeoutDelay: null
  }),
  props: {
    actives: {
      required: true,
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      getWetBalance: 'getWetBalance',
      getMoneyToBonus: 'getMoneyToBonus'
    })
  },
  watch: {},
  methods: {
    ...mapMutations({
      
    }),
    ...mapGetters({}),
    setup() {}
  },
  mounted() {
      this.timeoutDelay = setTimeout(() => {
        try {
          if (this.$route.name !== 'home') this.$router.push('/')
        } catch (err) {}
      }, this.delay)
    
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
  },
  components: {}
})
</script>

<style scoped>
.page-title {
  padding-top: 0em;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 32rem;
}
h3 {
  color: white;
}
.locate {
  position: relative;
}
.message {
  position: absolute;
  top: 32%;
  left: 32%;
  color: white;
  font-size: 5em;
  z-index: 1000;
}
.message-info {
  position: absolute;
  padding: 1em 3.5em;
  top: 64%;
  left: 11.2%;
  color: white;
  border: solid 3px #00b9e3;
  border-radius: 0.5em;
  font-size: 3em;
  z-index: 1000;
}

.popup {
  margin-top: 10em;
  margin-left: 0.8em;
}
</style>
