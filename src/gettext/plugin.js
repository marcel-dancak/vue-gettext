import lang, { gettext, pgettext, ngettext, npgettext, interpolate } from './index'
import Translate from './components/Translate.vue'
import TranslateBlock from './components/TranslateBlock.vue'

export default {
  install (Vue, { translations = {}, locales, srcLanguage, locale, loadMessages } = {}) {
    lang.translations = translations
    lang.available = locales
    lang.srcLanguage = srcLanguage
    lang.loadMessages = loadMessages
    lang.current = locale || srcLanguage

    Vue.prototype.$lang = lang
    Vue.prototype.$gettext = gettext
    Vue.prototype.$pgettext = pgettext
    Vue.prototype.$ngettext = ngettext
    Vue.prototype.$npgettext = npgettext
    Vue.prototype.$gettextInterpolate = interpolate
    Vue.component('translate', Translate)
    Vue.component('translate-block', TranslateBlock)
  }
}
