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

    cashTitle: [
      { id: 1, title: 'Сумма зачисления общая' },
      { id: 2, title: 'Сумма зачисления в купюрах' },
      { id: 3, title: 'Количество купюр' },
      { id: 4, title: 'Сумма зачисления в монетах' },
      { id: 5, title: 'Количество монет' }
    ]
  }, // end state

  // mutations
  mutations: {
    setAllCoins(state, coins) {
      state.coins = coins
    },
    setAllBills(state, bills) {
      state.bills = bills
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
  }
}
