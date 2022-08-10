<template>
  <div>
    <ul class="types">
      <li :class="{[classPrefix+'-item']: classPrefix, selected: value==='-'}" @click="selectType('-')">支出</li>
      <li :class="{[classPrefix+'-item']: classPrefix, selected: value==='+'}" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  selectType(type: string) { // type: '-' 支出 '+' 收入
    if (type !== "-" && type !== "+") { 
      throw new Error('type must be "-", "+"');
    }
    this.$emit("update:value", type);
  }
}
// 以下是js写法
// export default {
//   name: "Types",
//   data(){
//     return {
//       type: "-" // '-' 支出 '+' 收入
//     }
//   },
//   methods: {
//     selectType(type){ // type: '-' 支出 '+' 收入
//       if (type !== '-' && type !== '+') {
//         throw new Error('type must be "-", "+"')
//       }
//       this.type = type;
//     }
//   }
// };
</script>

<style lang="scss" scoped>
.types {
  font-weight: 300;
  // 加一点阴影
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: #d9d9d9;
  color: #000;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>
