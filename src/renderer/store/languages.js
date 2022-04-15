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
      fr: ['French', 'Français'],
      tr: ['Turkish', 'Türkçe'],
      ja: ['Japanese', '日本語'],
      nl: ['Dutch', 'Nederlands'],
      fi: ['Finnish', 'Suomi'],
      sl: ['Slovene', 'Slovenščina'],
      sk: ['Slovak', 'Slovenčina'],
      sr: ['Serbian', 'Српски'],
      no: ['Norwegian', 'Norsk'],
      bg: ['Bulgarian', 'Български'],
      el: ['Greek', 'Ελληνικά'],
      da: ['Danish', 'Dansk'],
      ro: ['Romanian', 'Română'],
      sv: ['Swedish', 'Svenska'],
      pt: ['Portuguese', 'Português']
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
