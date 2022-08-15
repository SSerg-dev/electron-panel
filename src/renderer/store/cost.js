export default {
    state: { 
        costs: [

          ],

          dryCosts: [
            {
              id: 1,
              title: 'ПЫЛЕСОС',
              name: 'vacuum',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            },
            {
              id: 2,
              title: 'ВОЗДУХ',
              name: 'air',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            },
            {
              id: 3,
              title: 'СТОП',
              name: 'washer',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            },
            /* {
              id: 3,
              title: 'ОМЫВАТЕЛЬ',
              name: 'washer',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            }, */
            /* {
              id: 4,
              title: 'ТУРБОСУШКА',
              name: 'turboDryer',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            }, */
            {
              id: 4
            },

            {
              id: 5,
              title: 'ЧЕРНЕНИЕ',
              name: 'blacking',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            },
            /* {
              id: 6,
              title: 'ДЕЗИНФЕКЦИЯ',
              name: 'disinfection',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            }, */
            {
              id: 6,
              title: 'ТУРБОСУШКА',
              name: 'turboDryer',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            },
          ]  
    }, // end state
  
    // getters
    getters: {
      getCosts(state) {
        return state.costs
      },
      getDryCosts(state) {
        return state.dryCosts
      }
    }
  }
  