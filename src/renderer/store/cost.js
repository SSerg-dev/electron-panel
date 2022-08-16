export default {
    state: { 
        costs: [

          ],

          dryCosts: [
            {
              id: 1,
              /* title: 'ПЫЛЕСОС', */
              title: 'VACUUM', 
              name: 'vacuum',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            },
            {
              id: 2,
              /* title: 'ВОЗДУХ', */
              title: 'AIR', 
              name: 'air',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            },
            {
              id: 3,
              /* title: 'СТОП', */
              title: 'STOP', 
              name: 'stop',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            },
            {
              id: 4,
              // title: 'ОМЫВАТЕЛЬ',
              title: 'GLASS_WASHING_LIQUID', 
              name: 'washer',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            },
            {
              id: 5,
              /* title: 'ЧЕРНЕНИЕ', */
              title: 'BLACKING', 
              name: 'blacking',
              price: 0,
              priceTurbo: 0,
              mode: '',
              display: '0'
            },
            {
              id: 7,
              // title: 'ТУРБОСУШКА',
              title: 'TURBO_DRYER',
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
  