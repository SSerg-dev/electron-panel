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
      /* dev */
      pl: ['Polish', 'Polski'],
      en: ['English', 'English'],
      kk: ['Kazakh', 'Қазақша'],
      de: ['German', 'Deutsch'],
      fr: ['French', 'Français']
    }
  } /* end state */,
  getters: {
    getLanguageItem: state => keySel => {
      const all = state.languages
      const selected = Object.keys(all).map(key => ({
        key: key,
        intl: all[key][0],
        native: all[key][1]
      }))
      let result = selected.find(language => language.key === keySel)

      return result.native
      //return result.intl
    }
  }
}

/* 

*/
