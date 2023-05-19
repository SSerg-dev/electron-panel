import { ipcRenderer } from 'electron'
export default {
  // state
  state: {
    coinBalance: 0,
    banknoteBalance: 0,
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
    },

    /* getCoinIncrement(state) {
      return state.increment
    } */
  }, // end getters

  // mutations
  mutations: {
    // commit('setPayType', 'cash')
    setCoinBalance(state, balance) {
      state.coinBalance = state.coinBalance + balance
      state.payType = 'cash'
      // console.log('$$ paid.js: 32', state.payType)
    },
    setBanknoteBalance(state, balance) {
      state.banknoteBalance = state.banknoteBalance + balance
      state.payType = 'cash'
      // console.log('state.banknoteBalance-->', state.banknoteBalance)
    },
  }, // end mutations

  //actions
  actions: {
    /* Wet */
    updateCoinBalance({ commit, getters, dispatch }, balance) {
      // console.log('$$ paid.js:46 ', balance, getters.getIsVersion.upper)

      getters.getIsVersion.upper || getters.getIsVersion.equal

      if (getters.getWetBusyPanel === 'false') {
        commit('setCoinBalance', -getters.getCoinBalance)
        commit('setBanknoteBalance', -getters.getBanknoteBalance)
      }
      commit('setCoinBalance', balance)
      try {
        // ------------------------------
        // different versions
        /* 
        if (getters.getIsVersion.upper || getters.getIsVersion.equal) {

          ipcRenderer.send(
            'OPCUA',
            JSON.stringify({
              node: `::AsGlobalPV:PostBalance[${
                getters.getPanelNumber - 1
                // }].paidMoney`,
              }].prepaymentMoney`,
              value: getters.getCoinBalance + getters.getBanknoteBalance,
            })
          )
        } else if (getters.getIsVersion.lower) {

          ipcRenderer.send(
            'OPCUA',
            JSON.stringify({
              node: `::AsGlobalPV:PostBalance[${
                getters.getPanelNumber - 1
              }].paidMoney`,
              value: getters.getCoinBalance + getters.getBanknoteBalance,
            })
          )
        }
         */
        // ------------------------------
        ipcRenderer.send(
          'OPCUA',
          JSON.stringify({
            node: `::AsGlobalPV:PostBalance[${
              getters.getPanelNumber - 1
              // }].paidMoney`,
            }].prepaymentMoney`,
            value: getters.getCoinBalance + getters.getBanknoteBalance,
          })
        )
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
            value: getters.getCoinBalance + getters.getBanknoteBalance,
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
            value: getters.getCoinBalance + getters.getBanknoteBalance,
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
            value: getters.getCoinBalance + getters.getBanknoteBalance,
          })
        )
      } catch (e) {
        console.warn('Error:', e.message)
      }
    },

    /* end Dry */
  }, // end actions
}
