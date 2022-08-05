<template>
    <svg class="icon">
        <use :xlink:href="'#' + name" />
    </svg>
</template>

<script lang="ts">
    let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
    // 这玩意是搜的全网搜到的？
    try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}
    // 如果不加 try，在单元测试的时候可能会遇到问题

    export default {
        name: 'Icon',
        props: ['name']
        // props: {
        //     name: {
        //         type: String,
        //         required: true
        //     }
        // }
        
    }
</script>

<style lang="scss" scoped>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>