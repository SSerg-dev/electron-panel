export default {
  /*
    state: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {}
  */
  state: {
    // number: 1, 
    activesVacuum: [
      
      {
        id: 1,
        name: 'vacuum',
        number: -1,
        order: 1,
        title: 'ПЫЛЕСОС',
        display: 'block'
      },
      {
        id: 2,
        name: 'air',
        number: -1,
        order: 2,
        title: 'ВОЗДУХ',
        display: 'block'
      },
      {
        id: 3,
        name: 'washer',
        number: -1,
        order: 3,
        title: 'ОМЫВАТЕЛЬ',
        display: 'block'
      },
      {
        id: 4,
        name: 'turboDryer',
        number: -1,
        order: 4,
        title: 'ТУРБОСУШКА',
        display: 'block'
      },
      {
        id: 5,
        name: 'blacking',
        number: -1,
        order: 5,
        title: 'ЧЕРНЕНИЕ',
        display: 'block'
      },
      {
        id: 6,
        name: 'disinfection',
        number: -1,
        order: 6,
        title: 'ДЕЗИНФЕКЦИЯ',
        display: 'block'
      }
      
    ],
    
  }, // end state
  // getters
  getters: {
    getProgramsVacuum(state) {
      return state.activesVacuum
    },
    /* getVacuumNumber(state) {
      return state.number
    } */
  },
  mutations: {
    /* setVacuumNumber(state, number) {
      state.number = number
    } */
  },
  
  
}