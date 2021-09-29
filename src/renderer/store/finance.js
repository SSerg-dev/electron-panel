export default {
  /*
    state: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {}
  */
  state: {
  //{"cash":{"bills_10":0,"bills_100":0,"bills_1000":0,"bills_200":0,"bills_2000":0,"bills_50":0,"bills_500":0,"bills_5000":0,"bills_count":0,"coins_0":0,"coins_1":0,"coins_10":0,"coins_2":0,"coins_count":0,"sum_bills":0,"sum_cash":0,"sum_coins":0},"result":0}
  /* {
  "cash": {
    "bills_10": 0,
    "bills_100": 0,
    "bills_1000": 0,
    "bills_200": 0,
    "bills_2000": 0,
    "bills_50": 0,
    "bills_500": 0,
    "bills_5000": 0,
    "bills_count": 0,

    "coins_0": 0,
    "coins_1": 0,
    "coins_10": 0,
    "coins_2": 0,
    "coins_count": 0,
    
    "sum_bills": 0,
    "sum_cash": 0,
    "sum_coins": 0
  }
} */
cash: {
  bills_10: 0,
  bills_100: 0,
  bills_1000: 0,
  bills_200: 0,
  bills_2000: 0,
  bills_50: 0,
  bills_500: 0,
  bills_5000: 0,
  bills_count: 0,

  coins_0: 0,
  coins_1: 0,
  coins_10: 0,
  coins_2: 0,
  coins_count: 0,

  sum_bills: 0,
  sum_cash: 0,
  sum_coins: 0

},


    /* finance: {
      selectBanknotes: [50, 100, 200, 500],
      selectCoins: [1, 2, 5, 10],
      
      allBanknotes: [

        { id: 1, title: '10 руб', value: 10, selected: false },
        { id: 2, title: '100 руб', value: 100, selected: false },
        { id: 3, title: '1000 руб', value: 1000, selected: false },
        { id: 4, title: '200 руб', value: 200, selected: false },
        { id: 5, title: '500 руб', value: 500, selected: false },
        { id: 6, title: '1000 руб', value: 1000, selected: false },
        { id: 7, title: '2000 руб', value: 2000, selected: false }

      ],

      allCoins: [
        { id: 1, title: '1 руб', value: 1, selected: false },
        { id: 2, title: '2 руб', value: 2, selected: false },
        { id: 3, title: '5 руб', value: 5, selected: false },
        { id: 4, title: '10 руб', value: 10, selected: false }
      ]

    } */   // end finance
  }, // end state

  // getters
  getters: {
    getAllCash(state, getters) {
      const all = state.cash
      
      return all
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
