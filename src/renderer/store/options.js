/*
    state: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {}
*/

export default {
  state: {

    storeMoneyOptions: {
      method: 'storage::store_money',
      /* params: {
        unit_id: 4,
        type: 'cash',
        sum: 4242,
        detail: { coins_10: 1, coins_count: 1, sum_coins: 10 }
      } */
      params: {
        // _unit_id – номер поста (0-7)
        unit_id: 4,
        // _money_type – cash, card, service, bonus
        type: 'cash',
        // _sum – сумма зачисления
        sum: 4242,
        // nl::json – структура доп. данных
        detail: {
          // сумма зачисления в монетах
          sum_coins: 0,
          // общее количество монет
          coins_count: 0,
          // номинал монеты
          coins_1: 1,  
          coins_2: 2,
          coins_5: 5,
          coins_10: 10,
          // сумма зачисления в купюрах
          sum_bills: 300,
          // количество купюр наминала 10р
          bills_10: 0,
          // количество купюр наминала 50
          bills_50: 0,
          // количество купюр наминала 100р
          bills_100: 0,
          // количество купюр наминала 200
          bills_200: 0,
          // количество купюр наминала 500
          bills_500: 0
        }
      }
    },
    collectOptions: {
      method: 'storage::collect',
      params: { unit_id: 4, user: 'Sergei' }
    },
    readCashOptions: {
      method: 'storage::cash.read',
      params: { unit_id: 4 }
    },
    // ping
    pingOptions: {
      method: 'connect::ping'
    },
    registerKktOptions: {
      method: 'kkt::register',
      params: {
        org: 'ALLES GOOD',
        rn: 'РН',
        inn: 'ИНН',
        ofd_name: ' Имя ОФД',
        ofd_inn: 'ИНН ОФД',
        tax_mode: 1,
        address: 'Адрес',
        email: 'e-mail',
        place: 'SPb',
        cashier: '_cashier'
      }
    },
    /* dev */
    createReceipt: {
      method: 'kkt::receipt.create',
      params: { unit_id: 4, sum: 10, cash: false }
    },
    readReceipt: {
      method: 'kkt::receipt.read',
      params: { id: 2 }
    },
    printReceipt: {
      method: 'kkt::receipt.print',
      params: { fd: 2 }
    },
    /*     */
    loginBonus: {
      method: 'bonus::login',
      // params: { phone: '+79627067778', pin: '111111' }
      params: { phone: '', pin: '' }

    },
    getQr: {
      method: 'bonus::qr.get',
    }, 
    appendBonus: {
      method: 'bonus::money.append',
      //params: { "phone":"+79627067778","sum":10,"cash":true,"order":"12" }
      params: { "phone":"","sum":0,"cash":true,"order":"" }
    },
    // completeWash
    completeWash: {
      method: 'bonus::wash.complete',
      params: {"order":"11","programs":{"program_id":11,"program_name":"wheel","program_quantity":0.2}}
    },

    isBonusMoney: {
      payBonusMoney: false, 
      appendBonusMoney: false,
      // spend money
      spendBonusMoney: false
    },
    isCardMoney: false,
    isPing: false,
    loginSettingPassword: '5',
    isLoginSettingPassword: false
     
  }, // end state
  // Options
  //actions: {},
  getters: {
    // dev
    getLoginSettingPassword(state) {
      return state.loginSettingPassword
    },
    // isLoginSettingPassword
    getIsLoginSettingPassword(state) {
      return state.isLoginSettingPassword
    },

    getLoginBonusPhone(state) {
      return state.loginBonus.params.phone
    },
    getLoginBonusPassword(state) {
      return state.loginBonus.params.pin
    },
    /* getPassword(state) {
      return state.password
    }, */
    getIsPing(state) {
      return state.isPing
    },
    getIsPayBonusMoney(state) {
      return state.isBonusMoney.payBonusMoney
    },
    getIsAppendBonusMoney(state) {
      return state.isBonusMoney.appendBonusMoney
    },
    // spendBonusMoney
    getIsSpendBonusMoney(state) {
      return state.isBonusMoney.spendBonusMoney
    },
    // 
    getIsPayCardMoney(state) {
      return state.isCardMoney
    },
    getStoreMoneyOptions(state) {
      return state.storeMoneyOptions
    },
    getCollectOptions(state) {
      return state.collectOptions
    },
    getReadCashOptions(state) {
      return state.readCashOptions
    },
    getPingOptions(state) {
      return state.pingOptions
    },
    getRegisterKktOptions(state) {
      return state.registerKktOptions
    },
    getCreateReceiptOptions(state) {
      return state.createReceipt
    },
    getReadReceiptOptions(state) {
      return state.readReceipt
    },
    getPrintReceiptOptions(state) {
      return state.printReceipt
    },
    getLoginBonusOptions(state) {
      return state.loginBonus
    },
    getQrOptions(state) {
      return state.getQr
    },
    getAppendBonus(state) {
      return state.appendBonus
    },
    // completeWash
    getCompleteWash(state) {
      return state.completeWash
    },

    // ----
    /* getPanelMoneyOptions(state) {
      return state.options
    },
    getPanelMoneyNumber(state) {
      return state.options.params.unit_id
    },
    getPanelMoneyType(state) {
      return state.options.params.type
    },
    getPanelMoneySum(state) {
      return state.options.params.sum
    },
    getPanelMoneyDetail(state, detail) {
      return state.options.params.detail
    } */
  },
  mutations: {
    // loginBonus
    setLoginBonusPhone(state, phone) {
      state.loginBonus.params.phone = phone
    },
    setLoginBonusPassword(state, password) {
      state.loginBonus.params.pin = password
    },    
    setIsLoginSettingPassword(state, isLoginSetting) {
      state.isLoginSettingPassword = isLoginSetting
    },
    
    setIsPayBonusMoney(state, isPay) {
      state.isBonusMoney.payBonusMoney = isPay
    },
    // dev
    setAppendBonus(state, options) {
      state.appendBonus.params = options
      //console.log('options-->this.options-->', JSON.stringify(state.appendBonus.params))
    },

    setIsAppendBonusMoney(state, isAppend) {
      state.isBonusMoney.appendBonusMoney = isAppend
    },
    // spendBonusMoney
    setIsSpendBonusMoney(state, isSpend) {
      state.isBonusMoney.spendBonusMoney = isSpend
    },
    // isCardMoney
    setIsPayCardMoney(state, isCard) {
      state.isCardMoney = isCard
    },
    setIsPing(state, isPing) {
      state.isPing = isPing
    },
    
    /* setPanelMoneyNumber(state, unit_id) {
      state.options.params.unit_id = unit_id
    },
    setPanelMoneyType(state, type) {
      state.options.params.type = type
    },
    setPanelMoneySum(state, sum) {
      state.options.params.sum = sum
    },
    setPanelMoneyDetail(state, detail) {
      state.options.params.detail.sum_coins = detail
    } */
  }
  // modules: {}
}
