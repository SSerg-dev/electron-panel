import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'
import kz from '../locales/kz.json'
import ua from '../locales/ua.json'
import lat from '../locales/lat.json'
import lit from '../locales/lit.json'
import est from '../locales/est.json'
import fra from '../locales/fra.json'
import ger from '../locales/ger.json'
import pol from '../locales/pol.json'
import jpn from '../locales/jpn.json'
import tur from '../locales/tur.json'
import blr from '../locales/blr.json'
import svn from '../locales/svn.json'


const locales = {
  'ru-RU': ru,
  'en-GB': en,
  'kz-KZ': kz,
  'ua-UA': ua,
  'lat-LAT': lat,
  'lit-LIT': lit,
  'est-EST': est,
  'fra-FRA': fra,
  'ger-GER': ger,
  'pol-POL': pol,
  'jpn-JPN': jpn,
  'tur-TUR': tur,
  'blr-BLR': blr,
  'svn-SVN': svn,
}

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
