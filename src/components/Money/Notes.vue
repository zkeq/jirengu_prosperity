<template>
  <label class="notes">
    <span class="name">{{ fieldName }}</span>
    <!-- <input type="text" 
    :value="value" 
    @input="value = $event.target.value"
    placeholder="在这里输入本次记账的备注" 
    /> -->
    <!-- v-model 简写 -->
    <template v-if="type === 'date'">
      <input :type="type || 'text'" :value="x(value)" @input="onValueChange($event.target.value)" :max="x(new Date().toISOString())"
        :placeholder="placeholder" />
    </template>
    <template v-else>
      <input :type="type || 'text'" :value="value" @input="onValueChange($event.target.value)"
        :placeholder="placeholder" />

    </template>

  </label>
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) readonly value!: string;

  @Prop({ required: true }) fieldName!: string;
  @Prop({}) placeholder?: string;
  @Prop() type?: string;

  onValueChange(value: string) {
    this.$emit("update:value", value);
  }
  x(isoString:string){
    return dayjs(isoString).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
// 第一个 .notes


.notes {
  font-size: 14px;
  font-weight: 300;
  padding-left: 16px;
  display: flex;
  align-items: center;
  // max-width: 50%;

  .name {
    padding-right: 5px;
    white-space: nowrap;
  }

  input {
    &::placeholder {
      padding: 5px;
    }

    max-width: 80%;
    height: 56px;
    flex-grow: 1;
    background: #fff;
    padding: 0 10px;
    border: 7px solid #f5f5f5;
  }
}
.notes:first-child {
  padding-left: 0;
  max-width: 45%;
}
.notes:last-child {
  max-width: 55%;
  flex: 1
}
</style>
