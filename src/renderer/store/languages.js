/*
    state: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {}
  */
export default {
  
  state: {
    languages: {
      ru: ['Russian', 'Русский'],
      uk: ['Ukrainian', 'Українська'],
      be: ['Belarusian', 'Беларуская'],
      lt: ['Lithuanian', 'Lietuvių'],
      lv: ['Latvian', 'Latviešu'],
      et: ['Estonian', 'Eesti'],

    },

  }, /* end state */
  getters: {
    getLanguageItem: (state) => (keySel) => {

      //console.log('++key-->', keySel)
      //return state.languages.ru
      //return Object.keys(categories).map(key => ({...categories[key], id: key}))
      
      const all = state.languages
      const selected = []

      const langs = Object.keys(all).map(key => ({ key: key, intl: all[key][0], native: all[key][1] }))
      console.log('!!++langs-->', langs)
      
      //const { id, title } = this.numbers.find((n) => n.id === numberId);
      //const { key, title } = this.langs.find((l) => l.key === keySel)

      //console.log('!!++selected-->', selected)



      /* Object.keys(all).forEach(keyAll => {
        if (keySel === keyAll) {
          selected.push({
            id: index + 1,
            title: all[keyAll][1]
          })
        }
      }, index) */

      /* Object.keys(all).forEach(keyAll => {
        if (keySel === keyAll) {
          console.log('??!!keyAll-->',keyAll)
        } 
      }) */
      let result = null
      console.log('result-->', JSON.stringify(result))

    





      
      //console.log('!!++!!selected-->', JSON.stringify(keySel))
      // console.log('!!++!!selected-->', JSON.stringify(all))  

    }


  },
}

/* 

*/
