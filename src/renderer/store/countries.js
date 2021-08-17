export default {
  state: {
    /* dev */
    countries: ['RU', 'UA', 'BY', 'LT', 'LV', 'EE'],
    /* countries: [ 'RU', 'BY', 'UA',  'LV'], */
    country: {},

    allCountries: {
      /* dev */
      RU: {
        name: 'Russia',
        native: 'Россия',
        phone: '7',
        continent: 'EU',
        capital: 'Moscow',
        currency: {
          alphabetic_code: 'RUB',
          symbol: 'руб',
          numeric_code: '643',
          name: 'Russian Ruble',
          minor_unit: '2'
        },
        languages: [
          'ru',
          'tt',
          'xal',
          'cau',
          'ady',
          'kv',
          'ce',
          'tyv',
          'cv',
          'udm',
          'tut',
          'mns',
          'bua',
          'myv',
          'mdf',
          'chm',
          'ba',
          'inh',
          'tut',
          'kbd',
          'krc',
          'av',
          'sah',
          'nog'
        ],
        emoji: '🇷🇺',
        emojiU: 'U+1F1F7 U+1F1FA'
      },
      UA: {
        name: 'Ukraine',
        native: 'Україна',
        phone: '380',
        continent: 'EU',
        capital: 'Kyiv',
        currency: {
          alphabetic_code: 'UAH',
          symbol: '₴',
          numeric_code: '980',
          name: 'Hryvnia',
          minor_unit: '2'
        },
        languages: ['uk', 'ru-UA', 'rom', 'pl', 'hu'],
        emoji: '🇺🇦',
        emojiU: 'U+1F1FA U+1F1E6'
      },
      BY: {
        name: 'Belarus',
        native: 'Белару́сь',
        phone: '375',
        continent: 'EU',
        capital: 'Minsk',
        currency: {
          alphabetic_code: 'BYR',
          symbol: 'p.',
          numeric_code: '933',
          name: 'Belarusian Ruble',
          minor_unit: '2'
        },
        languages: ['be', 'ru'],
        emoji: '🇧🇾',
        emojiU: 'U+1F1E7 U+1F1FE'
      },
      LT: {
        name: 'Lithuania',
        native: 'Lietuva',
        phone: '370',
        continent: 'EU',
        capital: 'Vilnius',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2'
        },
        languages: ['lt', 'ru', 'pl'],
        emoji: '🇱🇹',
        emojiU: 'U+1F1F1 U+1F1F9'
      },
      LV: {
        name: 'Latvia',
        native: 'Latvija',
        phone: '371',
        continent: 'EU',
        capital: 'Riga',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2'
        },
        languages: ['lv', 'ru', 'lt'],
        emoji: '🇱🇻',
        emojiU: 'U+1F1F1 U+1F1FB'
      },
      EE: {
        name: 'Estonia',
        native: 'Eesti',
        phone: '372',
        continent: 'EU',
        capital: 'Tallinn',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2'
        },
        languages: ['et', 'ru'],
        emoji: '🇪🇪',
        emojiU: 'U+1F1EA U+1F1EA'
      }
    } /* end allCountries */
  } /* end state */,
  actions: {},
  getters: {
    getLanguageNatives(state) {
      const selected = state.countries
      const all = state.allCountries
      const natives = []

      selected.forEach((keySel, index) => {
        Object.keys(all).forEach(keyAll => {
          if (keySel === keyAll) {
            natives.push({
              id: index + 1,
              title: all[keyAll].native,
              key: keyAll
            })
          }
        })
      })
      return natives
    },
    getLanguageItem(state) {}
  }, // end getters

  mutations: {
    setLanguageItem(state, keySel) {
      /* dev */
      const all = state.allCountries
      Object.keys(all).forEach(keyAll => {
        if (keySel === keyAll) {
          state.country = all[keyAll]
        }
      })
      // console.log('state.country-->', JSON.stringify(state.country))
    }
  }, // end mutation

  modules: {}
}
