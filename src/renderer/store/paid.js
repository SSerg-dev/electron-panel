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
      //return state.parameters.panelMoney
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
      // console.log('state.coinBalance-->', state.coinBalance)
    },
    setBanknoteBalance(state, balance) {
      state.banknoteBalance = state.banknoteBalance + balance
      // console.log('state.banknoteBalance-->', state.banknoteBalance) 
    }
  }, // end mutations

  //actions
  actions: {

    /* Wet */
    updateCoinBalance({ commit, getters, dispatch }, balance) {

      if (getters.getWetBusyPanel === 'false'){
        commit('setCoinBalance', -getters.getCoinBalance)
        commit('setBanknoteBalance', -getters.getBanknoteBalance)
      }
      commit('setCoinBalance', balance)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getPanelNumber -
              1}].paidMoney`,
            value: getters.getCoinBalance + getters.getBanknoteBalance
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },

    updateBanknoteBalance({ commit, getters, dispatch }, balance) {
      if (getters.getWetBusyPanel === 'false') {
        commit('setCoinBalance', -getters.getCoinBalance)
        commit('setBanknoteBalance', -getters.getBanknoteBalance)
      }
      commit('setBanknoteBalance', balance)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${getters.getPanelNumber -
              1}].paidMoney`,
            value: getters.getCoinBalance + getters.getBanknoteBalance
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    /* end Wet */
    
    updateDryCoinBalance({ commit, getters, dispatch }, balance) {
      if (getters.getDryBusyPanel === 'false'){
        commit('setCoinBalance', -getters.getCoinBalance)
        commit('setBanknoteBalance', -getters.getBanknoteBalance)
      }
      commit('setCoinBalance', balance)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:VacuumBalance[${getters.getVacuumNumber -
              1}].paidMoney`,
            value: getters.getCoinBalance + getters.getBanknoteBalance
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },

    updateDryBanknoteBalance({ commit, getters, dispatch }, balance) {
      if (getters.getDryBusyPanel === 'false') {
        commit('setCoinBalance', -getters.getCoinBalance)
        commit('setBanknoteBalance', -getters.getBanknoteBalance)
      }
      commit('setBanknoteBalance', balance)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:VacuumBalance[${getters.getVacuumNumber -
              1}].paidMoney`,
            value: getters.getCoinBalance + getters.getBanknoteBalance
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },    

    /* end Dry */
    

    

  } // end actions
}
