<template>
  <div id="app">
    <!-- App
    <hr/> -->
    <!-- router 会自动替换外层的div -->
    <router-view/>
  </div>
</template>


<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
}
</style>
