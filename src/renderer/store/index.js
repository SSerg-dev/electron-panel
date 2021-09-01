import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import posts from './posts'
import setting from './setting'
import program from './program'
import cost from './cost'
import paid from './paid'
import vaccum from './vaccum'
import finance from './finance'
import options from './options'
//import connect from './connect'
import status from './status'
import countries from './countries'
import languages from './languages'


import { ipcRenderer } from 'electron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    params: [{ id: '', title: '', value: '' }],
    /* dev */
    paginate: 1,
    router: '/',

    info: { name: '', locale: 'ru-RU' },
    cash_enabler: false,
    busyPanel: false,
    secondsGotoMainMenu: 600,
    secondsGotoPopupMenu: 2,
    //secondsGotoProgramMenu: 6,

    secondsStatusTimer: 0,

    isConfig: false,
    //postNumber: 5,
    activeProgram: '',
    activeProgramNumber: '-1',
    message: {
      id: 1,
      title: '',
      type: 'cash', // cash, status, program
      value: -1
    },
    isParamsChange: false,

    programs: [
      'shampoo',
      'waterShampoo',
      'coldWater',
      'waxProtection',
      'dryShine',
      'foam',
      'stop',
      'waterShampoo_turbo',
      'coldWater_turbo',
      'waxProtection_turbo',
      'dryShine_turbo', // ?
      'warmWater',
      'warmWater_turbo',
      'brushFoam',
      'disk',
      'mosquito',
      'vacuum',
      'air',
      'washer', // ?
      'foam_color',
      'brushFoam_color',
      'shampoo_x2',
      'foam_x2',
      'brushFoam_x2',
      'disk_x2',
      'mosquito_x2',
      'turboDryer' // ?
    ],
    parameters: {
      progPrice: '',
      progShowMask: '',
      progStatusMask: '',
      busy: '',
      PanelMoney: '0'
    },
    isDebug: true
  },
  actions: {
    // try {} catch (e) {}

    updateStartProgram({ commit, dispatch, getters, state }, params) {
      console.log('updateStartProgram-->', JSON.stringify(params))

      // if (params[2] === 'operator') dispatch('sendCallOperator')
      if (params[2] === 'operator') dispatch('updateCallOperator')

      const number = state.programs.findIndex(p => p === params[2]) + 1
      //console.log('number-->', number)

      commit('setActiveProgramNumber', number)
      if (params[3] > 0 || params[2] === 'stop') {
        try {
          // box index 1,2 ...
          ipcRenderer.send(
            'OPCUA',
            JSON.stringify({
              /* dev */
              /* node: '::AsGlobalPV:PostN[4].prog', */
              node: `::AsGlobalPV:PostN[${getters.getDefaultPanelNumber -
                1}].prog`,
              value: getters.getActiveProgramNumber
              //
            })
          )
        } catch (e) {
          console.warn('Error:', e.message)
        }
      }
    },
    updateCallOperator({ getters }) {
      //console.log("!!!updateCallOperator")
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            //node: '::AsGlobalPV:PostN[4].operatorCall',
            node: `::AsGlobalPV:PostN[${getters.getDefaultPanelNumber -
              1}].operatorCall`,
            value: true
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    // Платежи ----------------------------------------------------------------

    // (наличные или карта)
    updateWetMoney({ getters }, cash) {
      console.log('!!!updateWetMoney-->', cash)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            //node: '::AsGlobalPV:PostBalance[4].paidMoney',
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidMoney`,
            value: cash
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    // сервисные деньги
    updateWetServMoney({ getters }, service) {
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            //node: '::AsGlobalPV:PostBalance[4].paidService',
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidService`,
            value: service
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    // бонусы
    updateWetBonusMoney({ getters }, bonus) {
      console.log('Bonus update-->', bonus)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            //node: '::AsGlobalPV:PostBalance[4].paidBonus',
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidBonus`,
            value: bonus
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    }
    // end Платежи ------------------------------------------------------------
  },
  getters: {
    // get all params
    getParams(state) {
      return state.params
    },
    // WET !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Платежи ----------------------------------------------------------------

    // Панель суммы платежей = (наличные или карта) + бонусы + сервисные деньги
    getWetBalance(state) {
      // PanelMoney
      //return state.params.find((p) => p.title === "TAG_WET_BALANCE")?.value;

      return state.parameters.PanelMoney
      //return 1001
    },
    // (наличные или карта)
    getWetMoney(state) {
      return state.params.find(p => p.title === 'TAG_WET_MONEY')?.value
    },
    // сервисные деньги
    getWetServMoney(state) {
      return state.params.find(p => p.title === 'TAG_WET_SERV_MONEY')?.value
    },
    // бонусы
    getWetBonusMoney(state) {
      return state.params.find(p => p.title === 'TAG_WET_BONUS_MONEY')?.value
    },
    // end Платежи ------------------------------------------------------------

    // Список всех Wet программ
    getWetProg(state) {
      return state.params.filter(p => p.title.slice(4, 7) === 'WET')
    },
    getWetStopTime(state) {
      return state.params.find(p => p.title === 'TAG_WET_STOP_TIME')?.value
    },
    // Занята ли панель
    getWetBusyPanel(state) {
      // busy
      //return state.params.find(p => p.title === 'TAG_WET_IS_BUSY')?.value
      return state.parameters.busy
    },
    getWetEnabled(state) {
      // active
      return state.params.find(p => p.title === 'TAG_WET_ENABLED')?.value
    },

    getWetProgram(state) {
      return state.params.find(p => p.title === 'TAG_WET_PROGRAM')?.value
    },
    // Статус программ (маска по которой отображают работающие)
    getWetProgStatus(state) {
      // progStatusMask
      /* let arr = state.params
        .filter(p => p.title === 'TAG_WET_PROG_STATUS')
        .sort((a, b) => a - b)
        .reverse()
      return arr[0]?.value */
      return state.parameters.progStatusMask
    },
    // Прайс программ (маска по которой отображают доступные)
    getWetProgShow(state) {
      // progShowMask
      //console.log('state.parameters.progShowMask-->', state.parameters.progShowMask)
      return state.parameters.progShowMask
    },
    getWetAddMoney(state) {
      return state.params.find(p => p.title === 'TAG_WET_ADD_MONEY')?.value
    },
    getWetAddMoney2(state) {
      return state.params.find(p => p.title === 'TAG_WET_ADD_MONEY2')?.value
    },
    // Прайс программ (список цен)
    getWetProgPrice(state, getters) {
      // progPrice
      //return state.params.find(p => p.title === 'TAG_WET_PROG_PRICE')?.value
      /* return state.params.find(
        p =>
          p.title ===
          `::AsGlobalPV:PostN[${getters.getDefaultPanelNumber - 1}].progPrice`
      )?.value */
      return state.parameters.progPrice
    },
    getWetOrder(state) {
      return state.params.find(p => p.title === 'TAG_WET_ORDER')?.value
    },
    getWetCallOperator(state) {
      return state.params.find(p => p.title === 'TAG_WET_CALL_OPERATOR')?.value
    },
    getWetDoor(state) {
      return state.params.find(p => p.title === 'TAG_WET_DOOR')?.value
    },
    getWetCollect(state) {
      return state.params.find(p => p.title === 'TAG_WET_COLLECT')?.value
    },
    getWetShowOperatorCall(state) {
      // operatorCall
      return state.params.find(p => p.title === 'TAG_WET_SHOW_OPERATOR_CALL')
        ?.value
    },
    getWetBalanceIsTime(state) {
      return state.params.find(p => p.title === 'TAG_WET_BALANCE_IS_TIME')
        ?.value
    },
    getWetShowPrice(state) {
      return state.params.find(p => p.title === 'TAG_WET_SHOW_PRICE')?.value
    },
    getWetMoneyTotal(state) {
      return state.params.find(p => p.title === 'TAG_WET_MONEY_TOTAL')?.value
    },
    getWetTime(state) {
      return state.params.find(p => p.title === 'TAG_WET_TIME')?.value
    },
    // END WET !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // DRY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Список всех Dry программ
    getDryProg(state) {
      return state.params.filter(p => p.title.slice(4, 7) === 'DRY')
    },
    getDryBalance(state) {
      return state.params.find(p => p.title === 'TAG_DRY_BALANCE')?.value
    },
    getWetProgram(state) {
      return state.params.find(p => p.title === 'TAG_DRY_PROGRAM')?.value
    },
    getDryProgStatus(state) {
      let arr = state.params
        .filter(p => p.title === 'TAG_DRY_PROG_STATUS')
        .sort((a, b) => a - b)
        .reverse()
      return arr[0]?.value
    },
    getDryProgShow(state) {
      let arr = state.params
        .filter(p => p.title === 'TAG_DRY_PROG_SHOW')
        .sort((a, b) => a - b)
        .reverse()
      return arr[0]?.value
    },
    getDryAddMoney(state) {
      return state.params.find(p => p.title === 'TAG_DRY_ADD_MONEY')?.value
    },
    getDryAddMoney2(state) {
      return state.params.find(p => p.title === 'TAG_DRY_ADD_MONEY2')?.value
    },
    getDryProgPrice(state) {
      return state.params.find(p => p.title === 'TAG_DRY_PROG_PRICE')?.value
    },
    getDryMoney(state) {
      return state.params.find(p => p.title === 'TAG_DRY_MONEY')?.value
    },
    getDryServMoney(state) {
      return state.params.find(p => p.title === 'TAG_DRY_SERV_MONEY')?.value
    },
    getDryOrder(state) {
      return state.params.find(p => p.title === 'TAG_DRY_ORDER')?.value
    },
    getDryCallOperator(state) {
      return state.params.find(p => p.title === 'TAG_DRY_CALL_OPERATOR')?.value
    },
    getDryDoor(state) {
      return state.params.find(p => p.title === 'TAG_DRY_DOOR')?.value
    },
    getDryCollect(state) {
      return state.params.find(p => p.title === 'TAG_DRY_COLLECT')?.value
    },
    getDryShowOperatorCall(state) {
      return state.params.find(p => p.title === 'TAG_DRY_SHOW_OPERATOR_CALL')
        ?.value
    },
    getDryBalanceIsTime(state) {
      return state.params.find(p => p.title === 'TAG_DRY_BALANCE_IS_TIME')
        ?.value
    },
    getDryShowPrice(state) {
      return state.params.find(p => p.title === 'TAG_DRY_SHOW_PRICE')?.value
    },
    getDryMoneyTotal(state) {
      return state.params.find(p => p.title === 'TAG_DRY_MONEY_TOTAL')?.value
    },
    getDryTime(state) {
      return state.params.find(p => p.title === 'TAG_DRY_TIME')?.value
    },

    // END DRY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    info: s => s.info,

    getPaginate(state) {
      return state.paginate
    },
    getRouter(state) {
      return state.router
    },
    getCashEnabler(state) {
      return state.cash_enabler
    },
    getSecondsGotoMainMenu(state) {
      return state.secondsGotoMainMenu
    },
    getSecondsGotoPopupMenu(state) {
      return state.secondsGotoPopupMenu
    },
    /* getSecondsGotoProgramMenu(state) {
      return state.secondsGotoProgramMenu
    }, */
    // secondsStatusTimer
    /* getSecondsStatusTimer(state) {
      return state.secondsStatusTimer
    }, */

    getIsConfig(state) {
      return state.isConfig
    },
    getActiveProgram(state) {
      return state.activeProgram
    },
    getActiveProgramNumber(state) {
      console.log('state.activeProgramNumber-->', state.activeProgramNumber)
      return state.activeProgramNumber
    },
    getCurrentMessage(state) {
      return state.message
    },
    getParamsChange(state) {
      //console.log('!!getParamsChange-->', state.isParamsChange)
      return state.isParamsChange
    }
  },

  mutations: {
    // set one parameter
    setParameters(state, parameter) {
      // console.log('index-->displayName-->', displayName)

      this.isParamsChange = !this.isParamsChange

      const displayName = parameter.title.slice(
        parameter.title.indexOf('.') + 1
      )
      /* dev */
      //console.log('----------------------------------------------------------')
      //console.log('++displayName-->', displayName)
      //console.log('++parameter.value-->', parameter.value)

      switch (displayName) {
        case 'progPrice':
          state.parameters.progPrice = parameter.value
          //console.log( '++progPrice-->', state.parameters.progPrice)
          break
        case 'progShowMask':
          state.parameters.progShowMask = parameter.value
          // console.log( '++progShowMask', displayName, state.parameters.progShowMask)

          break
        case 'progStatusMask':
          state.parameters.progStatusMask = parameter.value
          //console.log( '++progStatusMask', displayName, state.parameters.progStatusMask)
          break
        // getWetBusyPanel
        case 'busy':
          // console.log(displayName, state.parameters.busy)
          state.parameters.busy = parameter.value
          break
        // PanelMoney
        case 'PanelMoney':
          state.parameters.PanelMoney = parameter.value
          //console.log(displayName, state.parameters.PanelMoney)
          break
        //------------------------
        //------------------------
        default:
          //console.log('no param')
          break
      }
    },

    // dev
    // getParamsChange
    setParamsChange(state, isParamsChange) {
      state.isParamsChange = isParamsChange
    },

    // Info
    setInfo(state, info) {
      state.info = info
      //console.log('state.info.locale -->', state.info.locale)
    },
    /* dev */
    setRouter(state, router) {
      state.router = router
    },
    setCashEnabler(state, cash_enabler) {
      state.cash_enabler = cash_enabler
    },
    clearInfo(state) {
      state.info = { name: '', locale: '' }
    },
    setIsConfig(state, isConfig) {
      state.isConfig = isConfig
      //console.log('setIsConfig')
    },
    setActiveProgram(state, activeProgram) {
      state.activeProgram = activeProgram
      //console.log('state.activeProgram-->', state.activeProgram)
    },
    setActiveProgramNumber(state, activeProgramNumber) {
      state.activeProgramNumber = activeProgramNumber
      //console.log('state.activeProgramNumber-->', state.activeProgramNumber)
    },
    setSecondsGotoMainMenu(state, seconds) {
      state.secondsGotoMainMenu = seconds
      //console.log('++state.secondsGotoMainMenu-->', state.secondsGotoMainMenu)
    },
    setSecondsGotoPopupMenu(state, seconds) {
      state.secondsGotoPopupMenu = seconds
      //console.log('state.secondsGotoPopupMenu-->', state.secondsGotoPopupMenu)
    }

  }, /* end mutations */

  modules: {
    posts,
    setting,
    program,
    cost,
    paid,
    vaccum,
    finance,
    options,
    //connect,
    status,
    countries,
    languages 
  }
})
