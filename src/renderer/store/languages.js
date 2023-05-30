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
      // ================================
      ru: ['Russian', 'Русский'],
      en: ['English', 'English'],
      kk: ['Kazakh', 'Қазақша'],
      // --------------------------------
      uk: ['Ukrainian', 'Українська'],
      lv: ['Latvian', 'Latviešu'],
      lt: ['Lithuanian', 'Lietuvių'],
      // --------------------------------
      et: ['Estonian', 'Eesti'],
      pl: ['Polish', 'Polski'],
      de: ['German', 'Deutsch'],
      // --------------------------------
      fr: ['French', 'Français'],
      ja: ['Japanese', '日本語'],
      tr: ['Turkish', 'Türkçe'],
      // ================================
      be: ['Belarusian', 'Беларуская'],
      sl: ['Slovene', 'Slovenščina'],
      sk: ['Slovak', 'Slovenčina'],
      // --------------------------------
      sr: ['Serbian', 'Српски'],
      no: ['Norwegian', 'Norsk'],
      fi: ['Finnish', 'Suomi'],
      // --------------------------------
      bg: ['Bulgarian', 'Български'],
      el: ['Greek', 'Ελληνικά'],
      da: ['Danish', 'Dansk'],
      // --------------------------------
      ro: ['Romanian', 'Română'],
      sv: ['Swedish', 'Svenska'],
      pt: ['Portuguese', 'Português'],
      // ================================
      nl: ['Dutch', 'Nederlands'],
      md: ['Moldova', 'Moldova'],
      it: ['Italian', 'Italiano'],
      // --------------------------------
      hu: ['Hungarian', 'magyar'],
      fa: ['Persian', 'فارسی'],
      hr: ['Croatian', 'Hrvatski'],
      // --------------------------------
      hy: ['Armenian', 'Հայերեն'],
      cs: ['Czech', 'Čeština'],
      uz: ['Uzbek', 'Oʻzbekcha'],
      // --------------------------------
      tg: ['Tajik', 'Тоҷикӣ'],
      ky: ['Kyrgyz', 'Кыргызча'],
      az: ['Azerbaijan', 'Azərbaycanca'],
      // ================================
      es: ['Spanish', 'Español'],
      ka: ['Georgian', 'ქართული'],
      zh: ['Chinese', '中文'],
      // --------------------------------
      he: ['Hebrew', 'עברית'],
      ar: ['Arabic', 'العربية'],
      tk: ['Turkmen', 'Türkmençe'],
      // --------------------------------
      tt: ['Tatarstan', 'Tатарча'],
      ko: ['Korean', '한국어'],
    },
  } /* end state */,
  getters: {
    getLanguageItem: (state) => (keySel) => {
      const all = state.languages
      const selected = Object.keys(all).map((key) => ({
        key: key,
        intl: all[key][0],
        native: all[key][1],
      }))
      let result = selected.find((language) => language.key === keySel)

      return result.native
      //return result.intl
    },
  },
}

/* 

*/
