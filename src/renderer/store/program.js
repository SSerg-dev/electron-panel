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
        order: 1,
        title: 'ШАМПУНЬ',
        name: 'shampoo',
        row: 2,
        col: 0,
        x2: true, color: false, turbo: false,
        display: 0,
      },
      {
        id: 3,
        order: 2,
        title: 'ВОДА + ШАМПУНЬ',
        name: 'waterShampoo',
        row: 3,
        col: 0,
        x2: false, color: false,  turbo: true,
        display: 0,
      }, 
      {
        id: 4,
        order: 3,
        title: 'ХОЛОДНАЯ',
        name: 'coldWater',
        row: 4,
        col: 0,
        x2: false, color: false,  turbo: true,
        display: 0,
      }, // main +
      {
        id: 5,
        order: 4,
        title: 'ВОСК',
        name: 'waxProtection',
        row: 5,
        col: 0,
        x2: false, color: false,  turbo: true,
        display: 0,
      }, // main +

      {
        id: 6,
        order: 5,
        title: 'ОСМОС', /* 'СУШКА И БЛЕСК', */
        name: 'dryShine',
        row: 6,
        col: 0,
        x2: false, color: false,  turbo: true,
        display: 0,
      },
      {
        id: 7,
        order: 6,
        title: 'ПЕНА',
        name: 'foam',
        row: 7,
        col: 0,
        x2: false, color: true,  turbo: false,
        display: 0
      }, // main + ?
      {
        id: 8,
        order: 7,
        title: 'СТОП/ПАУЗА',
        name: 'stop',
        row: 8,
        col: 0,
        color: false,
        x2: false, color: false,  turbo: false,
        display: 0,
      }, // main + ?
      {
        id: 9,
        order: 8,
        title: 'ВОДА + ШАМПУНЬ ТУРБО',
        name: 'waterShampoo_turbo',
        row: 9,
        col: 0,
        x2: false, color: false,  turbo: true,
        display: 0,
      }, // ext +
      {
        id: 10,
        order: 9,
        title: 'ХОЛОДНАЯ ВОДА ТУРБО',
        name: 'coldWater_turbo',
        row: 10,
        col: 0,
        x2: false, color: false,  turbo: true,
        display: 0,
      }, // ext +

      {
        id: 11,
        order: 10,
        title: 'ВОСК И ЗАЩИТА ТУРБО',
        name: 'waxProtection_turbo',
        row: 11,
        col: 0,
        x2: false, color: false,  turbo: true,
        display: 0,
      }, // ext +
      {
        id: 12,
        order: 11,
        title: 'СУШКА И БЛЕСК ТУРБО',
        name: 'dryShine_turbo',
        row: 12,
        col: 0,
        x2: false, color: false,  turbo: true,
        display: 0,
      }, // ext +
      {
        id: 13,
        order: 12,
        title: 'ТЕПЛАЯ',
        name: 'warmWater',
        row: 13,
        col: 0,
        x2: false, color: false,  turbo: true,
        display: 0,
      }, // main +
      {
        id: 14,
        order: 13,
        title: 'ТЕПЛАЯ ВОДА ТУРБО',
        name: 'warmWater_turbo',
        row: 14,
        col: 0,
        x2: false, color: false,  turbo: true,
        display: 0,
      }, // ext +
      {
        id: 15,
        order: 14,
        title: 'ЩЕТКА',
        name: 'brushFoam', 
        row: 15,
        col: 0,
        x2: false, color: true,  turbo: false,
        display: 0,
      }, // main +

      {
        id: 16,
        order: 15,
        title: 'ДИСКИ',
        name: 'disk',
        row: 16,
        col: 0,
        x2: true, color: false,  turbo: false, 
        display: 0,
      }, // main +
      {
        id: 17,
        order: 16,
        title: 'АНТИМОСКИТ',
        name: 'mosquito',
        row: 17,
        col: 0,
        x2: true, color: false,  turbo: false, 
        display: 0,
      }, // main +
      {
        id: 18,
        order: 17,
        title: 'ПЫЛЕСОС',
        name: 'vacuum',
        row: 18,
        col: 0,
        x2: false, color: false,  turbo: false, 
        display: 0,
      }, // main
      {
        id: 19,
        order: 18,
        title: 'ВОЗДУХ',
        name: 'air',
        row: 19,
        col: 0,
        x2: false, color: false,  turbo: false,
        display: 0,
      }, // main
      {
        id: 20,
        order: 19,
        title: 'ОМЫВАТЕЛЬ',
        name: 'washer',
        row: 20,
        col: 0,
        x2: false, color: false,  turbo: false, 
        display: 0,
      }, // main

      {
        id: 21,
        order: 20,
        title: 'ПЕНА ЦВЕТ',
        name: 'brushFoam_color',
        row: 21,
        col: 0,
        x2: false, color: true,  turbo: false,
        display: 0,
      }, // ext
      {
        id: 22,
        order: 21,
        title: 'ЩЕТКА ЦВЕТ',
        name: 'brushFoam_color',
        row: 22,
        col: 0,
        x2: false, color: true,  turbo: false,
        display: 0,
      }, // ext
      {
        id: 23,
        order: 22,
        title: 'ШАМПУНЬ Х2',
        name: 'shampoo_x2',
        row: 23,
        col: 0,
        x2: true, color: false,  turbo: false,
        display: 0,
      }, // ext
      {
        id: 24,
        order: 23,
        title: 'ПЕНА Х2',
        name: 'foam_x2',
        row: 24,
        col: 0,
        x2: true, color: false,  turbo: false,
        display: 0,
      }, // ext
      {
        id: 25,
        order: 24,
        title: 'ЩЕТКА Х2',
        name: 'brushFoam_x2',
        row: 25,
        col: 0,
        x2: true, color: false,  turbo: false,
        display: 0,
      }, // ext

      {
        id: 26,
        order: 25,
        title: 'ДИСКИ Х2',
        name: 'disk_x2',
        row: 26,
        col: 0,
        x2: true, color: false,  turbo: false,
        display: 0,
      },
      {
        id: 27,
        order: 26,
        title: 'АНТИМОСКИТ Х2',
        name: 'mosquito_x2',
        row: 27,
        col: 0,
        x2: true, color: false,  turbo: false,
        display: 0,
      },
      {
        id: 28,
        order: 27,
        title: 'ТУРБОСУШКА',
        name: 'turboDryer',
        row: 28,
        col: 0,
        x2: false, color: false,  turbo: false,
        display: 0,
      },
      {
        id: 29,
        order: 0,
        title: 'ОБЕЗЖИРИВАНИЕ',
        name: 'degrease',
        row: 29,
        col: 0,
        // x2: false, color: false,  turbo: false,
        x2: true, color: false, turbo: false,
        display: 0,
      },
      /* disinfection */
      {
        id: 30,
        order: 0,
        title: 'ДЕЗИНФЕКЦИЯ',
        name: 'disinfection',
        row: 30,
        col: 0,
        x2: true, color: false, turbo: false,
        display: 0,
      },

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
