<template>
  <div>
    <section>
      <ul class="collection">
        <!-- 1 cost -->
        <li class="collection-item cost" @click="payUp('cost')">
          <div
            class="card white waves-effect"
            style="
                  width: 945px;
                  height: 160px; 
                  border: solid 6px #00B9E3; 
                  border-radius: 4em;
                  box-shadow: 0px 10px 20px #00b9e3;
                  "
          >
            <div
              class="card-content black-text"
              style="
                  font-size: 4em;
                  padding-top: 1.1em;

                  display: flex;
	                align-items: center;
	                justify-content: center;

                  
                  "
            >
              {{ 'PROGRAMS_COST' | localize }}
            </div>
          </div>
        </li>

        <!-- 2 -->
        <li class="collection-item title-pay">
          <h2 align="center">{{ 'Choose_your_payment_method' | localize }}</h2>
        </li>

        <!-- 3 -->
        <li class="collection-item cash" @click="payUp('cash')">
          <div
            class="card white waves-effect"
            style="
                  padding-left: 4em;
                  width: 945px;
                  height: 160px; 
                  border: solid 6px #00B9E3; 
                  border-radius: 4em;
                  box-shadow: 0px 10px 20px #00b9e3;
                  "
          >
            <div
              class="card-content black-text"
              style="
                  font-size: 4em;
                  padding-top: 1.1em;

                  display: flex;
	                align-items: left;
	                justify-content: left;
                  "
            >
              💰 {{ 'CASH' | localize }}
            </div>
          </div>
        </li>

        <!-- 4 -->
        <li v-if="getIsPing" class="collection-item" @click="payUp('card')">
          <div
            class="card white waves-effect"
            style="
                  padding-left: 4em;

                  width: 945px;
                  height: 160px; 
                  border: solid 6px #00B9E3; 
                  border-radius: 4em;
                  box-shadow: 0px 10px 20px #00b9e3;
                  "
          >
            <div
              class="card-content black-text"
              style="
                  font-size: 4em;
                  padding-top: 1.1em;

                  display: flex;
	                align-items: left;
	                justify-content: left;
                  "
            >
              💳 {{ 'BANK_CARD' | localize }}
            </div>
          </div>
        </li>

        <!-- 5 -->
        <li v-if="getIsPing" class="collection-item" @click="payUp('bonus')">
          <div
            class="card white waves-effect"
            style="
                  padding-left: 4em;

                  width: 945px;
                  height: 160px; 
                  border: solid 6px #7FE409; 
                  border-radius: 4em;
                  box-shadow: 0px 10px 20px #7FE409;
                  "
          >
            <div
              class="card-content black-text"
              style="
                  font-size: 4em;
                  padding-top: 1.1em;
                  display: flex;
	                align-items: left;
	                justify-content: left;
                  "
            >
              🎁 {{ 'BONUSES' | localize }}
            </div>
          </div>
        </li>

        <!--  -->
        <!-- <li class="collection-item">
          <router-link
            to="/service"
            class="btn white-text"
            style="font-size: 22px;"
            >SERVICE
          </router-link>
        </li> -->

        <!-- <li class="collection-item" align="left">
          <router-link
            to="/posts"
            class="btn white-text"
            style="font-size: 22px"
            >Posts Vuex
          </router-link>
        </li> -->

        <!-- <li class="collection-item" align="center">
          <button
            class="btn white-text" @click="setConfig()"
            style="font-size: 22px; border: solid; padding: 2rem auto 2rem auto; text-align: center; "
            >Кнопка для отладки
          </button>
        </li> -->
      </ul>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import { ipcRenderer } from 'electron'

export default Vue.extend({
  data() {
    return {
      cash_enabler: false,
      isDirectCash: false,
      delay: 10000,
      timeoutDelay: null
    }
  },
  computed: {
    ...mapGetters({
      getWetBalance: 'getWetBalance',
      getIsPing: 'getIsPing'
    }),
    
  },
  watch: {
    getWetBalance(value) {
      // console.log('++ getDirectCash-->watch value-->', value, this.isDirectCash)
      //if (this.isDirectCash === 1)
      this.$router.push('/cash')
    }
  },

  mounted() {
    /* dev */
    this.isDirectCash = this.getDirectCash()

    if (this.isDirectCash === 1) {
      this.timeoutDelay = setTimeout(() => {
        this.setEnabler()
        //console.log('++this.setEnabler()--> one')
      }, this.delay)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
  },
  created() {},

  methods: {
    ...mapGetters({
      getCashEnabler: 'getCashEnabler',
      getIsConfig: 'getIsConfig',
      getConfig: 'getConfig',
      getIsPayCardMoney: 'getIsPayCardMoney',
      getDirectCash: 'getDirectCash'
    }),
    ...mapMutations({
      setCashEnabler: 'setCashEnabler',
      setIsConfig: 'setIsConfig',
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsAppendBonusMoney: 'setIsAppendBonusMoney',
      setIsPayCardMoney: 'setIsPayCardMoney'
    }),

    payUp(program) {
      switch (program) {
        case 'bonus':
          this.setIsAppendBonusMoney(false)
          this.setIsPayBonusMoney(true)

          this.setIsPayCardMoney(true)
          this.$router.push('/bonus')
          break
        case 'card':
          this.setIsPayCardMoney(false)
          //console.log('++card')
          this.$router.push('/card')
          break
        case 'cost':
          //console.log('++cost')
          this.$router.push('/cost')
          break
        case 'cash':
          //console.log('++cash')
          this.setEnabler()
          this.$router.push('/cash')
          break

        default:
          break
      }
    },

    setEnabler() {
      //console.log('setEnabler')

      this.getCashEnabler() === false
        ? (this.cash_enabler = true)
        : (this.cash_enabler = false)
      this.setCashEnabler(this.cash_enabler)

      ipcRenderer.send('cash_enabler', 'true')
    }
  }
})
</script>

<style scoped>
.btn {
  padding-left: 16em;
  background-color: #121212;
}
.collection {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0rem;
  border-color: #121212;
  padding-top: 8rem;
}
.collection-item {
  margin-bottom: 2em;
  /* background-color: black; */
  background-color: #121212;
  border-color: #121212;
}
img {
  margin-left: -18em;
  z-index: 1;
}
h1 {
  padding-left: 1.2em;
}
h2 {
  color: white;
  margin-top: 0em;
  margin-left: 2em;
  padding-left: 0em;
}
.background-top {
  margin-left: 16em;
  margin-top: -6em; /* -6 */
}

.operator-down {
  margin-left: 62.5em;
  margin-top: -8em;
}
.title-pay {
  margin-top: 4em;
  margin-bottom: 5em;
  margin-left: -11em;
  /* margin-left: 0em; */
}

section {
  margin-top: 18em;
  margin-left: 3em;
}

/* *********************************** */
.button-title-main {
  position: relative;
  top: 32%;
  left: -10%;
  color: black;
  font-size: 4rem;
  font-weight: bold;

  font-family: 'Plumb-Medium';
}
/* Plumb-Medium */
.description {
  font-family: 'Plumb-Medium';
  font-size: 3rem;
  font-weight: bold;
}
</style>
