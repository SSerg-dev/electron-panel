import store from '@/store'
import { ru } from 'date-fns/locale'

/* eslint-disable */
export default function dateFilter(value, format = 'date') {
  const options = {}

  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'numeric'
    options.year = '2-digit'
    
  }

  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  
  // const locale = convert(store.getters.info.locale) || 'ru'

  // return new Intl.DateTimeFormat(locale, options).format(new Date(value))
  return new Intl.DateTimeFormat('ru', options).format(new Date(value))
}

const locales = [
  {name: 'ru-RU', locale: 'ru'},
  {name: 'en-GB', locale: 'en-GB'},
  {name: 'kz-KZ', locale: 'ru' },

  {name: 'ua-UA', locale: 'uk' },
  {name: 'lat-LAT', locale: 'lv' },
  {name: 'lit-LIT', locale: 'lt' },

  {name: 'est-EST', locale: 'et' },
  {name: 'pol-POL', locale: 'pl' },
  {name: 'ger-GER', locale: 'de' },

  {name: 'fra-FRA', locale: 'fr' },
  {name: 'jpn-JPN', locale: 'ja' },
  {name: 'tur-TUR', locale: 'tr' }

]


function convert(localeName) {
  return locales.find( l => l.name === localeName).locale
}


