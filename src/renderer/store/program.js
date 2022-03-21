export default {
  /* 
  const std::string program_name[28] =
                           { "Шампунь", "Вода+шампунь", "Холодная вода",
                             "Воск и защита", "Сушка и блеск", "Пена",
                             "Стоп", "Вода+Шампунь турбо", "Холодная турбо",
                             "Воск турбо", "Сушка и блеск турбо", "Горячая вода",
                             "Горячая вода турбо", "Щетка", "Мойка дисков",
                             "Антимоскит", "Пылесос", "Воздух", "Омывайка", "Пена цвет",
                              "Щетка цвет", "Шампунь X2", "Пена X2", "Щетка X2","Диски X2",
                             "Антимоскит X2", "Турбосушка"
                           };
  номер программы соответствует индекс+1 (Шампунь - 1, Вода+Шампунь - 2, и т.д.)
  */

  state: {
    // mode: [color, x2, turbo],
    // x2: false, color: false,  turbo: true
    actives: [
      {
        id: 2,
        order: 100 /* 1 */,
        title: 'ШАМПУНЬ',
        name: 'shampoo',
        price: 0,
        priceTurbo: 0,
        row: 2,
        col: 0,
        x2: true,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      },
      {
        id: 3,
        order: 100 /* 2 */,
        title: 'ВОДА + ШАМПУНЬ',
        name: 'waterShampoo',
        price: 0,
        priceTurbo: 0,
        row: 3,
        col: 0,
        x2: false,
        color: false,
        turbo: true,
        display: 0,
        mode: 'turbo'
      },
      {
        id: 4,
        order: 100 /* 3 */,
        title: 'ХОЛОДНАЯ',
        name: 'coldWater',
        price: 0,
        priceTurbo: 0,
        row: 4,
        col: 0,
        x2: false,
        color: false,
        turbo: true,
        display: 0,
        mode: 'turbo'
      },
      {
        id: 5,
        order: 100 /* 4 */,
        title: 'ВОСК',
        name: 'waxProtection',
        price: 0,
        priceTurbo: 0,
        row: 5,
        col: 0,
        x2: false,
        color: false,
        turbo: true,
        display: 0,
        mode: 'turbo'
      },

      {
        id: 6,
        order: 100 /* 5 */,
        title: 'ОСМОС' /* 'СУШКА И БЛЕСК', */,
        name: 'dryShine',
        price: 0,
        priceTurbo: 0,
        row: 6,
        col: 0,
        x2: false,
        color: false,
        turbo: true,
        display: 0,
        mode: 'turbo'
      },
      {
        id: 7,
        order: 100 /* 6 */,
        title: 'ПЕНА',
        name: 'foam',
        price: 0,
        priceTurbo: 0,
        row: 7,
        col: 0,
        x2: false,
        color: true,
        turbo: false,
        display: 0,
        mode: ''
      },
      {
        id: 8,
        order: 100 /* 7 */,
        title: 'СТОП/ПАУЗА',
        name: 'stop',
        price: 0,
        priceTurbo: 0,
        row: 8,
        col: 0,
        color: false,
        x2: false,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      },
      {
        id: 9,
        order: 100 /* 8 */,
        title: 'ВОДА + ШАМПУНЬ ТУРБО',
        name: 'waterShampoo_turbo',
        price: 0,
        priceTurbo: 0,
        row: 9,
        col: 0,
        x2: false,
        color: false,
        turbo: true,
        display: 0,
        mode: 'hide'
      },
      {
        id: 10,
        order: 100 /* 9 */,
        title: 'ХОЛОДНАЯ ВОДА ТУРБО',
        name: 'coldWater_turbo',
        price: 0,
        priceTurbo: 0,
        row: 10,
        col: 0,
        x2: false,
        color: false,
        turbo: true,
        display: 0,
        mode: 'hide'
      },

      {
        id: 11,
        order: 100 /* 10 */,
        title: 'ВОСК И ЗАЩИТА ТУРБО',
        name: 'waxProtection_turbo',
        price: 0,
        priceTurbo: 0,
        row: 11,
        col: 0,
        x2: false,
        color: false,
        turbo: true,
        display: 0,
        mode: 'hide'
      },
      {
        id: 12,
        order: 100 /* 11 */,
        title: 'СУШКА И БЛЕСК ТУРБО',
        name: 'dryShine_turbo',
        price: 0,
        priceTurbo: 0,
        row: 12,
        col: 0,
        x2: false,
        color: false,
        turbo: true,
        display: 0,
        mode: 'hide'
      },
      {
        id: 13,
        order: 100 /* 12 */,
        title: 'ТЕПЛАЯ',
        name: 'warmWater',
        price: 0,
        priceTurbo: 0,
        row: 13,
        col: 0,
        x2: false,
        color: false,
        turbo: true,
        display: 0,
        mode: 'turbo'
      },
      {
        id: 14,
        order: 100 /* 13 */,
        title: 'ТЕПЛАЯ ВОДА ТУРБО',
        name: 'warmWater_turbo',
        price: 0,
        priceTurbo: 0,
        row: 14,
        col: 0,
        x2: false,
        color: false,
        turbo: true,
        display: 0,
        mode: 'hide'
      },
      {
        id: 15,
        order: 100 /* 14 */,
        title: 'ЩЕТКА',
        name: 'brushFoam',
        price: 0,
        priceTurbo: 0,
        row: 15,
        col: 0,
        x2: false,
        color: true,
        turbo: false,
        display: 0,
        mode: ''
      },

      {
        id: 16,
        order: 100 /* 15 */,
        title: 'ДИСКИ',
        name: 'disk',
        price: 0,
        priceTurbo: 0,
        row: 16,
        col: 0,
        x2: true,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      },
      {
        id: 17,
        order: 100 /* 16 */,
        title: 'МОСКИТ',
        name: 'mosquito',
        price: 0,
        priceTurbo: 0,
        row: 17,
        col: 0,
        x2: true,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      },
      {
        id: 18,
        order: 100 /* 17 */,
        title: 'ПЫЛЕСОС',
        name: 'vacuum',
        price: 0,
        priceTurbo: 0,
        row: 18,
        col: 0,
        x2: false,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      }, // main
      {
        id: 19,
        order: 100 /* 18 */,
        title: 'ВОЗДУХ',
        name: 'air',
        price: 0,
        priceTurbo: 0,
        row: 19,
        col: 0,
        x2: false,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      }, // main
      {
        id: 20,
        order: 100 /* 19 */,
        title: 'ОМЫВАТЕЛЬ',
        name: 'washer',
        price: 0,
        priceTurbo: 0,
        row: 20,
        col: 0,
        x2: false,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      }, // main

      {
        id: 21,
        order: 100 /* 20 */,
        title: 'ПЕНА ЦВЕТ',
        name: 'brushFoam_color',
        price: 0,
        priceTurbo: 0,
        row: 21,
        col: 0,
        x2: false,
        color: true,
        turbo: false,
        display: 0,
        mode: ''
      }, // ext
      {
        id: 22,
        order: 100 /* 21 */,
        title: 'ЩЕТКА ЦВЕТ',
        name: 'brushFoam_color',
        price: 0,
        priceTurbo: 0,
        row: 22,
        col: 0,
        x2: false,
        color: true,
        turbo: false,
        display: 0,
        mode: ''
      }, // ext
      {
        id: 23,
        order: 100 /* 22 */,
        title: 'ШАМПУНЬ Х2',
        name: 'shampoo_x2',
        price: 0,
        priceTurbo: 0,
        row: 23,
        col: 0,
        x2: true,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      }, // ext
      {
        id: 24,
        order: 100 /* 23 */,
        title: 'ПЕНА Х2',
        name: 'foam_x2',
        price: 0,
        priceTurbo: 0,
        row: 24,
        col: 0,
        x2: true,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      }, // ext
      {
        id: 25,
        order: 100 /* 24 */,
        title: 'ЩЕТКА Х2',
        name: 'brushFoam_x2',
        price: 0,
        priceTurbo: 0,
        row: 25,
        col: 0,
        x2: true,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      }, // ext

      {
        id: 26,
        order: 100 /* 25 */,
        title: 'ДИСКИ Х2',
        name: 'disk_x2',
        price: 0,
        priceTurbo: 0,
        row: 26,
        col: 0,
        x2: true,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      },
      {
        id: 27,
        order: 100 /* 26 */,
        title: 'МОСКИТ Х2',
        name: 'mosquito_x2',
        price: 0,
        priceTurbo: 0,
        row: 27,
        col: 0,
        x2: true,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      },
      {
        id: 28,
        order: 100 /* 27 */,
        title: 'ТУРБОСУШКА',
        name: 'turboDryer',
        price: 0,
        priceTurbo: 0,
        row: 28,
        col: 0,
        x2: false,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      },
      {
        id: 29,
        order: 100 /* 28 */,
        title: 'ОБЕЗЖИРИВАНИЕ',
        name: 'degrease',
        price: 0,
        priceTurbo: 0,
        row: 29,
        col: 0,
        x2: true,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      },
      /* disinfection */
      {
        id: 30,
        order: 100 /* 29 */,
        title: 'ДЕЗИНФЕКЦИЯ',
        name: 'disinfection',
        price: 0,
        priceTurbo: 0,
        row: 30,
        col: 0,
        x2: true,
        color: false,
        turbo: false,
        display: 0,
        mode: ''
      }
    ], // end actives:

    activeProgNames: []
  }, // end state

  // getters
  getters: {
    getPrograms(state) {
      return state.actives
    },
    getActiveProgNames(state) {
      return state.activeProgNames
    }
  },
  mutations: {
    setActiveProgNames(state, names) {
      state.activeProgNames = names
    }
  }
}
