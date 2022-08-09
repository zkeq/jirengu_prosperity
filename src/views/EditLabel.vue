<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" @click.native="goBack" name="left" />
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <span class="now">当前标签 ID：{{ tag.id }}</span>
        <Notes field-name="新标签名" placeholder="请输入标签" @update:value="onUpdateTag" :value="tag.name" />
        <div class="button-wrapper">
            <Button @click.native="remove">删除标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
import { tagListModel } from '@/models/tagListModel'
import Vue from 'vue'
import Component from 'vue-class-component'
import Notes from '../components/Money/Notes.vue'
import Button from '../components/Button.vue'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

@Component({
    components: {
        Notes,
        Button
    }
})
export default class EditLabel extends Vue {
    tag?: { id: string, name: string } = undefined;
    created() {
        const id = this.$route.params.id
        const tags = window.tagList
        const tag = tags.find(item => item.id === id)
        if (tag) {
            this.tag = tag
        } else {
            this.$router.replace('/lables')
        }
    }
    onUpdateTag(name: string) {
        if (this.tag) {
            tagListModel.update(this.tag.id, name)
        }

    }
    remove() {
        Report.warning(
            '敏感操作提醒',
            '删除标签属于敏感操作，删除后将导致已经添加的标签无法正常显示，如果存在已经使用此标签的记账，请谨慎操作',
            'Okay',
            () => {
                Confirm.show(
                    '确认删除',
                    '确认将此标签删除？请注意此操作不可找回，已用的标签将会失效',
                    '确认删除',
                    '取消',
                    () => {
                        if (this.tag) {
                            tagListModel.remove(this.tag.id)
                        }
                        this.$router.replace('/labels')
                        Notify.success('成功删除标签');
                    },
                    () => {
                        console.log('Cancel')
                    },
                    {
                    },
                );
            },
        );

    }
    goBack() {
        Notify.success('标签名保存成功');
        this.$router.go(-1)
    }
}
</script>

<style lang="scss" scoped>
.navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    >.title {}

    >.leftIcon {
        font-size: 24px;
        width: 24px;
        height: 24px;
        color: #00a650;
        margin-right: 16px;
        border-radius: 36%;
    }

    >.rightIcon {
        width: 24px;
        height: 24px;

    }
}

.button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
}

.now {
    font-weight: 300;
    border-radius: 10%;
    padding: 4px;
    background-color: rgba(255, 255, 255, 0.822);
    color: #030303;
    font-size: 14px;
    line-height: 44px;
    margin: 0 16px;
}

::v-deep {
    .button{
        background: #ff5549
    }
}
</style>