<template>
  <div class="tags">
    <div class="new">
      <button @click="creataTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" :class="{ selected: selectedTags.indexOf(tag.id) >= 0 }"
        @click="toggle(tag.id)">
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

@Component
export default class Tags extends Vue {
  tagList = window.tagList;
  selectedTags: string[] = [];
  toggle(tag: string) {
    if (this.selectedTags.indexOf(tag) >= 0) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
  creataTag() {
    Confirm.prompt(
      '创建新标签',
      '请输入标签名称',
      '',
      'Answer',
      'Cancel',
      (clientAnswer) => {
        if (clientAnswer === "" || clientAnswer === null || clientAnswer.length > 18) {
          window.alert("标签名不能为空或 or 长度超过18个字符");
        } else {
          window.createTag(clientAnswer);
        }
      },
      (clientAnswer) => {
        console.log('Cancel');
      },
      {
      },
    );
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
  overflow: auto;
  padding: 14px;

  >.current {
    display: flex;
    flex-wrap: wrap;

    >li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 28px;
      height: $h;
      line-height: $h;
      overflow: hidden;
      border-radius: $h/3;
      padding: 0 6px;
      margin-right: 12px;
      margin-top: 7px;

      &.selected {
        background: #36c685;
      }
    }

    // &.selected {}
  }

  >.new {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;

    >button {
      width: 100%;
      height: 28px;
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
