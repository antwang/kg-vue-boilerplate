<template>
  <div id="app">
    <img src="./assets/logo.png">
     {{#router}}
    <router-view/>
    {{else}}
    <Hello/>
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
import Hello from "./pages/Hello"
{{/unless}}
export default {
  name: "App",
  {{#router}}{{else}}
  components: {
    Hello
  }{{/router}}
};
</script>
<style lang="scss">
#app {
  text-align: center;
}
</style>
