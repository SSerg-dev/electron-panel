export default {
  state: {

    countryKeys: [
      'RU', 
      'PL', 
      'GB', 
      'UA', 
      'LT', 
      'LV', 
      'EE', 
      'KZ', 
      'DE', 
      'FR', 
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
      'KR',
    ],

    //countries: ['RU', 'UA', 'BY', 'LT', 'LV', 'EE', ],
    selectCountries: [],

    country: {},
    languageIds: [],

    allCountries: {
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
          minor_unit: '2',
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
          'nog',
        ],
        emoji: '🇷🇺',
        emojiU: 'U+1F1F7 U+1F1FA',
      },

      /* US: {
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
          minor_unit: '2',
        },
        languages: ['en', 'es-US', 'haw', 'fr'],
        emoji: '🇺🇸',
        emojiU: 'U+1F1FA U+1F1F8',
      }, */

      GB: {
        name: 'United Kingdom',
        native: 'United Kingdom',
        phone: '44',
        continent: 'EU',
        capital: 'London',
        currency: {
          alphabetic_code: 'GBP',
          symbol: '£',
          numeric_code: '826',
          name: 'Pound Sterling',
          minor_unit: '2',
        },
        languages: ['en', 'cy-GB', 'gd'],
        emoji: '🇬🇧',
        emojiU: 'U+1F1EC U+1F1E7',
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
          minor_unit: '2',
        },
        languages: ['kk', 'ru'],
        emoji: '🇰🇿',
        emojiU: 'U+1F1F0 U+1F1FF',
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
          minor_unit: '2',
        },
        languages: ['uk', 'ru-UA', 'rom', 'pl', 'hu'],
        emoji: '🇺🇦',
        emojiU: 'U+1F1FA U+1F1E6',
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
          minor_unit: '2',
        },
        languages: ['lv', 'ru', 'lt'],
        emoji: '🇱🇻',
        emojiU: 'U+1F1F1 U+1F1FB',
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
          minor_unit: '2',
        },
        languages: ['lt', 'ru', 'pl'],
        emoji: '🇱🇹',
        emojiU: 'U+1F1F1 U+1F1F9',
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
          minor_unit: '2',
        },
        languages: ['et', 'ru'],
        emoji: '🇪🇪',
        emojiU: 'U+1F1EA U+1F1EA',
      },

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
          minor_unit: '2',
        },
        languages: ['pl'],
        emoji: '🇵🇱',
        emojiU: 'U+1F1F5 U+1F1F1',
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
          minor_unit: '2',
        },
        languages: ['de'],
        emoji: '🇩🇪',
        emojiU: 'U+1F1E9 U+1F1EA',
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
          minor_unit: '2',
        },
        languages: ['fr', 'frp', 'br', 'co', 'ca', 'eu', 'oc'],
        emoji: '🇫🇷',
        emojiU: 'U+1F1EB U+1F1F7',
      },

      JP: {
        name: 'Japan',
        native: '日本',
        phone: '81',
        continent: 'AS',
        capital: 'Tokyo',
        currency: {
          alphabetic_code: 'JPY',
          symbol: '¥',
          numeric_code: '392',
          name: 'Yen',
          minor_unit: '0',
        },
        languages: ['ja'],
        emoji: '🇯🇵',
        emojiU: 'U+1F1EF U+1F1F5',
      },

      TR: {
        name: 'Turkey',
        native: 'Türkiye',
        phone: '90',
        continent: 'AS',
        capital: 'Ankara',
        currency: {
          alphabetic_code: 'TRY',
          symbol: '₺',
          numeric_code: '949',
          name: 'Turkish Lira',
          minor_unit: '2',
        },
        languages: ['tr', 'ku', 'diq', 'az', 'av'],
        emoji: '🇹🇷',
        emojiU: 'U+1F1F9 U+1F1F7',
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
          minor_unit: '2',
        },
        languages: ['be', 'ru'],
        emoji: '🇧🇾',
        emojiU: 'U+1F1E7 U+1F1FE',
      },

      SI: {
        name: 'Slovenia',
        native: 'Slovenija',
        phone: '386',
        continent: 'EU',
        capital: 'Ljubljana',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2',
        },
        languages: ['sl', 'sh'],
        emoji: '🇸🇮',
        emojiU: 'U+1F1F8 U+1F1EE',
      },
      SK: {
        name: 'Slovakia',
        native: 'Slovensko',
        phone: '421',
        continent: 'EU',
        capital: 'Bratislava',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2',
        },
        languages: ['sk', 'hu'],
        emoji: '🇸🇰',
        emojiU: 'U+1F1F8 U+1F1F0',
      },

      RS: {
        name: 'Serbia',
        native: 'Србија',
        phone: '381',
        continent: 'EU',
        capital: 'Belgrade',
        currency: {
          alphabetic_code: 'RSD',
          symbol: 'Дин.',
          numeric_code: '941',
          name: 'Serbian Dinar',
          minor_unit: '2',
        },
        languages: ['sr', 'hu', 'bs', 'rom'],
        emoji: '🇷🇸',
        emojiU: 'U+1F1F7 U+1F1F8',
      },

      NO: {
        name: 'Norway',
        native: 'Norge',
        phone: '47',
        continent: 'EU',
        capital: 'Oslo',
        currency: {
          alphabetic_code: 'NOK',
          symbol: 'kr',
          numeric_code: '578',
          name: 'Norwegian Krone',
          minor_unit: '2',
        },
        languages: ['no', 'nb', 'nn', 'se', 'fi'],
        emoji: '🇳🇴',
        emojiU: 'U+1F1F3 U+1F1F4',
      },

      FI: {
        name: 'Finland',
        native: 'Suomi',
        phone: '358',
        continent: 'EU',
        capital: 'Helsinki',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2',
        },
        languages: ['fi', 'sv-FI', 'smn'],
        emoji: '🇫🇮',
        emojiU: 'U+1F1EB U+1F1EE',
      },
      BG: {
        name: 'Bulgaria',
        native: 'България',
        phone: '359',
        continent: 'EU',
        capital: 'Sofia',
        currency: {
          alphabetic_code: 'BGN',
          symbol: 'лв',
          numeric_code: '975',
          name: 'Bulgarian Lev',
          minor_unit: '2',
        },
        languages: ['bg', 'tr-BG', 'rom'],
        emoji: '🇧🇬',
        emojiU: 'U+1F1E7 U+1F1EC',
      },

      GR: {
        name: 'Greece',
        native: 'Ελλάδα',
        phone: '30',
        continent: 'EU',
        capital: 'Athens',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2',
        },
        languages: ['el', 'en', 'fr'],
        emoji: '🇬🇷',
        emojiU: 'U+1F1EC U+1F1F7',
      },

      DK: {
        name: 'Denmark',
        native: 'Danmark',
        phone: '45',
        continent: 'EU',
        capital: 'Copenhagen',
        currency: {
          alphabetic_code: 'DKK',
          symbol: 'kr',
          numeric_code: '208',
          name: 'Danish Krone',
          minor_unit: '2',
        },
        languages: ['da', 'en', 'fo', 'de-DK'],
        emoji: '🇩🇰',
        emojiU: 'U+1F1E9 U+1F1F0',
      },

      RO: {
        name: 'Romania',
        native: 'România',
        phone: '40',
        continent: 'EU',
        capital: 'Bucharest',
        currency: {
          alphabetic_code: 'RON',
          symbol: 'lei',
          numeric_code: '946',
          name: 'Romanian Leu',
          minor_unit: '2',
        },
        languages: ['ro', 'hu', 'rom'],
        emoji: '🇷🇴',
        emojiU: 'U+1F1F7 U+1F1F4',
      },

      SE: {
        name: 'Sweden',
        native: 'Sverige',
        phone: '46',
        continent: 'EU',
        capital: 'Stockholm',
        currency: {
          alphabetic_code: 'SEK',
          symbol: 'kr',
          numeric_code: '752',
          name: 'Swedish Krona',
          minor_unit: '2',
        },
        languages: ['sv', 'se', 'sma', 'fi-SE'],
        emoji: '🇸🇪',
        emojiU: 'U+1F1F8 U+1F1EA',
      },

      PT: {
        name: 'Portugal',
        native: 'Portugal',
        phone: '351',
        continent: 'EU',
        capital: 'Lisbon',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2',
        },
        // languages: ['pt-PT', 'mwl'],
        languages: ['pt', 'mwl'],
        emoji: '🇵🇹',
        emojiU: 'U+1F1F5 U+1F1F9',
      },
      // --------------------------------

      NL: {
        name: 'Netherlands',
        native: 'Nederland',
        phone: '31',
        continent: 'EU',
        capital: 'Amsterdam',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2',
        },
        // languages: ['nl-NL', 'fy-NL'],
        languages: ['nl', 'fy-NL'],
        emoji: '🇳🇱',
        emojiU: 'U+1F1F3 U+1F1F1',
      },

      MD: {
        name: 'Moldova',
        native: 'Moldova',
        phone: '373',
        continent: 'EU',
        capital: 'Chișinău',
        currency: {
          alphabetic_code: 'MDL',
          symbol: '',
          numeric_code: '498',
          name: 'Moldovan Leu',
          minor_unit: '2',
        },
        languages: ['md', 'ru', 'gag', 'tr'],
        emoji: '🇲🇩',
        emojiU: 'U+1F1F2 U+1F1E9',
      },

      IT: {
        name: 'Italy',
        native: 'Italia',
        phone: '39',
        continent: 'EU',
        capital: 'Rome',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2',
        },
        languages: ['it', 'de-IT', 'fr-IT', 'sc', 'ca', 'co', 'sl'],
        emoji: '🇮🇹',
        emojiU: 'U+1F1EE U+1F1F9',
      },

      HU: {
        name: 'Hungary',
        native: 'Magyarország',
        phone: '36',
        continent: 'EU',
        capital: 'Budapest',
        currency: {
          alphabetic_code: 'HUF',
          symbol: 'Ft',
          numeric_code: '348',
          name: 'Forint',
          minor_unit: '2',
        },
        languages: ['hu'],
        emoji: '🇭🇺',
        emojiU: 'U+1F1ED U+1F1FA',
      },

      IR: {
        name: 'Iran',
        native: 'ایران',
        phone: '98',
        continent: 'AS',
        capital: 'Tehran',
        currency: {
          alphabetic_code: 'IRR',
          symbol: '﷼',
          numeric_code: '364',
          name: 'Iranian Rial',
          minor_unit: '2',
        },
        languages: ['fa', 'ku'],
        emoji: '🇮🇷',
        emojiU: 'U+1F1EE U+1F1F7',
      },

      HR: {
        name: 'Croatia',
        native: 'Hrvatska',
        phone: '385',
        continent: 'EU',
        capital: 'Zagreb',
        currency: {
          alphabetic_code: 'HRK',
          symbol: 'kn',
          numeric_code: '191',
          name: 'Kuna',
          minor_unit: '2',
        },
        languages: ['hr', 'sr'],
        emoji: '🇭🇷',
        emojiU: 'U+1F1ED U+1F1F7',
      },

      AM: {
        name: 'Armenia',
        native: 'Հայաստան',
        phone: '374',
        continent: 'AS',
        capital: 'Yerevan',
        currency: {
          alphabetic_code: 'AMD',
          symbol: '',
          numeric_code: '051',
          name: 'Armenian Dram',
          minor_unit: '2',
        },
        languages: ['hy'],
        emoji: '🇦🇲',
        emojiU: 'U+1F1E6 U+1F1F2',
      },

      CZ: {
        name: 'Czech Republic',
        native: 'Česká republika',
        phone: '420',
        continent: 'EU',
        capital: 'Prague',
        currency: {
          alphabetic_code: 'CZK',
          symbol: 'Kč',
          numeric_code: '203',
          name: 'Czech Koruna',
          minor_unit: '2',
        },
        languages: ['cs', 'sk'],
        emoji: '🇨🇿',
        emojiU: 'U+1F1E8 U+1F1FF',
      },

      UZ: {
        name: 'Uzbekistan',
        native: 'O‘zbekiston',
        phone: '998',
        continent: 'AS',
        capital: 'Tashkent',
        currency: {
          alphabetic_code: 'UZS',
          symbol: 'som',
          numeric_code: '860',
          name: 'Uzbekistan Sum',
          minor_unit: '2',
        },
        languages: ['uz', 'ru', 'tg'],
        emoji: '🇺🇿',
        emojiU: 'U+1F1FA U+1F1FF',
      },

      TJ: {
        name: 'Tajikistan',
        native: 'Тоҷикистон',
        phone: '992',
        continent: 'AS',
        capital: 'Dushanbe',
        currency: {
          alphabetic_code: 'TJS',
          symbol: '',
          numeric_code: '972',
          name: 'Somoni',
          minor_unit: '2',
        },
        languages: ['tg', 'ru'],
        emoji: '🇹🇯',
        emojiU: 'U+1F1F9 U+1F1EF',
      },

      KG: {
        name: 'Kyrgyzstan',
        native: 'Кыргызстан',
        phone: '996',
        continent: 'AS',
        capital: 'Bishkek',
        currency: {
          alphabetic_code: 'KGS',
          symbol: 'som',
          numeric_code: '417',
          name: 'Som',
          minor_unit: '2',
        },
        languages: ['ky', 'uz', 'ru'],
        emoji: '🇰🇬',
        emojiU: 'U+1F1F0 U+1F1EC',
      },

      AZ: {
        name: 'Azerbaijan',
        native: 'Azərbaycan',
        phone: '994',
        continent: 'AS',
        capital: 'Baku',
        currency: {
          alphabetic_code: 'AZN',
          symbol: 'ман',
          numeric_code: '944',
          name: 'Azerbaijan Manat',
          minor_unit: '2',
        },
        languages: ['az', 'ru', 'hy'],
        emoji: '🇦🇿',
        emojiU: 'U+1F1E6 U+1F1FF',
      },

      ES: {
        name: 'Spain',
        native: 'España',
        phone: '34',
        continent: 'EU',
        capital: 'Madrid',
        currency: {
          alphabetic_code: 'EUR',
          symbol: '€',
          numeric_code: '978',
          name: 'Euro',
          minor_unit: '2',
        },
        languages: ['es', 'ca', 'gl', 'eu', 'oc'],
        emoji: '🇪🇸',
        emojiU: 'U+1F1EA U+1F1F8',
      },

      GE: {
        name: 'Georgia',
        native: 'საქართველო',
        phone: '995',
        continent: 'AS',
        capital: 'Tbilisi',
        currency: {
          alphabetic_code: 'GEL',
          symbol: '',
          numeric_code: '981',
          name: 'Lari',
          minor_unit: '2',
        },
        languages: ['ka', 'ru', 'hy', 'az'],
        emoji: '🇬🇪',
        emojiU: 'U+1F1EC U+1F1EA',
      },

      CN: {
        name: 'China',
        native: '中国',
        phone: '86',
        continent: 'AS',
        capital: 'Beijing',
        currency: {
          alphabetic_code: 'CNY',
          symbol: '¥',
          numeric_code: '156',
          name: 'Yuan Renminbi',
          minor_unit: '2',
        },
        languages: ['zh', 'yue', 'wuu', 'dta', 'ug', 'za'],
        emoji: '🇨🇳',
        emojiU: 'U+1F1E8 U+1F1F3',
      },

      IL: {
        name: 'Israel',
        native: 'יִשְׂרָאֵל',
        phone: '972',
        continent: 'AS',
        capital: 'Jerusalem',
        currency: {
          alphabetic_code: 'ILS',
          symbol: '₪',
          numeric_code: '376',
          name: 'New Israeli Sheqel',
          minor_unit: '2',
        },
        languages: ['he', 'ar-IL', 'en-IL', ''],
        emoji: '🇮🇱',
        emojiU: 'U+1F1EE U+1F1F1',
      },

      AE: {
        name: 'United Arab Emirates',
        native: 'دولة الإمارات العربية المتحدة',
        phone: '971',
        continent: 'AS',
        capital: 'Abu Dhabi',
        currency: {
          alphabetic_code: 'AED',
          symbol: '',
          numeric_code: '784',
          name: 'UAE Dirham',
          minor_unit: '2',
        },
        languages: ['ar', 'fa', 'en', 'hi', 'ur'],
        emoji: '🇦🇪',
        emojiU: 'U+1F1E6 U+1F1EA',
      },

      TM: {
        name: 'Turkmenistan',
        native: 'Türkmenistan',
        phone: '993',
        continent: 'AS',
        capital: 'Ashgabat',
        currency: {
          alphabetic_code: 'TMT',
          symbol: '',
          numeric_code: '934',
          name: 'Turkmenistan New Manat',
          minor_unit: '2',
        },
        languages: ['tk', 'ru', 'uz'],
        emoji: '🇹🇲',
        emojiU: 'U+1F1F9 U+1F1F2',
      },

      TT: {
        name: 'Tatarstan',
        native: 'Татарстан',
        phone: '7',
        continent: 'EU',
        capital: 'Kazan',
        currency: {
          alphabetic_code: 'RUB',
          symbol: 'руб',
          numeric_code: '643',
          name: 'Russian Ruble',
          minor_unit: '2',
        },
        languages: ['tt'],
        emoji: '🇨🇬',
        emojiU: 'U+1F1F7 U+1F1FA',
      },

      KR: {
        name: 'South Korea',
        native: '대한민국',
        phone: '82',
        continent: 'AS',
        capital: 'Seoul',
        currency: {
          alphabetic_code: 'KRW',
          symbol: '₩',
          numeric_code: '410',
          name: 'Won',
          minor_unit: '0',
        },
        languages: ['ko', 'en'],
        emoji: '🇰🇷',
        emojiU: 'U+1F1F0 U+1F1F7',
      },

      /*     */
    } /* end allCountries */,
  } /* end state */,
  actions: {},
  getters: {
    getAllLanguageNatives(state, getters) {
      const all = state.allCountries
      const natives = []
      let language = null

      Object.keys(all).forEach((keyAll, index) => {
        const keyLang = all[keyAll].languages[0]
        language = getters.getLanguageItem(keyLang.toLowerCase())
        const emoji = all[keyAll].emoji
        const currency = all[keyAll].currency.alphabetic_code
        const symbol = all[keyAll].currency.symbol
        natives.push({
          id: index + 1,
          title: language,
          key: keyAll,
          emoji: emoji,
          currency: currency,
          symbol: symbol,
          selected: false,
        })
      })

      return natives
    },
    getLanguageNatives(state, getters) {
      /* dev */
      //const selected = state.countries
      const selected = getters.getSelectedCountries
      //console.log('++getters.getSelectedCountries-->', getters.getSelectedCountries)

      const all = state.allCountries
      const natives = []

      /* dev */
      let language = null

      selected.forEach((keySel, index) => {
        Object.keys(all).forEach((keyAll) => {
          if (keySel === keyAll) {
            const keyLang = all[keyAll].languages[0]
            language = getters.getLanguageItem(keyLang.toLowerCase())
            const emoji = all[keyAll].emoji
            const currency = all[keyAll].currency.alphabetic_code
            const symbol = all[keyAll].currency.symbol
            natives.push({
              id: index + 1,
              title: language,
              key: keyAll,
              emoji: emoji,
              currency: currency,
              symbol: symbol,
              selected: false,
            })
          }
        })
      })

      return natives
    },

    getLanguageIds(state) {
      return state.languageIds
    },
  }, // end getters

  mutations: {
    setLanguageItem(state, keySel) {
      /* dev */
      const all = state.allCountries
      Object.keys(all).forEach((keyAll) => {
        if (keySel === keyAll) {
          state.country = all[keyAll]
        }
      })
      //console.log('state.country-->', JSON.stringify(state.country))
    },
    setLanguageNatives(state, selected) {
      state.countries = selected
      //state.countries = ['LT', 'LV', 'EE', ]
      //console.log('++state.countries-->', state.countries)
    },
    setLanguageIds(state, languageIds) {
      state.languageIds = languageIds
      //console.log('!!++state.languageIds-->', state.languageIds)
    },
  }, // end mutation

  modules: {},
}
