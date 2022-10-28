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
          <router-link to="/">
            <img src="@/assets/imgs/svg/head-panel.svg" />
          </router-link>
        </button>
      </div>

      <div class="setting">
        <div v-if="getIsMenuUnlock" style="border: none" @click="loginSetting">
          <router-link
            to="/password"
            class="btn"
            style="border: none; background: #121212"
          >
            <div>
              <img src="@/assets/imgs/svg/alles-unlock.svg" />
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
              <img src="@/assets/imgs/svg/alles-lock.svg" />
            </div>
          </router-link>
        </div>
      </div>

      <div class="circle">
        <img src="@/assets/imgs/svg/white-circle.svg" />
        <div
          style="position: relative; top: -6.4rem; left: 0rem; font-size: 4rem"
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
}
.alles {
  padding-top: 4%;
  padding-left: 4%;
  background-color: #121212;
}
.background-top {
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
  position: relative;
  text-align: center;
  color: #121212;
  width: 100%;
  height: 9.6em;
  z-index: 2;
}
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
  top: 32%;
  left: 32%; /* 32 */
  width: 10rem;
}
.btn {
  background-color: #121212;
  border: none;
}
</style>
