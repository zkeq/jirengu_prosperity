<template>
        <button class="button">
            <slot />
        </button>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';

    @Component
    export default class Button extends Vue{
        
    }
</script>

<style lang="scss" scoped>

.button {
  background: #00a650;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin: 44-16px
  }
}
</style>