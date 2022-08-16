export default {
  /*
    state: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {}
  */
  state: {
     
    activesVacuum: [
      
      {
        id: 1,
        name: 'vacuum',
        number: -1,
        order: 1,
        /* title: 'ПЫЛЕСОС', */
        title: 'VACUUM',
        display: 'block'
      },
      {
        id: 2,
        name: 'air',
        number: -1,
        order: 2,
        /* title: 'ВОЗДУХ', */
        title: 'AIR',
        display: 'block'
      },
      {
        id: 3,
        name: 'washer',
        number: -1,
        order: 3,
        /* title: 'ОМЫВАТЕЛЬ', */
        title: 'GLASS_WASHING_LIQUID',
        display: 'block'
      },
      {
        id: 4,
        name: 'turboDryer',
        number: -1,
        order: 4,
        /* title: 'ТУРБОСУШКА', */
        title: 'TURBO_DRYER',
        display: 'block'
      },
      {
        id: 5,
        name: 'blacking',
        number: -1,
        order: 5,
        /* title: 'ЧЕРНЕНИЕ', */
        title: 'BLACKING',
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
  
  },
  mutations: {
  
  },
  
  
}
