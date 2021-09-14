<template>
  <div>
    <section>
      <ul class="collection">
        <!-- 1 -->
        <li class="collection-item cost" @click="payUp('cost')">
          <!--           <router-link
            to="/cost"
            style="background-image:url('/imgs/menu/prog-price.png'); width: 945px; height: 192px; left: -10%; "
            class="btn"
          >
            <div class="button-title-main">
              {{ 'PROGRAMS_COST' | localize }}
            </div>
          </router-link> -->
          <!-- dev -->
          <div
            class="card white"
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
                  padding-left: 2.4em;
                  padding-top: 1.1em;
                  "
            >
              {{ 'PROGRAMS_COST' | localize }}
            </div>
          </div>
          <!--     -->
        </li>

        <!-- 2 -->
        <li class="collection-item title-pay">
          <h2 align="center">{{ 'Choose_your_payment_method' | localize }}</h2>
        </li>

        <!-- 3 -->
        <li class="collection-item" @click="payUp('cash')">
          <!-- <button
            style="border: none; background: #121212;"
            @click="setEnabler()"
          >
            <router-link
              to="/cash"
              style="background-image:url('/imgs/menu/pay-cash.png'); width: 945px; height: 192px"
              class="btn #121212"
            >
              <div class="button-title-main">{{ 'CASH' | localize }}</div>
            </router-link>
          </button> -->
          <!-- dev -->
          
          <div
            class="card white"
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
                  padding-left: 4.0em;
                  padding-top: 1.1em;
                  "
            >
              💰  {{ 'CASH' | localize }}
            </div>
          </div>
          <!--     -->
        </li>

        <!-- 4 -->
        <!-- @click="payUp('card')" -->
        <li class="collection-item" @click="payUp('card')">
          <!-- <router-link
            to="/card"
            style="background-image:url('/imgs/menu/pay-card.png'); width: 945px; height: 192px; position: relative; left: 0.5%;"
            class="btn"
          >
            <div
              style="position: relative; left: -3rem;"
              class="button-title-main"
            >
              {{ 'BANK_CARD' | localize }}
            </div>
          </router-link> -->
          <!-- dev -->
          <div
            class="card white"
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
                  padding-left: 2em;
                  padding-top: 1.1em;
                  "
            >
              💳 {{ 'BANK_CARD' | localize }}
            </div>
            <!-- <i class="large material-icons" style="margin-left: 0.8em; margin-top: -1em;">credit_card</i> -->
          </div>
          <!--     -->
        </li>

        <!-- 5 -->
        <li class="collection-item" @click="payUp('bonus')">
          <!-- <router-link
            to="/bonus"
            style="background-image:url('/imgs/menu/pay-bonus.png'); width: 945px; height: 192px"
            class="btn"
          >
            <div class="button-title-main">{{ 'BONUSES' | localize }}</div>
          </router-link> -->
          <!-- dev -->
          <div
            class="card white"
            style="
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
                  padding-left: 4.5em;
                  padding-top: 1.1em;
                  "
            >
              🎁 {{ 'BONUSES' | localize }}
            </div>
            <!-- <i class="large material-icons" style="margin-left: 0.8em; margin-top: -1em;">shopping_basket</i> -->
          </div>
          <!--     -->
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
      cash_enabler: false
    }
  },

  methods: {
    ...mapGetters({
      getCashEnabler: 'getCashEnabler',
      getIsConfig: 'getIsConfig',
      getConfig: 'getConfig',
      getIsPayCardMoney: 'getIsPayCardMoney'
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
          //console.log('++bonus')
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
  margin-left: 2em;
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
