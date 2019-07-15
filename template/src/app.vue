<template>
  <div id="app">
    <img src="./assets/logo.png">
     {{#router}}
    <router-view/>
    {{else}}
    <HelloWorld/>
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
import Hello from './pages/Hello'
{{/unless}}
export default {
  name: 'App',
  {{#router}}{{else}},
  components: {
    Hello
  }{{/router}}
};
</script>


