import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'
import kz from '../locales/kz.json'

const locales = {
  'ru-RU': ru,
  'en-GB': en,
  'kz-KZ': kz
}

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
