<template>
  <div id="app" class="f-col">
    <div class="app-header f-row f-align-center px-4">
      <h1 class="mx-2">Vue Gettext</h1>
      <span class="f-grow"/>
      <ul class="mx-2">
        <li
          v-for="(name, code) in $lang.available"
          :key="name"
          :class="{active: $lang.current === code}"
          v-text="name"
          @click="$lang.current = code"
        />
      </ul>
    </div>

    <div class="content f-col f-grow">
      <h1>Simple formatting</h1>

      <h2>1. In templates</h2>
      <v-card snippet="translate.html">
        <translate>Print</translate>
      </v-card>

      <v-card snippet="translate-context.html">
        <translate context="verb">Print</translate>
      </v-card>

      <v-card snippet="translate-plural.html">
        <div class="f-row f-align-center">
          <label class="mr-2">
            count:
            <input type="number" v-model.number="count"/>
          </label>
          <translate plural="%{ n } items" :n="count">%{ n } item</translate>
        </div>
      </v-card>

      <h2>2. In JavaScript code</h2>
      <v-card snippet="translate-js.vue">
        <label class="mr-2">
          count:
          <input type="number" v-model.number="count"/>
        </label>
        <span v-text="trans.message"/>
        <span v-text="trans.messages"/>
        <span v-text="trans.carsCount"/>
        <span v-text="trans.verbTest"/>
      </v-card>

      <h1>Multiple styles formatting</h1>
      <v-card snippet="translate-group.html">
        <translate-block
          tag="p"
          text="/{1} Verification code / was sent on your email address /{2} (%{ emailAddress })/."
          :params="{emailAddress}"
        >
          <template v-slot:1="{ text }">
            <strong class="primary" v-text="text"/>
          </template>
          <template v-slot:2="{ text }">
            <a :href="`mailto:${emailAddress}`" v-text="text"/>
          </template>
        </translate-block>
      </v-card>
    </div>
  </div>
</template>

<script>
import VCard from '@/components/Card.vue'

export default {
  name: 'App',
  components: { VCard },
  data () {
    return {
      count: 1,
      emailAddress: 'user@server.org'
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

<style lang="scss">
@import './layout.scss';

body {
  margin: 0;
}
a, .primary {
  color: #1e97eb;
}
h1 {
  font-size: 26px;
}
h2 {
  font-size: 21px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  max-width: 1200px;
  border: 1px solid #eee;
  border-width: 0 1px;
  min-height: 100vh;
}
.app-header {
  background-color: #2c3e50;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
  ul {
    max-width: 200px;
    li {
      cursor: pointer;
      text-align: left;
      padding: 2px 0;
      font-weight: bold;
      &.active {
        color: #1e97eb;
      }
    }
  }
}
.content {
  padding: 16px;
  h1 {
    color: #2c3e50;
  }
  h2 {
    color: #555;
  }
  p, pre {
    margin: 0;
  }
  input {
    height: 20px;
    &[type="number"] {
      width: 50px;
    }
  }
}
</style>
