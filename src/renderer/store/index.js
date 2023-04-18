import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import setting from './setting'
import program from './program'
import cost from './cost'
import paid from './paid'
import vacuum from './vacuum'
import finance from './finance'
import options from './options'
import status from './status'
import countries from './countries'
import languages from './languages'
import alarms from './alarms'
import sleep from '@/utils/sleep'

import { ipcRenderer } from 'electron'
import { result } from 'lodash'
var sha1 = require('sha-1')

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
    paginate: 1,
    router: '/',

    orderData: {
      address: '',
      name: '',
      number: '',
      serialNumber: '',
      upName: ''
    },

    info: { name: '', locale: 'ru-RU' } /* ru-RU en-GB */,
    cash_enabler: false,
    busyPanel: false,
    secondsGotoMainMenu: 300,
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
    activeProgram: '',
    activeProgramNumber: '-1',

    activeProgramKit: {},
    isActiveProgramKit: false,

    isCardMoney: false,
    isBonusMoney: false,

    cardMoney: 0,

    message: {
      id: 1,
      title: '',
      type: 'cash', // cash, status, program
      value: -1
    },
    isParamsChange: false,
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
      'turboDryer',
      'degrease',
      'disinfection' // ?
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
      active: '',
      programName: ''
    },

    dryParameters: {
      progPrice: '',
      progShowMask: '',
      progStatusMask: '',
      busy: '',
      panelMoney: '0',
      order: '',
      paidBonus: '',
      active: ''
    },
    globalParameters: {
      fixedCurrency: '',
      isMenuUnlock: '',
      isStandFree: ''
    },
    kktParameters: {
      isKktInstalled: false
    },
    users: {
      name: '',
      userActiveName: '',
      names: [],
      userIndex: -1,

      access: [],

      password: '',
      passwords: [],

      role: '',
      delay: 1000,
      isAccess: {
        /* B&D */ /* index 0-10 */
        mainMenu: false, // 1
        mainDiagnostic: false, // 2
        mainPosts: false, // 3
        mainSetting: false, // 4
        mainStatistic: false, // 5
        mainFinance: false, // 6
        /* panels */
        panelCollection: false, // 0
        panelPlusTen: false, // 7
        panelOpen: false // 8
      }
    },
    loginSettingPassword: '',

    isOddVacuumNumber: true,
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
      console.log('$$ index.js: 310', JSON.stringify(params))

      if (params[2] === 'operator') dispatch('updateCallOperator')
      const number = state.programs.findIndex(p => p === params[2]) + 1

      commit('setActiveProgramNumber', number)

      if (params[3] > 0 || params[2] === 'stop') {
        try {
          // box index 1,2 ...
          ipcRenderer.send(
            'OPCUA',
            JSON.stringify({
              node: `::AsGlobalPV:PostN[${getters.getPanelNumber -
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
            node: `::AsGlobalPV:PostN[${getters.getPanelNumber -
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
            node: `::AsGlobalPV:PostBalance[${getters.getPanelNumber -
            /*   1}].paidMoney`, */
            1}].prepaymentMoney`,
            value: cash
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },

    /* 
    updateWetCardMoney
    */
    // сервисные деньги
    updateWetServMoney({ getters }, service) {
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getPanelNumber -
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
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getPanelNumber -
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
            node: `::AsGlobalPV:PostBalance[${getters.getPanelNumber -
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
            node: `::AsGlobalPV:PostN[${getters.getPanelNumber -
              1}].cmdZeroMoney`,
            value: zeroMoney
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },

    // end Платежи ----------------------

    // end Wet actions ============½=====

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
        const options = JSON.stringify(config, null, 2)
        ipcRenderer.send('async-config-message', options)
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
    // WET
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
      /* dev */
      return state.parameters.progStatusMask
      // return state.parameters.progShowMask
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
      return state.parameters.active || 'true'
    },
    // programName
    getWetProgramName(state) {
      return state.parameters.programName
    },
    // DRY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Список всех Dry программ
    getDryProgStatus(state) {
      return state.dryParameters.progStatusMask
    },
    getDryProgShow(state) {
      // console.log('$$ state.dryParameters.progShowMask', state.dryParameters.progShowMask)
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
    getFixedCurrency(state) {
      // ::AsGlobalPV:gFixedCurrency.digits
      return state.globalParameters.fixedCurrency
    },
    getIsMenuUnlock(state) {
      return state.globalParameters.isMenuUnlock
    },
    // StandbyFreeEnable
    getIsStandbyFreeEnable(state) {
      return state.globalParameters.isStandFree || false
    },

    getDryOrder(state) {
      return state.dryParameters.order
    },
    getDryActive(state) {
      return state.dryParameters.active || 'true'
    },

    getIsOddVacuumNumber(state) {
      return state.isOddVacuumNumber
    },
    // END DRY

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
      return state.activeProgramNumber
    },
    getCurrentMessage(state) {
      return state.message
    },
    getParamsChange(state) {
      return state.isParamsChange
    },
    getIsFooter(state) {
      return state.isFooter
    },
    getIsKktInstalled(state) {
      return state.kktParameters.isKktInstalled
    },
    getUsersRole(state) {
      return state.users.role
    },
    getUsersName(state) {
      return state.users.name
    },
    getUsersIsAccess(state) {
      return state.users.isAccess
    },
    getLoginSettingPassword(state) {
      return state.loginSettingPassword
    },
    // userActiveName
    getUserActiveName(state) {
      return state.users.userActiveName
    },
    getSerialNumber(state) {
      return state.orderData.serialNumber
    }
  },

  mutations: {
    setWetBalance(state, money) {
      state.parameters.panelMoney = money
    },
    setDryBalance(state, money) {
      state.dryParameters.panelMoney = money
    },
    setLoginSettingPassword(state, password) {
      state.loginSettingPassword = password
    },
    // set one parameter
    setWetParameters(state, parameter) {
      // console.log('$$ --setWetParameters', parameter)

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
        case 'PanelSysMenuUnlockFlag':
          state.globalParameters.isMenuUnlock =
            parameter.value === 'true' ? true : false
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
        case 'programName':
          state.parameters.programName = parameter.value
          break

        // common parameters
        case 'Kkm.EnableDevice':
          state.kktParameters.isKktInstalled = JSON.parse(parameter.value)
          break
        case 'name':
          if (!state.users.names.includes(parameter.value)) {
            state.users.names.push(parameter.value)
          }
          state.users.name = parameter.value
          break
        case 'password':
          if (!state.users.passwords.includes(parameter.value)) {
            state.users.passwords.push(parameter.value)
          }
          state.users.password = parameter.value
          break
        case 'access':
          sleep(state.users.delay).then(() => {
            const index = +parameter.title.slice(-9, -8) - 1

            if (index !== -1) {
              const item = parameter.value
              state.users.access[index] = item
            } else if (index === -1) {
              console.log('user not find')
            }
          })
          break
        case 'userActiveName':
          state.users.userActiveName = parameter.value
          break
        case 'orderData.serialNumber':
          state.orderData.serialNumber = parameter.value
          break
        case 'StandbyFreeEnable':
          state.globalParameters.isStandFree = 
          parameter.value === 'true' ? true : false
        
          // end common parameters

        default:
          break
      }
    },

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
          // trash & odd filter
          if (state.isOddVacuumNumber && parameter.value.length < 4) {
            state.dryParameters.progShowMask = parameter.value
          }
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
        /* dev */
        case 'PanelSysMenuUnlockFlag':
          state.globalParameters.isMenuUnlock = parameter.value
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

        // common parameters
        case 'Kkm.EnableDevice':
          state.kktParameters.isKktInstalled = JSON.parse(parameter.value)
          break
        /* dev */
        case 'name':
          if (!state.users.names.includes(parameter.value)) {
            state.users.names.push(parameter.value)
          }
          state.users.name = parameter.value
          break
        case 'password':
          if (!state.users.passwords.includes(parameter.value)) {
            state.users.passwords.push(parameter.value)
          }
          state.users.password = parameter.value
          break
        case 'access':
          sleep(state.users.delay).then(() => {
            const index = +parameter.title.slice(-9, -8) - 1

            if (index !== -1) {
              const item = parameter.value
              state.users.access[index] = item
            } else if (index === -1) {
              console.log('user not find')
            }
          })
          break
        case 'userActiveName':
          state.users.userActiveName = parameter.value
          break

        // end common parameters

        default:
          break
      }
    },
    setIsOddVacuumNumber(state, isOdd) {
      state.isOddVacuumNumber = isOdd
    },

    setPaginate(state, paginate) {
      state.paginate = paginate
    },
    setParamsChange(state, isParamsChange) {
      state.isParamsChange = isParamsChange
    },
    setIsFooter(state, isFooter) {
      state.isFooter = isFooter
    },

    // Info
    setInfo(state, info) {
      state.info = info
    },
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
    },
    setActiveProgram(state, activeProgram) {
      state.activeProgram = activeProgram
    },
    setActiveProgramKit(state, activeProgramKit) {
      state.activeProgramKit = activeProgramKit
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
    },
    setSecondsGotoMainMenu(state, seconds) {
      state.secondsGotoMainMenu = seconds
    },
    setSecondsGotoPopupMenu(state, seconds) {
      state.secondsGotoPopupMenu = seconds
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
    status,
    countries,
    languages,
    alarms
  }
})
