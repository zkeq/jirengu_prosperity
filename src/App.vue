<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// 如果 env 为 development，则清除localStorage
// if (localStorage.getItem("env") === "development" || localStorage.getItem("env") === null) {
//   localStorage.clear();
// }
// 设置 localstorage 的 env 为 development
localStorage.setItem("env", "development");

// 设置localstorage env 为dev
export default class Labels extends Vue {
}

</script>


<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background: #f5f5f5;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  max-width: 500px;
  // border: 1px solid rgba(0, 0, 0,0.2);
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
