import { ipcRenderer } from 'electron'

export default {
  // state
  state: {
    config: {},

    assignItems: [
      { id: 1, title: `FOAM_COLOR` },
      { id: 2, title: `DEGREASE` },
      { id: 3, title: `DOORSILL` },
      { id: 4, title: `ANTIFREEZE` },
    ],

    temperature: '',
    humidity: '',
    serviceBalance: 0,
    increment: 10,
    // panel type,
    vacuum: 1,
    vacuumNumber: 1,
    payment: 1,
    isTooltipInstalled: true,
    cardLimitMax: 0,

  }, // end state

  // getters
  getters: {
    getAssignItems(state) {
      return state.assignItems
    },

    getPaymentLimitMin(state) {
      return state.config.bank_terminal.min_sum
    },
    getPaymentLimitMax(state) {
      return state.config.bank_terminal.max_sum
    },
    getCardLimitMax(state) {
      return state.cardLimitMax
    },

    getDefaultLanguage(state) {
      return state.config.languages.default
    },
    getSysPanelLanguage(state) {
      return state.config.languages.syspanel
    },
    getInitCurrency(state, getters) {
      const currencies = getters.getLanguageNatives.filter(
        c => c.currency !== 'EUR'
      )
      if (
        getters.getLanguageNatives.filter(c => c.currency === 'EUR').length > 0
      )
        currencies.push({
          id: 999,
          title: 'EUR',
          key: 'EUR',
          emoji: '🇪🇺',
          currency: 'EUR',
          symbol: '€'
        })

      const defaultCurrency = getters.getDefaultCurrency
      const index = currencies.findIndex(c => c.currency === defaultCurrency)

      const result = currencies[index]
      //console.log('result-->', JSON.stringify(result))

      return result
    },

    /* dev */

    getIsChangeProgramFirst(state) {
      return state.config.ui.isProgram
    },
    getIsChangeProgramSecond(state) {
      return state.config.ui.isProgram2
    },
    getIsChangeItem(state) {
      return state.config.ui.isEnable
    },


    getChangeProgram(state) {
      return state.config.ui.degreasing_program
    },
    getAssignProgramTo(state) {
      return state.config.ui.degreasing_program_to
    },
    getChangeItem(state) {
      return state.config.ui.degreasing_enable
    },


    getCnw(state) {
      return state.config.ui.CNW
    },
    getPayScreenMain(state) {
      return state.config.ui.main_window
    },
    getCursor(state) {
      return state.config.ui.hide_cursor
    },
    getSelectedCountries(state) {
      return state.config.countries
    },
    getPanelType(state) {
      return state.config.type
    },
    getDefaultCurrency(state) {
      return state.config.currency
    },

    getDefaultPanelNumber(state) {
      return state.config.index
    },
    getVacuumNumber(state) {
      return state.vacuumNumber
    },
    /* dev */
    getVacuum(state) {
      return state.vacuum
    },

    getVacuumPayment(state) {
      return state.payment
    },
    getDefaultBiils(state) {
      return state.config.bill_validator.enable_bills
    },
    getDefaultCoinBiils(state) {
      return state.config.coin_acceptor.enable_coins
    },
    getCoinTokens(state) {
      return state.config.coin_acceptor.tokens
    },
    getDefaultTerminalType(state) {
      return state.config.bank_terminal.hardware.toLowerCase()
    },
    getCoinInstalled(state) {
      return state.config.coin_acceptor.installed
    },
    getTerminalInstalled(state) {
      return state.config.bank_terminal.installed
    },
    getAcceptorInstalled(state) {
      return state.config.bill_validator.installed
    },
    getCoinAcceptorInstalled(state) {
      return state.config.coin_acceptor.installed
    },
    getAcceptorType(state) {
      return state.config.bill_validator.type
    },
    getCoinAcceptorType(state) {
      return state.config.coin_acceptor.type
    },
    getTooltipInstalled(state) {
      return state.isTooltipInstalled
    },
    getDirectCash(state) {
      return state.config.ui.direct_cash
    },
    getConfig(state) {
      return state.config
    },
    getTemperature(state) {
      return state.temperature
    },
    getHumidity(state) {
      return state.humidity
    },
    getServiceBalance(state) {
      return state.serviceBalance
      //return state.parameters.panelMoney
    },
    getIncrement(state) {
      return state.increment
    },
  }, // end getters

  // mutations
  mutations: {
    /* dev */
    setIsChangeProgramFirst(state, isProgram) {
      state.config.ui.isProgram = isProgram
    },
    setIsChangeProgramSecond(state, isProgram2) {
      state.config.ui.isProgram2 = isProgram2
    },
    setIsChangeItem(state, isEnable) {
      state.config.ui.isEnable = isEnable
    },


    setChangeProgram(state, program) {
      state.config.ui.degreasing_program = program
    },
    setAssignProgramTo(state, program_to) {
      state.config.ui.degreasing_program_to = program_to
    },
    setChangeItem(state, degreasing_enable) {
      state.config.ui.degreasing_enable = degreasing_enable
    },

    setCnw(state, Cnw) {
      state.config.ui.CNW = Cnw
    },
    setPayScreenMain(state, window) {
      state.config.ui.main_window = window
    },
    setCursor(state, cursor) {
      state.config.ui.hide_cursor = cursor
    },

    setDirectCash(state, cash) {
      state.config.ui.direct_cash = cash
    },
    setSelectedCountries(state, selected) {
      state.config.countries = selected
    },
    setDefaultCurrency(state, currency) {
      state.config.currency = currency
    },
    setDefaultLanguage(state, language) {
      state.config.languages.default = language
    },
    setSysPanelLanguage(state, language) {
      state.config.languages.syspanel = language
    },

    setCoinAcceptorType(state, type) {
      state.config.coin_acceptor.type = type
    },
    setCoinAcceptorInstalled(state, flag) {
      state.config.coin_acceptor.installed = flag
    },
    setDefaultCoinBiils(state, coins) {
      state.config.coin_acceptor.enable_coins = coins
    },
    setAcceptorType(state, type) {
      state.config.bill_validator.type = type
    },
    setAcceptorInstalled(state, flag) {
      state.config.bill_validator.installed = flag
    },

    setDefaultBiils(state, bills) {
      state.config.bill_validator.enable_bills = bills
    },
    setDefaultTerminalType(state, hardware) {
      state.config.bank_terminal.hardware = hardware.toLowerCase()
    },
    setTerminalInstalled(state, flag) {
      state.config.bank_terminal.installed = flag
    },
    /*     */
    setPaymentLimitMin(state, min) {
      if (typeof min !== undefined) state.config.bank_terminal.min_sum = min
    },
    setPaymentLimitMax(state, max) {
      if (typeof max !== undefined) state.config.bank_terminal.max_sum = max
    },
    /* dev */
    setCoinTokens(state, payload) {
      state.config.coin_acceptor.tokens[payload.index - 1] = payload.value
    },

    setDefaultPanelNumber(state, index) {
      state.config.index = index
    },
    setVacuumNumber(state, vacuumNumber) {
      state.vacuumNumber = vacuumNumber
    },
    /* dev */
    setVacuum(state, vacuum) {
      return (state.vacuum = vacuum)
    },

    setVacuumPayment(state, payment) {
      state.payment = payment
    },
    setServiceBalance(state, balance) {
      state.serviceBalance = balance
      // console.log('state.serviceBalance-->', state.serviceBalance)
    },
    setIncrement(state) {
      state.increment = 10
    },
    // dev
    setHumidity(state, humidity) {
      // console.log('!!!setting-->humidity-->', humidity)
      state.humidity = humidity
    },

    // setTemperature
    setTemperature(state, temperature) {
      //console.log('!!!setting-->temperature-->', temperature)
      state.temperature = temperature
    },
    setPanelType(state, type) {
      state.config.type = type
    },
    setConfig(state, config) {
      state.config = config
      state.cardLimitMax = state.config.bank_terminal.max_sum
    },
    
    
    /* setTooltipInstalled(state, isTooltipInstalled) {
      state.isTooltipInstalled = isTooltipInstalled
    }, */
  }, // end mutations

  //actions
  actions: {
    updateOpenDoor({ getters }) {
      //console.log('getters.getDefaultPanelNumber-->', `${index}`)
      try {
        ipcRenderer.send(
          'OPCUA',
          //JSON.stringify({ node: '::AsGlobalPV:PostN[4].door', value: true })
          JSON.stringify({
            node: `::AsGlobalPV:PostN[${getters.getDefaultPanelNumber -
              1}].door`,
            value: true
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    updatePlusTen({ commit, getters, dispatch }, balance) {
      commit('setIncrement')
      // first click, set base balance
      if (getters.getServiceBalance === 0) commit('setServiceBalance', balance)

      let newBalance =
        parseInt(getters.getServiceBalance) + parseInt(getters.getIncrement)
      // console.log('newBalance-->', newBalance)
      commit('setServiceBalance', newBalance)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidService`,
            value: getters.getServiceBalance
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    // dev

    updateClearBalance({ commit, getters }) {
      try {
        /* dev */
        commit('setServiceBalance', -getters.getServiceBalance)
        commit('setCoinBalance', -getters.getCoinBalance)
        commit('setBanknoteBalance', -getters.getBanknoteBalance)

        // console.log('++updateClearBalance')

        // clear service
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidService`,
            value: '0'
          })
        )
        // clear money
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidMoney`,
            value: '0'
          })
        )
        // clear bonus
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidBonus`,
            value: '0'
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
      // clear
      commit('setServiceBalance', 0)
    },
    updateReboot() {
      const options = {
        isRelaunch: true
      }
      // ipcRenderer.send('async-relaunch-app', options)
      ipcRenderer.send('reboot', options)
    }
  } // end actions
}
