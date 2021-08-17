export default {
  state: {
    finance: {
      // enableBanknotes: [10, 50, 100, 200, 500, 1000, 2000],
      enableBanknotes: [50, 100, 200, 500],
      enableCoins: [1, 2, 5, 10],

      fullBanknotes: [
        { id: 1, title: '10 руб', value: 10, selected: false },
        { id: 2, title: '50 руб', value: 50, selected: false },
        { id: 3, title: '100 руб', value: 100, selected: false },
        { id: 4, title: '200 руб', value: 200, selected: false },
        { id: 5, title: '500 руб', value: 500, selected: false },
        { id: 6, title: '1000 руб', value: 1000, selected: false },
        { id: 7, title: '2000 руб', value: 2000, selected: false }
      ],
      fullCoins: [
        { id: 1, title: '1 руб', value: 1, selected: false },
        { id: 2, title: '2 руб', value: 2, selected: false },
        { id: 3, title: '5 руб', value: 5, selected: false },
        { id: 4, title: '10 руб', value: 10, selected: false }
      ]
    } // end finance
  }, // end state

  // getters
  getters: {
    // banknotes
    getFinanceEnableBanknotes(state) {
      return state.finance.enableBanknotes
    },
    getFinanceFullBanknotes(state) {
      return state.finance.fullBanknotes
    },
    // coins
    getFinanceEnableCoins(state) {
      return state.finance.enableCoins
    },
    getFinanceFullCoins(state) {
      return state.finance.fullCoins
    }
  }
}
