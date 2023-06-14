<template>
  <div>
    <a name="top"></a>

    <form @submit.prevent="" class="form">
      <!-- ul navigation -->
      <ul
        id="tabs-swipe"
        class="tabs"
        ref="tabs"
        style="
          background: white;
          width: 92%;
          border-radius: 5px;
          box-shadow: 10px 10px 10px #00b9e3;
        "
      >
        <li class="tab col s3">
          <a
            active
            class="black-text"
            href="#swipe-1"
            style="font-size: 32px"
            >{{ `Display` | localize }}</a
          >
        </li>

        <li class="tab col s3">
          <a class="black-text" href="#swipe-2" style="font-size: 32px">{{
            `Setting` | localize
          }}</a>
        </li>
        <li class="tab col s3">
          <a class="black-text" href="#swipe-3" style="font-size: 32px">{{
            `Languages` | localize
          }}</a>
        </li>

        <!-- v-if="JSON.parse(getUsersIsAccess.mainFinance)" -->
        <li @click="setProgram('finance')" class="tab col s3">
          <a class="black-text" href="#swipe-4" style="font-size: 32px">{{
            `Finance` | localize
          }}</a>
        </li>

        <!-- <li @click="setProgram('alarms')" class="tab col s3">
          <a class="black-text" href="#swipe-5" style="font-size: 32px">{{
            `Alarms`
          }}</a>
        </li> -->
      </ul>
      <!-- end ul -->

      <!--  -->
      <div
        id="swipe-1"
        class="col s8 black"
        style="box-shadow: 10px 10px 10px #00b9e3"
      >
        <!-- Обзор -->
        <div style="width: 96%; margin-left: 1em">
          <h2 class="white-text page-subtitle">{{ `Review` | localize }}</h2>
          <br />
          <div class="panel page-title white-text">
            <div><SettingOverviewService /></div>
            <div style="position: fixed; top: 21.5em; left: 37.5em; width: 98%">
              <SettingOverviewCommon />
            </div>
          </div>
        </div>
        <!-- <hr /> -->
        <!-- Экран -->
        <div>
          <h2 class="white-text page-subtitle">{{ `Display` | localize }}</h2>
          <br />

          <!-- table -->
          <table style="margin-left: 1em; margin-top: 2em">
            <tbody>
              <!-- row 01 -->
              <tr style="margin-top: 8em">
                <td style="border: none; width: 1040px; height: 80px">
                  <div style="margin-right: 0em; margin-top: -12em">
                    <SettingScreenTooltip />
                  </div>
                </td>
              </tr>

              <!-- row 02 -->
              <tr style="margin-top: 0.5em">
                <td>
                  <div>
                    <SettingScreenGotoMainMenu />
                  </div>
                </td>
              </tr>

              <!-- row 03 first degreasingProgram change program -->
              <tr
                style="margin-top: 0.8em"
                :class="[
                  { 'first-opacity': isChangeProgramFirst },
                  { 'second-opacity': !isChangeProgramFirst },
                ]"
              >
                <td style="border: none; width: 360px; height: 80px">
                  <div
                    class="card grey lighten-3"
                    style="
                      border: solid 3px #00b9e3;
                      width: 380px;
                      height: 80px;
                      border-top-left-radius: 2em;
                      border-bottom-left-radius: 2em;
                      border-right-style: hidden;
                    "
                  >
                    <div class="card-content black-text">
                      <div class="switch">
                        <label>
                          <input
                            type="checkbox"
                            v-model="isChangeProgramFirst"
                          />

                          <span class="lever"></span>
                        </label>
                      </div>
                      <div class="change-item-title">
                        <span class="card-title">{{
                          `Replace_program` | localize
                        }}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td style="border: none; width: 360px">
                  <div
                    style="
                      width: 450px;
                      height: 0px;
                      margin-left: -7.5em;
                      margin-bottom: 6.5em;
                      padding-rigth: 0em;
                    "
                  >
                    <div>
                      <SettingScreenChangeItem
                        :changeProgramId="changeProgramIds[0]"
                      />
                    </div>
                  </div>
                </td>

                <td style="border: none; width: 360px">
                  <div
                    style="
                      width: 450px;
                      height: 0px;
                      margin-left: -8.8em;
                      margin-bottom: 6.5em;
                      padding-rigth: 0em;
                    "
                  >
                    <div>
                      <SettingScreenAssignItem
                        :changeProgramId="changeProgramIds[0]"
                      />
                    </div>
                  </div>
                </td>
              </tr>

              <!-- row 04 second diskProgram changhe program -->
              <tr
                style="margin-top: 0.8em"
                :class="[
                  { 'first-opacity': isChangeProgramSecond },
                  { 'second-opacity': !isChangeProgramSecond },
                ]"
              >
                <td style="border: none; width: 360px; height: 80px">
                  <div
                    class="card grey lighten-3"
                    style="
                      border: solid 3px #00b9e3;
                      width: 380px;
                      height: 80px;
                      border-top-left-radius: 2em;
                      border-bottom-left-radius: 2em;
                      border-right-style: hidden;
                    "
                  >
                    <div class="card-content black-text">
                      <div class="switch">
                        <label>
                          <input
                            type="checkbox"
                            v-model="isChangeProgramSecond"
                          />

                          <span class="lever"></span>
                        </label>
                      </div>
                      <div class="change-item-title">
                        <span class="card-title">{{
                          `Replace_program` | localize
                        }}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td style="border: none; width: 360px">
                  <div
                    style="
                      width: 450px;
                      height: 0px;
                      margin-left: -7.5em;
                      margin-bottom: 6.5em;
                      padding-rigth: 0em;
                    "
                  >
                    <div>
                      <SettingScreenChangeItem
                        :changeProgramId="changeProgramIds[1]"
                      />
                    </div>
                  </div>
                </td>

                <td style="border: none; width: 360px">
                  <div
                    style="
                      width: 450px;
                      height: 0px;
                      margin-left: -8.8em;
                      margin-bottom: 6.5em;
                      padding-rigth: 0em;
                    "
                  >
                    <div>
                      <SettingScreenAssignItem
                        :changeProgramId="changeProgramIds[1]"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <!--         -->

              <!-- row 05 -->
              <tr style="margin-top: 0.5em">
                <!-- td 01 -->
                <td style="width: 1040px">
                  <div
                    class="card black lighten-3"
                    style="
                      border: solid 3px #00b9e3;
                      width: 1040px;
                      height: 60px;
                      margin-left: 0px;
                      margin-top: 0em;
                      border-radius: 2rem;
                    "
                  >
                    <div class="card-content white-text">
                      <div class="switch" style="margin-top: -0.8em">
                        <label>
                          <input type="checkbox" v-model="isPayScreenMain" />

                          <span class="lever"></span>
                        </label>
                      </div>

                      <div class="pay-screen-title">
                        <span class="card-title">{{
                          `Make_the_payment_window_the_main` | localize
                        }}</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- end row -->

              <!-- row 06 -->
              <tr style="margin-top: -0.5em">
                <!-- td 01 -->
                <td style="width: 1040px">
                  <div
                    class="card black lighten-3"
                    style="
                      border: solid 3px #00b9e3;
                      width: 1040px;
                      height: 60px;
                      margin-left: 0px;
                      margin-top: 0em;
                      border-radius: 2rem;
                    "
                  >
                    <div class="card-content white-text">
                      <div class="switch" style="margin-top: -0.8em">
                        <label>
                          <input type="checkbox" v-model="isCnw" />

                          <span class="lever"></span>
                        </label>
                      </div>

                      <div class="pay-screen-title">
                        <span class="card-title">C.N.W.</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- end row -->

              <!-- row 07 -->
              <tr style="margin-top: -0.5em">
                <td style="width: 1040px">
                  <div
                    class="card black lighten-3"
                    style="
                      border: solid 3px #00b9e3;
                      width: 1040px;
                      height: 60px;
                      margin-left: 0px;
                      margin-top: 0em;
                      border-radius: 2rem;
                    "
                  >
                    <div class="card-content white-text">
                      <div class="switch" style="margin-top: -0.8em">
                        <label>
                          <input type="checkbox" v-model="isCursor" />

                          <span class="lever"></span>
                        </label>
                      </div>

                      <div class="pay-screen-title">
                        <span class="card-title">{{
                          `Show_cursor_in_the_main_window` | localize
                        }}</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- end row -->

              <!-- alarms row -->
              <tr style="width: 1040px; margin-top: 0em; margin-bottom: 6em">
                <td>
                  <SettingAlarmMessage />
                </td>

                <td>
                  <SettingAlarmPhone />
                </td>
              </tr>
              <!-- end alarms -->
            </tbody>
          </table>
          <div style="margin-top: -0.6em">
            <hr />
          </div>
          <!-- end table -->
        </div>
        <!-- end Экран -->
      </div>
      <!--  -->

      <div
        id="swipe-2"
        class="col s8 black"
        style="box-shadow: 10px 10px 10px #00b9e3"
      >
        <!-- new Настройки -->
        <!-- <h2 class="white-text">Настройки</h2>
        <br /> -->

        <table style="margin-left: 1em; margin-top: -1em">
          <tbody>
            <!-- row 01 -->
            <tr style="height: 80px; margin-left: 6.5em">
              <td>
                <div class="panel">
                  <div class="page-title white-text">
                    <!-- <h4>СИСТЕМА</h4> -->
                    <h4>{{ `System` | localize }}</h4>
                  </div>
                </div>
              </td>
            </tr>

            <!-- row 02 -->
            <tr style="margin-top: -1em">
              <td
                style="
              width: 520px;  
              <!-- border-top-left-radius: 2em;
              border-bottom-left-radius: 2em;
              border-right-style: hidden; --> 
              "
              >
                <div>
                  <SettingPaymentLanguage />
                </div>
              </td>
              <td style="width: 520px">
                <div>
                  <SettingPaymentCurrency />
                </div>
              </td>
            </tr>
            <!-- row 03 -->
            <tr style="margin-top: 3em">
              <td style="width: 1040px">
                <div
                  class="card black lighten-3"
                  style="
                    border: solid 3px #00b9e3;
                    width: 1040px;
                    height: 60px;
                    margin-left: 0px;
                    margin-top: 0em;
                    border-radius: 2rem;
                  "
                >
                  <div class="card-content white-text">
                    <div class="switch" style="margin-top: -0.8em">
                      <label>
                        <input type="checkbox" v-model="isCursor" />

                        <span class="lever"></span>
                      </label>
                    </div>

                    <div class="pay-screen-title">
                      <span class="card-title">{{
                        `Show_cursor_in_the_main_window` | localize
                      }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 04 -->
            <tr style="margin-top: -4em; margin-left: 6.5em">
              <td>
                <div class="panel">
                  <div class="page-title white-text">
                    <h4>{{ `Panel` | localize }}</h4>
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 05 -->
            <tr style="margin-top: -3em">
              <td style="width: 520px">
                <div>
                  <SettingPanelType />
                </div>
              </td>
              <td style="width: 520px">
                <div>
                  <div v-if="this.getPanelType === 'wash'">
                    <SettingPanelNumber />
                  </div>
                  <div v-if="this.getPanelType === 'vacuum'">
                    <SettingPanelVacuum />
                  </div>
                  <div v-if="this.getPanelType === 'payment'">
                    <SettingPanelPayment />
                  </div>
                </div>
              </td>
            </tr>

            <!-- row 06 -->
            <tr style="margin-top: 3.5em">
              <td style="width: 1040px">
                <div
                  class="card black lighten-3"
                  style="
                    border: solid 3px #00b9e3;
                    width: 1040px;
                    height: 60px;
                    margin-left: 0px;
                    margin-top: 0em;
                    border-radius: 2rem;
                  "
                >
                  <div class="card-content white-text">
                    <div class="switch" style="margin-top: -0.8em">
                      <label>
                        <input type="checkbox" v-model="isDirectCash" />

                        <span class="lever"></span>
                      </label>
                    </div>

                    <div class="pay-screen-title">
                      <span class="card-title">{{
                        `Direct_cash_payment` | localize
                      }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <!-- row 07 -->
            <tr style="margin-top: -3em">
              <td style="width: 1040px">
                <div
                  class="card black lighten-3"
                  style="
                    border: none;
                    width: 1040px;
                    height: 80px;
                    margin-left: 0px;
                    margin-top: 0em;
                    border-radius: 2rem;
                  "
                >
                  <div class="card-content white-text">
                    <div class="switch">
                      <label>
                        <input type="checkbox" v-model="isAcceptorInstalled" />

                        <span class="lever"></span>
                      </label>
                    </div>

                    <div class="pay-screen-title panel">
                      <span class="card-title" style="font-size: 33.06px">{{
                        `Bill_acceptor` | localize
                      }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 08 -->
            <tr
              style="margin-top: -4em"
              :class="[
                { 'first-opacity': isAcceptorInstalled },
                { 'second-opacity': !isAcceptorInstalled },
              ]"
            >
              <td style="width: 520px">
                <div>
                  <SettingPaymentAcceptor />
                </div>
              </td>
              <td style="width: 520px">
                <div>
                  <SettingPaymentBill />
                </div>
              </td>
            </tr>

            <!-- row 09 -->
            <tr style="margin-top: 3em">
              <td style="width: 1040px">
                <div
                  class="card black lighten-3"
                  style="
                    border: none;
                    width: 1040px;
                    height: 80px;
                    margin-left: 0px;
                    margin-top: 0em;
                    border-radius: 2rem;
                  "
                >
                  <div class="card-content white-text">
                    <div class="switch">
                      <label>
                        <input
                          type="checkbox"
                          v-model="isCoinAcceptorInstalled"
                        />
                        <span class="lever"></span>
                      </label>
                    </div>

                    <div class="pay-screen-title panel">
                      <span class="card-title" style="font-size: 33.06px">{{
                        `Coin_acceptor` | localize
                      }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 10 -->
            <tr
              style="margin-top: -4em"
              :class="[
                { 'first-opacity': isCoinAcceptorInstalled },
                { 'second-opacity': !isCoinAcceptorInstalled },
              ]"
            >
              <td style="width: 520px">
                <div>
                  <SettingCoinAcceptor />
                </div>
              </td>
              <td style="width: 520px">
                <div>
                  <SettingCoinBill />
                </div>
              </td>
            </tr>
            <!-- dev -->
            <tr style="margin-top: 7em; margin-left: 0px">
              <td>
                <div>
                  <SettingPaymentToken />
                </div>
              </td>
            </tr>
            <!--     -->

            <!-- row 11 -->
            <tr style="margin-top: -2em">
              <td style="width: 1040px">
                <div
                  class="card black lighten-3"
                  style="
                    border: solid 3px #00b9e3;
                    width: 1040px;
                    height: 60px;
                    margin-left: 0px;
                    margin-top: 0em;
                    border-radius: 2rem;
                  "
                >
                  <div class="card-content white-text">
                    <div class="switch" style="margin-top: -0.8em">
                      <label>
                        <input type="checkbox" v-model="isTerminalInstalled" />

                        <span class="lever"></span>
                      </label>
                    </div>

                    <div class="pay-screen-title">
                      <span class="card-title">{{
                        `Banking_terminal` | localize
                      }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <div
              :class="[
                { 'first-opacity': isTerminalInstalled },
                { 'second-opacity': !isTerminalInstalled },
              ]"
            >
              <!-- row 12 -->
              <tr style="margin-top: -2em; margin-left: 10px">
                <td style="width: 1020px">
                  <div>
                    <SettingPaymentTerminalType />
                  </div>
                </td>
              </tr>
              <!-- row 13 -->
              <tr style="margin-top: 2.8em; margin-left: 0px">
                <td>
                  <div>
                    <SettingPaymentLimit />
                  </div>
                </td>
              </tr>
            </div>
          </tbody>
        </table>
        <div style="margin-top: 2em">
          <hr />
        </div>

        <!-- end Настройки -->
      </div>

      <div
        id="swipe-3"
        class="col s8 black"
        style="box-shadow: 10px 10px 10px #00b9e3"
      >
        <!-- Языки -->
        <!-- dev -->

        <h2 class="white-text page-subtitle">{{ `Languages` | localize }}</h2>
        <br />

        <table style="margin-left: 1em; margin-top: -1em">
          <tbody>
            <!-- row 01 -->
            <tr style="margin-top: 2em">
              <td style="width: 1040px">
                <div>
                  <SettingLanguageSelect />
                </div>
              </td>
            </tr>
            <!-- row 02 -->
            <tr style="margin-top: 4em">
              <td style="width: 1040px">
                <div>
                  <SettingLanguageOrder />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 80em">
          <!-- <div style="margin-top: 92em;"> -->
          <hr />
        </div>

        <div></div>

        <!--     -->
      </div>

      <!-- end Языки -->

      <div
        id="swipe-4"
        class="col s8 black"
        style="box-shadow: 10px 10px 10px #00b9e3"
      >
        <!-- Финансы -->
        <!-- <div>
          <h2 class="white-text page-subtitle">Финансы</h2>
          <br />
          <div class="row panel">
            <div class="row left">
              <div class="col">
                
                <router-link to="/finance">
                  <button
                    class="
                      btn
                      waves-effect waves-light
                      lighten-3
                      white-text
                      button-setting
                    "
                  >
                    {{ 'Статистика' }}
                  </button>
                </router-link>

              </div>
            </div>
          </div>
        </div>
        <hr /> -->

        <!-- end Финансы -->
      </div>

      <!-- dev to do alarms-->

      <!-- <div
        id="swipe-5"
        class="col s8 black"
        style="box-shadow: 10px 10px 10px #00b9e3"
      >
        <div style="height: 80px; margin-left: 6.5em; margin-top: 2em;">
          <div>
            <div class="panel">
              <div class="page-title white-text">
                <h4>Alarms</h4>
              </div>
              
            </div>
          </div>
        </div>

      </div> -->

      <!-- valign="center" -->
      <div class="row right">
        <div class="col">
          <!-- <router-link to="/"> -->
          <button
            class="btn waves-effect waves-light lighten-3 white-text button-setting"
            type="submit"
            @click="okHandler"
          >
            {{ `OK` | localize }}
            <!-- <i class="material-icons right"></i> -->
          </button>
          <!-- </router-link> -->
        </div>
        <div class="col">
          <button
            class="btn waves-effect waves-light white-text button-setting"
            type="submit"
            @click="cancelHandler"
          >
            {{ `Cancel` | localize }}
            <!-- <i class="material-icons right"></i> -->
          </button>
        </div>

        <div class="col">
          <button
            class="btn waves-effect waves-light white-text button-setting"
            type="submit"
            @click="applyHandler"
          >
            {{ `Confirm` | localize }}
            <!-- <i class="material-icons right"></i> -->
          </button>
        </div>
      </div>
    </form>
    <!-- <a name="bottom"></a> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SettingPanelType from '@/components/setting/SettingPanelType'
import SettingPanelNumber from '@/components/setting/SettingPanelNumber'
import SettingPanelVacuum from '@/components/setting/SettingPanelVacuum'
import SettingPanelPayment from '@/components/setting/SettingPanelPayment'
import SettingPaymentLanguage from '@/components/setting/SettingPaymentLanguage'
import SettingPaymentCurrency from '@/components/setting/SettingPaymentCurrency'
import SettingPaymentAcceptor from '@/components/setting/SettingPaymentAcceptor'

import SettingCoinAcceptor from '@/components/setting/SettingCoinAcceptor'
import SettingPaymentBill from '@/components/setting/SettingPaymentBill'
import SettingCoinBill from '@/components/setting/SettingCoinBill'
import SettingLanguageSelect from '@/components/setting/SettingLanguageSelect'
import SettingLanguageOrder from '@/components/setting/SettingLanguageOrder'

import SettingPaymentTerminalType from '@/components/setting/SettingPaymentTerminalType'
import SettingPaymentLimit from '@/components/setting/SettingPaymentLimit'
import SettingPaymentLimitMin from '@/components/setting/SettingPaymentLimitMin'
import SettingPaymentLimitMax from '@/components/setting/SettingPaymentLimitMax'

/* SettingPaymentToken */
import SettingPaymentToken from '@/components/setting/SettingPaymentToken'

import SettingOverviewCommon from '@/components/setting/SettingOverviewCommon'
import SettingOverviewService from '@/components/setting/SettingOverviewService'
import SettingFinanceCoin from '@/components/setting/SettingFinanceCoin'
import SettingFinanceBanknote from '@/components/setting/SettingFinanceBanknote'
import SettingScreenTooltip from '@/components/setting/SettingScreenTooltip'
import SettingScreenGotoMainMenu from '@/components/setting/SettingScreenGotoMainMenu'
import SettingScreenChangeItem from '@/components/setting/SettingScreenChangeItem'
import SettingScreenAssignItem from '@/components/setting/SettingScreenAssignItem'

import FinanceTable from '@/components/FinanceTable'
import SettingAlarmMessage from '@/components/setting/SettingAlarmMessage'
import SettingAlarmPhone from '@/components/setting/SettingAlarmPhone'

import cost from '../store/cost'
import EventBus from '@/bus/EventBus'

export default Vue.extend({
  name: 'setting',
  data: () => ({
    isPayScreenMain: false,

    isChangeItem: false,
    isChangeProgramFirst: false,
    isChangeProgramSecond: false,

    degreasingProgram: '',
    diskProgram: '',

    isCnw: true,
    isCursor: true,

    changeItemIds: [1, 2],
    assignItemIds: [1],

    changeProgramIds: [1, 2, 3, 4],
    assignProgramIds: [1, 2, 3, 4],

    isTerminalInstalled: false,
    isDirectCash: false,

    isAcceptorInstalled: false,
    isCoinAcceptorInstalled: false,

    isDown: false,
    tabs: null,

    config: {},
    prevConfig: {},
  }),
  components: {
    SettingPanelType,
    SettingPanelNumber,
    SettingPanelVacuum,
    SettingPanelPayment,
    SettingPaymentLanguage,
    SettingPaymentCurrency,
    SettingPaymentAcceptor,

    SettingCoinAcceptor,
    SettingPaymentBill,
    SettingCoinBill,

    SettingLanguageSelect,
    SettingLanguageOrder,

    SettingPaymentTerminalType,
    SettingPaymentLimit,
    SettingPaymentLimitMin,
    SettingPaymentLimitMax,

    SettingPaymentToken,

    SettingOverviewCommon,
    SettingOverviewService,
    SettingFinanceCoin,
    SettingFinanceBanknote,
    SettingScreenTooltip,
    SettingScreenGotoMainMenu,
    SettingScreenChangeItem,
    SettingScreenAssignItem,

    FinanceTable,

    SettingAlarmMessage,
    SettingAlarmPhone,
  },
  mounted() {
    EventBus.$on('submitSelect', this.submitHandler)

    this.prevConfig = this.getConfig()
    this.setRouter('/setting')
    this.tabs = M.Tabs.init(this.$refs.tabs, {})
  },
  methods: {
    /* dev */
    ...mapActions({
      updateConfig: 'updateConfig',
    }),
    submitHandler(options) {
      const selected = JSON.stringify(options.selected)
      const current = JSON.stringify(options.current)
      //this.setLanguage(selected, current)
    },
    /* dev */
    setProgram(program) {
      if (program === 'finance') {
        this.$router.push('/finance')
      } else if (program === 'alarms') {
        // console.log('$$ show alarms')
      }
    },

    setLanguage() {},
    ...mapGetters({
      getConfig: 'getConfig',
    }),
    ...mapMutations({
      setRouter: 'setRouter',
      setLanguageNatives: 'setLanguageNatives',
      setLanguageIds: 'setLanguageIds',
      setTerminalInstalled: 'setTerminalInstalled',
      setDefaultTerminalType: 'setDefaultTerminalType',
      setAcceptorInstalled: 'setAcceptorInstalled',
      setCoinAcceptorInstalled: 'setCoinAcceptorInstalled',
      setDirectCash: 'setDirectCash',
      setCursor: 'setCursor',
      setPayScreenMain: 'setPayScreenMain',
      setCnw: 'setCnw',
      /* dev */
      setIsChangeProgramFirst: 'setIsChangeProgramFirst',
      setIsChangeProgramSecond: 'setIsChangeProgramSecond',
      setIsChangeItem: 'setIsChangeItem',

      setChangeProgram: 'setChangeProgram',
      setAssignProgramTo: 'setAssignProgramTo',
      setChangeItem: 'setChangeItem',
    }),
    setDown() {
      this.isDown = !this.isDown
    },
    okHandler() {
      this.config = this.getConfig()
      this.updateConfig(this.config)
      // this.$router.push('/')
      this.pushRouter()
    },
    cancelHandler() {
      // window.location.reload()
      this.updateConfig(this.prevConfig)
    },
    applyHandler() {
      this.config = this.getConfig()
      this.updateConfig(this.config)
    },
    pushRouter() {
      this.$router.push(this.getPrevRouter)
    },

    ...mapGetters({
      getTerminalInstalled: 'getTerminalInstalled',

      getCoinInstalled: 'getCoinInstalled',
      getDirectCash: 'getDirectCash',
      getCursor: 'getCursor',
      getPayScreenMain: 'getPayScreenMain',
      getCnw: 'getCnw',

      getIsChangeProgramFirst: 'getIsChangeProgramFirst',
      getIsChangeProgramSecond: 'getIsChangeProgramSecond',
      getIsChangeItem: 'getIsChangeItem',

      // getChangeProgram: 'getChangeProgram',
      // getAssignProgramTo: 'getAssignProgramTo',
      // getChangeItem: 'getChangeItem',
    }),
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
      getAcceptorInstalled: 'getAcceptorInstalled',
      getCoinAcceptorInstalled: 'getCoinAcceptorInstalled',
      getUsersIsAccess: 'getUsersIsAccess',
      getRouter: 'getRouter',
      getPrevRouter: 'getPrevRouter',
    }),
  },
  watch: {
    /* dev */
    isChangeProgramFirst(flag) {
      this.setIsChangeProgramFirst(flag)
    },
    isChangeProgramSecond(flag) {
      this.setIsChangeProgramSecond(flag)
    },
    isChangeItem(flag) {
      this.setIsChangeItem(flag)
    },

    getChangeProgram(flag) {
      console.log('$$ getChangeProgram', flag)
    },

    isCnw(flag) {
      this.setCnw(flag)
    },

    isPayScreenMain(flag) {
      this.setPayScreenMain(flag)
    },
    isCursor(flag) {
      this.setCursor(flag)
    },
    isDirectCash(flag) {
      this.setDirectCash(flag)
    },
    isTerminalInstalled(flag) {
      this.setTerminalInstalled(flag)
    },
    isAcceptorInstalled(flag) {
      this.setAcceptorInstalled(flag)
    },
    isCoinAcceptorInstalled(flag) {
      this.setCoinAcceptorInstalled(flag)
    },
  },
  created() {
    this.isPayScreenMain = this.getPayScreenMain()
    this.isCnw = this.getCnw()
    this.isCursor = this.getCursor()
    this.isTerminalInstalled = this.getTerminalInstalled()
    this.isDirectCash = this.getDirectCash()
    this.isAcceptorInstalled = this.getAcceptorInstalled
    this.isCoinAcceptorInstalled = this.getCoinAcceptorInstalled

    this.isChangeItem = this.getIsChangeItem()
    this.isChangeProgramFirst = this.getIsChangeProgramFirst()
    this.isChangeProgramSecond = this.getIsChangeProgramSecond()
  },
  beforeDestroy() {
    if (this.tabs && this.tabs.destroy) {
      this.tabs.destroy()
    }
  },
})
</script>

<style scoped>
.form {
  margin-top: 4rem;
  /* box-shadow: 5px 5px 10px #00b9e3; */
}
.panel {
  margin: 0 auto;
  text-transform: uppercase;
}
.payment {
  margin: 0 auto;
}
.page-subtitle {
  padding-left: 0.8em;
}
.btn {
  /* width: 13rem; */
  height: 2em;
  width: 9em;
  border: solid;
  border-width: 1px;
  border-color: white;
  /* background-color: #26a69a; */
}
.right {
  padding-right: 0em;
  padding-top: 1em;
}
.terminal-type {
  padding-bottom: 0rem;
}
.switch {
  padding-bottom: 1.5rem;
}
/* dev */
.button-setting {
  margin-top: 0.5em;
  border: solid 1px #00b9e3;
  font-size: 2em;
  background-color: #00b9e3;
  border-radius: 2rem;
  box-shadow: 6px 6px 10px #00b9e3;
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
  margin-left: 5em;
  /* background: red; */
}
.change-item-title {
  margin-left: 5em;
  margin-top: -3.2em;
}

.change-foam-title {
  margin-left: 1em;
  margin-top: 0em;
}
.change-cnw-title {
  margin-left: 5em;
  margin-top: -3.2em;
}
.change-cursor-title {
  margin-left: 4em;
  margin-top: -3.2em;
}
/* div */
tr {
  text-align: center;
  height: 115px;

  float: left;
}
td {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
  padding-left: 0px;

  height: 105px;
  width: 474px;

  border-style: solid;
  border-color: white;
  /* float: left; */
}
.first-opacity {
  opacity: 1;
}
.second-opacity {
  opacity: 0.6;
}
</style>
