const path = require('path')
const hljs = require('highlight.js')

function vueSFC (source) {
  const template = source.slice(
    source.indexOf('<template>'),
    source.indexOf('</template>') + '</template>'.length
  )
  const script = source.slice(
    source.indexOf('<script>'),
    source.indexOf('</script>') + '</script>'.length
  )
  // const js = source.slice(
  //   source.indexOf('<script>') + '<script>'.length,
  //   source.indexOf('</script>')
  // )
  // return hljs.highlight('html', template).value + '<br/><br/>' + hljs.highlight('js', js).value
  return hljs.highlight('html', template).value + '<br/><br/>' + hljs.highlight('html', script).value
}

module.exports = function loader (source, map, meta) {
  // const options = getOptions(this)
  const ext = path.extname(this.request).replace('.', '')
  const obj = {
    text: source,
    // html: hljs.highlightAuto(source).value,
    html: ext === 'vue' ? vueSFC(source) : hljs.highlight(ext, source).value
  }
  return `export default ${ JSON.stringify(obj) }`
}
