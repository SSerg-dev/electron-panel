export default {
  /*
    state: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {}
  */

  state: {
    coins: {},
    bills: {},
    collect: {},

    cashTitle: [
      { id: 1, title: `Total_amount` },
      { id: 2, title: `Amount_of_deposit_in_banknotes` },
      { id: 3, title: `Number_of_banknotes` },
      { id: 4, title: `Credit_amount_in_coins` },
      { id: 5, title: `Number_of_coins` }
    ]
  }, // end state

  // mutations
  mutations: {
    setAllCoins(state, coins) {
      state.coins = coins
      // console.log('$$ finance.js: 27 state.coins', state.coins)
    },
    setAllBills(state, bills) {
      state.bills = bills
    },
    setFinanceCollect(state, collect) {
      state.collect = collect
    }

  },
  // getters
  getters: {
    getAllCoins(state) {
      return state.coins
    },
    getAllBills(state) {
      return state.bills
    },
    getCashTitle(state) {
      return state.cashTitle
    },
    getFinanceCollect(state) {
      return state.collect
    }
    
  }
}
