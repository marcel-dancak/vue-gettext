const { GettextExtractor, JsExtractors, HtmlExtractors } = require('gettext-extractor')

const extractor = new GettextExtractor()

extractor
  .createJsParser([
    // $gettext(msgid)
    JsExtractors.callExpression('[this].$gettext', {
      arguments: {
        text: 0
      }
    }),
    // $ngettext(msgid, plural, n)
    JsExtractors.callExpression('[this].$ngettext', {
      arguments: {
        text: 0,
        textPlural: 1
      }
    }),
    // $pgettext(context, msgid)
    JsExtractors.callExpression('[this].$pgettext', {
      arguments: {
        context: 0,
        text: 1
      }
    }),
    // $npgettext(context, msgid, plural, n)
    JsExtractors.callExpression('[this].$npgettext', {
      arguments: {
        context: 0,
        text: 1,
        textPlural: 2
      }
    })
  ])
  .parseFilesGlob('./src/**/*.@(js|vue)')

extractor
  .createHtmlParser([
    HtmlExtractors.elementContent('translate', {
      attributes: {
        textPlural: 'plural',
        context: 'context',
        comment: 'comment'
      }
    }),
    HtmlExtractors.elementAttribute('translate-block', 'text', {
      attributes: {
        textPlural: 'plural',
        context: 'context',
        comment: 'comment'
      }
    })
  ])
  .parseFilesGlob('./src/**/*.vue')

extractor.savePotFile('./i18n/messages.pot')

extractor.printStats()
