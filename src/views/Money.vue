<template>
  <div>
    <Layout class-prefix="layout" :style="{height:h+'px'}" class="content">

      <NumberPad :value.sync="record.amount" @submit="saveRecord" />

      <Types :value.sync="record.type" />

      <div class="oneline">

      <Notes type="date" field-name="时间" :value.sync="record.createAt" />

      <Notes field-name="备注" placeholder="在这里输入本次记账的备注" :value.sync="record.notes" />

      </div>
      <Tags :value.sync="record.tags" />

      <CurrentDetails :record.sync="record" />

    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { recordListModel } from "@/models/recordListModel";
import CurrentDetails from "../components/Money/CurrentDetails.vue";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  components: {
    NumberPad,
    Types,
    Notes,
    Tags,
    CurrentDetails
  },
})
export default class Money extends Vue {
  // recordList: Record[] = window.localStorage.getItem("recordList") ? JSON.parse(window.localStorage.getItem("recordList") as string) : [];
  recordList = window.recordList;
  record: RecordItem = {
    amount: 0,
    type: "-",
    notes: "",
    tags: [],
    createAt: new Date().toISOString(),
  };
  h = document.body.clientHeight; 
  saveRecord() {
    if (this.record.amount === 0) {
      Notify.warning("请输入记账金额");
      return;
    }else if(this.record.tags.length === 0){
      Notify.warning("请输入本次记账的标签");
      return;
    }
    Notify.success("记账格式检验成功");
       let type = this.record.type;
    if (type === '+') {
      type = "收入";
    } else {
      type = "支出";
    }
    Confirm.show(
      '确认添加记账',
      '确认添加这次 ' + type + " 为 ￥" + this.record.amount + ' 的记账吗？',
      'Yes',
      'No',
      () => {
        recordListModel.create(this.record);
        recordListModel.save();
        // 刷新页面
        this.$router.go(0);
      },
      () => {

      },
      {
      },
    );
  }
}
</script>

<style lang="scss">
.layout-content {
  // border: 3px solid red;
  display: flex;
  flex-direction: column-reverse;
}
.oneline{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}
.content{
  height: 90vh;
}
</style>
