export default {
  state: {
    /* dev */
    countryKeys: [
      'RU', // +
      'PL', // +
      'US', // +
      'UA', // +
      'LT', // +
      'LV', // +
      'EE', // +
      'KZ', // +
      'DE', // +
      'FR', // +
      'TR',
      'JP',
      'BY',
      'BE',
      'FI',
      'SI',
      'SK',
      'RS',
      'NO',
      'BG',
      'GR',
      'DK',
      'RO',
      'SE',
      'PT',
      'NL',
      'MD',
      'IT',
      'HU',
      'IR',
      'HR',
      'AM',
      'AT',
      'CZ',
      'UZ',
      'TJ',
      'KG',
      'AZ',
      'ES',
      'GE',
      'CN',
      'IL',
      'AE',
      'CH',
      'KR'
    ],

    //countries: ['RU', 'UA', 'BY', 'LT', 'LV', 'EE', ],
    countries: [
      'RU',
      'UA',
      'BY',
      'LT',
      'LV',
      'EE',
      'PL',
      'US',
      'KZ',
      'DE',
      'FR'
    ],
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
      },
      /* dev */
      PL: {
        name: 'Poland',
        native: 'Polska',
        phone: '48',
        continent: 'EU',
        capital: 'Warsaw',
        currency: {
          alphabetic_code: 'PLN',
          symbol: 'zł',
          numeric_code: '985',
          name: 'Zloty',
          minor_unit: '2'
        },
        languages: ['pl'],
        emoji: '🇵🇱',
        emojiU: 'U+1F1F5 U+1F1F1'
      },
      US: {
        name: 'United States',
        native: 'United States',
        phone: '1',
        continent: 'NA',
        capital: 'Washington D.C.',
        currency: {
          alphabetic_code: 'USD',
          symbol: '$',
          numeric_code: '840',
          name: 'US Dollar',
          minor_unit: '2'
        },
        //languages: ['en-US', 'es-US', 'haw', 'fr'],
        languages: ['en', 'es-US', 'haw', 'fr'],
        emoji: '🇺🇸',
        emojiU: 'U+1F1FA U+1F1F8'
      },
      KZ: {
        name: 'Kazakhstan',
        native: 'Қазақстан',
        phone: '76,77',
        continent: 'AS',
        capital: 'Astana',
        currency: {
          alphabetic_code: 'KZT',
          symbol: '₸',
          numeric_code: '398',
          name: 'Tenge',
          minor_unit: '2'
        },
        languages: ['kk', 'ru'],
        emoji: '🇰🇿',
        emojiU: 'U+1F1F0 U+1F1FF'
      },
      DE: {
        name: 'Germany',
        native: 'Deutschland',
        phone: '49',
        continent: 'EU',
        capital: 'Berlin',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2'
        },
        languages: ['de'],
        emoji: '🇩🇪',
        emojiU: 'U+1F1E9 U+1F1EA'
      },
      FR: {
        name: 'France',
        native: 'France',
        phone: '33',
        continent: 'EU',
        capital: 'Paris',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2'
        },
        //languages: ['fr-FR', 'frp', 'br', 'co', 'ca', 'eu', 'oc'],
        languages: ['fr', 'frp', 'br', 'co', 'ca', 'eu', 'oc'],
        emoji: '🇫🇷',
        emojiU: 'U+1F1EB U+1F1F7'
      }

      /*     */
    } /* end allCountries */
  } /* end state */,
  actions: {},
  getters: {
    getLanguageNatives(state, getters) {
      const selected = state.countries
      const all = state.allCountries
      const natives = []

      /* dev */
      let language = null

      selected.forEach((keySel, index) => {
        Object.keys(all).forEach(keyAll => {
          if (keySel === keyAll) {
            /* dev */
            const keyLang = all[keyAll].languages[0]
            language = getters.getLanguageItem(keyLang.toLowerCase())

            const emoji = all[keyAll].emoji
            //console.log('++emoji-->', emoji)

            const currency = all[keyAll].currency.alphabetic_code
            //console.log('++currency-->', currency)

            const symbol = all[keyAll].currency.symbol

            natives.push({
              id: index + 1,
              //title: all[keyAll].native,
              title: language,
              key: keyAll,
              emoji: emoji,
              currency: currency,
              symbol: symbol
            })
          }
        })
      })

      return natives
    }
    // getLanguageItem(state, getters) {}
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
      //console.log('state.country-->', JSON.stringify(state.country))
    }
  }, // end mutation

  modules: {}
}
