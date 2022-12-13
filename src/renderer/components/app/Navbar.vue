<template>
  <div class="imgs">
    <div class="head-panel">
      <div
        v-if="
          this.$route.name !== 'cost' &&
          this.$route.name !== 'cash' &&
          this.$route.name !== 'language' &&
          this.$route.name !== 'program' &&
          this.$route.name !== 'setting'
        "
      ></div>

      <div class="alles">
        <button
          style="border: none; background-color: #121212"
          @click="setEnabler()"
        >
          <!-- head-panel-small.svg --> 
          <router-link to="/">
            <div style="width: 90%; height: 90%">
              <img src="@/assets/imgs/svg/head-panel-small.svg" style=" width: 70%" />
            </div>
          </router-link>
        </button>
      </div>

      <div class="logo">
        <div v-if="getIsMenuUnlock" style="border: none" @click="loginSetting">
          <router-link
            to="/password"
            class="btn"
            style="border: none; background: #121212"
          >
            <div>
              <img src="@/assets/imgs/svg/alles-unlock.svg" style="width: 85%"/>
            </div>
          </router-link>
        </div>

        <div v-if="!getIsMenuUnlock" style="border: none">
          <router-link
            to="/"
            class="btn"
            style="border: none; background: #121212"
          >
            <div>
              <img src="@/assets/imgs/svg/alles-unlock.svg" style="width: 85%" />
            </div>
          </router-link>
        </div>

      </div>

      <div class="circle">
        <div style="width: 90%; height: 90%">
          <img src="@/assets/imgs/svg/white-circle.svg" style="width: 85%"/>
        </div>
        <div class="circle-title"
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


      <div class="date">
        <p >{{ date | date('date') }}</p>
      </div>
      
      <div class="clock">
        <p>{{ date | date('time') }}</p>
      </div>

      <div class="title">
        <p>{{ 'locales' | localize }}</p>
      </div>
      
      <!-- <div class="serial">
        <p>{{ `${getSerialNumber}` }}</p>
      </div> -->

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

          <div v-if="this.info.locale === 'srb-SRB'">
            <img src="@/assets/imgs/flags/flag_SRB.png" />
          </div>

          <div v-if="this.info.locale === 'nor-NOR'">
            <img src="@/assets/imgs/flags/flag_NOR.png" />
          </div>

          <div v-if="this.info.locale === 'fin-FIN'">
            <img src="@/assets/imgs/flags/flag_FIN.png" />
          </div>

          <div v-if="this.info.locale === 'bgr-BGR'">
            <img src="@/assets/imgs/flags/flag_BGR.png" />
          </div>

          <div v-if="this.info.locale === 'grc-GRC'">
            <img src="@/assets/imgs/flags/flag_GRC.png" />
          </div>

          <div v-if="this.info.locale === 'dnk-DNK'">
            <img src="@/assets/imgs/flags/flag_DNK.png" />
          </div>

          <div v-if="this.info.locale === 'rou-ROU'">
            <img src="@/assets/imgs/flags/flag_ROU.png" />
          </div>

          <div v-if="this.info.locale === 'swe-SWE'">
            <img src="@/assets/imgs/flags/flag_SWE.png" />
          </div>

          <div v-if="this.info.locale === 'prt-PRT'">
            <img src="@/assets/imgs/flags/flag_PRT.png" />
          </div>

          <div v-if="this.info.locale === 'nld-NLD'">
            <img src="@/assets/imgs/flags/flag_NLD.png" />
          </div>

          <div v-if="this.info.locale === 'mda-MDA'">
            <img src="@/assets/imgs/flags/flag_MDA.png" />
          </div>

          <div v-if="this.info.locale === 'ita-ITA'">
            <img src="@/assets/imgs/flags/flag_ITA.png" />
          </div>

          <div v-if="this.info.locale === 'hun-HUN'">
            <img src="@/assets/imgs/flags/flag_HUN.png" />
          </div>

          <div v-if="this.info.locale === 'irn-IRN'">
            <img src="@/assets/imgs/flags/flag_IRN.png" />
          </div>

          <div v-if="this.info.locale === 'hrv-HRV'">
            <img src="@/assets/imgs/flags/flag_HRV.png" />
          </div>

          <div v-if="this.info.locale === 'arm-ARM'">
            <img src="@/assets/imgs/flags/flag_ARM.png" />
          </div>

          <div v-if="this.info.locale === 'cze-CZE'">
            <img src="@/assets/imgs/flags/flag_CZE.png" />
          </div>

          <div v-if="this.info.locale === 'uzb-UZB'">
            <img src="@/assets/imgs/flags/flag_UZB.png" />
          </div>

          <div v-if="this.info.locale === 'tjk-TJK'">
            <img src="@/assets/imgs/flags/flag_TJK.png" />
          </div>
          
          <div v-if="this.info.locale === 'kgz-KGZ'">
            <img src="@/assets/imgs/flags/flag_KGZ.png" />
          </div>

          <div v-if="this.info.locale === 'aze-AZE'">
            <img src="@/assets/imgs/flags/flag_AZE.png" />
          </div>

          <div v-if="this.info.locale === 'spa-SPA'">
            <img src="@/assets/imgs/flags/flag_SPA.png" />
          </div>

          <div v-if="this.info.locale === 'geo-GEO'">
            <img src="@/assets/imgs/flags/flag_GEO.png" />
          </div>

          <div v-if="this.info.locale === 'chn-CHN'">
            <img src="@/assets/imgs/flags/flag_CHN.png" />
          </div>

          <div v-if="this.info.locale === 'isr-ISR'">
            <img src="@/assets/imgs/flags/flag_ISR.png" />
          </div>

          <div v-if="this.info.locale === 'arb-ARB'">
            <img src="@/assets/imgs/flags/flag_ARB.png" />
          </div>

          <div v-if="this.info.locale === 'che-CHE'">
            <img src="@/assets/imgs/flags/flag_CHE.png" />
          </div>

        </router-link>
      </div>
    </div>

    <div
      v-if="
        this.$route.name !== 'cost' &&
        this.$route.name !== 'language' &&
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

import createLog from 'localstorage-logger'

export default {
  data: () => ({
    date: new Date(),
    interval: null,
    locale: '',
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
      getRouter: 'getRouter',
      getIsMenuUnlock: 'getIsMenuUnlock',
      getUserActiveName: 'getUserActiveName',
      getSerialNumber: 'getSerialNumber'
    }),
  },
  watch: {
    getIsMenuUnlock(flag) {
      // console.log('$$ flag', flag, this.getUserActiveName)
      this.logging(flag)
    },
  },
  methods: {
    ...mapMutations({
      setCashEnabler: 'setCashEnabler',
      setIsLoginSettingPassword: 'setIsLoginSettingPassword',
      setRouter: 'setRouter',
      setInfo: 'setInfo'
    }),
    setEnabler() {
      this.setCashEnabler(false)
    },
    loginSetting() {
      this.setIsLoginSettingPassword(true)
    },
    /* localstorage-logger */
    logging(flag) {
      const log = createLog({
        logName: 'electron-users-log',
        maxLogSizeInBytes: 500 * 1024, // 500KB
      })
      flag
        ? log.info('Setting Menu unlocked user:', this.getUserActiveName)
        : log.info('Setting Menu locked user:', this.getUserActiveName)
    },
  },

  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>

<style scoped>
.imgs {
  position: relative;
  margin-top: -1em;
}
.alles {
  position: absolute;
  top: 3em;
  left: 9em;
  z-index: 0;
  
  background-color:  #121212;
}
.logo {
  position: absolute;
  top: 1.2em;
  left: 24.8em; /* 32 */
  width: 10rem;
}
.background-top {
  position: absolute;
  top: 3.5em;
  left: 0;
  z-index: 0;
}
img {
  width: 100%;
}
.head-panel {
  padding-right: 1em;
  padding-top: 2em;
  position: relative;
  text-align: center;
  color: #121212;
  width: 100%;
  height: 9.6em;
  z-index: 2;
}
.circle {
  width: 5em;
  height: 5em;
  position: absolute;
  top: 1.5em;
  left: 1em;
}
.circle-title {
  position: absolute; 
  top: -0.1em; 
  left: 0.45em; 
  font-size: 3em
}

.box {
  font-size: 2em;
  position: fixed;
  top: 1em;
  left: 5em;
  z-index: 3;
}
.date {
  font-size: 1.8em;
  position: absolute;
  top: 0.6em;
  left: 3em;
  color: white;
}
.clock {
  font-size: 1.8em;
  position: absolute;
  top: 1.7em;
  left: 3em;
  color: white;
}
.title {
  font-size: 2em;
  position: absolute;
  top: 1em;
  left: 33em;
  color: white;
}
.serial {
  width: 7em;
  border: solid 1px lightGrey ;
  border-radius: 0.2em;
  
  font-size: 2em;
  position: absolute;
  top: 0.9em;
  left: 24.2em;
  color: white;
}
.flag {
  position: absolute;
  top: 1.5em;
  left: 70em;
  width: 4em;
}

.btn {
  background-color: #121212;
  border: none;
}
</style>
