<template>
  <div>
    <span v-text="trans.message"/>
    <span v-text="trans.messages"/>
    <span v-text="trans.carsCount"/>
    <span v-text="trans.verbTest"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 1
    }
  },
  computed: {
    trans () {
      return {
        message: this.$gettext('Message'),
        messages: this.$gettextInterpolate(
          this.$ngettext('%{ n } message', '%{ n } messages', this.count),
          { n: this.count }
        ),
        verbTest: this.$pgettext('verb', 'Test'),
        carsCount: this.$gettextInterpolate(
          this.$npgettext('notice', '%{ n } car', '%{ n } cars', this.count),
          { n: this.count }
        )
      }
    }
  }
}
</script>
