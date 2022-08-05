<template>
    <div>
    <div class="nav-wrapper">
        <div class="content">
            <slot></slot>
        </div>
        <Nav />
    </div>
    </div>
</template>
<script lang="ts">
    export default {
        name: "Layout",
    }
</script>

<style lang="scss" scoped>
    .nav-wrapper {
        display: flex;
        // border: 1px solid green;
        flex-direction: column;
        height: 100vh;
    }
    .content {
        // border: 1px solid blue;
        overflow: auto;
        flex-grow: 1;
    }
</style>