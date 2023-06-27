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

      <div style="width: 800px" class="info-title">
        <h3>
          <p align="center">
            {{ `${this.messages[0]}` | localize }}
          </p>
          <!-- <p align="center">
            {{ `${this.messages[1]}` }}
          </p> -->
        </h3>
      </div>

      <div align="center" class="money-title">
        <div align="center" class="cash-show">
          <CashShow />
        </div>
      </div>

      <div v-if="this.getPanelType === 'wash'" align="center" class="cash">
        <CashBill />
      </div>

      <div v-if="this.getPanelType === 'vacuum'" align="center" class="cash">
        <CashVacuumBill />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CashBill from '@/components/CashBill'
import Message from '@/components/app/Message'
import CashShow from '@/components/CashShow'
import CashVacuumBill from '@/components/vacuum/CashVacuumBill'

export default Vue.extend({
  name: 'cash',
  data: () => ({
    intervalMainMenu: null,
    messages: [`Insert_banknotes_or_coins`],
    messageIndex: -1,
  }),

  computed: {
    ...mapGetters({
      getWetBusyPanel: 'getWetBusyPanel',
      //getWetBalance: 'getWetBalance',
      /* dev */
      getPanelType: 'getPanelType',
      getDryBusyPanel: 'getDryBusyPanel',

      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu',
    }),
  },
  // dev
  watch: {},
  methods: {
    ...mapActions({}),
    ...mapMutations({
      setRouter: 'setRouter',
      setPayType: 'setPayType',
    }),

    gotoMainMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        const type = this.getPanelType
        switch (type) {
          case 'wash':
            if (
              --seconds < 0 &&
              this.getWetBusyPanel === 'false' &&
              this.$route.name !== 'home'
            ) {
              this.$router.push('/')
            }
            break
          case 'vacuum':
            if (
              --seconds < 0 &&
              this.getDryBusyPanel === 'false' &&
              this.$route.name !== 'home'
            ) {
              this.$router.push('/')
            }
            break
          default:
            console.warn('no panel type')
            break
        }
      }, 1000)
    },
  },
  mounted() {
    this.setRouter('/cash')

    this.gotoMainMenu(this.getSecondsGotoMainMenu)
  },
  beforeDestroy() {
    clearInterval(this.intervalMainMenu)
  },

  components: {
    CashBill,
    Message,
    CashShow,
    CashVacuumBill,
  },
})
</script>

<style scoped>
.locate {
  position: relative;
  text-align: center;
}

.back {
  position: fixed;
  top: 11em;
  left: 2.5em;
  z-index: 99;
}

.message {
  position: absolute;
  margin-top: -7em;
  margin-left: 19em;

  font-family: 'Roboto-Medium';
  font-weight: normal;
  text-align: justify;
  z-index: 1;
}
.info-title {
  position: absolute;
  color: white;
  margin-top: 22em;
  margin-left: 4em;
  z-index: 2;
  font-size: 2.5em;
}

.money-title {
  position: absolute;
  margin-top: 26em;
  margin-left: 4em;

  color: white;
  text-align: right;

  font-family: 'Roboto-Medium';
  font-weight: bold;
  z-index: 1;
}
.cash {
  position: absolute;

  margin-top: 90em;
  margin-left: 13em;
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

/* Roboto-Medium */
.description {
  font-family: 'Roboto-Medium';
  font-size: 20px;
  font-weight: bold;
}
.cash-show {
  color: white;
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
