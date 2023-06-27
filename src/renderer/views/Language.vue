<template>
  <div>
    <div class="page-title">
      <h3>
        <p align="center">
          {{ 'LanguageTitle' | localize }}
        </p>
      </h3>
    </div>

    <div class="back">
      <router-link to="/">
        <div class="card white small-button waves-effect">
          <div class="card-content- black-text small-button-title">
            <img style="width: 65%" src="@/assets/imgs/native/undo.png" />
          </div>
        </div>
      </router-link>
    </div>

    <section>
      <!-- <form @submit.prevent=""> -->
      <div class="row">
        <table ref="tableRows">
          <tr v-if="this.getPaginate === 1">
            <td>
              <button class="btn-small" @click="setLocale('ru-RU')">
                <img src="@/assets/imgs/language/lang_RU.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('en-GB')">
                <img src="@/assets/imgs/language/lang_EN.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('kz-KZ')">
                <img src="@/assets/imgs/language/lang_KZ.png" />
              </button>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 1">
            <td>
              <button class="btn-small" @click="setLocale('ua-UA')">
                <img src="@/assets/imgs/language/lang_UA.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('lat-LAT')">
                <img src="@/assets/imgs/language/lang_LAT.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('lit-LIT')">
                <img src="@/assets/imgs/language/lang_LIT.png" />
              </button>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 1">
            <td>
              <button class="btn-small" @click="setLocale('est-EST')">
                <img src="@/assets/imgs/language/lang_EST.png" />
              </button>
            </td>
            <td>
              <button class="btn-small" @click="setLocale('pol-POL')">
                <img src="@/assets/imgs/language/lang_POL.png" />
              </button>
            </td>
            <td>
              <button class="btn-small" @click="setLocale('ger-GER')">
                <img src="@/assets/imgs/language/lang_GER.png" />
              </button>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 1">
            <td>
              <button class="btn-small" @click="setLocale('fra-FRA')">
                <img src="@/assets/imgs/language/lang_FRA.png" />
              </button>
            </td>
            <td></td>
            <td>
              <button class="btn-small" @click="setLocale('jpn-JPN')">
                <img src="@/assets/imgs/language/lang_JPN.png" />
              </button>
            </td>
            <td>
              <button class="btn-small" @click="setLocale('tur-TUR')">
                <img src="@/assets/imgs/language/lang_TUR.png" />
              </button>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 2">
            <td>
              <button class="btn-small" @click="setLocale('blr-BLR')">
                <img src="@/assets/imgs/language/lang_BLR.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('svn-SVN')">
                <img src="@/assets/imgs/language/lang_SVN.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('svk-SVK')">
                <img src="@/assets/imgs/language/lang_SVK.png" />
              </button>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 2">
            <td>
              <button class="btn-small" @click="setLocale('srb-SRB')">
                <img src="@/assets/imgs/language/lang_SRB.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('nor-NOR')">
                <img src="@/assets/imgs/language/lang_NOR.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('fin-FIN')">
                <img src="@/assets/imgs/language/lang_FIN.png" />
              </button>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 2">
            <td>
              <button class="btn-small" @click="setLocale('bgr-BGR')">
                <img src="@/assets/imgs/language/lang_BGR.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('grc-GRC')">
                <img src="@/assets/imgs/language/lang_GRC.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('dnk-DNK')">
                <img src="@/assets/imgs/language/lang_DNK.png" />
              </button>
            </td>
          </tr>

          <tr v-if="this.getPaginate === 2">
            <td>
              <button class="btn-small" @click="setLocale('rou-ROU')">
                <img src="@/assets/imgs/language/lang_ROU.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('swe-SWE')">
                <img src="@/assets/imgs/language/lang_SWE.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('prt-PRT')">
                <img src="@/assets/imgs/language/lang_PRT.png" />
              </button>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 3">
            <td>
              <button class="btn-small" @click="setLocale('nld-NLD')">
                <img src="@/assets/imgs/language/lang_NLD.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('mda-MDA')">
                <img src="@/assets/imgs/language/lang_MDA.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('ita-ITA')">
                <img src="@/assets/imgs/language/lang_ITA.png" />
              </button>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 3">
            <td>
              <button class="btn-small" @click="setLocale('hun-HUN')">
                <img src="@/assets/imgs/language/lang_HUN.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('irn-IRN')">
                <img src="@/assets/imgs/language/lang_IRN.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('hrv-HRV')">
                <img src="@/assets/imgs/language/lang_HRV.png" />
              </button>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 3">
            <td>
              <button class="btn-small" @click="setLocale('arm-ARM')">
                <img src="@/assets/imgs/language/lang_ARM.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('cze-CZE')">
                <img src="@/assets/imgs/language/lang_CZE.png" />
              </button>
            </td>
            <td>
              <button class="btn-small" @click="setLocale('uzb-UZB')">
                <img src="@/assets/imgs/language/lang_UZB.png" />
              </button>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 3">
            <td>
              <button class="btn-small" @click="setLocale('tjk-TJK')">
                <img src="@/assets/imgs/language/lang_TJK.png" />
              </button>
            </td>
            <td>
              <button class="btn-small" @click="setLocale('kgz-KGZ')">
                <img src="@/assets/imgs/language/lang_KGZ.png" />
              </button>
            </td>
            <td>
              <button class="btn-small" @click="setLocale('aze-AZE')">
                <img src="@/assets/imgs/language/lang_AZE.png" />
              </button>
            </td>
          </tr>

          <tr v-if="this.getPaginate === 4">
            <td>
              <button class="btn-small" @click="setLocale('spa-SPA')">
                <img src="@/assets/imgs/language/lang_SPA.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('geo-GEO')">
                <img src="@/assets/imgs/language/lang_GEO.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('chn-CHN')">
                <img src="@/assets/imgs/language/lang_CHN.png" />
              </button>
            </td>
          </tr>

          <tr v-if="this.getPaginate === 4">
            <td>
              <button class="btn-small" @click="setLocale('isr-ISR')">
                <img src="@/assets/imgs/language/lang_ISR.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('arb-ARB')">
                <img src="@/assets/imgs/language/lang_ARB.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('che-CHE')">
                <img src="@/assets/imgs/language/lang_CHE.png" />
              </button>
            </td>
          </tr>

          <tr v-if="this.getPaginate === 4">
            <td>
              <button class="btn-small" @click="setLocale('tat-TAT')">
                <img src="@/assets/imgs/language/lang_TAT.png" />
              </button>
            </td>

            <td>
              <button class="btn-small" @click="setLocale('kor-KOR')">
                <img src="@/assets/imgs/language/lang_KOR.png" />
              </button>
            </td>
          </tr>
        </table>

        <div class="paginate">
          <!-- :initial-page="this.getPaginate" -->
          <!-- :page-class="'waves-effect'" -->
          <Paginate
            :page-count="4"
            :click-handler="pageChangeHandler"
            :prev-text="'<'"
            :next-text="'>'"
            :container-class="'pagination'"
          />
        </div>
      </div>
      <!-- </form> -->
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import paginationMixin from '@/mixins/pagination.mixin'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { ipcRenderer } from 'electron'

//export default {
export default Vue.extend({
  name: 'language',
  mixins: [paginationMixin],
  data: () => ({
    locale: '',
    tableRows: [],
  }),
  mounted() {
    // console.log('$$ Language.vue: 344', this.getSelectedCountries)

    this.setPaginate(1)
    this.tableRows = this.$refs.tableRows.rows
    this.setupPagination(this.tableRows)
  },
  computed: {
    ...mapGetters({
      info: 'info',
      getPaginate: 'getPaginate',
      getRouter: 'getRouter',
      getSelectedCountries: 'getSelectedCountries',
    }),
  },

  // beforeDestroy() {
  //   setPaginate(1)
  // },
  methods: {
    ...mapMutations({
      setInfo: 'setInfo',
      setPaginate: 'setPaginate',
    }),
    setLocale(locale) {
      this.locale = locale
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
.page-title {
  padding-top: 6em;
  color: white;
  /* margin-left: auto; */
  margin-right: 2em;
  /* width: 20em; */
}
.back {
  position: fixed;
  top: 11em;
  left: 2.5em;
  z-index: 99;
}

table {
  position: absolute;
}
table,
th,
td {
  /* border: solid; */
  border: none;
  margin-left: 3em;
  margin-bottom: 0em;
  margin-top: 5em;
  height: 220px;
  width: 220px;

  border-color: #121212;
}
tr {
  display: block;
  /* float: left; */
}
/* td,
th {
  padding: 5px 5px;
  display: table-cell;
  text-align: left;
  vertical-align: middle;
  border-radius: 2px;
  color: black;
} */
.btn,
.btn-large,
.btn-small {
  background-color: #121212;
}
/* dev */
.paginate {
  font-size: 1em;
  width: 100%;
  position: fixed;
  left: 20em;
  bottom: 16em;
  background: #121212;
  font-family: 'Roboto-Medium';
  font-weight: bold;
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
