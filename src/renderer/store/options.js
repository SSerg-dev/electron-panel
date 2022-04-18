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
      params: {
        // _unit_id – номер поста (0-7)
        unit_id: 1,
        // _money_type – cash, card, service, bonus
        type: 'cash',
        // _sum – сумма зачисления
        sum: 0,
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
          coins_10: 1,
          // сумма зачисления в купюрах
          sum_bills: 0,
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
    /* dev */
    storeDryMoneyOptions: {
      method: 'storage::store_money',
      params: {
        // _unit_id – номер поста (0-7)
        unit_id: 1,
        // _money_type – cash, card, service, bonus
        type: 'cash',
        // _sum – сумма зачисления
        sum: 2,
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
    /*     */
    collectOptions: {
      method: 'storage::collect',
      params: { unit_id: 1, user: 'Sergei' }
    },
    readCashOptions: {
      method: 'storage::cash.read',
      params: { unit_id: 1 }
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
      /* params: { unit_id: 1, sum: 2, cash: '' } */
      params: { unit_id: 1, sum: 2, cash: false }
    },
    readReceipt: {
      method: 'kkt::receipt.read',
      params: { id: 1 }
    },
    printReceipt: {
      method: 'kkt::receipt.print',
      params: { id: 1 }
    },
    /*     */
    loginBonus: {
      method: 'bonus::login',
      // params: { phone: '+79627067778', pin: '111111' }
      params: { phone: '', pin: '' }
    },
    getQr: {
      method: 'bonus::qr.get'
    },
    appendBonus: {
      method: 'bonus::money.append',
      params: { phone: '', sum: 0, cash: true, order: '' }
    },
    chargeBonus: {
      method: 'bonus::charge',
      params: { phone: '', sum: 0, cash: true, order: '' }
    },
    completeWash: {
      method: 'bonus::wash.complete',
      params: {
        order: '', 
        programs: [{
          program_id: 0, 
          program_name: '', 
          program_quantity: 0 
        }]
      }
    },
    // end methods options

    isBonusMoney: {
      payBonusMoney: false,
      appendBonusMoney: false,
      // spend money
      spendBonusMoney: false
    },
    isCardMoney: false,
    isPing: false,
    loginSettingPassword: '5',
    isLoginSettingPassword: false,
    isReceipt: {
      read: false,
      create: false,
      print: false
    },
    isMoneyToBonus: false,
    MoneyToBonus: 0,
    isMoneyToBonusNo: false,
    isMoneyToBonusYes: false
  }, // end state
  // Options
  //actions: {},
  getters: {
    // dev
    getIsReceiptRead(state) {
      return state.isReceipt.read
    },
    getIsReceiptCreate(state) {
      return state.isReceipt.create
    },
    getIsReceiptPrint(state) {
      return state.isReceipt.print
    },
    getIsMoneyToBonus(state) {
      return state.isMoneyToBonus
    },
    getIsMoneyToBonusNo(state) {
      return state.isMoneyToBonusNo
    },
    getIsMoneyToBonusYes(state) {
      return state.isMoneyToBonusYes
    },
    getMoneyToBonus(state) {
      return state.MoneyToBonus
    },

    getLoginSettingPassword(state) {
      return state.loginSettingPassword
    },
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
    getIsPayCardMoney(state) {
      return state.isCardMoney
    },
    getStoreMoneyOptions(state) {
      return state.storeMoneyOptions
    },
    getDryStoreMoneyOptions(state) {
      return state.storeDryMoneyOptions
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
    getChargeBonus(state) {
      return state.chargeBonus
    },
    getCompleteWash(state) {
      return state.completeWash
    },

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
    setIsReceiptRead(state, read) {
      state.isReceipt.read = read
    },
    setIsReceiptCreate(state, create) {
      state.isReceipt.create = create
    },
    setIsReceiptPrint(state, print) {
      state.isReceipt.print = print
    },
    setIsMoneyToBonus(state, isMoney) {
      state.isMoneyToBonus = isMoney
    },

    setIsMoneyToBonusNo(state, isNo) {
      state.isMoneyToBonusNo = isNo
    },
    setIsMoneyToBonusYes(state, isYes) {
      state.isMoneyToBonusYes = isYes
    },
    setMoneyToBonus(state, money) {
      state.MoneyToBonus = money
    },
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
    setAppendBonus(state, options) {
      state.appendBonus.params = options
    },
    setChargeBonus(state, options) {
      state.chargeBonus.params = options
    },
    setCompleteWash(state, options) {
      state.completeWash.params = options
    },
    setCompleteWashOrder(state, order) {
      state.completeWash.params.order = order
    },

    setIsAppendBonusMoney(state, isAppend) {
      state.isBonusMoney.appendBonusMoney = isAppend
    },
    setIsSpendBonusMoney(state, isSpend) {
      state.isBonusMoney.spendBonusMoney = isSpend
    },
    setIsPayCardMoney(state, isCard) {
      state.isCardMoney = isCard
    },
    setIsPing(state, isPing) {
      state.isPing = isPing
    }

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
