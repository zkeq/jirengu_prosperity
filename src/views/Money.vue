<template>
  <div>
    <Layout class-prefix="layout">

      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>

      <Types :value.sync="record.type"/>

      <Notes @update:value="onUpdateNotes"/>

      <Tags :data-source.sync="tags" @update:value="onupdateTags"/>

      {{recordList}}

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
import { tagListModel } from "@/models/tagListModel";

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {
    NumberPad,
    Types,
    Notes,
    Tags,
  },
})
export default class Money extends Vue {
  tags = tagList;
  // recordList: Record[] = window.localStorage.getItem("recordList") ? JSON.parse(window.localStorage.getItem("recordList") as string) : [];
  recordList: RecordItem[] = recordList;
  record: RecordItem = {
    amount: 0,
    type: "-",
    notes: "",
    tags: [],
  };

  onupdateTags(value :string[]){
    this.record.tags = value;
  }

  onUpdateNotes(value :string){
    this.record.notes = value;
  }

  saveRecord() {
    // 深拷贝
    const record: RecordItem = recordListModel.clone(this.record);
    record.creactAt = new Date();
    this.recordList.push(record);
  }

  @Watch('recordList')
  onRecordListChange(value: RecordItem[]) {
    recordListModel.save(value);
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
