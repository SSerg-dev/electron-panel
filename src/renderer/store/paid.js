import { ipcRenderer } from 'electron'
export default {
  // state
  state: {
    coinBalance: 0,
    banknoteBalance: 0,
  }, // end state

  // getters
  getters: {
    getCoinBalance(state) {
      return state.coinBalance
    },
    getBanknoteBalance(state) {
      return state.banknoteBalance
    },
  }, // end getters

  // mutations
  mutations: {
    setCoinBalance(state, balance) {
      // state.coinBalance = state.coinBalance + balance
      state.coinBalance = balance
      state.payType = 'cash'
    },
    setBanknoteBalance(state, balance) {
      // state.banknoteBalance = state.banknoteBalance + balance
      state.banknoteBalance = balance
      state.payType = 'cash'
    },
  }, // end mutations

  //actions
  actions: {
    /* Wet */
    updateCoinBalance({ commit, getters, dispatch }, balance) {
      console.log('$$ paid.js:44 ', balance)

      if (getters.getWetBusyPanel === 'false') {
        commit('setCoinBalance', -getters.getCoinBalance)
        commit('setBanknoteBalance', -getters.getBanknoteBalance)
      }
      commit('setCoinBalance', balance)
      try {
        // ------------------------------
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${
              getters.getPanelNumber - 1
              // }].paidMoney`,
            }].prepaymentMoney`,
            // value: getters.getCoinBalance + getters.getBanknoteBalance,
            value: getters.getCoinBalance,
          })
        )
        // ------------------------------
        /* ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${
              getters.getPanelNumber - 1
            }].prepaymentMoneyCash`,
            value: getters.getCoinBalance + getters.getBanknoteBalance,
          })
        ) */  
        // ------------------------------
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
            node: `::AsGlobalPV:PostBalance[${
              getters.getPanelNumber - 1
            // }].paidMoney`,
            }].prepaymentMoney`,
            // value: getters.getCoinBalance + getters.getBanknoteBalance,
            value: getters.getBanknoteBalance,
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },
    /* end Wet */

    updateDryCoinBalance({ commit, getters, dispatch }, balance) {
      if (getters.getDryBusyPanel === 'false') {
        commit('setCoinBalance', -getters.getCoinBalance)
        commit('setBanknoteBalance', -getters.getBanknoteBalance)
      }
      commit('setCoinBalance', balance)
      try {
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:VacuumBalance[${
              getters.getVacuumNumber - 1
            // }].paidMoney`,
            }].prepaymentMoney`,
            value: getters.getCoinBalance,
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
            node: `::AsGlobalPV:VacuumBalance[${
              getters.getVacuumNumber - 1
            // }].paidMoney`,
            }].prepaymentMoney`,
            value: getters.getBanknoteBalance,
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },

    /* end Dry */
  }, // end actions
}
