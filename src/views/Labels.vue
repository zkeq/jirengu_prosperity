<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="creactTag-wrapper">
      <Button class="creactTag" @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Button from "@/components/Button.vue";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

@Component({
  components: {
    Button
  }
})
export default class Labels extends Vue {
  tags = window.tagList; // 知识点1，读的时候要从 window 读

  createTag() {
    Confirm.prompt(
      '创建新标签',
      '请输入标签名称',
      '',
      'Answer',
      'Cancel',
      (clientAnswer) => {
        if (clientAnswer === "" || clientAnswer === null || clientAnswer.length > 18) {
          window.alert("标签名不能为空或 or 长度超过18个字符");
        } else {
          window.createTag(clientAnswer);
        }
      },
      (clientAnswer) => {
        console.log('Cancel');
      },
      {
      },
    );
  }
};
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    min-height: 44px;
    // 字体宽度
    font-weight: 600;
    display: flex;
    padding-left: 5px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      color: #00a650;
      height: 20px;
      width: 20px;
      margin-right: 20px;
      border-radius: 36%;
    }
  }
}


.creactTag {
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