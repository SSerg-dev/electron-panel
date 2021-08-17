import { ipcRenderer } from 'electron'
export default {
  // state
  state: {
    coinBalance: 0,
    banknoteBalance: 0
    //increment: 0
  }, // end state

  // getters
  getters: {
    getCoinBalance(state) {
      return state.coinBalance
      //return state.parameters.PanelMoney
    },
    getBanknoteBalance(state) {
      return state.banknoteBalance
    }

    /* getCoinIncrement(state) {
      return state.increment
    } */
  }, // end getters

  // mutations
  mutations: {
    setCoinBalance(state, balance) {
      state.coinBalance = state.coinBalance + balance
      //console.log('state.coinBalance-->', state.coinBalance)
    },
    setBanknoteBalance(state, balance) {
      state.banknoteBalance = state.banknoteBalance + balance
      //console.log('state.banknoteBalance-->', state.banknoteBalance)
    }
  }, // end mutations

  //actions
  actions: {
    updateCoinBalance({ commit, getters, dispatch }, balance) {

      console.log('balance-->', JSON.stringify(balance))
      if (getters.getWetBusyPanel === 'false'){
        commit('setCoinBalance', -getters.getCoinBalance)
        commit('setBanknoteBalance', -getters.getBanknoteBalance)
      }
      
      commit('setCoinBalance', balance)

      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidMoney`,
            value: getters.getCoinBalance + getters.getBanknoteBalance
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
      // console.log('after getters.getCoinBalance-->', getters.getCoinBalance)
    },

    updateBanknoteBalance({ commit, getters, dispatch }, balance) {
      /* console.log(
        'updateBanknoteBalance-->JSON.stringify-->',
        JSON.stringify(balance)
      ) */
      
      if (getters.getWetBusyPanel === 'false') {
        commit('setCoinBalance', -getters.getCoinBalance)
        commit('setBanknoteBalance', -getters.getBanknoteBalance)
      }
      
      commit('setBanknoteBalance', balance)

      //commit('setBanknoteBalance', balance)

      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber -
              1}].paidMoney`,
            value: getters.getCoinBalance + getters.getBanknoteBalance
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
      //console.log('getters.getBanknoteBalance-->', getters.getBanknoteBalance)
    }

    /* updateClearBalance( {commit, getters} ) {
        try {
          ipcRenderer.send(
            'OPCUA',
            JSON.stringify({
              node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber - 1}].paidMoney`,
              value: '0'
            })
          )
          ipcRenderer.send(
            'OPCUA',
            JSON.stringify({
              node: `::AsGlobalPV:PostBalance[${getters.getDefaultPanelNumber - 1}].paidBonus`,
              value: '0'
            })
          )
        } catch (e) {}
        commit('setServiceBalance', 0)
      }, */
  } // end actions
}
