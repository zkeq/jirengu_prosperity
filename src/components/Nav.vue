<template>
    <nav>
      <router-link to="/labels" class="item" active-class="selected">
        <Icon name="Labels"/>
        标签
      </router-link>
      <router-link to="/money" class="item" active-class="selected">
        <Icon name="Money"/>
        记账
      </router-link>
      <router-link to="/statistics" class="item" active-class="selected">
        <Icon name="Statistics"/>
        统计
      </router-link>
    </nav>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'Nav'
    })
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
    nav{
      display: flex;
      background: white;
      box-shadow: 0 0 3px rgba(0,0,0, 0.25);
      flex-direction: row;
      font-size: 15px;
      > .item{
        padding: 5px 0;
        width: 33%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .icon {
          width: 1.3em;
          height: 1.3em;
          vertical-align: -0.15em;
          overflow: hidden;
        }
      }
      > .item.selected{
        > .icon{
          // display: none;
        }
        background-color: #f5f5f5;
        // font-size: 1.2rem;
        // font-weight: 400;
        color: $safe-green;
      }
    }
</style>