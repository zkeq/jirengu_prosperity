<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="submit" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component
export default class NumberPad extends Vue {
  @Prop (Number) readonly value!: number;

  output = this.value.toString();
  inputContent(event: MouseEvent) {
    const buttom = event.target as HTMLButtonElement; // 强制指定类型
    const input = buttom.textContent!; // 不会Wie空
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if (input === ".") {
        this.output = "0.";
        return;
      }
      this.output = input;
      return;
    }
    if(this.output.indexOf('.') > -1 && input === ".") {
      return;
    }
    // 小数点后面最多两位
    if (this.output.indexOf('.') > -1 && this.output.split('.')[1].length === 2) {
      return;
    }
    this.output += input;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
      return;
    }
    // this.output = this.output.substring(0, this.output.length - 1);
    this.output = this.output.slice(0, -1);
  }
  clear() {
    this.output = "0";
  }
  submit(){
    this.$emit("submit", parseFloat(this.output));
  }
  @Watch("output")
  onValueChange(newValue: string, oldValue: string) {
    this.$emit("update:value", parseFloat(newValue));
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    // height: 72px;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 48px;
      float: left;
      color: #ffffff;
      font-weight: 600;
      background: transparent;
      border: none;
      &.ok {
        height: 48 * 2px;
        float: right;
      }
      &.zero {
        width: 25% * 2;
      }
      $bg: #45cc8f;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>
