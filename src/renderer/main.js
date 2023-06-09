import Vue from 'vue'
// import Invoice from 'vue-invoice'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
// import Loader from '@/components/app/Loader'
import loader from 'vue-ui-preloader'

import localizeFilter from '@/filters/localize.filter'
import capitalizeFilter from '@/filters/capitalize.filter'
import uppercaseFilter from '@/filters/uppercase.filter'

import 'materialize-css/dist/js/materialize.min'

import { remote } from 'electron'

// console.log = remote.require("electron-log").log

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(loader)

Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.filter('capitalize', capitalizeFilter)
Vue.filter('uppercase', uppercaseFilter)
// Vue.component('Loader', Loader)

Vue.component('Paginate', Paginate)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
