<script>
export default {
  props: {
    comment: String,
    context: String,
    n: Number,
    params: Object,
    plural: String,
    tag: {
      type: String,
      default: 'span'
    },
    text: String
  },
  computed: {
    translated () {
      const { text, context, n, params, plural } = this
      const hasPlural = Number.isFinite(n)
      let translated = this.$lang.translate(text, hasPlural ? n : 1, context, plural)
      if (params || hasPlural) {
        const vars = Object.assign({}, params)
        if (hasPlural) {
          vars.n = n
        }
        translated = this.$gettextInterpolate(translated, vars)
      }
      return translated
    },
    blocks () {
      const blocks = []
      let text = this.translated
      const blockStart = /\/{(\w+)}/
      let match = blockStart.exec(text)
      while (match) {
        blocks.push(['', text.slice(0, match.index)])
        const [str, id] = match
        const startIndex = match.index + str.length
        const endIndex = text.indexOf('/', startIndex + 1)
        blocks.push([id, text.slice(startIndex, endIndex).trim()])
        text = text.slice(endIndex + 1)
        match = blockStart.exec(text)
      }
      blocks.push(['', text])
      return blocks
    }
  },
  render (h) {
    const children = this.blocks.map(([id, text]) => {
      const slot = id && this.$scopedSlots[id]
      return slot ? slot({ text }) : text
    })
    return h(this.tag, children)
  }
}
</script>
