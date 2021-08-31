export default {
  // state
  state: {
    config: {},

    temperature: '',
    humidity: '',
    serviceBalance: 0,
    increment: 0,
    // panel type
    vaccum: 1,
    payment: 1,
    isTooltipInstalled: true
  }, // end state

  // getters
  getters: {
    /* dev */
    getPaymentLimitMin(state) {
      return  state.config.bank_terminal.min_sum
    },
    getPaymentLimitMax(state) {
      return state.config.bank_terminal.max_sum
    },

    getDefaultLanguage(state) {
      //console.log('state.config.languages.default--> RUUUUUUU')
      return state.config.languages.default
      /* if (state.config.languages && state.config.languages.default) {
        return state.config.languages.default
      } else {
        this.$message(`Settings ERROR : languages.default undefined`)
      } */
    },
    getPanelType(state) {
      return state.config.type
    },
    getDefaultCurrency(state) {
      /* dev */
      //return state.config.currency
      return { id: 1, title: 'Российский рубль' }
    },
    getDefaultPanelNumber(state) {
      return state.config.index
    },
    getVaccumNumber(state) {
      return state.vaccum
    },
    getVaccumPayment(state) {
      return state.payment
    },
    getDefaultBiils(state) {
      return state.config.bill_validator.enable_bills
    },
    getDefaultCoinBiils(state) {
      return state.config.coin_acceptor.enable_coins
    },
    getDefaultTerminalType(state) {
      return state.config.bank_terminal.hardware
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
      //return state.parameters.PanelMoney
    },
    getIncrement(state) {
      return state.increment 
    }
  }, // end getters

  // mutations
  mutations: {
    /* dev */
    setPaymentLimitMin(state, min) {
      state.config.bank_terminal.min_sum = min
      console.log('state.config.bank_terminal.min_sum-->', state.config.bank_terminal.min_sum)
    },
    setPaymentLimitMax(state, max) {
      state.config.bank_terminal.max_sum = max
      console.log('state.config.bank_terminal.max_sum-->', state.config.bank_terminal.max_sum)
    },

    setDefaultPanelNumber(state, index) {
      state.config.index = index
    },
    setVaccumNumber(state, vaccum) {
      state.vaccum = vaccum
    },
    setVaccumPayment(state, payment) {
      state.payment = payment
    },
    setServiceBalance(state, balance) {
      state.serviceBalance = balance
      //console.log('state.serviceBalance-->', state.serviceBalance)
    },
    setIncrement(state) {
      state.increment = 100
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
      //console.log('!!++state.config-->', state.config.languages.default)
    }
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
      //console.log('newBalance-->', newBalance)
      commit('setServiceBalance', newBalance)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            //node: '::AsGlobalPV:PostBalance[4].paidService',
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidService`,
            value: getters.getServiceBalance
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
      // clear
      // commit('setServiceBalance', 0)
      //console.log('getters.getServiceBalance-->', getters.getServiceBalance)
    },
    // dev

    updateClearBalance({ commit, getters }) {
      try {
        //console.log('!!!updateClearBalance')
        // clear service
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            //node: '::AsGlobalPV:PostBalance[4].paidService',
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidService`,
            value: '0'
          })
        )
        // clear money
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            //node: '::AsGlobalPV:PostBalance[4].paidMoney',
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidMoney`,
            value: '0'
          })
        )
        // clear bonus
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            //node: '::AsGlobalPV:PostBalance[4].paidBonus',
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
      // console.log('!!!clear getters.getServiceBalance-->', getters.getServiceBalance)
    },
    updateReboot() {
      //console.log('!!!updateReboot')
      //ipcRenderer.send("OPCUA",  JSON.stringify({node: "::AsGlobalPV:PostBalance[4].???", value: '0' }))
    }
  } // end actions
}
