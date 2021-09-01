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
    activesVaccum: [
      
      {
        id: 1,
        order: 1,
        title: 'ПЫЛЕСОС',
        display: 'block'
      },
      {
        id: 2,
        order: 2,
        title: 'ВОЗДУХ',
        display: 'block'
      },
      {
        id: 3,
        order: 3,
        title: 'ОМЫВАТЕЛЬ',
        display: 'block'
      },
      {
        id: 4,
        order: 4,
        title: 'ТУРБОСУШКА',
        display: 'block'
      },
      {
        id: 5,
        order: 5,
        title: 'ЧЕРНЕНИЕ',
        display: 'block'
      },
      {
        id: 6,
        order: 6,
        title: 'ДЕЗИНФЕКЦИЯ',
        display: 'block'
      }
      
    ],
    
  }, // end state
  // getters
  getters: {
    getProgramsVaccum(state) {
      return state.activesVaccum
    },
    /* getVaccumNumber(state) {
      return state.number
    } */
  },
  mutations: {
    /* setVaccumNumber(state, number) {
      state.number = number
    } */
  },
  
  
}
