<template>
  <div class="card f-col">
    <pre v-html="html"/>
    <div class="preview f-col px-2 py-2">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    snippet: String
  },
  computed: {
    html () {
      return require(`@/assets/snippets/${this.snippet}`).default.html
    }
  }
}
</script>

<style lang="scss" scoped>

.card {
  margin: 8px 0;
  background-color: #fff;
  border: 1px solid #eee;
  .preview > * {
    margin: 6px 0;
  }
  pre, .result {
    padding: 8px;
  }
  pre {
    background-color: #eee;
  }
}
</style>
