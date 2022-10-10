<template>
  <div>
    <div class="page-title">
      <h3>
        <p align="center">
          {{ 'LanguageTitle' | localize }}
        </p>
        
      </h3>
    </div>
    <router-link to="/">
      <div class="back">
        <img src="@/assets/imgs/key/back.png" />
      </div>
    </router-link>

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
            <!-- dev -->
            <td>
              <button class="btn-small" @click="setLocale('svn-SVN')">
                <img src="@/assets/imgs/language/lang_SVN.png" />
              </button>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_SVK.png" />
              </router-link>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 2">
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_SRB.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_NOR.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_FIN.png" />
              </router-link>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 2">
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_BGR.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_GRC.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_DNK.png" />
              </router-link>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 2">
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_ROU.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_SWE.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_PRT.png" />
              </router-link>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 3">
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_NLD.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_MDA.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_ITA.png" />
              </router-link>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 3">
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_HUN.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_IRN.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_HRV.png" />
              </router-link>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 3">
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_ARM.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_CZE.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_UZB.png" />
              </router-link>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 3">
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_TJK.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_KGZ.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_AZE.png" />
              </router-link>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 4">
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_SPA.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_GEO.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_CHN.png" />
              </router-link>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 4">
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_ISR.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_ARB.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_CHE.png" />
              </router-link>
            </td>
          </tr>
          <tr v-if="this.getPaginate === 4">
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_TAT.png" />
              </router-link>
            </td>
            <td>
              <router-link class="btn-small" to="/language">
                <img src="@/assets/imgs/language/lang_KOR.png" />
              </router-link>
            </td>
            <td>
              <!-- <button class="btn-large" @click="getCountry()">
                    getCountry
                  </button> -->
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
    this.setPaginate(1)
    this.tableRows = this.$refs.tableRows.rows
    this.setupPagination(this.tableRows)
  },
  computed: {
    ...mapGetters({
      info: 'info',
      getPaginate: 'getPaginate',
      getRouter: 'getRouter',
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
      //console.log('+++getRouter-->', this.getRouter)
      this.$router.push(this.getRouter)
    },
    getCountry() {
      ipcRenderer.send('country', 'RU')
      //ipcRenderer.send('config', JSON.stringufy(config))
    },
  },
})
</script>

<style scoped>
.page-title {
  padding-top: 6em;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 20em;
}
.back {
  position: absolute;
  margin-top: -0.8em;
  margin-left: 2.2em;
  z-index: 1;
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
  font-family: 'Plumb-Medium';
  font-weight: bold;
}
</style>
