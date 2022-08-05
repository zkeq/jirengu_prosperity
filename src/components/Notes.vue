<template>
  <label class="notes">
    <span class="name">备注</span>
    <input type="text" placeholder="在这里输入本次记账的备注" />
  </label>
</template>

<script lang="ts">
export default {
  name: "Notes",
};
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  font-weight: 300;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    &::placeholder {
      padding: 5px;
    }
    height: 64px;
    flex-grow: 1;
    background: #fff;
    padding: 0 10px;
    border: 7px solid #f5f5f5;
  }
}
</style>
