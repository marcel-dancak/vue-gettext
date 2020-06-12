import Vue from 'vue'
import 'highlight.js/styles/default.css'

import App from './App.vue'
import GettextPlugin from './gettext/plugin'
import sk_SK from '@/assets/i18n/sk_SK.json'

Vue.config.productionTip = false

Vue.use(GettextPlugin, {
  srcLanguage: 'en_US',
  locales: {
    en_US: 'English',
    sk_SK: 'Slovak'
  },
  locale: 'en_US',
  translations: {
    sk_SK
  }
  // loadMessages (code) {
  //   return import(
  //     /* webpackInclude: /\.json$/ */
  //     /* webpackChunkName: "i18n-[request]" */
  //     /* webpackMode: "lazy-once" */
  //     `@/assets/i18n/${code}.json`
  //   ).then(m => m.default)
  // }
})
new Vue({
  render: h => h(App),
}).$mount('#app')
