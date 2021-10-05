export default {
  /*
    state: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {}
  */

  state: {
    // cash: {},

    cash: {
      bills_10: 10,
      bills_100: 110,
      bills_1000: 1100,
      bills_200: 220,
      bills_2000: 2200,
      bills_50: 55,
      bills_500: 550,
      bills_5000: 5500,
      bills_count: 142,

      coins_0: 0,
      coins_1: 1,
      coins_10: 10,
      coins_2: 2,
      coins_count: 242,

      sum_bills: 342,
      sum_cash: 884,
      sum_coins: 542
    }, // end cash

    cashTitle: [
      { id: 1, title: 'Сумма общая', key: 'sum_cash' },

      { id: 2, title: 'Сумма в купюрах', key: 'sum_bills' },
      { id: 3, title: 'Количество купюр', key: 'bills_count' },

      { id: 4, title: 'Сумма в монетах', key: 'sum_coins' },
      { id: 5, title: 'Количество монет', key: 'coins_count' }
    ] // end cashTitle

  }, // end state

  // mutations
  mutations: {
    setAllCash(state, cash) {
      state.cash = cash
      //console.log('state.cash-->', state.cash)
    }
  },

  // getters
  getters: {
    getCashTitle(state) {
      return state.cashTitle
    },
    // getAllCash
    getAllCash(state) {
      return state.cash
    },
    // getBills
    getBills10(state) {
      return state.cash.bills_10
    },
    getBills100(state) {
      return state.cash.bills_100
    },
    getBills1000(state) {
      return state.cash.bills_1000
    },
    getBills200(state) {
      return state.cash.bills_200
    },
    getBills2000(state) {
      return state.cash.bills_2000
    },
    getBills50(state) {
      return state.cash.bills_50
    },
    getBills500(state) {
      return state.cash.bills_500
    },
    getBills5000(state) {
      return state.cash.bills_5000
    },
    getBillsCount(state) {
      return state.cash.bills_count
    },
    // getCoins
    getCoins0(state) {
      return state.cash.coins_0
    },
    getCoins1(state) {
      return state.cash.coins_1
    },
    getCoins10(state) {
      return state.cash.coins_10
    },
    getCoins2(state) {
      return state.cash.coins_2
    },
    getCoinsCount(state) {
      return state.cash.coins_count
    },
    // getSum
    getSumBills(state) {
      return state.cash.sum_bills
    },
    getSumCash(state) {
      return state.cash.sum_cash
    },
    getSumCoins(state) {
      return state.cash.sum_coins
    }

    /* getFinanceSelectBanknotes(state) {
      return state.finance.selectBanknotes
    },
    getFinanceAllBanknotes(state) {
      return state.finance.allBanknotes
    },
    getFinanceSelectCoins(state) {
      return state.finance.selectCoins
    },
    getFinanceAllCoins(state) {
      return state.finance.allCoins
    } */
  }
}
