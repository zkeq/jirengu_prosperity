<template>
    <div class="nav">
      <router-link to="/money">
        <Icon name="Money"/>
      </router-link>
      |
      <router-link to="/lables">
        <Icon name="Labels"/>
      </router-link>
      |
      <router-link to="/statistics">
        <Icon name="Statistics"/>
      </router-link>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'Nav'
    })
</script>

<style lang="scss" scoped>
    .nav{
        border: 1px solid red;
    }
</style>