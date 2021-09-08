<template>
  <div>
    <a name="top"></a>

    <form @submit.prevent="" class="form">
      <!-- ul navigation -->
      <ul
        id="tabs-swipe"
        class="tabs"
        ref="tabs"
        style="background: white; 
        width: 92%;
        border-radius: 5px;
        box-shadow: 6px 6px 10px #00b9e3;
        "
      >
        <li class="tab col s3">
          <a class="black-text" href="#swipe-1" style="font-size: 32px"
            >Обзор</a
          >
        </li>

        <li class="tab col s3">
          <a class="black-text" href="#swipe-2" style="font-size: 32px;"
            >Экран</a
          >
        </li>

        <li class="tab col s3">
          <a class=" black-text" href="#swipe-3" style="font-size: 32px"
            >Настройки</a
          >
        </li>
        <li class="tab col s3">
          <a class="active black-text" href="#swipe-4" style="font-size: 32px"
            >Языки</a
          >
        </li>
        <li class="tab col s3">
          <a class="black-text" href="#swipe-5" style="font-size: 32px"
            >Финансы</a
          >
        </li>
      </ul>
      <!-- end ul -->

      <!--  -->
      <div
        id="swipe-1"
        class="col s8 black"
        style="box-shadow: 5px 5px 10px #00b9e3;"
      >
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

      <div
        id="swipe-2"
        class="col s8 black"
        style="box-shadow: 5px 5px 10px #00b9e3;"
      >
        <!-- Экран -->
        <div>
          <h2 class="white-text">Экран</h2>
          <br />

          <!-- table -->
          <table style="margin-left: 1em; margin-top: 2em;">
            <tbody>
              <!-- row 01 -->
              <tr style="margin-top: 8em;">
                <td style="border: none; width: 1040px; height: 80px">
                  <div style="margin-right: 0em; margin-top: -12em;">
                    <SettingScreenTooltip />
                  </div>
                </td>
              </tr>
              <!-- row 02 -->
              <tr style="margin-top: 0.5em;">
                <td>
                  <div>
                    <SettingScreenGotoMainMenu />
                  </div>
                </td>
              </tr>
              <!-- row 03 -->
              <tr style="margin-top: 0.5em;">
                <td style="border: none; width: 360px; height: 80px;">
                  <div
                    class="card grey lighten-3"
                    style="
                      border: solid 3px #00b9e3;
                      width: 360px;
                      height: 80px;
                      border-top-left-radius: 2em;
                      border-bottom-left-radius: 2em;
                      border-right-style: hidden;
                      
                    "
                  >
                    <div class="card-content black-text">
                      <div class="switch">
                        <label>
                          <input type="checkbox" v-model="isChangeItem" />

                          <span class="lever"></span>
                        </label>
                      </div>
                      <!-- Заменить пункт / программу -->
                      <div class="change-item-title">
                        <span class="card-title">Заменить пункт</span>
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
                      <SettingScreenChangeItem :changeItemIds="changeItemIds" />
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
                      <SettingScreenAssignItem :assignItemIds="assignItemIds" />
                    </div>
                  </div>
                </td>
              </tr>
              <!-- row 04 -->
              <tr style="margin-top: 0.8em;">
                <td style="border: none; width: 360px; height: 80px">
                  <div
                    class="card grey lighten-3"
                    style="
                      border: solid 3px #00b9e3;
                      width: 360px;
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
                        <span class="card-title">Заменить программу</span>
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
                        :changeItemIds="changeProgramIds"
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
                        :assignItemIds="assignProgramIds"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <!-- row 05 -->
              <tr style="margin-top: 0.8em;">
                <td style="border: none; width: 360px; height: 80px">
                  <div
                    class="card grey lighten-3"
                    style="
                      border: solid 3px #00b9e3;
                      width: 360px;
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
                        <span class="card-title">Заменить программу</span>
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
                        :changeItemIds="changeProgramIds"
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
                        :assignItemIds="assignProgramIds"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <!-- row 06 -->
              <tr style="margin-top: 0.5em;">
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
                      <div class="switch" style="margin-top: -0.8em;">
                        <label>
                          <input type="checkbox" v-model="isPayScreenMain" />

                          <span class="lever"></span>
                        </label>
                      </div>

                      <div class="pay-screen-title">
                        <span class="card-title"
                          >Сделать окно оплаты основным</span
                        >
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- end row -->

              <!-- new row 02 -->
              <tr style="margin-top: -0.5em;">
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
                      <div class="switch" style="margin-top: -0.8em;">
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
              <!-- new row 03 -->
              <tr style="margin-top: -0.5em;">
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
                      <div class="switch" style="margin-top: -0.8em;">
                        <label>
                          <input type="checkbox" v-model="isCursor" />

                          <span class="lever"></span>
                        </label>
                      </div>

                      <div class="pay-screen-title">
                        <span class="card-title"
                          >Показать курсор в основном окне</span
                        >
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- end row -->

              <!--     -->

              <!-- <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr> -->
            </tbody>
          </table>
          <!-- end table -->
        </div>
        <hr />
        <!-- end Экран -->
      </div>
      <!--  -->

      <div
        id="swipe-3"
        class="col s8 black"
        style="box-shadow: 10px 10px 10px #00b9e3;"
      >
        <!-- new Настройки -->
        <!-- <h2 class="white-text">Настройки</h2>
        <br /> -->

        <table style="margin-left: 1em; margin-top: -1em;">
          <tbody>
            <!-- row 01 -->
            <tr style="height: 80px; margin-left: 6.5em;">
              <td>
                <div class="panel">
                  <div class="page-title white-text">
                    <h4>СИСТЕМА</h4>
                  </div>
                </div>
              </td>
            </tr>

            <!-- row 02 -->
            <tr style="margin-top: -1em;">
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
            <tr style="margin-top: 3em;">
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
                    <div class="switch" style="margin-top: -0.8em;">
                      <label>
                        <input type="checkbox" v-model="isCursor" />

                        <span class="lever"></span>
                      </label>
                    </div>

                    <div class="pay-screen-title">
                      <span class="card-title"
                        >Показать курсор в основном окне</span
                      >
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 04 -->
            <tr style="margin-top: -4em; margin-left: 6.5em;">
              <td>
                <div class="panel">
                  <div class="page-title white-text">
                    <h4>ПАНЕЛЬ</h4>
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 05 -->
            <tr style="margin-top: -3em;">
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
                  <div v-if="this.getPanelType === 'vaccum'">
                    <SettingPanelVaccum />
                  </div>
                  <div v-if="this.getPanelType === 'payment'">
                    <SettingPanelPayment />
                  </div>
                </div>
              </td>
            </tr>

            <!-- row 06 -->
            <tr style="margin-top: 3.5em;">
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
                    <div class="switch" style="margin-top: -0.8em;">
                      <label>
                        <input type="checkbox" v-model="isDirectCash" />

                        <span class="lever"></span>
                      </label>
                    </div>

                    <div class="pay-screen-title">
                      <span class="card-title">Прямая оплата наличными</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <!-- row 07 -->
            <tr style="margin-top: -3em;">
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

                    <div class="pay-screen-title">
                      <span class="card-title" style="font-size: 33.06px;"
                        >КУПЮРОПРИЕМНИК</span
                      >
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 08 -->

            <tr v-if="isAcceptorInstalled" style="margin-top: -4em;">
              <td style="width: 520px;">
                <div>
                  <SettingPaymentAcceptor />
                </div>
              </td>
              <td style="width: 520px;">
                <div>
                  <SettingPaymentBill />
                </div>
              </td>
            </tr>

            <!-- row 09 -->
            <tr style="margin-top: 3em;">
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

                    <div class="pay-screen-title">
                      <span class="card-title" style="font-size: 33.06px;"
                        >МОНЕТОПРИЕМНИК</span
                      >
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <!-- row 10 -->
            <tr v-if="isCoinAcceptorInstalled" style="margin-top: -4em;">
              <td style="width: 520px;">
                <div>
                  <SettingCoinAcceptor />
                </div>
              </td>
              <td style="width: 520px;">
                <div>
                  <SettingCoinBill />
                </div>
              </td>
            </tr>

            <!-- row 11 -->
            <tr style="margin-top: 3em;">
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
                    <div class="switch" style="margin-top: -0.8em;">
                      <label>
                        <input type="checkbox" v-model="isTerminalInstalled" />

                        <span class="lever"></span>
                      </label>
                    </div>

                    <div class="pay-screen-title">
                      <span class="card-title">Банковский терминал</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <!-- row 12 -->
            <tr
              v-if="isCoinAcceptorInstalled"
              style="margin-top: -2em; margin-left: 10px;"
            >
              <td style="width: 1020px;">
                <div>
                  <SettingPaymentTerminalType />
                </div>
              </td>
            </tr>

            <!-- SettingPaymentToken -->
            <!-- row 13 -->
            <tr style="margin-top: 2.5em; margin-left: 0px;">
              <td>
                <div>
                  <SettingPaymentToken />
                </div>
              </td>
            </tr>

            <!-- row 14 -->
            <tr style="margin-top: 2.5em; margin-left: 0px;">
              <td>
                <div>
                  <SettingPaymentLimit />
                </div>
              </td>
            </tr>
            <!-- row 15 -->

            <!--  -->
          </tbody>
        </table>
        <div style="margin-top: 2em;">
          <hr />
        </div>

        <!-- end Настройки -->
      </div>

      <div
        id="swipe-4"
        class="col s8 black"
        style="box-shadow: 10px 10px 10px #00b9e3;"
      >
        <!-- Языки -->
        <!-- dev -->

        <h2 class="white-text">Языки</h2>
        <br />

        <table style="margin-left: 2em; margin-top: -1em;">
          <tbody>
            <!-- row 01 -->
            <tr style="margin-top: 2em;">
              
              <td style="width: 520px;">
                <div>
                  <SettingLanguagePanel />
                </div>
              </td>

              <td style="width: 520px;">
                <div>
                  <SettingLanguageSelect />
                </div>
              </td>

            </tr>Payment
          </tbody>
        </table>

        <div></div>

        
        <!--     -->
      </div>

      <!-- end Языки -->

      <div
        id="swipe-5"
        class="col s8 black"
        style="box-shadow: 10px 10px 10px #00b9e3;"
      >
        <!-- Финансы -->
        <div>
          <h2 class="white-text">Финансы</h2>
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
                    type="submit"
                    @click="updateOk"
                  >
                    {{ 'Статистика' }}
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
        <div class="col">
          <!-- <router-link to="/"> -->
          <button
            class="
              btn
              waves-effect waves-light
              lighten-3
              white-text
              button-setting
            "
            type="submit"
            @click="updateOk"
          >
            {{ 'ОК' }}
            <!-- <i class="material-icons right"></i> -->
          </button>
          <!-- </router-link> -->
        </div>
        <div class="col">
          <button
            class="btn waves-effect waves-light white-text button-setting"
            type="submit"
            @click="updateCancel"
          >
            {{ 'Отмена' }}
            <!-- <i class="material-icons right"></i> -->
          </button>
        </div>

        <div class="col">
          <button
            class="btn waves-effect waves-light white-text button-setting"
            type="submit"
            @click="updateApply"
          >
            {{ 'Применить' }}
            <!-- <i class="material-icons right"></i> -->
          </button>
        </div>
      </div>
    </form>
    <a name="bottom"></a>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import SettingPanelType from '@/components/setting/SettingPanelType'
import SettingPanelNumber from '@/components/setting/SettingPanelNumber'
import SettingPanelVaccum from '@/components/setting/SettingPanelVaccum'
import SettingPanelPayment from '@/components/setting/SettingPanelPayment'
import SettingPaymentLanguage from '@/components/setting/SettingPaymentLanguage'
import SettingPaymentCurrency from '@/components/setting/SettingPaymentCurrency'
import SettingPaymentAcceptor from '@/components/setting/SettingPaymentAcceptor'

import SettingCoinAcceptor from '@/components/setting/SettingCoinAcceptor'
import SettingPaymentBill from '@/components/setting/SettingPaymentBill'
import SettingCoinBill from '@/components/setting/SettingCoinBill'
/* dev */
import SettingLanguagePanel from '@/components/setting/SettingLanguagePanel'
import SettingLanguageSelect from '@/components/setting/SettingLanguageSelect'



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

import cost from '../store/cost'

export default Vue.extend({
  name: 'setting',
  data: () => ({
    /* dev */

    isPayScreenMain: false,
    //isTooltipInstalled: false,
    isChangeItem: true,
    isChangeProgramFirst: true,
    isChangeProgramSecond: true,
    isCnw: true,
    isCursor: true,

    changeItemIds: [1, 2],
    assignItemIds: [1],

    changeProgramIds: [1, 2, 3],
    assignProgramIds: [1, 2, 3],

    isTerminalInstalled: false,
    isDirectCash: false,
    /* dev */
    isAcceptorInstalled: false,
    // isCoinInstalled: false,
    isCoinAcceptorInstalled: false,

    isDown: false,
    tabs: null
  }),
  components: {
    SettingPanelType,
    SettingPanelNumber,
    SettingPanelVaccum,
    SettingPanelPayment,
    SettingPaymentLanguage,
    SettingPaymentCurrency,
    SettingPaymentAcceptor,
    
    SettingCoinAcceptor,
    SettingPaymentBill,
    SettingCoinBill,
    /* dev */
    SettingLanguagePanel,
    SettingLanguageSelect,
    

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
    SettingScreenAssignItem
  },
  mounted() {
    /* dev */
    this.setRouter('/setting')
    this.tabs = M.Tabs.init(this.$refs.tabs, {})
  },
  methods: {
    ...mapMutations({
      setRouter: 'setRouter'
    }),
    setDown() {
      this.isDown = !this.isDown
    },
    updateOk() {
      /* dev */
      this.$router.push('/')

      //const panelType = this.getPanelType
      //if (panelType === 'wash') this.$router.push('/')
      //if (panelType === 'vaccum') this.$router.push('/password')
      //if (panelType === 'payment') this.$router.push('/')
    },
    updateCancel() {
      window.location.reload()
      //console.log('!!!updateCancel')
      //this.$router.push('/')
    },
    updateApply() {
      //console.log('!!!updateApply')
      // this.$router.push('/setting')
    },
    ...mapGetters({
      //getTooltipInstalled: 'getTooltipInstalled',
      getCoinInstalled: 'getCoinInstalled',
      getTerminalInstalled: 'getTerminalInstalled',
      getDirectCash: 'getDirectCash'
      //getAcceptorInstalled: 'getAcceptorInstalled'
    })
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
      getAcceptorInstalled: 'getAcceptorInstalled',
      getCoinAcceptorInstalled: 'getCoinAcceptorInstalled'
    })
  },
  created() {
    /* dev */
    this.isPayScreenMain = true
    //this.isTooltipInstalled = this.getTooltipInstalled()

    this.isTerminalInstalled = this.getTerminalInstalled()
    this.isDirectCash = this.getDirectCash()

    // bill
    this.isAcceptorInstalled = this.getAcceptorInstalled
    // coin
    //this.isCoinInstalled = this.getCoinInstalled()
    this.isCoinAcceptorInstalled = this.getCoinAcceptorInstalled

    // console.log('this.isCoinAcceptorInstalled-->', this.isCoinAcceptorInstalled)
  },
  beforeDestroy() {
    if (this.tabs && this.tabs.destroy) {
      this.tabs.destroy()
    }
  }
})
</script>

<style scoped>
.form {
  margin-top: 4rem;
  /* box-shadow: 5px 5px 10px #00b9e3; */
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
  height: 2em;
  width: 9em;
  border: solid;
  border-width: 1px;
  border-color: white;
  background-color: #26a69a;
}
.right {
  padding-right: 0rem;
  padding-top: 0rem;
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
  border: solid 3px #00b9e3;
  font-size: 2em;
  border-radius: 2rem;
  /* dev */
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
</style>
