<template>
  <div>
    <h2 class="title">欢迎使用项目模板！</h2>
    <p class="count">{{count}}</p>
    <button class="add" type="button" @click="add">add</button>
  </div>
</template>
<script>
export default {
  created() {
    console.log("lskfjlsj");
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    add() {
      this.count = this.count + 1;
    }
  }
};
</script>
<style lang="scss">
h2 {
  font-size: 10px;
  color: #000;
  background: #ff0;
  text-align: center;
}
</style>