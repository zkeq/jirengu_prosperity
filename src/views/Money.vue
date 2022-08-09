<template>
  <div>
    <Layout class-prefix="layout">

      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>

      <Types :value.sync="record.type"/>

      <Notes 
        field-name="备注" 
        placeholder="在这里输入本次记账的备注"
        @update:value="onUpdateNotes"/>

      <Tags @update:value="onUpdateTags"/>

      <CurrentDetails :record.sync="record"/>

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
  };

  onUpdateNotes(value :string){
    this.record.notes = value;
  }

  saveRecord() {
    recordListModel.create(this.record);
  }

  onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save();
  }
}
</script>

<style lang="scss">
.layout-content {
  // border: 3px solid red;
  display: flex;
  flex-direction: column-reverse;
}
</style>
