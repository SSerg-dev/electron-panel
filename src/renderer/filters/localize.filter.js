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
import svk from '../locales/svk.json'
import srb from '../locales/srb.json'
import nor from '../locales/nor.json'
import fin from '../locales/fin.json'
import bgr from '../locales/bgr.json'
import grc from '../locales/grc.json'
import dnk from '../locales/dnk.json'
import rou from '../locales/rou.json'
import swe from '../locales/swe.json'
import prt from '../locales/prt.json'
import nld from '../locales/nld.json'
import mda from '../locales/mda.json'
import ita from '../locales/ita.json'
import hun from '../locales/hun.json'
import irn from '../locales/irn.json'
import hrv from '../locales/hrv.json'
import arm from '../locales/arm.json'
import cze from '../locales/cze.json'
import uzb from '../locales/uzb.json'
import tjk from '../locales/tjk.json'
import kgz from '../locales/kgz.json'
import aze from '../locales/aze.json'
import spa from '../locales/spa.json'
import geo from '../locales/geo.json'
import chn from '../locales/chn.json'
import isr from '../locales/isr.json'
import arb from '../locales/arb.json'
import che from '../locales/che.json'
import tat from '../locales/tat.json'
import kor from '../locales/kor.json'

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
  'svk-SVK': svk,
  'srb-SRB': srb,
  'nor-NOR': nor,
  'fin-FIN': fin,
  'bgr-BGR': bgr,
  'grc-GRC': grc,
  'dnk-DNK': dnk,
  'rou-ROU': rou,
  'swe-SWE': swe,
  'prt-PRT': prt,
  'nld-NLD': nld,
  'mda-MDA': mda,
  'ita-ITA': ita,
  'hun-HUN': hun,
  'irn-IRN': irn,
  'hrv-HRV': hrv,
  'arm-ARM': arm,
  'cze-CZE': cze,
  'uzb-UZB': uzb,
  'tjk-TJK': tjk,
  'kgz-KGZ': kgz,
  'aze-AZE': aze,
  'spa-SPA': spa,
  'geo-GEO': geo,
  'chn-CHN': chn,
  'isr-ISR': isr,
  'arb-ARB': arb,
  'che-CHE': che,
  'tat-TAT': tat,
  'kor-KOR': kor

}

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
