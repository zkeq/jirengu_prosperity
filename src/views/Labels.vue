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
import { tagListModel } from "@/models/tagListModel";
import Vue from "vue";
import Component from "vue-class-component";
import Button from "@/components/Button.vue";

@Component({
  components: {
    Button
  }
})
export default class Labels extends Vue {
  tags = window.tagList;
  
  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      const message = tagListModel.create(name)
      if (message === "duplicated"){
        window.alert("标签名重复啦")
      }else if (message === "success"){
        window.alert("添加成功")
      }
      
    }
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