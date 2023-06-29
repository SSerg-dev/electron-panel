<template>
  <li>
    <button class="btn-small" @click="setLocale()">
      <!-- <img src="@/assets/imgs/language/lang_UA.png" /> -->
      <img :src="flagPath" alt="" />
      <!-- <img src="" id="image"/> -->
    </button>
  </li>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'localize-item',
  props: ['item', 'index'],
  data: () => ({
    locale: '',
    flag: '',
    flagPath: '',
  }),

  mounted() {
    this.locale = this.item.locale
    this.flag = this.item.flag

    this.changeFlag()
  },
  computed: {
    ...mapGetters({
      getRouter: 'getRouter',
    }),
  },
  methods: {
    ...mapMutations({
      setInfo: 'setInfo',
      setPaginate: 'setPaginate',
    }),

    changeFlag() {
      switch (this.locale) {
        case 'ru-RU':
          this.flagPath = require('@/assets/imgs/language/lang_RU.png')
          break

        case 'en-GB':
          this.flagPath = require('@/assets/imgs/language/lang_EN.png')
          break

        case 'kz-KZ':
          this.flagPath = require('@/assets/imgs/language/lang_KZ.png')
          break

        case 'ua-UA':
          this.flagPath = require('@/assets/imgs/language/lang_UA.png')
          break

        case 'lat-LAT':
          this.flagPath = require('@/assets/imgs/language/lang_LAT.png')
          break

        case 'lit-LIT':
          this.flagPath = require('@/assets/imgs/language/lang_LIT.png')
          break

        case 'est-EST':
          this.flagPath = require('@/assets/imgs/language/lang_EST.png')
          break

        case 'pol-POL':
          this.flagPath = require('@/assets/imgs/language/lang_POL.png')
          break

        case 'ger-GER':
          this.flagPath = require('@/assets/imgs/language/lang_GER.png')
          break

        case 'fra-FRA':
          this.flagPath = require('@/assets/imgs/language/lang_FRA.png')
          break

        case 'jpn-JPN':
          this.flagPath = require('@/assets/imgs/language/lang_JPN.png')
          break

        case 'tur-TUR':
          this.flagPath = require('@/assets/imgs/language/lang_TUR.png')
          break

        case 'blr-BLR':
          this.flagPath = require('@/assets/imgs/language/lang_BLR.png')
          break

        case 'svn-SVN':
          this.flagPath = require('@/assets/imgs/language/lang_SVN.png')
          break

        case 'svk-SVK':
          this.flagPath = require('@/assets/imgs/language/lang_SVK.png')
          break

        case 'srb-SRB':
          this.flagPath = require('@/assets/imgs/language/lang_SRB.png')
          break

        case 'nor-NOR':
          this.flagPath = require('@/assets/imgs/language/lang_NOR.png')
          break

        case 'fin-FIN':
          this.flagPath = require('@/assets/imgs/language/lang_FIN.png')
          break

        case 'bgr-BGR':
          this.flagPath = require('@/assets/imgs/language/lang_BGR.png')
          break

        case 'grc-GRC':
          this.flagPath = require('@/assets/imgs/language/lang_GRC.png')
          break

        case 'dnk-DNK':
          this.flagPath = require('@/assets/imgs/language/lang_DNK.png')
          break

        case 'rou-ROU':
          this.flagPath = require('@/assets/imgs/language/lang_ROU.png')
          break

        case 'swe-SWE':
          this.flagPath = require('@/assets/imgs/language/lang_SWE.png')
          break

        case 'prt-PRT':
          this.flagPath = require('@/assets/imgs/language/lang_PRT.png')
          break

        case 'nld-NLD':
          this.flagPath = require('@/assets/imgs/language/lang_NLD.png')
          break

        case 'mda-MDA':
          this.flagPath = require('@/assets/imgs/language/lang_MDA.png')
          break

        case 'ita-ITA':
          this.flagPath = require('@/assets/imgs/language/lang_ITA.png')
          break

        case 'hun-HUN':
          this.flagPath = require('@/assets/imgs/language/lang_HUN.png')
          break

        case 'irn-IRN':
          this.flagPath = require('@/assets/imgs/language/lang_IRN.png')
          break

        case 'hrv-HRV':
          this.flagPath = require('@/assets/imgs/language/lang_HRV.png')
          break

        case 'arm-ARM':
          this.flagPath = require('@/assets/imgs/language/lang_ARM.png')
          break

        case 'cze-CZE':
          this.flagPath = require('@/assets/imgs/language/lang_CZE.png')
          break

        case 'uzb-UZB':
          this.flagPath = require('@/assets/imgs/language/lang_UZB.png')
          break

        case 'tjk-TJK':
          this.flagPath = require('@/assets/imgs/language/lang_TJK.png')
          break

        case 'kgz-KGZ':
          this.flagPath = require('@/assets/imgs/language/lang_KGZ.png')
          break

        case 'aze-AZE':
          this.flagPath = require('@/assets/imgs/language/lang_AZE.png')
          break

        case 'spa-SPA':
          this.flagPath = require('@/assets/imgs/language/lang_SPA.png')
          break

        case 'geo-GEO':
          this.flagPath = require('@/assets/imgs/language/lang_GEO.png')
          break

        case 'chn-CHN':
          this.flagPath = require('@/assets/imgs/language/lang_CHN.png')
          break

        case 'isr-ISR':
        this.flagPath = require('@/assets/imgs/language/lang_ISR.png')
          break

        case 'arb-ARB':
          this.flagPath = require('@/assets/imgs/language/lang_ARB.png')
          break

        case 'che-CHE':
          this.flagPath = require('@/assets/imgs/language/lang_CHE.png')
          break

        case 'tat-TAT':
          this.flagPath = require('@/assets/imgs/language/lang_TAT.png')
          break

        case 'kor-KOR':
          this.flagPath = require('@/assets/imgs/language/lang_KOR.png')
          break

        default:
          this.flagPath = require('@/assets/imgs/language/lang_RU.png')
          break
      }
    },

    setLocale() {
      this.setInfo({
        name: this.name,
        locale: this.locale,
      })
      this.pushRouter()
    },
    pushRouter() {
      this.$router.push(this.getRouter)
    },
  },
})
</script>

<style scoped>
li {
  background: #121212;
  margin-right: 0;
  padding-bottom: 0;
  display: inline;
}
.btn,
.btn-large,
.btn-small {
  background-color: #121212;
  padding-bottom: 18em;
}

/*  */
/* :root {
  --image-path: url('/assets/imgs/language/lang_FIN.png');
} */

/* img {
  src: var(--image-path);
} */

/* #image {
  background-image:url('./assets/imgs/language/lang_FIN.png'); 
} */
</style>
