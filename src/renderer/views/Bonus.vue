<template>
  <div>
    <div class="locate">
      <router-link to="/">
        <div class="back">
          <img src="imgs/key/back.png" />
        </div>
      </router-link>
      <div class="page-title">
        <!-- <h3>
        <p>
          Для входа в систему введите номер<br />
          телефона или отсканируйте QR код
        </p>
      </h3> -->
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
import BonusBill from '@/components/BonusBill'
import EventBus from '@/bus/EventBus'

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
    /* dev */
    gotoMainMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        if (
          --seconds < 0 &&
          this.getWetBusyPanel === 'false' &&
          this.$route.name !== 'home'
        ) {
          // console.log('seconds-->', seconds)
          this.$router.push('/')
        }
      }, 1000)
    },

    /* dev */
    /* submitHandler(program) {
      console.log(`BonusBill-> clicked --> ${program}`)
    } */
  },

  mounted() {
    this.setRouter('/bonus')

    this.gotoMainMenu(this.getSecondsGotoMainMenu)

    /* dev */
    // EventBus.$on('submitBonusBill', this.submitHandler)
  },
  beforeDestroy() {
    clearInterval(this.intervalMainMenu)
  },

  components: {
    BonusBill
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
  color: white;
  margin-top: 15rem;
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
