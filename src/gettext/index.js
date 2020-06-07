
import Vue from 'vue'

import translate from './translate'
import interpolate from './interpolate'

let current = null
let _current = null
const $lang = Vue.observable({
  messages: {},
  set current (code) {
    current = code
    const load = async () => {
      let messages = this.translations[code]
      if (!messages && this.current !== this.srcLanguage && this.loadMessages) {
        messages = await this.loadMessages(code)
        // messages = require(`@/assets/lang/${code}.json`)
        this.translations[code] = messages
      }
      this.messages = messages || {}
      document.documentElement.setAttribute('lang', code.split('_')[0])
      _current = code
    }
    load()
  },
  get current () {
    return current
  }
})
$lang.translations = {}

$lang.translate = (...args) => {
  // console.log('translate', $lang.current, args)
  return translate.call(null, $lang.messages, $lang.srcLanguage, _current || $lang.srcLanguage, ...args)
}

/*
  * Returns a string of the translation of the message.
  * Also makes the string discoverable by gettext-extract.
  *
  * @param {String} msgid - The translation key
  *
  * @return {String} The translated string
*/
export function gettext (msgid) {
  return $lang.translate(msgid)
}

/*
 * Returns a string of the translation for the given context.
 * Also makes the string discoverable by gettext-extract.
 *
 * @param {String} context - The context of the string to translate
 * @param {String} msgid - The translation key
 *
 * @return {String} The translated string
*/
export function pgettext (context, msgid) {
  return $lang.translate(msgid, 1, context)
}

/*
 * Returns a string of the translation of either the singular or plural,
 * based on the number.
 * Also makes the string discoverable by gettext-extract.
 *
 * @param {String} msgid - The translation key
 * @param {String} plural - The plural form of the translation key
 * @param {Number} n - The number to switch between singular and plural
 *
 * @return {String} The translated string
*/

export function ngettext (msgid, plural, n) {
  return $lang.translate(msgid, n, null, plural)
}

/*
 * Returns a string of the translation of either the singular or plural,
 * based on the number, for the given context.
 * Also makes the string discoverable by gettext-extract.
 *
 * @param {String} context - The context of the string to translate
 * @param {String} msgid - The translation key
 * @param {String} plural - The plural form of the translation key
 * @param {Number} n - The number to switch between singular and plural
 *
 * @return {String} The translated string
*/
export function npgettext (context, msgid, plural, n) {
  return $lang.translate(msgid, n, context, plural)
}

export { interpolate }

export default $lang
