<script>
export default {
  functional: true,
  props: {
    comment: String,
    context: String,
    n: Number,
    params: Object,
    plural: String,
    tag: {
      type: String,
      default: 'span'
    }
  },
  render (h, ctx) {
    const { context, n, params, plural } = ctx.props
    const hasPlural = Number.isFinite(n)
    const msgid = ctx.scopedSlots.default()[0].text
    let trans = ctx.parent.$lang.translate(msgid, hasPlural ? n : 1, context, plural)

    if (params || hasPlural) {
      const vars = Object.assign({}, params)
      if (hasPlural) {
        vars.n = n
      }
      trans = ctx.parent.$gettextInterpolate(trans, vars)
    }
    return h(ctx.props.tag, ctx.data, [trans])
  }
}
</script>
