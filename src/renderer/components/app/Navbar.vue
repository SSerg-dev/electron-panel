<template>
  <div class="imgs">
    <div class="head-panel">
      <!-- 
        <div class="box">
        <span class="white-text">{{ 'BOX' | localize }}</span> 
      </div>
       -->
      <div
        v-if="
          this.$route.name !== 'cost' &&
            this.$route.name !== 'cash' &&
            this.$route.name != 'language' &&
            this.$route.name != 'program' &&
            this.$route.name != 'setting'
        "
      >
        <!-- getIsPayCardMoney -->

        <!-- <div
          v-if="getWetBusyPanel === 'false' && !getIsPayCardMoney"
          class="head-panel-label"
        >
          <span class="white-text">{{ 'BOX' | localize }}</span>
        </div> -->

      </div>

      <div class="row">
        <button
          style="border: none; background-color: #121212;"
          @click="setEnabler()"
        >
          <router-link to="/">
            <img src="@/assets/imgs/svg/head-panel.svg" />
          </router-link>
        </button>
      </div>

      <div class="setting">
        <button
          style="border: none; background-color: #121212;"
          @click="loginSetting"
        >
          <router-link
            to="/password"
            class="btn"
            style="border: none; background-color: #121212;"
          >
            <img src="@/assets/imgs/svg/alles.svg" />
          </router-link>
        </button>
      </div>

      <div class="circle">
        <img src="@/assets/imgs/svg/white-circle.svg" />
        <div
          style="position: relative; top: -6.4rem; left: 0rem; font-size: 4rem;"
        >
          <div v-if="this.getPanelType === 'wash'">
            <span class="white-text">{{ this.getDefaultPanelNumber }}</span>
          </div>
          <div v-if="this.getPanelType === 'vacuum'">
            <span class="white-text">{{ getVacuum }}</span>
          </div>
          <div v-if="this.getPanelType === 'payment'">
            <span class="white-text">{{ getVacuumPayment }}</span>
          </div>
        </div>
      </div>

      <div v-if="this.getPanelType === 'wash'">
        <div class="box">
          <span class="white-text">{{ 'BOX' | localize }}</span>
        </div>
      </div>
      <div v-if="this.getPanelType === 'vacuum'">
        <div class="box">
          <span class="white-text">{{ 'VACUUM' | localize }}</span>
        </div>
      </div>
      <div v-if="this.getPanelType === 'payment'">
        <div class="box">
          <span class="white-text">{{ 'PAYMENT' | localize }}</span>
        </div>
      </div>

      <!--     -->

      <div class="clock">
        <span class="white-text">{{ date | date('time') }}</span>
      </div>

      <div class="title">
        <span class="white-text">{{ 'locales' | localize }}</span>
      </div>

      <div>  
        <router-link to="/language" class="flag">
        
          <div v-if="this.info.locale === 'ru-RU'">
            <img src="@/assets/imgs/flags/flag_RU.png" />
          </div>

          <div v-if="this.info.locale === 'en-GB'">
            <img src="@/assets/imgs/flags/flag_UK.png" />
          </div>

          <div v-if="this.info.locale === 'kz-KZ'">
            <img src="@/assets/imgs/flags/flag_KZ.png" />
          </div>
          
          <div v-if="this.info.locale === 'ua-UA'">
            <img src="@/assets/imgs/flags/flag_UA.png" />
          </div>

          <div v-if="this.info.locale === 'lat-LAT'">
            <img src="@/assets/imgs/flags/flag_LAT.png" />
          </div>

          <div v-if="this.info.locale === 'lit-LIT'">
            <img src="@/assets/imgs/flags/flag_LIT.png" />
          </div>

          <div v-if="this.info.locale === 'est-EST'">
            <img src="@/assets/imgs/flags/flag_EST.png" />
          </div>
          
          <div v-if="this.info.locale === 'fra-FRA'">
            <img src="@/assets/imgs/flags/flag_FRA.png" />
          </div>

          <div v-if="this.info.locale === 'ger-GER'">
            <img src="@/assets/imgs/flags/flag_GER.png" />
          </div>

          <div v-if="this.info.locale === 'pol-POL'">
            <img src="@/assets/imgs/flags/flag_POL.png" />
          </div>

          <div v-if="this.info.locale === 'jpn-JPN'">
            <img src="@/assets/imgs/flags/flag_JPN.png" />
          </div>

          <div v-if="this.info.locale === 'tur-TUR'">
            <img src="@/assets/imgs/flags/flag_TUR.png" />
          </div>

          <div v-if="this.info.locale === 'blr-BLR'">
            <img src="@/assets/imgs/flags/flag_BLR.png" />
          </div>

          <div v-if="this.info.locale === 'svn-SVN'">
            <img src="@/assets/imgs/flags/flag_SVN.png" />
          </div>

          <div v-if="this.info.locale === 'svk-SVK'">
            <img src="@/assets/imgs/flags/flag_SVK.png" />
          </div>

        </router-link>
      </div>
    </div>

    <div
      v-if="
        this.$route.name !== 'cost' &&
          this.$route.name !== 'language' &&
          this.$route.name !== 'program' &&
          this.$route.name !== 'setting' &&
          this.$route.name !== 'password' &&
          this.$route.name !== 'finance'
          
      "
    >
      <div class="background-top">
        <img src="@/assets/imgs/svg/background-top.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    date: new Date(),
    interval: null,
    locale: ''
  }),
  computed: {
    ...mapGetters({
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getWetBusyPanel: 'getWetBusyPanel',
      getIsPayCardMoney: 'getIsPayCardMoney',
      getPanelType: 'getPanelType',
      getVacuum: 'getVacuum',
      getVacuumPayment: 'getVacuumPayment',
      getCurrentLocale: 'getCurrentLocale',
      info: 'info',
      getRouter: 'getRouter'
    })
  },
  methods: {
    ...mapMutations({
      setCashEnabler: 'setCashEnabler',
      setIsLoginSettingPassword: 'setIsLoginSettingPassword',
      setRouter: 'setRouter'  
    }),
    setEnabler() {
      this.setCashEnabler(false)
    },
    loginSetting() {
      this.setIsLoginSettingPassword(true)
      //console.log('!!!loginSetting()')
    },
    /* setRouterHandler() {
    } */
  },

  mounted() {
    //console.log('nav info-->', JSON.stringify(this.info.locale))
    //this.locale =  this.getCurrentLocale.title
    // console.log('this.locale-->', this.locale)

    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.imgs {
  position: relative;
}
.row {
  padding-top: 4%;
  /* background-color: black; */
  background-color: #121212;
}
.background-top {
  /*   margin-left: 0em;
  margin-top: 0em;
 */
  position: absolute;
  top: 40%;
  left: 0%;
  z-index: 1;
}
img {
  width: 100%;
}
.head-panel {
  margin-top: 0em;
  padding-top: 2em;
  /* width: 90%; */
  position: relative;
  text-align: center;
  color: #121212;
  /* font-family: arial white; */ 
  /* font-size: 80%; */
  width: 100%;/* 74em; *//* 1080px; */
  height: 9.6em;/* 138px; */ /* 119 */
  z-index: 2;
}
/* .head-panel-label {
  font-size: 5rem;
  position: absolute;
  top: 0%;
  left: 0%;
} */
.circle {
  width: 6rem;
  height: 6rem;
  position: absolute;
  top: 32%;
  left: 3%;
}
.circle-title {
  position: relative;
  top: 32%;
  left: -12%;
  color: #121212;
  font-size: 3.5rem;
  font-weight: bold;
}

.box {
  font-size: 2.4rem;
  position: absolute;
  top: 30%;
  left: 12.5%;
}
.clock {
  font-size: 2.4rem;
  position: absolute;
  top: 60%;
  left: 12%;
  color: white;
}
.title {
  font-size: 2.4rem;
  position: absolute;
  top: 42%;
  left: 83%;
}
.flag {
  position: absolute;
  top: 34%;
  left: 90%;
  width: 5rem;
}
.setting {
  position: absolute;
  top: 29.8%;
  left: 29%;
  width: 10rem;
}
.btn {
  background-color: #121212;
  border: none;
}
.btn:hover,
.btn-large:hover,
.btn-small:hover {
  background-color: #121212;
}
</style>
