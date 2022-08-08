<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
    <li 
        v-for="item in dataSource" 
        :key="item.value"
        class="tabs-item"
        :class="liClass(item)" @click="select(item)">{{item.text}}
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  type DataSourceItem = { text: string, value: string }
  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array})
    dataSource!: DataSourceItem[];
    @Prop(String)
    readonly value!: string;
    @Prop(String)
    classPrefix?: string;
    // @Prop({type: String, default: '64px'})
    // height!: string;
    // js 设置高度
    // :style="{height: height}"
    liClass(item: DataSourceItem) {
      return {
        [this.classPrefix + '-tabs-item']: this.classPrefix,
        selected: item.value === this.value
      };
    }
    select(item: DataSourceItem) {
      this.$emit('update:value', item.value);
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    background: #29cf84;
    font-weight: 300;
    // 加一点阴影
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    text-align: center;
    font-size: 22px;
    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #fff;
      }
    }
  }
</style>