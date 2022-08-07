<template>
    <Layout>
        编辑标签
    </Layout>
</template>

<script lang="ts">
import { tagListModel } from '@/models/tagListModel'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class EditLabel extends Vue {
    tag: string = '';
    created() {
        const id = this.$route.params.id
        tagListModel.fetch()
        const tags = tagListModel.data
        const tag = tags.find(item => item.id === id)
        if (tag) {
            this.tag = tag.name
        }else {
            this.$router.replace('/lables')
        }
    }
}
</script>

<style scoped>
</style>