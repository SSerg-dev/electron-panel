import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import setting from './setting'
import program from './program'
import cost from './cost'
import paid from './paid'
import vacuum from './vacuum'
import finance from './finance'
import options from './options'
//import connect from './connect'
import status from './status'
import countries from './countries'
import languages from './languages'

import { ipcRenderer } from 'electron'

Vue.use(Vuex)

export default new Vuex.Store({
  /*
    state: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {}
  */
  state: {
    params: [{ id: '', title: '', value: '' }],
    /* dev */
    paginate: 1,
    router: '/',

    info: { name: '', locale: 'ru-RU' }, /* ru-RU en-GB */
    cash_enabler: false,
    busyPanel: false,
    secondsGotoMainMenu: 442 /* 42 */,
    secondsGotoPopupMenu: 2,
    //secondsGotoProgramMenu: 6,

    secondsStatusTimer: 0,
    secondsBonusTimer: 0,

    isFirstTimer: true,
    isSecondTimer: true,
    isThirdTimer: true,

    secondsFirstTimer: 15,
    secondsSecondTimer: 20,
    secondsThirdTimer: 30,

    isConfig: false,
    //postNumber: 5,
    activeProgram: '',
    activeProgramNumber: '-1',
    /* dev */
    activeProgramKit: {},
    isActiveProgramKit: false,
    isCardMoney: false,
    isBonusMoney: false,

    cardMoney: 0,
    /*     */

    message: {
      id: 1,
      title: '',
      type: 'cash', // cash, status, program
      value: -1
    },
    isParamsChange: false,
    /* dev */
    isFooter: true,

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
    /* dryPrograms: [
      'vacuum',
      'air',
      'washer',
      'turboDryer',
      'blacking',
      'disinfection'
    ], */
    dryPrograms: [
      'vacuum', 
      'air',
      'stop',
      'washer',
      'blacking',
      'turboDryer',
      'disinfection'
    ],

    parameters: {
      progPrice: '',
      progShowMask: '',
      progStatusMask: '',
      busy: '',
      panelMoney: '0',
      stopFreeCount: '0',
      spend: '',
      zeroMoney: '',
      order: '',
      paidBonus: '',
      active: ''
    },

    dryParameters: {
      progPrice: '',
      progShowMask: '' /* all 126, 0 */,
      progStatusMask: '',
      busy: '',
      panelMoney: '0',
      order: '',
      paidBonus: '',
      active: ''
    },
    globalParameters: {
      fixedCurrency: ''
    },

    isDebug: true
  },
  actions: {
    /* dev */
    // Dry actions ======================
    // update program
    updateDryStartProgram({ commit, dispatch, getters, state }, params) {
      console.log('++updateDryStartProgram-->', JSON.stringify(params))

      if (params[2] === 'operator') dispatch('updateDryCallOperator')
      const number = state.dryPrograms.findIndex(p => p === params[2]) + 1

      commit('setActiveProgramNumber', number)

      if (params[3] > 0 || params[2] === 'stop') {
        try {
          // box index 1,2 ...
          ipcRenderer.send(
            'OPCUA',
            JSON.stringify({
              node: `::AsGlobalPV:VacuumPost[${getters.getVacuumNumber -
                1}].program`,
              value: getters.getActiveProgramNumber
            })
          )
        } catch (e) {
          console.warn('Error:', e.message)
        }
      }
    },
    updateDryCallOperator({ getters }) {
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:Vacuum[${getters.getVacuumNumber -
              1}].operatorCall`,
            value: true
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    /* dev */
    // Платежи --------------------------
    // (наличные или карта)
    updateDryMoney({ getters }, cash) {
      console.log('!!!updateDryMoney-->', cash)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:VacuumBalance[${getters.getVacuumNumber -
              // 1}].paidMoney`,
              1}].prepaymentMoney`,
            value: cash
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    // сервисные деньги
    updateDryServMoney({ getters }, service) {
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:VacuumBalance[${getters.getVacuumNumber -
              1}].paidService`,
            value: service
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    // бонусы
    updateDryBonusMoney({ getters }, bonus) {
      console.log('DRY Bonus update-->', bonus)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:VacuumBalance[${getters.getVacuumNumber -
              1}].paidBonus`,
            value: bonus
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    // card
    updateDryCardMoney({ getters }, card) {
      console.log('Card update-->', card)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:VacuumBalance[${getters.getVacuumNumber -
              1}].paidMoneyCard`,
            value: card
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },

    // end Платежи ----------------------
    // end Dry actions ==================

    // Wet actions ======================
    updateStartProgram({ commit, dispatch, getters, state }, params) {
      console.log('updateStartProgram-->', JSON.stringify(params))

      if (params[2] === 'operator') dispatch('updateCallOperator')
      const number = state.programs.findIndex(p => p === params[2]) + 1

      commit('setActiveProgramNumber', number)
      
      if (params[3] > 0 || params[2] === 'stop') {
        try {
          // box index 1,2 ...
          ipcRenderer.send(
            'OPCUA',
            JSON.stringify({
              node: `::AsGlobalPV:PostN[${getters.getDefaultPanelNumber -
                1}].prog`,
              value: getters.getActiveProgramNumber
            })
          )
        } catch (e) {
          console.warn('Error:', e.message)
        }
      }
    },
    updateCallOperator({ getters }) {
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostN[${getters.getDefaultPanelNumber -
              1}].operatorCall`,
            value: true
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    // Платежи --------------------------
    // (наличные или карта)
    updateWetMoney({ getters }, cash) {
      console.log('!!!updateWetMoney-->', cash)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              /* 1}].paidMoney`, */
              1}].prepaymentMoney`,
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
      console.log('WET Bonus update-->', bonus)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidBonus`,
              // 1}].prepaymentBonus`,
            value: bonus
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    // card
    updateWetCardMoney({ getters }, card) {
      console.log('Card update-->', card)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidMoneyCard`,
            value: card
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },

    updateWetZeroMoney({ getters }, zeroMoney) {
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostN[${getters.getDefaultPanelNumber -
              1}].cmdZeroMoney`,
            value: zeroMoney
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },

    // end Платежи ----------------------

    // end Wet actions ==================

    // update config

    updateConfig({ getters }, config) {
      //console.group(`config:`)
      // console.log(
      //   `Config update config.bank_terminal--> ${JSON.stringify(
      //     config.bank_terminal
      //   )}`
      // )
      //console.log('Config update config.ui.CNW-->', config.ui.CNW)
      //console.log('++Config update-->', config.ui.main_window)
      //console.log('++Config update-->', config.ui.hide_cursor)
      //console.log('++Config update-->', config.bill_validator)
      //console.log('++Config update-->', config.coin_acceptor)
      //console.log('++Config update-->', config.type)
      //console.log('++Config update-->', config.index)
      //console.log('++Config update syspanel-->', config.languages.syspanel)
      //console.log('++Config update default-->', config.languages.default)
      //console.log('++Config update currency-->', config.currency)
      //console.log('++Config update countries-->', config.countries)
      //console.log('++Config update-->', config.ui.direct_cash)
      //console.groupEnd()

      try {
        ipcRenderer.send('config', JSON.stringify(config))
      } catch (e) {
        console.warn('Error:', e.message)
      }
    }

    /*     */
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
      return state.parameters.panelMoney
    },
    getWetPaidBonus(state) {
      return state.parameters.paidBonus
    },
    // end Платежи ------------------------------------------------------------

    getWetBusyPanel(state) {
      return state.parameters.busy
    },
    // Статус программ (маска по которой отображают работающие)
    // progStatusMask
    getWetProgStatus(state) {
      return state.parameters.progStatusMask
    },
    // Прайс программ (маска по которой отображают доступные)
    getWetProgShow(state) {
      // progShowMask
      return state.parameters.progShowMask
    },
    // Прайс программ (список цен)
    // progPrice
    getWetProgPrice(state, getters) {
      return state.parameters.progPrice
    },
    getWetStopFreeCount(state) {
      return state.parameters.stopFreeCount
    },
    getWetSpend(state) {
      return state.parameters.spend
    },
    getWetZeroMoney(state) {
      return state.parameters.zeroMoney
    },
    getWetOrder(state) {
      return state.parameters.order
    },
    getWetActive(state) {
      return state.parameters.active
    },
    // DRY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Список всех Dry программ
    getDryProgShow(state) {
      return state.dryParameters.progShowMask
    },
    getDryProgPrice(state) {
      return state.dryParameters.progPrice
    },
    getDryBalance(state) {
      return state.dryParameters.panelMoney
    },
    getDryPaidBonus(state) {
      return state.dryParameters.paidBonus
    },
    getDryBusyPanel(state) {
      return state.dryParameters.busy
    },
    /* dev */
    getFixedCurrency(state) {
      // ::AsGlobalPV:gFixedCurrency.digits
      return state.globalParameters.fixedCurrency
      // return 2
    },
    getDryOrder(state) {
      return state.dryParameters.order
    },
    getDryActive(state) {
      return state.parameters.active
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
    getSecondsGotoProgramMenu(state) {
      return state.secondsGotoProgramMenu
    },
    getIsConfig(state) {
      return state.isConfig
    },
    getActiveProgram(state) {
      return state.activeProgram
    },
    getActiveProgramKit(state) {
      return state.activeProgramKit
    },
    getIsActiveProgramKit(state) {
      return state.isActiveProgramKit
    },
    getIsCardMoney(state) {
      return state.isCardMoney
    },
    getCardMoney(state) {
      return state.cardMoney
    },
    getIsBonusMoney(state) {
      return state.isBonusMoney
    },
    getSecondsBonusTimer(state) {
      return state.secondsBonusTimer
    },
    /* dev */
    getIsFirstTimer(state) {
      return state.isFirstTimer
    },
    getIsSecondTimer(state) {
      return state.isSecondTimer
    },
    getIsThirdTimer(state) {
      return state.isThirdTimer
    },

    getSecondsFirstTimer(state) {
      return state.secondsFirstTimer
    },
    getSecondsSecondTimer(state) {
      return state.secondsSecondTimer
    },
    getSecondsThirdTimer(state) {
      return state.secondsThirdTimer
    },

    getActiveProgramNumber(state) {
      console.log('state.activeProgramNumber-->', state.activeProgramNumber)
      return state.activeProgramNumber
    },
    getCurrentMessage(state) {
      return state.message
    },
    getParamsChange(state) {
      //console.log('--getParamsChange-->', state.isParamsChange)
      return state.isParamsChange
    },
    getIsFooter(state) {
      return state.isFooter
    }
  },

  mutations: {
    setWetBalance(state, money) {
      state.parameters.panelMoney = money
    },
    setDryBalance(state, money) {
      state.dryParameters.panelMoney = money
    },
    // set one parameter
    setParameters(state, parameter) {
      //console.log('--setParameters')

      state.isParamsChange = !state.isParamsChange

      const displayName = parameter.title.slice(
        parameter.title.indexOf('.') + 1
      )
      // console.log('----------------------------------------------------------')
      // console.log('from B&D -->',parameter.title, displayName, parameter.value)

      // console.log('++displayName-->', displayName)
      // console.log('++parameter.value-->', parameter.value)

      switch (displayName) {
        case 'progPrice':
          state.parameters.progPrice = parameter.value
          break
        case 'progShowMask':
          state.parameters.progShowMask = parameter.value
          break
        case 'progStatusMask':
          state.parameters.progStatusMask = parameter.value
          break
        case 'busy':
          state.parameters.busy = parameter.value
          break
        case 'PanelMoney':
          state.parameters.panelMoney = parameter.value
          break
        case 'digits':
          state.globalParameters.fixedCurrency = parameter.value
          break
        case 'stopFreeCount':
          state.parameters.stopFreeCount = parameter.value
          break
        case 'spend':
          state.parameters.spend = parameter.value
          break
        case 'cmdZeroMoney':
          state.parameters.cmdZeroMoney = parameter.value
          break
        case 'order':
          state.parameters.order = parameter.value
          break
        case 'paidBonus':
          state.parameters.paidBonus = parameter.value
          break
        case 'active':
          state.parameters.active = parameter.value
          break

        default:
          //console.log('no param')
          break
      }
    },

    /* dev */
    setDryParameters(state, parameter) {
      state.isParamsChange = !state.isParamsChange
      const displayName = parameter.title.slice(
        parameter.title.indexOf('.') + 1
      )
      // console.log('setDryParameters-->', displayName, parameter.value)

      switch (displayName) {
        case 'progPrice':
          state.dryParameters.progPrice = parameter.value
          break
        case 'progShowMask':
          state.dryParameters.progShowMask = parameter.value
          break
        case 'progStatusMask':
          state.dryParameters.progStatusMask = parameter.value
          break
        case 'busy':
          state.dryParameters.busy = parameter.value
          break
        case 'panel_money':
          state.dryParameters.panelMoney = parameter.value
          break
        case 'digits':
          state.globalParameters.fixedCurrency = parameter.value
          break
        case 'order':
          state.dryParameters.order = parameter.value
          break
        case 'paidBonus':
          state.dryParameters.paidBonus = parameter.value
          break
        case 'active':
          state.dryParameters.active = parameter.value

          break

        default:
          break
      }
    },

    setPaginate(state, paginate) {
      state.paginate = paginate
    },
  // dev
    // setParamsChange
    setParamsChange(state, isParamsChange) {
      state.isParamsChange = isParamsChange
    },
    // setFooter
    setIsFooter(state, isFooter) {
      state.isFooter = isFooter
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
      // console.log('state.activeProgram-->', state.activeProgram)
    },
    setActiveProgramKit(state, activeProgramKit) {
      state.activeProgramKit = activeProgramKit
      // console.log('state.activeProgramKit-->', state.activeProgramKit)
    },
    setIsActiveProgramKit(state, isActiveProgramKit) {
      state.isActiveProgramKit = isActiveProgramKit
    },
    setIsCardMoney(state, isCardMoney) {
      state.isCardMoney = isCardMoney
    },
    setCardMoney(state, cardMoney) {
      state.cardMoney = cardMoney
    },
    setIsBonusMoney(state, isBonusMoney) {
      state.isBonusMoney = isBonusMoney
    },
    setSecondsBonusTimer(state, secondsBonusTimer) {
      state.secondsBonusTimer = secondsBonusTimer
    },
    /* dev */
    setIsFirstTimer(state, isFirstTimer) {
      state.isFirstTimer = isFirstTimer
    },
    setIsSecondTimer(state, isSecondTimer) {
      state.isSecondTimer = isSecondTimer
    },
    setIsThirdTimer(state, isThirdTimer) {
      state.isThirdTimer = isThirdTimer
    },

    setSecondsFirstTimer(state, secondsFirstTimer) {
      state.secondsFirstTimer = secondsFirstTimer
    },
    setSecondsSecondTimer(state, secondsSecondTimer) {
      state.secondsSecondTimer = secondsSecondTimer
    },
    setSecondsThirdTimer(state, secondsThirdTimer) {
      state.secondsThirdTimer = secondsThirdTimer
    },

    setWetZeroMoney(state, zeroMoney) {
      state.parameters.zeroMoney = zeroMoney
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
  } /* end mutations */,

  modules: {
    setting,
    program,
    cost,
    paid,
    vacuum,
    finance,
    options,
    //connect,
    status,
    countries,
    languages
  }
})
