<template>
  <div class="tags">
    <div class="new">
      <button>新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
      :class="{selected: selectedTags.indexOf(tag)>=0}"
      @click="toggle(tag)">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component,Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop() dataSource: string[]  | undefined;
  selectedTags: string[] = ["213"];
  toggle(tag: string) {
    if (this.selectedTags.indexOf(tag) >= 0) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    } else {
      this.selectedTags.push(tag);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  font-size: 14px;
  font-weight: 600;
  padding: 16px;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 32px;
      height: $h;
      line-height: $h;
      border-radius: $h/3;
      padding: 0 24px;
      margin-right: 12px;
      margin-top: 12px;
      &.selected {
        background: #36c685;
      }
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
