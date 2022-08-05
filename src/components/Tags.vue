<template>
          <div class="tags">
        <div class="new">
          <button>新增标签</button>
        </div>
        <ul class="current">
          <li>衣</li>
          <li>食</li>
          <li>住</li>
          <li>行</li>
        </ul>
      </div>
</template>

<script lang="ts">
export default {
  name: "Tags",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  font-size: 14px;
  padding: 16px;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      background: #d9d9d9;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
    }
    // &.selected {}
  }
  > .new {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
    > button {
      width: 100%;
      height: 30px;
      border-radius: 6px;
      background: #d9d9d9;
      color: #333;
      font-size: 14px;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
