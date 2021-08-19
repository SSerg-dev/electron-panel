<template>
  <div>
    <a name="top"></a>

    <form @submit.prevent="" class="form">
      <!-- dev -->
      <ul
        id="tabs-swipe"
        class="tabs"
        ref="tabs"
        style="background: white; width: 98%"
      >
        <li class="tab col s3">
          <a class="black-text" href="#swipe-1" style="font-size: 32px;"
            >Обзор</a
          >
        </li>

        <li class="tab col s3">
          <a class="active black-text" href="#swipe-2" style="font-size: 32px;"
            >Экран</a
          >
        </li>

        <li class="tab col s3">
          <a class="black-text" href="#swipe-3" style="font-size: 32px;"
            >Настройки</a
          >
        </li>

        <li class="tab col s3">
          <a class="black-text" href="#swipe-4" style="font-size: 32px;"
            >Финансы</a
          >
        </li>
      </ul>
      <!-- end dev -->

      <!--  -->
      <div id="swipe-1" class="col s8 black">
        <!-- Обзор -->
        <div>
          <h2 class="white-text">Обзор</h2>
          <br />
          <div class="row panel">
            <div class="page-title white-text">
              <h4>Общие</h4>
            </div>
            <SettingOverviewService />
            <SettingOverviewCommon />
          </div>
        </div>
        <hr />
        <!-- end Обзор -->
      </div>
      <!--  -->

      <!--  -->
      <div id="swipe-2" class="col s8 black">
        <!-- Экран -->
        <div>
          <h2 class="white-text">Экран</h2>
          <br />

          <!-- row tooltip -->
          <div class="row tooltip">
            <div class="col s6">
              <div
                class="card grey lighten-3"
                style="border: solid 3px #00B9E3; width: 517px; height: 150px; margin-left: 10px; border-radius: 2rem;"
              >
                <div class="card-content black-text">
                  <div class="switch">
                    <label>
                      <input type="checkbox" v-model="isTooltipInstalled" />

                      <span class="lever"></span>
                    </label>
                  </div>
                  <span class="card-title"
                    >Показывать всплывающие подсказки при переключении
                    программ</span
                  >
                  <div class="input-field"></div>
                </div>
              </div>
            </div>
            <div v-if="isTooltipInstalled">
              <SettingScreenTooltip />
            </div>
          </div>
          <!-- row tooltip -->

          <!-- row pay-screen -->
          <div class="row pay-screen">
            <div class="col s6">
              <div
                class="card grey lighten-3"
                style="border: solid 3px #00B9E3; width: 1070px; height: 80px; margin-left: 10px; border-radius: 2rem;"
              >
                <div class="card-content black-text">
                  <div class="switch">
                    <label>
                      <input type="checkbox" v-model="isPayScreenMain" />

                      <span class="lever"></span>
                    </label>
                  </div>

                  <div class="pay-screen-title">
                    <span class="card-title">Сделать окно оплаты основным</span>
                  </div>
                </div>
              </div>
            </div>
            <!--  -->
          </div>
          <!-- row pay-screen -->

          <!-- row screen-delay -->
          <div class="row screen-delay">
            
            <div>
              <SettingScreenTooltip />
            </div>
          </div>
          <!-- row screen-delay -->


        </div>
        <hr />
        <!-- end Экран -->
      </div>
      <!--  -->

      <div id="swipe-3" class="col s8 black">
        <!-- Настройки -->
        <div>
          <h2 class="white-text">Настройки</h2>
          <br />

          <div class="row panel">
            <div class="page-title white-text">
              <h4>Панель</h4>
            </div>
            <SettingPanelType />

            <div v-if="this.getPanelType === 'wash'">
              <SettingPanelNumber />
            </div>
            <div v-if="this.getPanelType === 'vaccum'">
              <SettingPanelVaccum />
            </div>
            <div v-if="this.getPanelType === 'payment'">
              <SettingPanelPayment />
            </div>
          </div>

          <div class="row payment">
            <div class="page-title white-text">
              <h4>Платежи</h4>
            </div>
            <SettingPaymentLanguage />

            <SettingPaymentCurrency />

            <SettingPaymentAcceptor />

            <SettingPaymentBill />
          </div>
          <!-- end row -->
          <!-- style="background: red; width: 517px;" -->
          <div class="row terminal-type">
            <div class="col s6">
              <div
                class="card grey lighten-3"
                style="border: solid 3px #00B9E3; width: 517px; height: 160px; margin-left: 10px; border-radius: 2rem;"
              >
                <div class="card-content black-text">
                  <!--  -->
                  <div class="switch">
                    <label>
                      <input type="checkbox" v-model="isCoinInstalled" />
                      <span class="lever"></span>
                    </label>
                  </div>
                  <!--  -->
                  <span class="card-title"
                    >NRI G-13 USB монетоприемник установлен</span
                  >
                  <div class="input-field"></div>
                </div>
              </div>
            </div>

            <div class="col s6">
              <!-- style="border: solid 3px #00B9E3;" -->
              <div
                class="card grey lighten-3"
                style="height: 160px; width: 517px; border: solid 3px #00B9E3; border-radius: 2rem;"
              >
                <div class="card-content black-text">
                  <!--  -->
                  <div class="switch">
                    <label>
                      <input type="checkbox" v-model="isTerminalInstalled" />
                      <span class="lever"></span>
                    </label>
                  </div>
                  <!--  -->
                  <span class="card-title">
                    Банковский терминал установлен</span
                  >
                  <div class="input-field"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- end row -->
          <div class="row panel" style="margin-top: -20px">
            <SettingPaymentTerminalType />

            <SettingPaymentMinNonCash />
          </div>
          <!-- end row -->
          <div class="row direct-cash">
            <div class="col s6" style="width: 540px; margin-left:10px;">
              <div
                class="card grey lighten-3"
                style="border: solid 3px #00B9E3; border-radius: 2rem;"
              >
                <div class="card-content black-text">
                  <!--  -->
                  <div class="switch">
                    <label>
                      <input type="checkbox" v-model="isDirectCash" />
                      <span class="lever"></span>
                    </label>
                  </div>
                  <!--  -->
                  <span class="card-title">Прямая оплата наличными</span>
                  <div class="input-field"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <!-- end Настройки -->
      </div>

      <div id="swipe-4" class="col s8 black">
        <!-- Финансы -->
        <div>
          <h2 class="white-text">Финансы</h2>
          <br />
          <div class="row panel">
            <div class="row left">
              <div class="col ">
                <router-link to="/finance">
                  <button
                    class="btn waves-effect waves-light lighten-3 white-text button-setting"
                    type="submit"
                    @click="updateOk"
                  >
                    {{ "Статистика" }}
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <!-- end Финансы -->
      </div>

      <!-- valign="center" -->
      <div class="row right">
        <div class="col ">
          <!-- <router-link to="/"> -->
          <button
            class="btn waves-effect waves-light lighten-3 white-text button-setting"
            type="submit"
            @click="updateOk"
          >
            {{ "ОК" }}
            <!-- <i class="material-icons right"></i> -->
          </button>
          <!-- </router-link> -->
        </div>
        <div class="col ">
          <button
            class="btn waves-effect waves-light white-text button-setting"
            type="submit"
            @click="updateCancel"
          >
            {{ "Отмена" }}
            <!-- <i class="material-icons right"></i> -->
          </button>
        </div>

        <div class="col ">
          <button
            class="btn waves-effect waves-light white-text button-setting"
            type="submit"
            @click="updateApply"
          >
            {{ "Применить" }}
            <!-- <i class="material-icons right"></i> -->
          </button>
        </div>
      </div>
    </form>
    <a name="bottom"></a>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";
import SettingPanelType from "@/components/setting/SettingPanelType";
import SettingPanelNumber from "@/components/setting/SettingPanelNumber";
import SettingPanelVaccum from "@/components/setting/SettingPanelVaccum";
import SettingPanelPayment from "@/components/setting/SettingPanelPayment";
import SettingPaymentLanguage from "@/components/setting/SettingPaymentLanguage";
import SettingPaymentCurrency from "@/components/setting/SettingPaymentCurrency";
import SettingPaymentAcceptor from "@/components/setting/SettingPaymentAcceptor";
import SettingPaymentBill from "@/components/setting/SettingPaymentBill";
import SettingPaymentTerminalType from "@/components/setting/SettingPaymentTerminalType";
import SettingPaymentMinNonCash from "@/components/setting/SettingPaymentMinNonCash";
import SettingOverviewCommon from "@/components/setting/SettingOverviewCommon";
import SettingOverviewService from "@/components/setting/SettingOverviewService";
import SettingFinanceCoin from "@/components/setting/SettingFinanceCoin";
import SettingFinanceBanknote from "@/components/setting/SettingFinanceBanknote";
import SettingScreenTooltip from "@/components/setting/SettingScreenTooltip";

import cost from "../store/cost";

export default Vue.extend({
  name: "setting",
  data: () => ({
    isPayScreenMain: false,
    isTooltipInstalled: false,
    isCoinInstalled: false,
    isTerminalInstalled: false,
    isDirectCash: false,
    isDown: false,
    tabs: null,
  }),
  components: {
    SettingPanelType,
    SettingPanelNumber,
    SettingPanelVaccum,
    SettingPanelPayment,
    SettingPaymentLanguage,
    SettingPaymentCurrency,
    SettingPaymentAcceptor,
    SettingPaymentBill,
    SettingPaymentTerminalType,
    SettingPaymentMinNonCash,
    SettingOverviewCommon,
    SettingOverviewService,
    SettingFinanceCoin,
    SettingFinanceBanknote,
    SettingScreenTooltip,
  },
  mounted() {
    this.setRouter("/setting");
    this.tabs = M.Tabs.init(this.$refs.tabs, {});
  },
  methods: {
    ...mapMutations({
      setRouter: "setRouter",
    }),
    setDown() {
      this.isDown = !this.isDown;
    },
    updateOk() {
      /* dev */
      this.$router.push("/");

      //const panelType = this.getPanelType
      //if (panelType === 'wash') this.$router.push('/')
      //if (panelType === 'vaccum') this.$router.push('/password')
      //if (panelType === 'payment') this.$router.push('/')
    },
    updateCancel() {
      window.location.reload();
      //console.log('!!!updateCancel')
      //this.$router.push('/')
    },
    updateApply() {
      //console.log('!!!updateApply')
      // this.$router.push('/setting')
    },
    ...mapGetters({
      getTooltipInstalled: "getTooltipInstalled",
      getCoinInstalled: "getCoinInstalled",
      getTerminalInstalled: "getTerminalInstalled",
      getDirectCash: "getDirectCash",
    }),
  },
  computed: {
    ...mapGetters({
      getPanelType: "getPanelType",
    }),
  },
  created() {
    /* dev */
    this.isPayScreenMain = true
    this.isTooltipInstalled = this.getTooltipInstalled();
    this.isCoinInstalled = this.getCoinInstalled();
    this.isTerminalInstalled = this.getTerminalInstalled();
    this.isDirectCash = this.getDirectCash();
    //console.log('this.isDirectCash-->', this.isDirectCash)
  },
  beforeDestroy() {
    if (this.tabs && this.tabs.destroy) {
      this.tabs.destroy();
    }
  },
});
</script>

<style scoped>
.form {
  margin-top: 4rem;
}
.panel {
  margin: 0 auto;
}
.payment {
  margin: 0 auto;
}
/* 
.btn, .btn-large, .btn-small {
    text-decoration: none;
    color: #fff;
    background-color: #27a599;
    background-color: #26A69A;
    text-align: center;
    letter-spacing: .5px;
    transition: background-color .2s ease-out;
    cursor: pointer;
}
*/
.btn {
  /* width: 13rem; */
  width: 235px;
  border: solid;
  border-width: 1px;
  border-color: white;
  background-color: #26a69a;
}
.right {
  padding-right: 0rem;
  padding-top: 2rem;
}
.terminal-type {
  padding-bottom: 0rem;
}
.switch {
  padding-bottom: 1.5rem;
}
/* dev */
.button-setting {
  border: solid 3px #00b9e3;
  font-size: 24px;
  border-radius: 2rem;
}
/*  */
#head {
  margin-top: -1.5em;
  margin-bottom: 0em;
  margin-left: 64em;

  padding-top: 0em;
  padding-bottom: 0em;
  /* padding-right: 10em; */

  position: fixed;
  /* position: relative; */
  color: #121212;
  z-index: 1000;
}
.tabs {
  margin-top: -1.5em;
  padding-top: 0em;
}
h2 {
  margin-top: 0.5em;
}
.pay-screen-title {
  margin-top: -3.2em;
  margin-left: 6em;
  /* background: red; */
}
</style>
